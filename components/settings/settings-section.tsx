"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";

interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  icon?: ComponentType<{ className?: string }>;
  children: React.ReactNode;
  footer?: React.ReactNode;
  delay?: number;
}

export function SettingsSection({
  title,
  subtitle,
  icon: Icon,
  children,
  footer,
  delay = 0,
}: SettingsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className="mb-6 overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="flex items-start gap-3 border-b border-border px-4 py-4 sm:px-5">
        {Icon ? (
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Icon className="h-4 w-4" />
          </div>
        ) : null}
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-5 px-4 py-5 sm:px-5">{children}</div>
      {footer ? (
        <div className="border-t border-border bg-background/40 px-4 py-3 text-xs text-muted-foreground sm:px-5">
          {footer}
        </div>
      ) : null}
    </motion.section>
  );
}

interface SettingsRowProps {
  label: string;
  description?: string;
  htmlFor?: string;
  children: React.ReactNode;
  align?: "stack" | "inline";
}

export function SettingsRow({
  label,
  description,
  htmlFor,
  children,
  align = "inline",
}: SettingsRowProps) {
  const isStack = align === "stack";
  return (
    <div
      className={`flex min-w-0 flex-col gap-3 ${
        isStack ? "" : "sm:flex-row sm:items-start sm:justify-between sm:gap-6"
      }`}
    >
      <div className={`min-w-0 ${isStack ? "" : "sm:max-w-xs"}`}>
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div
        className={`min-w-0 flex-1 ${
          isStack ? "" : "sm:max-w-md"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
