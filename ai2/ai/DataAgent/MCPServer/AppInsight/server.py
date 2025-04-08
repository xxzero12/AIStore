"""
Azure Application Insights MCP Server
-------------------------------------
An MCP server that connects to Azure Application Insights for telemetry and monitoring.
"""

import os
import json
from typing import Dict, Any, List, Optional
from datetime import datetime, timedelta
from pathlib import Path
from dotenv import load_dotenv
from mcp.server.fastmcp import FastMCP
from applicationinsights import TelemetryClient
from azure.monitor.query import LogsQueryClient, LogsQueryStatus
from azure.core.credentials import AzureKeyCredential
from azure.identity import DefaultAzureCredential

# Initialize FastMCP python server
mcp = FastMCP("AppInsights")

# Load environment variables from local .env file
load_dotenv()

# Azure App Insights configuration
APPINSIGHTS_INSTRUMENTATION_KEY = os.environ.get("APPINSIGHTS_INSTRUMENTATION_KEY")
if not APPINSIGHTS_INSTRUMENTATION_KEY:
    print("WARNING: APPINSIGHTS_INSTRUMENTATION_KEY not found in environment variables.")

# Initialize telemetry client
telemetry_client = None
if APPINSIGHTS_INSTRUMENTATION_KEY:
    try:
        telemetry_client = TelemetryClient(APPINSIGHTS_INSTRUMENTATION_KEY)
        print(f"App Insights telemetry client initialized successfully")
    except Exception as e:
        print(f"Error initializing App Insights telemetry client: {str(e)}")

@mcp.tool()
def send_event(name: str, properties: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
    """
    Send a custom event to Application Insights.
    
    Args:
        name: Name of the event
        properties: Optional properties to include with the event
    
    Returns:
        Status of the operation
    """
    if not telemetry_client:
        return {
            "status": "error",
            "message": "App Insights telemetry client not initialized"
        }
    
    try:
        telemetry_client.track_event(name, properties or {})
        telemetry_client.flush()
        return {
            "status": "success",
            "message": f"Event '{name}' sent to App Insights",
            "event": {
                "name": name,
                "properties": properties or {}
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error sending event to App Insights: {str(e)}"
        }

@mcp.tool()
def send_metric(name: str, value: float, properties: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
    """
    Send a custom metric to Application Insights.
    
    Args:
        name: Name of the metric
        value: Numeric value of the metric
        properties: Optional properties to include with the metric
    
    Returns:
        Status of the operation
    """
    if not telemetry_client:
        return {
            "status": "error",
            "message": "App Insights telemetry client not initialized"
        }
    
    try:
        telemetry_client.track_metric(name, value, properties or {})
        telemetry_client.flush()
        return {
            "status": "success",
            "message": f"Metric '{name}' with value {value} sent to App Insights",
            "metric": {
                "name": name,
                "value": value,
                "properties": properties or {}
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error sending metric to App Insights: {str(e)}"
        }

@mcp.tool()
def send_trace(message: str, severity_level: str = "Information", properties: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
    """
    Send a trace message to Application Insights.
    
    Args:
        message: The trace message to send
        severity_level: Severity level (e.g., Critical, Error, Warning, Information, Verbose)
        properties: Optional properties to include with the trace
    
    Returns:
        Status of the operation
    """
    if not telemetry_client:
        return {
            "status": "error",
            "message": "App Insights telemetry client not initialized"
        }
    
    # Convert string severity to corresponding integer
    severity_map = {
        "Critical": 4,
        "Error": 3,
        "Warning": 2,
        "Information": 1,
        "Verbose": 0,
    }
    severity = severity_map.get(severity_level, 1)  # Default to Information
    
    try:
        telemetry_client.track_trace(message, properties or {}, severity)
        telemetry_client.flush()
        return {
            "status": "success",
            "message": f"Trace sent to App Insights",
            "trace": {
                "message": message,
                "severity": severity_level,
                "properties": properties or {}
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error sending trace to App Insights: {str(e)}"
        }

@mcp.tool()
def track_request(name: str, url: str, duration: float, response_code: int = 200, 
                 success: bool = True, properties: Optional[Dict[str, str]] = None) -> Dict[str, Any]:
    """
    Track a request in Application Insights without actually sending an HTTP request.
    
    Args:
        name: Name of the request to track
        url: The URL associated with the request
        duration: Duration of the request in milliseconds
        response_code: HTTP status code (default 200)
        success: Whether the request was successful (default True)
        properties: Optional custom properties to include
    
    Returns:
        Status of the tracking operation
    """
    if not telemetry_client:
        return {
            "status": "error",
            "message": "App Insights telemetry client not initialized"
        }
    
    try:
        # Create default properties if none provided
        props = properties or {}
        
        # Add standard properties
        props.update({
            "tracked_manually": "true",
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # Track the request in App Insights
        telemetry_client.track_request(
            name=name,
            url=url,
            duration=duration,
            response_code=response_code,
            success=success,
            properties=props
        )
        telemetry_client.flush()
        
        return {
            "status": "success",
            "message": f"Request '{name}' tracked in App Insights",
            "request": {
                "name": name,
                "url": url,
                "duration_ms": duration,
                "response_code": response_code,
                "success": success,
                "properties": props
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error tracking request in App Insights: {str(e)}"
        }

@mcp.tool()
def verify_connection() -> Dict[str, Any]:
    """
    Verify the connection to Application Insights by sending a test event.
    
    Returns:
        Status of the connection test
    """
    if not telemetry_client:
        return {
            "status": "error",
            "message": "App Insights telemetry client not initialized. Check your instrumentation key."
        }
    
    try:
        # Send a test event
        event_name = f"connection_test_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        test_properties = {
            "test": "true",
            "source": "mcp_server",
            "timestamp": datetime.utcnow().isoformat()
        }
        
        telemetry_client.track_event(event_name, test_properties)
        telemetry_client.flush()
        
        return {
            "status": "success",
            "message": "Successfully connected to Azure Application Insights",
            "details": {
                "event_sent": event_name,
                "properties": test_properties,
                "time": datetime.utcnow().isoformat()
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error testing connection to App Insights: {str(e)}"
        }

@mcp.tool()
def get_applicationInsights_server_info() -> Dict[str, Any]:
    """Get information about the App Insights MCP server and its configuration."""
    return {
        "status": "success",
        "server_info": {
            "name": "Azure App Insights MCP Server",
            "version": "0.1.0",
            "connected": telemetry_client is not None,
            "environment": os.environ.get("ENVIRONMENT", "development"),
            "supported_telemetry": [
                "events",
                "metrics",
                "traces"
            ]
        }
    }

@mcp.tool()
def run_query(query: str, timespan: str = "P1D") -> Dict[str, Any]:
    """
    Run a Kusto query against Application Insights data using a connection string.
    
    Args:
        query: The Kusto query string to execute
        timespan: Time period to query (ISO 8601 duration format, e.g., 'P1D' for 1 day, 'PT12H' for 12 hours)
    
    Returns:
        Query results or error message
    """
    # Get the App Insights connection string
    app_insights_connection_string = os.environ.get("APP_INSIGHTS_CONNECTION_STRING")
    
    if not app_insights_connection_string:
        return {
            "status": "error",
            "message": "APP_INSIGHTS_CONNECTION_STRING not found in environment variables."
        }
    
    try:
        # Create a client using connection string
        client = LogsQueryClient.from_connection_string(connection_string=app_insights_connection_string)
        
        # Parse connection string to get app ID
        # Format: InstrumentationKey=xxx;IngestionEndpoint=xxx;LiveEndpoint=xxx;...
        conn_parts = dict(part.split('=', 1) for part in app_insights_connection_string.split(';') if '=' in part)
        
        # If there's an explicit AppId in the connection string, use it
        app_id = conn_parts.get('AppId', '')
        
        # If no explicit AppId, try to extract from InstrumentationKey (first part before the dash)
        if not app_id and 'InstrumentationKey' in conn_parts:
            app_id = conn_parts['InstrumentationKey'].split('-')[0]
        
        if not app_id:
            return {
                "status": "error",
                "message": "Could not determine App ID from connection string"
            }
        
        # Execute the query
        response = client.query_workspace(
            workspace_id=app_id,
            query=query,
            timespan=timespan
        )
        
        # Check if the query was successful
        if response.status == LogsQueryStatus.SUCCESS:
            # Convert the result to a more JSON-friendly format
            result_tables = []
            for table in response.tables:
                rows = []
                for row in table.rows:
                    row_dict = {}
                    for column_idx, column in enumerate(table.columns):
                        row_dict[column.name] = row[column_idx]
                    rows.append(row_dict)
                
                result_tables.append({
                    "name": table.name,
                    "columns": [{"name": col.name, "type": col.type} for col in table.columns],
                    "rows": rows
                })
            
            return {
                "status": "success",
                "message": "Query executed successfully",
                "query_details": {
                    "query": query,
                    "timespan": timespan
                },
                "results": result_tables
            }
        else:
            return {
                "status": "error",
                "message": f"Query failed with status: {response.status}",
                "query": query
            }
    except ImportError:
        return {
            "status": "error",
            "message": "Required packages not installed. Please install 'azure-monitor-query' with: pip install azure-monitor-query"
        }
    except Exception as e:
        import traceback
        trace = traceback.format_exc()
        return {
            "status": "error",
            "message": f"Error executing query: {str(e)}",
            "traceback": trace,
            "query": query
        }

# Entry point for running the server
if __name__ == "__main__":
    print("Starting App Insights MCP server...")
    mcp.run(transport='stdio')