"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/lib/i18n/navigation";
import { Sparkles, Settings as SettingsIcon } from "lucide-react";
import { useSettings } from "@/lib/settings/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings] = useSettings();
  const displayName = settings.account.displayName || "User";
  const initials = displayName
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-glass-bg px-4 shadow-sm shadow-black/5 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Vona AI</span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/settings"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-card-hover hover:text-foreground"
            aria-label="Settings"
          >
            <SettingsIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/settings/account"
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground"
            aria-label="Account"
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
          </Link>
        </div>
      </header>
      {children}
    </>
  );
}
