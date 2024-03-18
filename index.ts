/**
 🔥 litllm - the last LLM wrapper you'll see before you go to sleep at night
 🔥 Get these MF'ing 🐍s out this MF'ing 🔥 -- SLJ -- MS -- YD
 🔥 Step 1: npm i litllm
 🔥 Step 2: ???
 🔥 Step 3: get lit!
 */

import {
  ALL_AVAILABLE_ANTHROPIC_MODELS,
  ALL_AVAILABLE_LLAMADEUCE_MODELS,
  ALL_AVAILABLE_OPENAI_MODELS,
  Anthropic,
  ChatMessage,
  ChatResponse,
  LlamaDeuce,
  OpenAI,
} from "llamaindex"; // Yes of course 🔥llm uses LITS

/**
 🔥 Checks if model is an OpenAI fine tuned model
 🔥 @param model model name
 🔥 @returns if the model matches the OpenAI fine tuning format
 */
export function isOpenAIFineTunedModel(model: string): boolean {
  return (
    model.startsWith("ft:") &&
    model.split(":")?.[1] in ALL_AVAILABLE_OPENAI_MODELS
  );
}

/**
 🔥 Chat with a model 
 🔥 @param model the LLM model
 🔥 @param messages the messages to chat with
 🔥 @param options additional model options like temperature, topP, and maxTokens
 🔥 @returns the chat response
 */
export async function completion(
  model: string,
  messages: ChatMessage[],
  options: { temperature?: number; topP?: number; maxTokens?: number }
): Promise<ChatResponse> {
  if (model in ALL_AVAILABLE_OPENAI_MODELS || isOpenAIFineTunedModel(model)) {
    return await new OpenAI({
      model: model as keyof typeof ALL_AVAILABLE_OPENAI_MODELS,
      ...options,
    }).chat({ messages });
  } else if (model in ALL_AVAILABLE_LLAMADEUCE_MODELS) {
    return await new LlamaDeuce({
      model: model as keyof typeof ALL_AVAILABLE_LLAMADEUCE_MODELS,
      ...options,
    }).chat({ messages });
  } else if (model in ALL_AVAILABLE_ANTHROPIC_MODELS) {
    return await new Anthropic({
      model: model as keyof typeof ALL_AVAILABLE_ANTHROPIC_MODELS,
      ...options,
    }).chat({ messages });
  } else {
    throw new Error(
      `Model ${model} not found. Please check the model name and try again.`
    );
  }
}
