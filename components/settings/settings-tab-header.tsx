"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

interface SettingsTabHeaderProps {
  title: string;
  subtitle?: string;
}

export function SettingsTabHeader({ title, subtitle }: SettingsTabHeaderProps) {
  const t = useTranslations("Settings");

  return (
    <div className="mb-6 min-w-0">
      <Link
        href="/dashboard"
        className="group mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-label={t("back")}
        title={t("backHint")}
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>{t("back")}</span>
      </Link>
      <h1 className="break-words text-2xl font-semibold text-foreground">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
