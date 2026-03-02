import { Agent, run, MCPServerStdio, connectMcpServers } from "@openai/agents";
const recipeServer = new MCPServerStdio({
  command: "bun",
  args: [`${import.meta.dir}/tools/recipe-tool.ts`],
});
    
  const mcpServers = await connectMcpServers([recipeServer]);

const recipeAgent = new Agent({
  name: "RecipeAgent",
  instructions: "You are a recipe assistant. Use the available tools to list and retrieve recipes.",
  mcpServers: mcpServers.active,
});



try {
  const result = await run(
    recipeAgent,
    "List all recipes."
  );
  console.log("Agent response:", result.finalOutput);
} catch (error) {
  console.error("Error running agent:", error);
}