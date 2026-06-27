"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Menu,
  Palette,
  BarChart3,
  User,
  X,
  Sparkles,
} from "lucide-react";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";

interface NavItem {
  key: "model" | "account" | "statistics" | "appearance";
  href:
    | "/settings/model"
    | "/settings/account"
    | "/settings/statistics"
    | "/settings/appearance";
  icon: ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { key: "model", href: "/settings/model", icon: Brain },
  { key: "account", href: "/settings/account", icon: User },
  { key: "statistics", href: "/settings/statistics", icon: BarChart3 },
  { key: "appearance", href: "/settings/appearance", icon: Palette },
];

export function SettingsNav({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("Settings");
  const tt = useTranslations("Settings.tabs");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  const items = navItems.map((item) => ({
    ...item,
    label: tt(item.key),
  }));

  const renderItem = (
    item: (typeof items)[number],
    onSelect?: () => void,
  ) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <motion.div
        key={item.key}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.15 }}
      >
        <Link
          href={item.href}
          onClick={onSelect}
          className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
            active
              ? "bg-sidebar-active text-foreground"
              : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
          }`}
        >
          <Icon
            className={`h-4 w-4 shrink-0 ${active ? "text-primary" : ""}`}
          />
          <span className="font-medium">{item.label}</span>
        </Link>
      </motion.div>
    );
  };

  // Currently active tab label for the mobile trigger.
  const activeItem = items.find((item) => isActive(item.href));

  return (
    <>
      {/* Mobile trigger bar - pinned at the very top so it is always reachable */}
      <div className="sticky top-0 z-30 -mx-4 mb-4 flex items-center justify-between gap-2 border-b border-border bg-glass-bg px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:hidden shadow-sm shadow-black/5">
        <div className="flex min-w-0 items-center gap-2">
          <Sparkles className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate text-sm font-medium text-foreground">
            {t("title")}
          </span>
          {activeItem && (
            <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">
              / {activeItem.label}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-card-hover"
          aria-label={t("menu")}
        >
          <Menu className="h-3.5 w-3.5" />
          {t("menu")}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-border bg-sidebar-bg shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {t("title")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
                  aria-label={t("closeMenu")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 p-3">
                {items.map((item) =>
                  renderItem(item, () => {
                    setMobileOpen(false);
                    onNavigate?.();
                  }),
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="sticky top-20 hidden w-64 shrink-0 self-start lg:block lg:h-[calc(100vh-5rem)]">
        <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {t("title")}
            </span>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {items.map((item) => renderItem(item, onNavigate))}
          </nav>
        </div>
      </aside>
    </>
  );
}