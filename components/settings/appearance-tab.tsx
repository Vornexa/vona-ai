"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  MessageSquare,
  Code2,
  Send,
  Sparkles,
} from "lucide-react";
import { useSettings } from "@/lib/settings/store";
import { applyAccent, accentPalettes } from "@/lib/settings/accent";
import { SettingsSection, SettingsRow } from "./settings-section";
import { SettingsTabHeader } from "./settings-tab-header";
import { ColorSwatch, OptionCard, Segmented } from "./controls";
import type {
  AccentColor,
  ChatBubbleStyle,
  CodeTheme,
  FontSize,
  SendBehavior,
  ThemePreference,
} from "@/lib/settings/types";

const themeOptions: {
  id: ThemePreference;
  key: "themeLight" | "themeDark" | "themeSystem";
  descKey: "themeLightDesc" | "themeDarkDesc" | "themeSystemDesc";
  icon: typeof Sun;
}[] = [
  { id: "light", key: "themeLight", descKey: "themeLightDesc", icon: Sun },
  { id: "dark", key: "themeDark", descKey: "themeDarkDesc", icon: Moon },
  { id: "system", key: "themeSystem", descKey: "themeSystemDesc", icon: Monitor },
];

const accentSwatches = accentPalettes.map((p) => ({
  id: p.id,
  label: p.label,
  color: p.id === "indigo" ? "#818cf8" : p.id === "blue" ? "#60a5fa" : p.id === "purple" ? "#a78bfa" : p.id === "green" ? "#4ade80" : p.id === "rose" ? "#fb7185" : "#fb923c",
}));

const fontOptions: { id: FontSize; key: "fontSizeSmall" | "fontSizeMedium" | "fontSizeLarge" }[] = [
  { id: "small", key: "fontSizeSmall" },
  { id: "medium", key: "fontSizeMedium" },
  { id: "large", key: "fontSizeLarge" },
];

const chatStyleOptions: {
  id: ChatBubbleStyle;
  key: "chatStyleRounded" | "chatStyleSharp" | "chatStyleMinimal";
}[] = [
  { id: "rounded", key: "chatStyleRounded" },
  { id: "sharp", key: "chatStyleSharp" },
  { id: "minimal", key: "chatStyleMinimal" },
];

const codeThemeOptions: { id: CodeTheme; key: "codeThemeDefault" | "codeThemeMonokai" | "codeThemeDracula" }[] = [
  { id: "default", key: "codeThemeDefault" },
  { id: "monokai", key: "codeThemeMonokai" },
  { id: "dracula", key: "codeThemeDracula" },
];

const sendBehaviorOptions: {
  id: SendBehavior;
  key: "sendEnter" | "sendEnterShift" | "sendCtrlEnter";
}[] = [
  { id: "enter", key: "sendEnter" },
  { id: "enter-shift", key: "sendEnterShift" },
  { id: "ctrl-enter", key: "sendCtrlEnter" },
];

export function AppearanceTab() {
  const t = useTranslations("Settings.appearance");
  const [settings, update] = useSettings();
  const appearance = settings.appearance;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const sizeMap: Record<FontSize, string> = {
      small: "14px",
      medium: "15px",
      large: "16px",
    };
    root.style.setProperty("--vona-font-size", sizeMap[appearance.fontSize]);
    root.dataset.fontSize = appearance.fontSize;
    root.dataset.chatStyle = appearance.chatStyle;
    root.dataset.codeTheme = appearance.codeTheme;
    root.dataset.sendBehavior = appearance.sendBehavior;
  }, [appearance.fontSize, appearance.chatStyle, appearance.codeTheme, appearance.sendBehavior]);

  useEffect(() => {
    applyAccent(appearance.accent);
  }, [appearance.accent]);

  return (
    <div className="space-y-1">
      <SettingsTabHeader title={t("title")} subtitle={t("subtitle")} />

      <SettingsSection title={t("theme")} icon={Palette} delay={0}>
        <div className="grid gap-3 sm:grid-cols-3">
          {themeOptions.map((opt) => (
            <OptionCard
              key={opt.id}
              value={opt.id}
              selected={appearance.theme === opt.id}
              onSelect={(v) => update((s) => {
                s.appearance.theme = v;
              })}
              label={t(opt.key)}
              description={t(opt.descKey)}
              icon={opt.icon}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title={t("accentColor")}
        subtitle={t("accentColorDesc")}
        icon={Sparkles}
        delay={0.05}
      >
        <SettingsRow label={t("accentColor")}>
          <div className="flex flex-col gap-3">
            <ColorSwatch
              swatches={accentSwatches}
              value={appearance.accent}
              onChange={(next) => update((s) => {
                s.appearance.accent = next as AccentColor;
              })}
            />
            <p className="text-xs text-muted-foreground">
              {accentPalettes.find((p) => p.id === appearance.accent)?.label}
            </p>
          </div>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title={t("fontSize")}
        subtitle={t("fontSizeDesc")}
        icon={Type}
        delay={0.1}
      >
        <SettingsRow label={t("fontSize")}>
          <Segmented
            value={appearance.fontSize}
            onChange={(v) => update((s) => {
              s.appearance.fontSize = v;
            })}
            options={fontOptions.map((o) => ({ value: o.id, label: t(o.key) }))}
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title={t("chatStyle")}
        subtitle={t("chatStyleDesc")}
        icon={MessageSquare}
        delay={0.15}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {chatStyleOptions.map((opt) => (
            <OptionCard
              key={opt.id}
              value={opt.id}
              selected={appearance.chatStyle === opt.id}
              onSelect={(v) => update((s) => {
                s.appearance.chatStyle = v;
              })}
              label={t(opt.key)}
              icon={MessageSquare}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title={t("codeHighlight")}
        subtitle={t("codeHighlightDesc")}
        icon={Code2}
        delay={0.2}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {codeThemeOptions.map((opt) => (
            <OptionCard
              key={opt.id}
              value={opt.id}
              selected={appearance.codeTheme === opt.id}
              onSelect={(v) => update((s) => {
                s.appearance.codeTheme = v;
              })}
              label={t(opt.key)}
              icon={Code2}
            />
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title={t("sendBehavior")}
        subtitle={t("sendBehaviorDesc")}
        icon={Send}
        delay={0.25}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {sendBehaviorOptions.map((opt) => (
            <OptionCard
              key={opt.id}
              value={opt.id}
              selected={appearance.sendBehavior === opt.id}
              onSelect={(v) => update((s) => {
                s.appearance.sendBehavior = v;
              })}
              label={t(opt.key)}
              icon={Send}
            />
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}
