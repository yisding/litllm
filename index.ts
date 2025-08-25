/**
 🔥 litllm - the last LLM wrapper you'll see before you go to sleep at night
 🔥 Get these MF'ing 🐍s out this MF'ing 🔥 -- SLJ -- MS -- YD
 🔥 Step 1: npm i litllm
 🔥 Step 2: ???
 🔥 Step 3: get lit!
 */

import { OpenAI } from "@llamaindex/openai";
import { Anthropic } from "@llamaindex/anthropic";
import { LlamaDeuce } from "@llamaindex/replicate";
import type { ChatMessage, ChatResponse } from "llamaindex"; // Yes of course 🔥llm uses LITS

/**
 🔥 Checks if model is an OpenAI fine tuned model
 🔥 @param model model name
 🔥 @returns if the model matches the OpenAI fine tuning format
 */
export function isOpenAIFineTunedModel(model: string): boolean {
  return model.startsWith("ft:") && model.split(":")?.[1].startsWith("gpt");
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
  // OpenAI models
  const openAIModels = [
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-4",
    "gpt-4-32k",
    "gpt-4-turbo",
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-4.1",
    "gpt-4.1-turbo",
    "gpt-5",
    "gpt-5-turbo",
  ];
  
  // Anthropic models
  const anthropicModels = [
    "claude-3-opus-20240229",
    "claude-3-sonnet-20240229",
    "claude-3-haiku-20240307",
    "claude-3-5-sonnet-20241022",
    "claude-2.1",
    "claude-instant-1.2",
    "claude-4-opus",
    "claude-4-sonnet",
    "claude-4.1-opus",
    "claude-4.1-sonnet",
  ];
  
  // Llama models via Replicate
  const llamaModels = [
    "Llama-2-70b-chat-old",
    "Llama-2-70b-chat-4bit",
    "Llama-2-13b-chat-old",
    "Llama-2-13b-chat-4bit",
    "Llama-2-7b-chat-old",
    "Llama-2-7b-chat-4bit",
    "llama-3-70b-instruct",
    "llama-3-8b-instruct",
    "llama-4-70b",
    "llama-4-405b",
    "llama-4-8b",
  ];

  if (openAIModels.includes(model) || isOpenAIFineTunedModel(model)) {
    return await new OpenAI({
      model: model,
      ...options,
    }).chat({ messages });
  } else if (llamaModels.includes(model)) {
    return await new LlamaDeuce({
      model: model as any, // Type assertion needed due to strict typing
      ...options,
    }).chat({ messages });
  } else if (anthropicModels.includes(model)) {
    return await new Anthropic({
      model: model,
      ...options,
    }).chat({ messages });
  } else {
    throw new Error(
      `Model ${model} not found. Please check the model name and try again.`
    );
  }
}
