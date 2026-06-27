import type { SettingsState } from "./types";

export const defaultParameters = {
  personality:
    "You are a helpful, friendly AI assistant. Be concise, accurate, and kind.",
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  contextLength: 10,
};

export const defaultAppearance = {
  theme: "dark" as const,
  accent: "indigo" as const,
  fontSize: "medium" as const,
  chatStyle: "rounded" as const,
  codeTheme: "default" as const,
  sendBehavior: "enter" as const,
};

export const defaultAccount = {
  displayName: "Vona User",
  email: "user@vona.ai",
  bio: "Exploring ideas, one prompt at a time.",
  avatar: "",
  emailVerified: false,
};

export const defaultStatistics = {
  totalTokens: 184230,
  inputTokens: 102540,
  outputTokens: 81690,
  totalMessages: 1284,
  totalConversations: 42,
  avgTokensPerDay: 6320,
  monthlyInput: 48500,
  monthlyOutput: 36800,
  lastMonthInput: 41200,
  lastMonthOutput: 32100,
  modelBreakdown: [
    { id: "vona-default" as const, label: "Vona Default", tokens: 72400 },
    { id: "vona-pro" as const, label: "Vona Pro", tokens: 38200 },
    { id: "vona-fast" as const, label: "Vona Fast", tokens: 49500 },
    { id: "vona-creative" as const, label: "Vona Creative", tokens: 24130 },
  ],
  daily: [4200, 5800, 6100, 7400, 8200, 6900, 5300],
};

export const defaultSettings: SettingsState = {
  provider: "vona",
  selection: { kind: "ready", id: "vona-default" },
  parameters: defaultParameters,
  customModel: {
    modelName: "",
    apiEndpoint: "",
    apiKey: "",
  },
  account: defaultAccount,
  security: {
    twoFactorEnabled: false,
  },
  appearance: defaultAppearance,
  statistics: defaultStatistics,
};
