import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { recipes } from "./recipes";

const server = new McpServer({
  name: "KAI-Recipes",
  version: "1.0.0",
});

const proteinOptions = ["beef", "chicken", "pork"];

const listRecipesSchema = z.object({
  numRecipes: z.number().describe("The number of recipes to list"),
  proteins: z.enum(proteinOptions).optional().array().describe("The proteins to filter recipes by"),
});

server.registerTool(
  "list-recipes",
  {
    title: "List Recipes",
    description: "Lists recipes based on number and protein filters",
    inputSchema: listRecipesSchema,
  },
  async ({ numRecipes, proteins=proteinOptions }) => {
    try {
        await Bun.write('debug.txt', `Received request to list recipes with numRecipes=${numRecipes} and proteins=${proteins}`);
        const proteinRecipeMap = new Map<string, any[]>();
        const numRecipesPerProtein = Math.ceil(numRecipes / proteins.length);
        let numRecipesAdded = 0;
        for (const recipe of recipes) {
          const keywords = recipe.keywords ?? "";
          const recipeProteins = proteins.filter((protein: string) => keywords.toLowerCase().includes(protein));
          if (recipeProteins.length === 0) {
            continue;
          }
          
          const protein = recipeProteins[0] ?? "";
          const proteinRecipes = proteinRecipeMap.get(protein) ?? [];
          if (proteinRecipes.length  < numRecipesPerProtein && numRecipesAdded < numRecipes) {
            proteinRecipes.push(recipe);
            numRecipesAdded++;
          }
          proteinRecipeMap.set(protein, proteinRecipes);

          if (numRecipesAdded >= numRecipes) {
            break;
          }
          
        }
        
        return {
          content: [{ 
            type: 'text', 
            text: JSON.stringify(Array.from(proteinRecipeMap.values()).flat().slice(0, numRecipes)),
            mimeType: 'application/json' 
          }],
        };
      } catch (error) {
        await Bun.write('error.txt', "Error in list-recipes tool: " + error);
      }
       return {
          content: [{ 
            type: 'text', 
            text: JSON.stringify([]),
            mimeType: 'application/json' 
          }],
        };
  });

const transport = new StdioServerTransport();
console.log("Starting MCP server...");
await server.connect(transport);

