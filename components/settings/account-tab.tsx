"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  User,
  Lock,
  ShieldCheck,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { useSettings } from "@/lib/settings/store";
import { SettingsSection, SettingsRow } from "./settings-section";
import { SettingsTabHeader } from "./settings-tab-header";
import { Toggle } from "./controls";

export function AccountTab() {
  const t = useTranslations("Settings.account");
  const [settings, update] = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [passwordFeedback, setPasswordFeedback] = useState<
    null | { type: "success" | "error"; message: string }
  >(null);

  const initials = settings.account.displayName
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

  const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        update((s) => {
          s.account.avatar = reader.result as string;
        });
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handlePasswordUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const current = String(form.get("current") ?? "");
    const next = String(form.get("next") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!current || !next || !confirm) {
      setPasswordFeedback({ type: "error", message: "Please fill in all fields." });
      return;
    }
    if (next.length < 8) {
      setPasswordFeedback({
        type: "error",
        message: "New password must be at least 8 characters.",
      });
      return;
    }
    if (next !== confirm) {
      setPasswordFeedback({ type: "error", message: "Passwords do not match." });
      return;
    }
    setPasswordFeedback({ type: "success", message: "Password updated." });
    e.currentTarget.reset();
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "This will permanently remove your account and data. Continue?"
    );
    if (!confirmed) return;
    update((s) => {
      s.account.displayName = "";
      s.account.email = "";
      s.account.bio = "";
      s.account.avatar = "";
      s.account.emailVerified = false;
    });
  };

  return (
    <div className="space-y-1">
      <SettingsTabHeader title={t("title")} subtitle={t("subtitle")} />

      <SettingsSection title={t("profile")} icon={User} delay={0}>
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-border bg-primary text-2xl font-semibold text-primary-foreground"
              aria-label={t("avatar")}
            >
              {settings.account.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={settings.account.avatar}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="h-5 w-5 text-white" />
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              className="hidden"
            />
            <p className="mt-2 text-center text-[11px] text-muted-foreground sm:text-left">
              {t("avatarHint")}
            </p>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-5">
            <SettingsRow label={t("displayName")} align="stack">
              <input
                type="text"
                value={settings.account.displayName}
                onChange={(e) => update((s) => {
                  s.account.displayName = e.target.value;
                })}
                placeholder={t("displayNamePlaceholder")}
                className="w-full rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
              />
            </SettingsRow>

            <SettingsRow label={t("email")} align="stack">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="email"
                  value={settings.account.email}
                  onChange={(e) => update((s) => {
                    s.account.email = e.target.value;
                    s.account.emailVerified = false;
                  })}
                  placeholder={t("emailPlaceholder")}
                  className="w-full flex-1 rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
                />
                <span
                  className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                    settings.account.emailVerified
                      ? "bg-primary-light text-primary"
                      : "bg-card text-muted-foreground"
                  }`}
                >
                  {settings.account.emailVerified ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  )}
                  {settings.account.emailVerified
                    ? t("emailVerified")
                    : t("emailNotVerified")}
                </span>
              </div>
            </SettingsRow>

            <SettingsRow label={t("bio")} align="stack">
              <textarea
                value={settings.account.bio}
                onChange={(e) => update((s) => {
                  s.account.bio = e.target.value;
                })}
                rows={3}
                placeholder={t("bioPlaceholder")}
                className="w-full resize-none rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
              />
            </SettingsRow>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title={t("changePassword")}
        icon={Lock}
        delay={0.05}
      >
        <form className="space-y-4" onSubmit={handlePasswordUpdate}>
          <SettingsRow label={t("currentPassword")} htmlFor="current-password" align="stack">
            <input
              id="current-password"
              name="current"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
            />
          </SettingsRow>
          <SettingsRow label={t("newPassword")} htmlFor="new-password" align="stack">
            <input
              id="new-password"
              name="next"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
            />
          </SettingsRow>
          <SettingsRow label={t("confirmPassword")} htmlFor="confirm-password" align="stack">
            <input
              id="confirm-password"
              name="confirm"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-input-border bg-input-bg px-4 py-2.5 text-sm text-foreground focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
            />
          </SettingsRow>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {passwordFeedback ? (
              <p
                className={`text-xs ${
                  passwordFeedback.type === "success"
                    ? "text-primary"
                    : "text-rose-500"
                }`}
              >
                {passwordFeedback.message}
              </p>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="self-end rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover sm:self-auto"
            >
              {t("updatePassword")}
            </button>
          </div>
        </form>
      </SettingsSection>

      <SettingsSection
        title={t("twoFactor")}
        subtitle={t("twoFactorDesc")}
        icon={ShieldCheck}
        delay={0.1}
      >
        <SettingsRow
          label={
            settings.security.twoFactorEnabled
              ? t("twoFactorEnabled")
              : t("twoFactorDisabled")
          }
          description={t("enable2fa")}
        >
          <Toggle
            checked={settings.security.twoFactorEnabled}
            onChange={(next) => update((s) => {
              s.security.twoFactorEnabled = next;
            })}
            label={t("twoFactor")}
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title={t("dangerZone")}
        icon={Trash2}
        delay={0.15}
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">{t("deleteAccountDesc")}</p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="self-start rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-500 transition-colors hover:bg-rose-500/20 sm:self-auto"
            >
              {t("deleteAccountButton")}
            </button>
          </div>
        }
      >
        <p className="text-sm text-foreground">{t("deleteAccount")}</p>
      </SettingsSection>
    </div>
  );
}
