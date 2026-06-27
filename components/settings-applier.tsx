"use client";

import { useEffect } from "react";
import { useSettings } from "@/lib/settings/store";
import { applyAccent } from "@/lib/settings/accent";

export function SettingsApplier() {
  const [settings] = useSettings();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const theme =
        settings.appearance.theme === "system"
          ? media.matches
            ? "dark"
            : "light"
          : settings.appearance.theme;
      root.setAttribute("data-theme", theme);
    };
    applyTheme();
    if (settings.appearance.theme === "system") {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
  }, [settings.appearance.theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const sizeMap: Record<string, string> = {
      small: "14px",
      medium: "15px",
      large: "16px",
    };
    root.style.setProperty("--vona-font-size", sizeMap[settings.appearance.fontSize] ?? "15px");
    root.dataset.fontSize = settings.appearance.fontSize;
    root.dataset.chatStyle = settings.appearance.chatStyle;
    root.dataset.codeTheme = settings.appearance.codeTheme;
    root.dataset.sendBehavior = settings.appearance.sendBehavior;
  }, [
    settings.appearance.fontSize,
    settings.appearance.chatStyle,
    settings.appearance.codeTheme,
    settings.appearance.sendBehavior,
  ]);

  useEffect(() => {
    applyAccent(settings.appearance.accent);
  }, [settings.appearance.accent]);

  return null;
}
