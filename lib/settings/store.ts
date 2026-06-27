"use client";

import { useEffect, useSyncExternalStore } from "react";
import { defaultSettings } from "./defaults";
import type { SettingsState } from "./types";

const STORAGE_KEY = "vona-settings-v1";

type Listener = () => void;

function deepClone<T>(value: T): T {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function isState(value: unknown): value is SettingsState {
  return typeof value === "object" && value !== null && "appearance" in value;
}

function readInitial(): SettingsState {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return deepClone(defaultSettings);
    const parsed = JSON.parse(raw) as unknown;
    if (!isState(parsed)) return deepClone(defaultSettings);
    return {
      ...deepClone(defaultSettings),
      ...parsed,
      parameters: { ...defaultSettings.parameters, ...parsed.parameters },
      customModel: { ...defaultSettings.customModel, ...parsed.customModel },
      account: { ...defaultSettings.account, ...parsed.account },
      security: { ...defaultSettings.security, ...parsed.security },
      appearance: { ...defaultSettings.appearance, ...parsed.appearance },
      statistics: { ...defaultSettings.statistics, ...parsed.statistics },
    };
  } catch {
    return deepClone(defaultSettings);
  }
}

// Cached so useSyncExternalStore does not loop on the server.
const SERVER_SNAPSHOT: SettingsState = deepClone(defaultSettings);

let state: SettingsState = readInitial();
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot(): SettingsState {
  return SERVER_SNAPSHOT;
}

function notify() {
  for (const listener of listeners) listener();
}

function persist(next: SettingsState) {
  state = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  }
  notify();
}

function update(mutator: (draft: SettingsState) => void) {
  const next = deepClone(state);
  mutator(next);
  persist(next);
}

function replace(next: SettingsState) {
  persist(deepClone(next));
}

function reset() {
  persist(deepClone(defaultSettings));
}

export function useSettings(): [
  SettingsState,
  (mutator: (draft: SettingsState) => void) => void,
  (next: SettingsState) => void,
  () => void,
] {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme =
        snapshot.appearance.theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : snapshot.appearance.theme;
    }
  }, [snapshot.appearance.theme]);

  return [snapshot, update, replace, reset];
}

export const settingsStorageKey = STORAGE_KEY;
