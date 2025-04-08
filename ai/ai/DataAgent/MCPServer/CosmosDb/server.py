"""
CosmosDB MCP Server
-------------------
A completely flexible MCP server that connects to Azure CosmosDB and exposes resources and tools.
This server is dynamically configurable and can work with any CosmosDB container structure.
"""

import os
import json
from typing import Optional, Dict, Any, List, Union, Callable
from azure.cosmos import CosmosClient, exceptions, PartitionKey, ContainerProxy
from mcp.server.fastmcp import FastMCP
from dotenv import load_dotenv

# Load environment variables from .env file
# load_dotenv()

# Create an MCP server instance
mcp = FastMCP("CosmosDB Store MCP Server")

# Azure CosmosDB connection configuration
COSMOS_ENDPOINT="https://aistoredb.documents.azure.com:443/"
COSMOS_KEY="ZTe7KSS0M6eXO6zQwbaFC64PVLfnaDGmPcbFZPjRy7RlLhMRpgYpAx0ZhSlRuO7mC4xlimiwRIdfACDboV0sCA=="
DATABASE_NAME="aistoredb"

# Read container definitions from environment variables
# Format: CONTAINER_DEFINITION={"users":{"partition_key":"/id"},"products":{"partition_key":"/category"}}
container_definitions_str = os.environ.get("CONTAINER_DEFINITION", '{"users":{"partition_key":"/id"},"products":{"partition_key":"/id"},"reviews":{"partition_key":"/productId"},"activity_logs":{"partition_key":"/userId"}}')

try:
    # Parse container definitions from environment variable
    container_definitions = json.loads(container_definitions_str)
    print(f"Using container definitions from environment variable: {list(container_definitions.keys())}")
except json.JSONDecodeError:
    print(f"Warning: Invalid JSON in CONTAINER_DEFINITION, using default configuration")
    # Default container definitions if parsing fails
    container_definitions = {
        "users": {"partition_key": "/id"},
        "products": {"partition_key": "/id"},
        "reviews": {"partition_key": "/productId"},
        "activity_logs": {"partition_key": "/userId"}
    }

# Global client instance
cosmos_client: Optional[CosmosClient] = None
database = None

# Container references to be populated during initialization
containers: Dict[str, Optional[ContainerProxy]] = {name: None for name in container_definitions.keys()}

# Initialize connection at startup
def initialize_cosmos_connection():
    """Initialize the CosmosDB client connection and set up containers."""
    global cosmos_client, database, containers
    
    if not COSMOS_ENDPOINT or not COSMOS_KEY:
        print("WARNING: CosmosDB credentials not found. Please set COSMOS_ENDPOINT and COSMOS_KEY environment variables.")
        return
    
    try:
        print(f"Connecting to CosmosDB at {COSMOS_ENDPOINT}...")
        cosmos_client = CosmosClient(COSMOS_ENDPOINT, COSMOS_KEY)
        
        # Create database if it doesn't exist
        try:
            database = cosmos_client.create_database_if_not_exists(id=DATABASE_NAME)
            print(f"Connected to database: {DATABASE_NAME}")
            
            # Create containers if they don't exist
            for container_name, config in container_definitions.items():
                try:
                    partition_key = config.get("partition_key", "/id")  # Default to /id if not specified
                    container_id = config.get("id", container_name)     # Use specified ID or default to container name
                    
                    containers[container_name] = database.create_container_if_not_exists(
                        id=container_id,
                        partition_key=PartitionKey(path=partition_key)
                    )
                    print(f"{container_name.capitalize()} container initialized with partition key {partition_key}")
                except exceptions.CosmosHttpResponseError as e:
                    print(f"Error creating {container_name} container: {e}")
            
        except exceptions.CosmosHttpResponseError as e:
            print(f"Error creating/connecting to database: {e}")
            raise
            
    except Exception as e:
        print(f"Failed to connect to CosmosDB: {e}")
        raise

# Initialize the connection when the module is loaded
initialize_cosmos_connection()

# Helper function to execute CosmosDB queries safely
def execute_query(container_name: str, query: str, params: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    """Execute a query on a CosmosDB container and return the results."""
    container = containers.get(container_name)
    if not container:
        raise ValueError(f"{container_name} container not initialized")
    
    params = params or {}
    query_params = [{"name": f"@{k}", "value": v} for k, v in params.items()]
    
    try:
        if query_params:
            items = list(container.query_items(
                query=query, 
                parameters=query_params, 
                enable_cross_partition_query=True
            ))
        else:
            items = list(container.query_items(
                query=query, 
                enable_cross_partition_query=True
            ))
        return items
    except exceptions.CosmosHttpResponseError as e:
        print(f"Query error on container {container_name}: {e}")
        raise

# Extract filter fields from container definition based on naming patterns
def get_filter_fields(container_name: str) -> List[str]:
    """
    Determine possible filter fields based on container name and conventions:
    - 'id' is always included
    - container name singular form is included (e.g., 'user' for 'users')
    - common joined fields like 'productId', 'userId', etc.
    """
    fields = ["id"]  # ID is always a filter field
    
    # Add the singular form of the container name + "Id"
    singular = container_name[:-1] if container_name.endswith('s') else container_name
    fields.append(f"{singular}Id")
    
    # Add known common filter fields
    common_fields = ["userId", "productId", "categoryId", "activityType", "category", "type", "status"]
    
    # Check partition key to add it as a filter
    if container_name in container_definitions:
        partition_key = container_definitions[container_name].get("partition_key", "")
        if partition_key.startswith("/"):
            fields.append(partition_key[1:])  # Remove leading slash
    
    # Add custom fields from environment variables if specified
    custom_fields_var = f"CONTAINER_{container_name.upper()}_FILTERS"
    custom_fields_str = os.environ.get(custom_fields_var, "")
    if custom_fields_str:
        try:
            custom_fields = json.loads(custom_fields_str)
            if isinstance(custom_fields, list):
                fields.extend(custom_fields)
        except json.JSONDecodeError:
            print(f"Warning: Invalid JSON in {custom_fields_var}")
    
    # Return unique fields
    return list(set(fields))

# Dynamic resource function factory - create resource functions for any container
def create_dynamic_resource_function(container_name: str) -> Callable:
    """Create a resource function for the specified container with appropriate filter parameters."""
    
    # Create a resource function with no parameters
    # We'll use standard functions without kwargs to avoid URI parameter mismatch
    def resource_function(id: Optional[str] = None) -> str:
        """Dynamic resource function to query a CosmosDB container."""
        container = containers.get(container_name)
        if not container:
            return json.dumps({"error": f"{container_name} container not initialized"})
        
        try:
            if id is not None:
                # Fetch specific item by ID
                query = f"SELECT * FROM c WHERE c.id = @id"
                items = execute_query(container_name, query, {"id": id})
                
                if not items:
                    return json.dumps({"error": f"Item with ID {id} not found in {container_name}"})
                return json.dumps(items[0])
            else:
                # Fetch all items (limit to 100 for safety)
                query = "SELECT * FROM c OFFSET 0 LIMIT 100"
                items = execute_query(container_name, query)
                return json.dumps(items)
        except Exception as e:
            return json.dumps({"error": str(e)})
    
    return resource_function

# Create a helper function to register item resources
def register_item_resources(container_name: str):
    """
    Register resources for accessing individual items using the URI template:
    cosmosdb://{containerName}/{itemId}
    """
    # Get the partition key for this container
    partition_key_path = container_definitions.get(container_name, {}).get("partition_key", "/id")
    partition_key_field = partition_key_path[1:] if partition_key_path.startswith("/") else partition_key_path
    
    # Create resource function for accessing individual items
    def item_resource_function(itemId: str) -> str:
        """Resource function to access a specific item."""
        container = containers.get(container_name)
        if not container:
            return json.dumps({"error": f"{container_name} container not initialized"})
        
        try:
            # Determine the partition key value (assume itemId if partition key is id)
            partition_key_value = itemId if partition_key_field == "id" else None
            
            # If we don't have the partition key value, try to find it with a query
            if partition_key_value is None:
                query = f"SELECT * FROM c WHERE c.id = @id"
                items = execute_query(container_name, query, {"id": itemId})
                
                if not items:
                    return json.dumps({"error": f"Item with ID {itemId} not found in {container_name}"})
                
                # Use the first item's partition key value
                item = items[0]
                if partition_key_field in item:
                    partition_key_value = item[partition_key_field]
                else:
                    # Fall back to item ID if partition key field not found
                    partition_key_value = itemId
            
            # Read the item directly using the ID and partition key value
            result = container.read_item(item=itemId, partition_key=partition_key_value)
            return json.dumps(result)
            
        except exceptions.CosmosResourceNotFoundError:
            return json.dumps({"error": f"Item with ID {itemId} not found in {container_name}"})
        except Exception as e:
            return json.dumps({"error": str(e)})
    
    # Set function name and docstring
    item_resource_function.__name__ = f"{container_name}_item"
    item_resource_function.__doc__ = f"Retrieve a specific item from {container_name} collection by ID."
    
    # Register the resource with the container/itemId URI pattern
    mcp.resource(uri=f"cosmosdb://{container_name}/{{itemId}}")(item_resource_function)

# Register item resources for existing containers
for container_name in containers.keys():
    register_item_resources(container_name)

# Register existing containers as resources
for container_name in containers.keys():
    # Use a factory function to create a properly closed-over function
    def create_resource_function(container_name=container_name):
        def resource_function() -> str:
            """Simple resource function to query a CosmosDB container."""
            if not containers.get(container_name):
                return json.dumps({"error": f"{container_name} container not initialized"})
            
            try:
                # Fetch all items (limit to 100 for safety)
                query = "SELECT * FROM c OFFSET 0 LIMIT 100"
                items = execute_query(container_name, query)
                return json.dumps(items)
            except Exception as e:
                return json.dumps({"error": str(e)})
        
        # Set name and docstring
        resource_function.__name__ = container_name
        resource_function.__doc__ = f"Retrieve data from {container_name} collection in CosmosDB."
        return resource_function
    
    # Create and register the resource
    mcp.resource(uri=f"cosmosdb://{container_name}")(create_resource_function())

@mcp.tool()
def list_containers() -> Dict[str, Any]:
    """List all available containers and their configurations"""
    if not cosmos_client or not database:
        return {
            "status": "error",
            "message": "CosmosDB client not initialized. Please set COSMOS_ENDPOINT and COSMOS_KEY environment variables."
        }
    
    try:
        result = []
        
        for container_name, container in containers.items():
            if container:
                config = container_definitions.get(container_name, {})
                partition_key = config.get("partition_key", "unknown")
                filter_fields = get_filter_fields(container_name)
                
                result.append({
                    "name": container_name,
                    "partition_key": partition_key,
                    "filter_fields": filter_fields
                })
        
        return {
            "status": "success",
            "message": f"Found {len(result)} containers",
            "containers": result
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error listing containers: {str(e)}"
        }

@mcp.tool()
def create_container(name: str, partition_key: str) -> Dict[str, Any]:
    """
    Create a new container in the CosmosDB database.
    
    Args:
        name: Name of the container
        partition_key: Partition key path (e.g., "/id", "/userId")
    """
    if not cosmos_client or not database:
        return {
            "status": "error",
            "message": "CosmosDB client not initialized. Please set COSMOS_ENDPOINT and COSMOS_KEY environment variables."
        }
    
    try:
        # Ensure partition key starts with /
        if not partition_key.startswith("/"):
            partition_key = f"/{partition_key}"
        
        # Create the new container
        container = database.create_container_if_not_exists(
            id=name,
            partition_key=PartitionKey(path=partition_key)
        )
        
        # Update our container tracking
        containers[name] = container
        container_definitions[name] = {"partition_key": partition_key}
        
        # Create a simple resource function with no parameters to avoid URI mismatch
        def new_resource_function() -> str:
            """Simple resource function to query the CosmosDB container."""
            if not containers.get(name):
                return json.dumps({"error": f"{name} container not initialized"})
            
            try:
                # Fetch all items (limit to 100 for safety)
                query = "SELECT * FROM c OFFSET 0 LIMIT 100"
                items = execute_query(name, query)
                return json.dumps(items)
            except Exception as e:
                return json.dumps({"error": str(e)})
        
        # Set function name and docstring
        new_resource_function.__name__ = name
        new_resource_function.__doc__ = f"Retrieve data from {name} collection in CosmosDB."
        
        # Register the resource with a simple URI
        mcp.resource(uri=f"cosmosdb://{name}")(new_resource_function)
        
        # Register item resources for this new container
        register_item_resources(name)
        
        return {
            "status": "success",
            "message": f"Container '{name}' created successfully with partition key '{partition_key}'",
            "name": name,
            "partition_key": partition_key
        }
    except exceptions.CosmosHttpResponseError as e:
        return {
            "status": "error",
            "message": f"CosmosDB error: {str(e)}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error creating container: {str(e)}"
        }

@mcp.tool()
def create_item(container_name: str, item_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a new item in the specified container.
    
    Args:
        container_name: Name of the container to create the item in
        item_data: The data to store in the new item
        
    Returns:
        The created item with system-generated fields
    """
    if container_name not in containers or not containers[container_name]:
        return {
            "status": "error",
            "message": f"Container '{container_name}' not found or not initialized"
        }
    
    container = containers[container_name]
    
    try:
        # If no ID is provided, generate a UUID
        if "id" not in item_data:
            import uuid
            item_data["id"] = str(uuid.uuid4())
        
        # Add timestamp
        from datetime import datetime
        item_data["createdAt"] = datetime.utcnow().isoformat()
        
        # Create the item
        result = container.create_item(body=item_data)
        
        return {
            "status": "success",
            "message": f"Item created successfully in {container_name}",
            "item": result
        }
    except exceptions.CosmosHttpResponseError as e:
        return {
            "status": "error",
            "message": f"CosmosDB error: {str(e)}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error creating item: {str(e)}"
        }

@mcp.tool()
def batch_create_items(container_name: str, items: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Create multiple items in a container in a single operation.
    
    Args:
        container_name: Name of the container to add items to
        items: List of items to create
        
    Returns:
        Status and summary of the operation
    """
    if container_name not in containers or not containers[container_name]:
        return {
            "status": "error",
            "message": f"Container '{container_name}' not found or not initialized"
        }
    
    container = containers[container_name]
    
    try:
        from datetime import datetime
        import uuid
        
        results = []
        success_count = 0
        error_count = 0
        errors = []
        
        # Process each item
        for item in items:
            try:
                # If no ID is provided, generate a UUID
                if "id" not in item:
                    item["id"] = str(uuid.uuid4())
                
                # Add timestamp
                item["createdAt"] = datetime.utcnow().isoformat()
                
                # Create the item
                result = container.create_item(body=item)
                results.append(result)
                success_count += 1
            except Exception as e:
                error_count += 1
                errors.append({
                    "item": item,
                    "error": str(e)
                })
        
        return {
            "status": "completed",
            "message": f"Batch operation completed: {success_count} succeeded, {error_count} failed",
            "total_items": len(items),
            "success_count": success_count,
            "error_count": error_count,
            "successful_items": results,
            "errors": errors
        }
    except exceptions.CosmosHttpResponseError as e:
        return {
            "status": "error",
            "message": f"CosmosDB error: {str(e)}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error in batch operation: {str(e)}"
        }

@mcp.tool()
def update_item(container_name: str, item_id: str, item_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Update an existing item in the specified container or create it if it doesn't exist (upsert).
    
    Args:
        container_name: Name of the container
        item_id: ID of the item to update
        item_data: New data for the item (will add/overwrite the ID field)
        
    Returns:
        The updated or created item
    """
    if container_name not in containers or not containers[container_name]:
        return {
            "status": "error",
            "message": f"Container '{container_name}' not found or not initialized"
        }
    
    container = containers[container_name]
    
    try:
        # Ensure ID in the data matches the requested ID
        item_data["id"] = item_id
        
        # Add update timestamp
        from datetime import datetime
        item_data["updatedAt"] = datetime.utcnow().isoformat()
        
        # Update the item using upsert_item (creates or replaces)
        result = container.upsert_item(body=item_data)
        
        return {
            "status": "success",
            "message": f"Item with ID {item_id} updated successfully in {container_name}",
            "item": result
        }
    except exceptions.CosmosHttpResponseError as e:
        return {
            "status": "error",
            "message": f"CosmosDB error: {str(e)}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error updating item: {str(e)}"
        }

@mcp.tool()
def test_cosmos_connection() -> Dict[str, Any]:
    """Test the connection to Azure CosmosDB"""
    if not cosmos_client:
        return {
            "status": "error",
            "message": "CosmosDB client not initialized. Please set COSMOS_ENDPOINT and COSMOS_KEY environment variables."
        }
    
    try:
        # List databases to verify connection
        databases = list(cosmos_client.list_databases())
        db_names = [db['id'] for db in databases]
        
        # List containers in the current database
        container_list = list(database.list_containers())
        container_names = [container['id'] for container in container_list]
        
        return {
            "status": "connected",
            "message": "Successfully connected to Azure CosmosDB",
            "databases": db_names,
            "current_database": DATABASE_NAME,
            "containers": container_names
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error connecting to CosmosDB: {str(e)}"
        }

@mcp.tool()
def query_items(container_name: str, query_text: str, query_parameters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Query items in a container using SQL syntax.
    
    Args:
        container_name: Name of the container to query
        query_text: SQL query text (e.g., "SELECT * FROM c WHERE c.category = @category")
        query_parameters: Optional query parameters (e.g., {"category": "electronics"})
        
    Returns:
        The query results
    """
    if container_name not in containers or not containers[container_name]:
        return {
            "status": "error",
            "message": f"Container '{container_name}' not found or not initialized"
        }
    
    try:
        # Execute the query using our existing helper function
        items = execute_query(container_name, query_text, query_parameters)
        
        return {
            "status": "success",
            "message": f"Query executed successfully on {container_name}",
            "count": len(items),
            "items": items
        }
    except exceptions.CosmosHttpResponseError as e:
        return {
            "status": "error",
            "message": f"CosmosDB error: {str(e)}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error executing query: {str(e)}"
        }

@mcp.tool()
def delete_item(container_name: str, item_id: str, partition_key_value: Optional[str] = None) -> Dict[str, Any]:
    """
    Delete an item from the specified container.
    
    Args:
        container_name: Name of the container containing the item
        item_id: ID of the item to delete
        partition_key_value: Optional value of the partition key if different from the ID
        
    Returns:
        Status of the operation
    """
    if container_name not in containers or not containers[container_name]:
        return {
            "status": "error",
            "message": f"Container '{container_name}' not found or not initialized"
        }
    
    container = containers[container_name]
    
    try:
        # Get the partition key field for this container
        partition_key_path = container_definitions.get(container_name, {}).get("partition_key", "/id")
        partition_key_field = partition_key_path[1:] if partition_key_path.startswith("/") else partition_key_path
        
        # Determine partition key value if not provided
        if partition_key_value is None:
            if partition_key_field == "id":
                # If partition key is id, use item_id
                partition_key_value = item_id
            else:
                # Try to find the existing item to get its partition key
                try:
                    query = f"SELECT * FROM c WHERE c.id = @id"
                    items = execute_query(container_name, query, {"id": item_id})
                    
                    if not items:
                        return {
                            "status": "error",
                            "message": f"Item with ID {item_id} not found in {container_name}"
                        }
                    
                    # Get partition key value from the existing item
                    existing_item = items[0]
                    if partition_key_field in existing_item:
                        partition_key_value = existing_item[partition_key_field]
                    else:
                        # Fall back to using ID as partition key
                        partition_key_value = item_id
                        
                except Exception as e:
                    return {
                        "status": "error",
                        "message": f"Error determining partition key: {str(e)}"
                    }
        
        # Delete the item
        container.delete_item(item=item_id, partition_key=partition_key_value)
        
        return {
            "status": "success",
            "message": f"Item with ID {item_id} deleted successfully from {container_name}"
        }
    except exceptions.CosmosResourceNotFoundError:
        return {
            "status": "error",
            "message": f"Item with ID {item_id} not found in {container_name}"
        }
    except exceptions.CosmosHttpResponseError as e:
        return {
            "status": "error",
            "message": f"CosmosDB error: {str(e)}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error deleting item: {str(e)}"
        }

@mcp.tool()
def delete_container(container_name: str) -> Dict[str, Any]:
    """
    Delete a container from the database.
    
    Args:
        container_name: Name of the container to delete
        
    Returns:
        Status of the operation
    """
    if not cosmos_client or not database:
        return {
            "status": "error",
            "message": "CosmosDB client not initialized. Please set COSMOS_ENDPOINT and COSMOS_KEY environment variables."
        }
    
    if container_name not in containers or not containers[container_name]:
        return {
            "status": "error",
            "message": f"Container '{container_name}' not found or not initialized"
        }
    
    try:
        # Get the container
        container = containers[container_name]
        
        # Delete the container
        database.delete_container(container.id)
        
        # Remove from our tracking dictionaries
        containers.pop(container_name, None)
        container_definitions.pop(container_name, None)
        
        return {
            "status": "success",
            "message": f"Container '{container_name}' deleted successfully"
        }
    except exceptions.CosmosResourceNotFoundError:
        return {
            "status": "error",
            "message": f"Container '{container_name}' not found"
        }
    except exceptions.CosmosHttpResponseError as e:
        return {
            "status": "error",
            "message": f"CosmosDB error: {str(e)}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error deleting container: {str(e)}"
        }

@mcp.tool()
def get_cosmosDb_server_info() -> Dict[str, Any]:
    """Get information about the MCP server and its configuration."""
    try:
        container_info = []
        for name, container in containers.items():
            if container:
                config = container_definitions.get(name, {})
                
                # Correctly get the count from a count query
                count_result = list(container.query_items(
                    query="SELECT VALUE COUNT(1) FROM c",
                    enable_cross_partition_query=True
                ))
                # The count query returns a single number as the only element in the list
                item_count = count_result[0] if count_result else 0
                
                container_info.append({
                    "name": name,
                    "partition_key": config.get("partition_key", "unknown"),
                    "item_count": item_count
                })
        
        return {
            "status": "success",
            "server_info": {
                "name": "CosmosDB Store MCP Server",
                "version": "1.0.0",
                "database": DATABASE_NAME,
                "cosmos_endpoint": COSMOS_ENDPOINT.replace(COSMOS_KEY, "**redacted**") if COSMOS_KEY else COSMOS_ENDPOINT,
                "containers": container_info
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error retrieving server info: {str(e)}"
        }

@mcp.prompt()
def test_prompt() -> str:
    """A simple test prompt function to verify the server is running correctly."""
    return "This is a test prompt function. It can be used to verify the MCP server is running correctly."

@mcp.prompt()
def cosmosdb_query_generator(container_name: str, description: str, conditions: Optional[List[str]] = None, fields: Optional[List[str]] = None) -> Dict[str, Any]:
    """
    Generate a CosmosDB SQL query based on a natural language description.
    
    Args:
        container_name: Name of the container to query
        description: Natural language description of what you want to query
        conditions: Optional list of specific conditions to include
        fields: Optional list of specific fields to return
    
    Returns:
        A formatted prompt that will generate a CosmosDB SQL query
    """
    # Get container information to provide context
    container_info = ""
    available_fields = []
    
    if container_name in containers and containers[container_name]:
        try:
            # Get partition key
            partition_key = container_definitions.get(container_name, {}).get("partition_key", "/id")
            
            # Try to get a sample item to understand the schema
            sample_items = list(containers[container_name].query_items(
                query="SELECT TOP 1 * FROM c",
                enable_cross_partition_query=True
            ))
            
            if sample_items:
                # Extract field names from sample item (excluding system fields)
                available_fields = [field for field in sample_items[0].keys() 
                                   if not field.startswith('_')]
                
                # Format sample for display
                sample_json = json.dumps(sample_items[0], indent=2)
                container_info = f"Container: {container_name}\nPartition key: {partition_key}\nSample item:\n```json\n{sample_json}\n```\n"
            else:
                container_info = f"Container: {container_name}\nPartition key: {partition_key}\n(No items found in container)\n"
        except Exception as e:
            container_info = f"Container: {container_name}\nError retrieving info: {str(e)}\n"
    
    # Build the user message
    user_message = f"Please generate a CosmosDB SQL query for the '{container_name}' container that {description}."
    
    # Add fields specification if provided
    if fields:
        fields_str = ", ".join([f"c.{field}" for field in fields])
        user_message += f"\n\nInclude only these fields in the SELECT: {fields_str}"
    else:
        user_message += "\n\nUse SELECT * FROM c unless specific fields are requested."
    
    # Add conditions if provided
    if conditions and len(conditions) > 0:
        user_message += "\n\nInclude these specific conditions:"
        for i, condition in enumerate(conditions, 1):
            user_message += f"\n{i}. {condition}"
    
    # Add information about available fields
    if available_fields:
        user_message += f"\n\nAvailable fields in this container: {', '.join(available_fields)}"
    
    # Add instructions for query format
    user_message += """

Please provide the query in this format:
```sql
SELECT * FROM c WHERE c.field = @paramName
```

And parameters in this format:
```json
{
  "paramName": "value"
}
```

Also explain how the query works and any assumptions you've made.
"""

    return container_info + user_message

# Entry point for running the server
if __name__ == "__main__":
    mcp.run(transport='stdio')