/**
 🔥 litllm - the last LLM wrapper you'll see before you go to sleep at night
 🔥 Get these MF'ing 🐍s out this MF'ing 🔥 -- SLJ -- MS -- YD
 🔥 Step 1: npm i litllm
 🔥 Step 2: npm i (openai|anthropic|replicate)
 🔥 Step 3: get lit
 */

import {
  ALL_AVAILABLE_LLAMADEUCE_MODELS,
  ALL_AVAILABLE_OPENAI_MODELS,
  Anthropic,
  ChatMessage,
  ChatResponse,
  LlamaDeuce,
  OpenAI,
} from "./node_modules/llamaindex/src/llm/LLM"; // Yes of course 🔥llm uses LITS

export async function completion(
  model: string,
  messages: ChatMessage[],
  options: { temperature?: number; topP?: number; maxTokens?: number }
): Promise<ChatResponse> {
  if (model in ALL_AVAILABLE_OPENAI_MODELS) {
    return await new OpenAI({
      model: model as keyof typeof ALL_AVAILABLE_OPENAI_MODELS,
      ...options,
    }).chat(messages);
  } else if (model in ALL_AVAILABLE_LLAMADEUCE_MODELS) {
    return await new LlamaDeuce({
      model: model as keyof typeof ALL_AVAILABLE_LLAMADEUCE_MODELS,
      ...options,
    }).chat(messages);
  } else {
    return await new Anthropic({ model: model, ...options }).chat(messages);
  }
}
