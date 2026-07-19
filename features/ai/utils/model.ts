import { createOpenAI, openai } from "@ai-sdk/openai";
import {ToolLoopAgent} from 'ai'
import { webSearchTool } from "../tools/web-search/tools";

/** Default OpenAI model used when a conversation has no model override. */
export const DEFAULT_CHAT_MODEL = "gpt-4o-mini";

/**
 * Returns an OpenAI language model instance for chat completions.
 *
 * @param modelId - Optional model identifier; falls back to {@link DEFAULT_CHAT_MODEL}.
 */
export function getChatModel(modelId?: string | null) {
    return openai(modelId || DEFAULT_CHAT_MODEL)
}

//agent 
const LLM =  createOpenAI({
    baseURL: "https://aicredits.in/v1",
    apiKey : process.env.OPENAI_API_KEY,
})

export function getAgent(modelId?: string | null) {
    return new ToolLoopAgent({
        model: LLM(modelId || DEFAULT_CHAT_MODEL),
        
        instructions: `You are ChaiGPT.

                If the user asks about recent events, documentation, news,
                latest releases, or anything requiring current information,
                use the webSearch tool.

                After receiving the search results, answer naturally and cite
                the URLs when appropriate.`,
        tools:{
            webSearch: webSearchTool,
        }
    })
}
