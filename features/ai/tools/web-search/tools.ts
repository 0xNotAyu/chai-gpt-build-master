import { tool } from "ai";
import { searchWeb } from "./firecrawlSearch";
import {z} from 'zod'

export const webSearchTool = tool({
  description: "Search the web for recent information.",

  inputSchema: z.object({
    query: z.string(),
  }),

  execute: async ({ query }) => {
    console.log("🛠 webSearch tool called:", query);
    return await searchWeb({ query });
  },
});