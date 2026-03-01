import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "KAI-Recipes",
  version: "1.0.0",
});

const getRecipes = z.object();

server.registerTool(
  "list recipes",
  getRecipes,
  async () => {
    return {
      content: [{ 
        type: 'text', 
        text: JSON.stringify([]),
        mimeType: 'application/json' 
      }],
    };  }
);

const transport = new StdioServerTransport();

async function startServer() {
  await server.connect(transport);
  console.log("MCP Server started with stdio transport. Ready for input...");
}

startServer();
