export type ProviderId = "vona" | "openai" | "anthropic" | "google" | "mistral" | "custom";

export type ReadyModelId =
  | "vona-default"
  | "vona-pro"
  | "vona-fast"
  | "vona-creative";

export type ModelSelection =
  | { kind: "ready"; id: ReadyModelId }
  | { kind: "custom" };

export interface ModelParameters {
  personality: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  contextLength: number;
}

export interface CustomModelConfig {
  modelName: string;
  apiEndpoint: string;
  apiKey: string;
}

export interface AccountProfile {
  displayName: string;
  email: string;
  bio: string;
  avatar: string;
  emailVerified: boolean;
}

export interface AccountSecurity {
  twoFactorEnabled: boolean;
}

export type ThemePreference = "light" | "dark" | "system";
export type AccentColor =
  | "indigo"
  | "blue"
  | "purple"
  | "green"
  | "rose"
  | "orange";
export type FontSize = "small" | "medium" | "large";
export type ChatBubbleStyle = "rounded" | "sharp" | "minimal";
export type CodeTheme = "default" | "monokai" | "dracula";
export type SendBehavior = "enter" | "enter-shift" | "ctrl-enter";

export interface AppearancePreferences {
  theme: ThemePreference;
  accent: AccentColor;
  fontSize: FontSize;
  chatStyle: ChatBubbleStyle;
  codeTheme: CodeTheme;
  sendBehavior: SendBehavior;
}

export interface StatisticsSnapshot {
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  totalMessages: number;
  totalConversations: number;
  avgTokensPerDay: number;
  monthlyInput: number;
  monthlyOutput: number;
  lastMonthInput: number;
  lastMonthOutput: number;
  modelBreakdown: { id: ReadyModelId | "custom"; label: string; tokens: number }[];
  daily: number[];
}

export interface SettingsState {
  provider: ProviderId;
  selection: ModelSelection;
  parameters: ModelParameters;
  customModel: CustomModelConfig;
  account: AccountProfile;
  security: AccountSecurity;
  appearance: AppearancePreferences;
  statistics: StatisticsSnapshot;
}
