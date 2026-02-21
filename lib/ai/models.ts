export const DEFAULT_CHAT_MODEL = "claude-sonnet-4-5";

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    provider: "anthropic",
    description: "Fast and affordable, great for everyday tasks",
  },
  {
    id: "claude-sonnet-4-5",
    name: "Claude Sonnet 4.5",
    provider: "anthropic",
    description: "Best balance of speed, intelligence, and cost",
  },
  {
    id: "claude-opus-4-5",
    name: "Claude Opus 4.5",
    provider: "anthropic",
    description: "Most capable Anthropic model",
  },
  // Reasoning (extended thinking)
  {
    id: "claude-3-7-sonnet-latest",
    name: "Claude 3.7 Sonnet",
    provider: "reasoning",
    description: "Extended thinking for complex problems",
  },
];

// Group models by provider for UI
export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
