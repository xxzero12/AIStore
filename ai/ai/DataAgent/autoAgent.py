from openai import AsyncOpenAI, AsyncAzureOpenAI, AzureOpenAI
from agents import OpenAIChatCompletionsModel, Agent, Runner
from agents import set_default_openai_client, set_tracing_disabled
from agents.mcp import MCPServer, MCPServerStdio
from dotenv import load_dotenv
import asyncio
import nest_asyncio
import os
import shutil
import multiprocessing
import json
import tempfile

# Apply nest_asyncio to allow nested event loops
nest_asyncio.apply()

load_dotenv()
# Create OpenAI client using Azure OpenAI
openai_client = AsyncAzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    azure_deployment=os.getenv("AZURE_OPENAI_DEPLOYMENT")
)

# Set the default OpenAI client for the Agents SDK
set_default_openai_client(openai_client)
set_tracing_disabled(True)

# Keep your existing async functions
async def runAgentWithMCP(mcp_server: MCPServer):
    agent = Agent(
        name="Assistant1",
        instructions="Use the tools to read the filesystem and answer questions based on those files.",
        mcp_servers=[mcp_server],
    )

    message = "Whats the weather in WA?"
    print(f"Running: {message}")
    result = await Runner.run(starting_agent=agent, input=message)
    print(result.final_output)
    print("Agent complete, exiting...")

async def runAgentPromptWithMCP(mcp_server, prompt: str):
    print("Starting runAgentPromptWithMCP...")
    agent = Agent(
        name="DataAgent",
        instructions="You are a retail assistant for Microsoft Store. Use the available tools to help customers with their purchases and questions.",
        mcp_servers=mcp_server,
    )
    
    print(f"Running with prompt: {prompt}")
    result = await Runner.run(starting_agent=agent, input=prompt)
    print(f"Result: {result}")
    print(f"Result.final_output: {result.final_output}")
    print("RunAgentPromptWithMCP completed, exiting...")
    return result.final_output

async def process_prompt_async(prompt: str):
    # fs_command = f"uv run --with mcp[cli] mcp run C:\\Users\\XXZER\\Documents\\Hackathon\\McpTest\\weather\\weather.py"
    # try:
    #     path_to_allow_access = os.path.dirname(os.path.abspath(__file__))
    #     fs_command = f"npx -y @modelcontextprotocol/server-filesystem {path_to_allow_access}"
        
    #     # Use async with to properly connect and disconnect the MCP server
    #     async with MCPServerStdio(
    #         name="FS MCP Server",
    #         params={"command": fs_command.split(" ")[0], "args": fs_command.split(" ")[1:]},
    #     ) as fs_server:
    #         # Now the server will be properly connected
    #         return await runAgentPromptWithMCP(fs_server, prompt)
    # except Exception as e:
    #     print(f"Error running MCP server: {str(e)}")
    #     return f"Sorry, I couldn't process your request. Error: {str(e)}"
    try:
        path_to_allow_access = os.path.dirname(os.path.abspath(__file__))
        fs_command = f"npx -y @modelcontextprotocol/server-filesystem {path_to_allow_access}"
        cd_command = f"uv run --with azure-cosmos --with mcp[cli] mcp run C:\\Users\\XXZER\\Documents\\Hackathon\\AiAgent\\MCPServer\\CosmosDb\\server.py"
        ai_command = f"uv run --with applicationinsights --with azure-monitor-query --with azure.identity --with mcp[cli] mcp run C:\\Users\\XXZER\\Documents\\Hackathon\\AiAgent\\MCPServer\\AppInsight\\server.py"
        
        # Use async with to properly connect and disconnect the MCP server
        async with MCPServerStdio(
            name="FS MCP Server",
            params={"command": fs_command.split(" ")[0], "args": fs_command.split(" ")[1:]},
        ) as fs_server, MCPServerStdio(
            name="CD MCP Server",
            params={"command": cd_command.split(" ")[0], "args": cd_command.split(" ")[1:]},
        ) as cd_server, MCPServerStdio(
            name="AI MCP Server",
            params={"command": ai_command.split(" ")[0], "args": ai_command.split(" ")[1:]},
        ) as ai_server:
            # Now the server will be properly connected
            return await runAgentPromptWithMCP([cd_server], prompt)
    except Exception as e:
        print(f"Error running MCP server: {str(e)}")
        return f"Sorry, I couldn't process your request. Error: {str(e)}"    

# This function will be run in a separate process
def _run_agent_process(prompt, output_file):
    try:
        # This runs in a completely separate process with its own event loop
        result = asyncio.run(process_prompt_async(prompt))
        with open(output_file, 'w') as f:
            f.write(result)
    except Exception as e:
        print(f"Error in process: {str(e)}")
        with open(output_file, 'w') as f:
            f.write(f"Thank you for your purchase! We appreciate your business.")

# This is the function that will be called by FastAPI
def ask_autoagent(prompt: str) -> str:
    try:
        # Create a temporary file for the result
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.txt')
        temp_path = temp_file.name
        temp_file.close()
        
        # Start a new process to run the agent
        p = multiprocessing.Process(target=_run_agent_process, args=(prompt, temp_path))
        p.start()
        
        # Wait for the process to finish (with timeout)
        max_wait = 20  # seconds
        p.join(max_wait)
        
        # Check if process is still running after timeout
        if p.is_alive():
            p.terminate()
            p.join()
            return "Thank you for your purchase! Our AI is taking longer than usual to respond. Please enjoy your new product!"
        
        # Read result from file
        try:
            with open(temp_path, 'r') as f:
                result = f.read()
                return result if result else "Thank you for your purchase!"
        except Exception as file_error:
            print(f"Error reading result file: {str(file_error)}")
            return "Thank you for your purchase! We appreciate your business."
        finally:
            # Clean up temp file
            try:
                os.unlink(temp_path)
            except:
                pass
    except Exception as e:
        print(f"Error in ask_autoagent: {str(e)}")
        return "Thank you for your purchase! We appreciate your business."

# Keep your main function for direct script execution
async def main():
    path_to_allow_access = os.path.dirname(os.path.abspath(__file__))
    fs_command = f"uv run --with mcp[cli] mcp run C:\\Users\\XXZER\\Documents\\Hackathon\\McpTest\\weather\\weather.py"
    print(f"Starting MCP Filesystem Server with command: {fs_command}")
    server = MCPServerStdio(
        name="Filesystem Server, via npx",
        params={
            "command": fs_command.split(" ")[0], 
            "args": fs_command.split(" ")[1:]
        }
    )
    print("MCP Server started successfully.")
    await runAgentWithMCP(server)

if __name__ == "__main__":
    print("Starting agent directly...")
    asyncio.run(main())
