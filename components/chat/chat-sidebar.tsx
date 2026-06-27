"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Plus,
  Search,
  MessageSquare,
  Trash2,
  Settings as SettingsIcon,
  PanelLeftClose,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useSettings } from "@/lib/settings/store";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  category: "today" | "yesterday" | "previous";
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
}

export function ChatSidebar({
  isOpen,
  onToggle,
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
}: ChatSidebarProps) {
  const t = useTranslations("Chat");
  const [search, setSearch] = useState("");
  const [settings] = useSettings();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userMenuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const categories = [
    { key: "today" as const, label: t("today") },
    { key: "yesterday" as const, label: t("yesterday") },
    { key: "previous" as const, label: t("previousDays") },
  ];

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const displayName = settings.account.displayName || "User";
  const initials = displayName
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

  const handleLogout = () => {
    setUserMenuOpen(false);
    window.alert("You have been signed out.");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] flex-col border-r border-border bg-sidebar-bg overflow-hidden lg:flex"
        style={{ display: "flex" }}
      >
        <div className="flex w-[280px] flex-col h-full">
          <div className="flex items-center justify-between border-b border-border p-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNewChat}
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <Plus className="h-4 w-4" />
              {t("newChat")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggle}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-hover hover:text-foreground"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchConversations")}
                className="w-full rounded-lg border border-border bg-input-bg py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-1 focus:ring-input-focus/20"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("noConversations")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("noConversationsHint")}
                </p>
              </div>
            ) : (
              categories.map((category) => {
                const items = filteredConversations.filter(
                  (c) => c.category === category.key
                );
                if (items.length === 0) return null;

                return (
                  <div key={category.key} className="mb-4">
                    <h3 className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {category.label}
                    </h3>
                    {items.map((conv) => (
                      <motion.div
                        key={conv.id}
                        whileHover={{ x: 2 }}
                        onClick={() => onSelect(conv.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") onSelect(conv.id);
                        }}
                        className={`group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                          activeId === conv.id
                            ? "bg-sidebar-active text-foreground"
                            : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
                        }`}
                      >
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate text-sm">
                          {conv.title}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(conv.id);
                          }}
                          className="opacity-0 transition-opacity hover:text-rose-500 group-hover:opacity-100"
                          aria-label={t("deleteChat")}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t border-border p-3">
            <div ref={userMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-sidebar-hover"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground">
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
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-foreground">
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {settings.account.email}
                  </p>
                </div>
                <SettingsIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>

              <AnimatePresence>
                {userMenuOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    role="menu"
                    className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
                  >
                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-foreground transition-colors hover:bg-sidebar-hover"
                      role="menuitem"
                    >
                      <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{t("settings")}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-500 transition-colors hover:bg-rose-500/10"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("logout")}</span>
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed left-0 top-16 z-40 flex w-[280px] flex-col border-r border-border bg-sidebar-bg lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border p-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onNewChat();
                  onToggle();
                }}
                className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <Plus className="h-4 w-4" />
                {t("newChat")}
              </motion.button>
            </div>

            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("searchConversations")}
                  className="w-full rounded-lg border border-border bg-input-bg py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-input-focus focus:outline-none focus:ring-1 focus:ring-input-focus/20"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("noConversations")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("noConversationsHint")}
                  </p>
                </div>
              ) : (
                categories.map((category) => {
                  const items = filteredConversations.filter(
                    (c) => c.category === category.key
                  );
                  if (items.length === 0) return null;

                  return (
                    <div key={category.key} className="mb-4">
                      <h3 className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {category.label}
                      </h3>
                      {items.map((conv) => (
                        <motion.button
                          key={conv.id}
                          whileHover={{ x: 2 }}
                          onClick={() => {
                            onSelect(conv.id);
                            onToggle();
                          }}
                          className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors ${
                            activeId === conv.id
                              ? "bg-sidebar-active text-foreground"
                              : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
                          }`}
                        >
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <span className="flex-1 truncate text-sm">
                            {conv.title}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-border p-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-rose-500 transition-colors hover:bg-rose-500/10"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">{t("logout")}</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
