import { Agent, run, MCPServerStdio, connectMcpServers } from "@openai/agents";
const recipeServer = new MCPServerStdio({
  command: "bun",
  args: [`${import.meta.dir}/tools/recipe-tool.ts`],
});
    
  const mcpServers = await connectMcpServers([recipeServer]);

const recipeAgent = new Agent({
  name: "RecipeAgent",
  instructions: "You are a recipe assistant.",
  mcpServers: mcpServers.active,
});



try {
  const result = await run(
    recipeAgent,
    // "Get me 3 recipes that include chicken or beef.",
    "I need you to plan dinner for me for the week, give me 4 recipes, and make a shopping list for those recipes.",
  );
  console.log("Agent response:", result.finalOutput);
} catch (error) {
  console.error("Error running agent:", error);
}