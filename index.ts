/**
 🔥 litllm - the last LLM wrapper you'll see before you go to sleep at night
 🔥 Get these MF'ing 🐍s out this MF'ing 🔥 -- SLJ -- MS -- YD
 🔥 Step 1: npm i litllm
 🔥 Step 2: ???
 🔥 Step 3: get lit!
 */

import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { BaseMessage, HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  message: ChatMessage;
};

const ALL_AVAILABLE_OPENAI_MODELS = {
  "gpt-4": true,
  "gpt-4-turbo": true,
  "gpt-4o": true,
  "gpt-4o-mini": true,
  "gpt-3.5-turbo": true,
  "gpt-3.5-turbo-16k": true,
};

const ALL_AVAILABLE_ANTHROPIC_MODELS = {
  "claude-3-opus-20240229": true,
  "claude-3-sonnet-20240229": true,
  "claude-3-haiku-20240307": true,
  "claude-3-5-sonnet-20240620": true,
  "claude-3-5-sonnet-20241022": true,
  "claude-3-5-haiku-20241022": true,
};

const ALL_AVAILABLE_LLAMADEUCE_MODELS = {
  "llama-3.1-8b": true,
  "llama-3.1-70b": true,
  "llama-3.1-405b": true,
  "llama-3.2-1b": true,
  "llama-3.2-3b": true,
  "llama-3.2-11b": true,
  "llama-3.2-90b": true,
};

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
 🔥 Converts internal ChatMessage format to LangChain BaseMessage format
 🔥 @param messages the messages to convert
 🔥 @returns array of LangChain BaseMessage objects
 */
function convertToLangChainMessages(messages: ChatMessage[]): BaseMessage[] {
  return messages.map((msg) => {
    switch (msg.role) {
      case "system":
        return new SystemMessage(msg.content);
      case "user":
        return new HumanMessage(msg.content);
      case "assistant":
        return new AIMessage(msg.content);
      default:
        throw new Error(`Unknown message role: ${msg.role}`);
    }
  });
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
  options: { temperature?: number; topP?: number; maxTokens?: number } = {}
): Promise<ChatResponse> {
  let llm: BaseChatModel;
  const langChainMessages = convertToLangChainMessages(messages);
  
  if (model in ALL_AVAILABLE_OPENAI_MODELS || isOpenAIFineTunedModel(model)) {
    llm = new ChatOpenAI({
      modelName: model,
      temperature: options.temperature,
      topP: options.topP,
      maxTokens: options.maxTokens,
    });
  } else if (model in ALL_AVAILABLE_ANTHROPIC_MODELS) {
    llm = new ChatAnthropic({
      modelName: model,
      temperature: options.temperature,
      topP: options.topP,
      maxTokens: options.maxTokens,
    });
  } else if (model in ALL_AVAILABLE_LLAMADEUCE_MODELS) {
    // For Llama models, we'll use OpenAI-compatible endpoint
    // Assuming they're served via an OpenAI-compatible API
    llm = new ChatOpenAI({
      modelName: model,
      temperature: options.temperature,
      topP: options.topP,
      maxTokens: options.maxTokens,
      configuration: {
        baseURL: process.env.LLAMA_API_BASE || "http://localhost:8000/v1",
      },
    });
  } else {
    throw new Error(
      `Model ${model} not found. Please check the model name and try again.`
    );
  }

  const response = await llm.invoke(langChainMessages);
  
  return {
    message: {
      role: "assistant",
      content: response.content.toString(),
    },
  };
}