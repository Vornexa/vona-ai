import type { AccentColor } from "./types";

export interface AccentPalette {
  id: AccentColor;
  label: string;
  // Core tokens, light theme
  light: {
    primary: string;
    primaryHover: string;
    primaryForeground: string;
    primaryLight: string;
    gradientEnd: string;
    ring: string;
  };
  // Core tokens, dark theme
  dark: {
    primary: string;
    primaryHover: string;
    primaryForeground: string;
    primaryLight: string;
    gradientEnd: string;
    ring: string;
  };
}

export const accentPalettes: AccentPalette[] = [
  {
    id: "indigo",
    label: "Indigo",
    light: {
      primary: "#6366f1",
      primaryHover: "#4f46e5",
      primaryForeground: "#ffffff",
      primaryLight: "#eef2ff",
      gradientEnd: "#8b5cf6",
      ring: "#6366f1",
    },
    dark: {
      primary: "#818cf8",
      primaryHover: "#6366f1",
      primaryForeground: "#09090b",
      primaryLight: "rgba(129, 140, 248, 0.1)",
      gradientEnd: "#a78bfa",
      ring: "#818cf8",
    },
  },
  {
    id: "blue",
    label: "Blue",
    light: {
      primary: "#2563eb",
      primaryHover: "#1d4ed8",
      primaryForeground: "#ffffff",
      primaryLight: "#dbeafe",
      gradientEnd: "#06b6d4",
      ring: "#2563eb",
    },
    dark: {
      primary: "#60a5fa",
      primaryHover: "#3b82f6",
      primaryForeground: "#0b1220",
      primaryLight: "rgba(96, 165, 250, 0.12)",
      gradientEnd: "#22d3ee",
      ring: "#60a5fa",
    },
  },
  {
    id: "purple",
    label: "Purple",
    light: {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
      primaryForeground: "#ffffff",
      primaryLight: "#ede9fe",
      gradientEnd: "#ec4899",
      ring: "#7c3aed",
    },
    dark: {
      primary: "#a78bfa",
      primaryHover: "#8b5cf6",
      primaryForeground: "#0b0a16",
      primaryLight: "rgba(167, 139, 250, 0.12)",
      gradientEnd: "#f472b6",
      ring: "#a78bfa",
    },
  },
  {
    id: "green",
    label: "Green",
    light: {
      primary: "#16a34a",
      primaryHover: "#15803d",
      primaryForeground: "#ffffff",
      primaryLight: "#dcfce7",
      gradientEnd: "#22c55e",
      ring: "#16a34a",
    },
    dark: {
      primary: "#4ade80",
      primaryHover: "#22c55e",
      primaryForeground: "#052e16",
      primaryLight: "rgba(74, 222, 128, 0.12)",
      gradientEnd: "#86efac",
      ring: "#4ade80",
    },
  },
  {
    id: "rose",
    label: "Rose",
    light: {
      primary: "#e11d48",
      primaryHover: "#be123c",
      primaryForeground: "#ffffff",
      primaryLight: "#ffe4e6",
      gradientEnd: "#f43f5e",
      ring: "#e11d48",
    },
    dark: {
      primary: "#fb7185",
      primaryHover: "#f43f5e",
      primaryForeground: "#1f0a10",
      primaryLight: "rgba(251, 113, 133, 0.12)",
      gradientEnd: "#fda4af",
      ring: "#fb7185",
    },
  },
  {
    id: "orange",
    label: "Orange",
    light: {
      primary: "#ea580c",
      primaryHover: "#c2410c",
      primaryForeground: "#ffffff",
      primaryLight: "#ffedd5",
      gradientEnd: "#f59e0b",
      ring: "#ea580c",
    },
    dark: {
      primary: "#fb923c",
      primaryHover: "#f97316",
      primaryForeground: "#1a0e05",
      primaryLight: "rgba(251, 146, 60, 0.12)",
      gradientEnd: "#fcd34d",
      ring: "#fb923c",
    },
  },
];

export function getPalette(id: AccentColor): AccentPalette {
  return accentPalettes.find((p) => p.id === id) ?? accentPalettes[0];
}

export function applyAccent(id: AccentColor) {
  if (typeof document === "undefined") return;
  const palette = getPalette(id);
  const root = document.documentElement;
  const theme =
    root.getAttribute("data-theme") === "light" ? "light" : "dark";
  const tokens = theme === "light" ? palette.light : palette.dark;
  root.style.setProperty("--primary", tokens.primary);
  root.style.setProperty("--primary-hover", tokens.primaryHover);
  root.style.setProperty("--primary-foreground", tokens.primaryForeground);
  root.style.setProperty("--primary-light", tokens.primaryLight);
  root.style.setProperty("--accent", tokens.primary);
  root.style.setProperty("--accent-light", tokens.primaryLight);
  root.style.setProperty("--gradient-start", tokens.primary);
  root.style.setProperty("--gradient-end", tokens.gradientEnd);
  root.style.setProperty("--user-bubble", tokens.primary);
  root.style.setProperty("--input-focus", tokens.ring);
  root.style.setProperty("--hero-glow", tokens.primaryLight);
}
