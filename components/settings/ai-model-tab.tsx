"use client";

import { useTranslations } from "next-intl";
import { Brain, Sparkles, KeyRound, Sliders, Cpu } from "lucide-react";
import { useSettings } from "@/lib/settings/store";
import { SettingsSection, SettingsRow } from "./settings-section";
import { SettingsTabHeader } from "./settings-tab-header";
import { OptionCard, Segmented, Slider } from "./controls";
import type {
  ProviderId,
  ReadyModelId,
} from "@/lib/settings/types";

const providerOptions: {
  id: ProviderId;
  label: string;
  description: string;
}[] = [
  {
    id: "vona",
    label: "Vona",
    description: "Use built-in Vona models with no setup.",
  },
  {
    id: "openai",
    label: "OpenAI",
    description: "GPT-4o, GPT-4 Turbo, and more.",
  },
  {
    id: "anthropic",
    label: "Anthropic",
    description: "Claude 3.5 Sonnet, Haiku, Opus.",
  },
  {
    id: "google",
    label: "Google",
    description: "Gemini Pro and Flash.",
  },
  {
    id: "mistral",
    label: "Mistral",
    description: "Mistral Large, Mixtral, and more.",
  },
  {
    id: "custom",
    label: "Custom",
    description: "Bring your own OpenAI-compatible endpoint.",
  },
];

const readyModelOptions: {
  id: ReadyModelId;
  key: "vonaDefault" | "vonaPro" | "vonaFast" | "vonaCreative";
  badge?: string;
}[] = [
  { id: "vona-default", key: "vonaDefault", badge: "Recommended" },
  { id: "vona-pro", key: "vonaPro" },
  { id: "vona-fast", key: "vonaFast" },
  { id: "vona-creative", key: "vonaCreative" },
];

export function AiModelTab() {
  const t = useTranslations("Settings.model");
  const tt = useTranslations("Settings.tabs");
  const [settings, update] = useSettings();

  const selection = settings.selection;
  const params = settings.parameters;
  const custom = settings.customModel;

  return (
    <div className="space-y-1">
      <SettingsTabHeader title={t("title")} subtitle={t("subtitle")} />

      <SettingsSection
        title={tt("model")}
        subtitle={t("modelProvider")}
        icon={Cpu}
        delay={0}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {providerOptions.map((p) => (
            <OptionCard
              key={p.id}
              value={p.id}
              selected={settings.provider === p.id}
              onSelect={(v) => update((s) => {
                s.provider = v;
                if (v !== "custom") {
                  s.selection = { kind: "ready", id: "vona-default" };
                } else {
                  s.selection = { kind: "custom" };
                }
              })}
              label={p.label}
              description={p.description}
              icon={Sparkles}
            />
          ))}
        </div>
      </SettingsSection>

      {selection.kind === "ready" && settings.provider === "vona" ? (
        <SettingsSection
          title={t("readyToUse")}
          subtitle={t("readyToUseDesc")}
          icon={Brain}
          delay={0.05}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {readyModelOptions.map((m) => (
              <OptionCard
                key={m.id}
                value={m.id}
                selected={selection.id === m.id}
                onSelect={(v) => update((s) => {
                  s.selection = { kind: "ready", id: v };
                })}
                label={t(`readyModels.${m.key}`)}
                description={t(`readyModels.${m.key}Desc`)}
                icon={Sparkles}
                badge={m.badge}
              />
            ))}
          </div>
        </SettingsSection>
      ) : null}

      {(settings.provider !== "vona" || selection.kind === "custom") ? (
        <SettingsSection
          title={t("customModel")}
          subtitle={t("customModelDesc")}
          icon={KeyRound}
          delay={0.1}
        >
          <SettingsRow label={t("modelName")} htmlFor="custom-model-name">
            <input
              id="custom-model-name"
              type="text"
              value={custom.modelName}
              onChange={(e) => update((s) => {
                s.customModel.modelName = e.target.value;
              })}
              placeholder={t("modelNamePlaceholder")}
              className="w-full rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
            />
          </SettingsRow>

          <SettingsRow label={t("apiEndpoint")} htmlFor="custom-api-endpoint">
            <input
              id="custom-api-endpoint"
              type="url"
              value={custom.apiEndpoint}
              onChange={(e) => update((s) => {
                s.customModel.apiEndpoint = e.target.value;
              })}
              placeholder={t("apiEndpointPlaceholder")}
              className="w-full rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
            />
          </SettingsRow>

          <SettingsRow label={t("apiKey")} htmlFor="custom-api-key">
            <input
              id="custom-api-key"
              type="password"
              value={custom.apiKey}
              onChange={(e) => update((s) => {
                s.customModel.apiKey = e.target.value;
              })}
              placeholder={t("apiKeyPlaceholder")}
              className="w-full rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              {t("apiKeyHint")}
            </p>
          </SettingsRow>
        </SettingsSection>
      ) : null}

      <SettingsSection
        title={t("personality")}
        subtitle={`${t("personality")} - system prompt`}
        icon={Sparkles}
        delay={0.15}
      >
        <textarea
          value={params.personality}
          onChange={(e) => update((s) => {
            s.parameters.personality = e.target.value;
          })}
          rows={4}
          placeholder={t("personalityPlaceholder")}
          className="w-full resize-none rounded-xl border border-input-border bg-input-bg px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
        />
      </SettingsSection>

      <SettingsSection
        title={t("temperature")}
        subtitle={t("temperatureDesc")}
        icon={Sliders}
        delay={0.2}
      >
        <SettingsRow label={t("temperature")} htmlFor="model-temperature">
          <Slider
            id="model-temperature"
            value={params.temperature}
            onChange={(v) => update((s) => {
              s.parameters.temperature = v;
            })}
            min={0}
            max={2}
            step={0.05}
            format={(v) => v.toFixed(2)}
          />
        </SettingsRow>
        <SettingsRow label={t("maxTokens")} htmlFor="model-max-tokens">
          <Slider
            id="model-max-tokens"
            value={params.maxTokens}
            onChange={(v) => update((s) => {
              s.parameters.maxTokens = v;
            })}
            min={128}
            max={8192}
            step={64}
            format={(v) => v.toString()}
          />
        </SettingsRow>
        <SettingsRow label={t("topP")} htmlFor="model-top-p">
          <Slider
            id="model-top-p"
            value={params.topP}
            onChange={(v) => update((s) => {
              s.parameters.topP = v;
            })}
            min={0}
            max={1}
            step={0.05}
            format={(v) => v.toFixed(2)}
          />
        </SettingsRow>
        <SettingsRow label={t("frequencyPenalty")} htmlFor="model-freq">
          <Slider
            id="model-freq"
            value={params.frequencyPenalty}
            onChange={(v) => update((s) => {
              s.parameters.frequencyPenalty = v;
            })}
            min={-2}
            max={2}
            step={0.1}
            format={(v) => v.toFixed(1)}
          />
        </SettingsRow>
        <SettingsRow label={t("presencePenalty")} htmlFor="model-pres">
          <Slider
            id="model-pres"
            value={params.presencePenalty}
            onChange={(v) => update((s) => {
              s.parameters.presencePenalty = v;
            })}
            min={-2}
            max={2}
            step={0.1}
            format={(v) => v.toFixed(1)}
          />
        </SettingsRow>
        <SettingsRow label={t("contextLength")} htmlFor="model-context">
          <Segmented
            value={String(params.contextLength) as "5" | "10" | "20" | "40"}
            onChange={(v) => update((s) => {
              s.parameters.contextLength = Number(v);
            })}
            fullWidth
            options={[
              { value: "5", label: "5" },
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "40", label: "40" },
            ]}
          />
        </SettingsRow>
      </SettingsSection>
    </div>
  );
}
