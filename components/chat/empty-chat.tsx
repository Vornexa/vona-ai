"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles, MessageSquare, Code, PenLine, Dumbbell, Languages } from "lucide-react";

interface EmptyChatProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function EmptyChat({ onSuggestionClick }: EmptyChatProps) {
  const t = useTranslations("Chat");

  const suggestions = t.raw("suggestions") as string[];

  const icons = [PenLine, Code, Dumbbell, Languages];

  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary"
      >
        <Sparkles className="h-8 w-8 text-primary-foreground" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-6 text-center"
      >
        <h2 className="text-xl font-semibold text-foreground">
          {t("welcomeTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("welcomeSubtitle")}
        </p>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2"
      >
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick(suggestion)}
            className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-card-hover"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
              {(() => {
                const Icon = icons[index];
                return <Icon className="h-4 w-4" />;
              })()}
            </div>
            <p className="text-sm text-foreground">{suggestion}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
