"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SendHorizontal, Paperclip } from "lucide-react";
import { useSettings } from "@/lib/settings/store";
import type { SendBehavior } from "@/lib/settings/types";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const t = useTranslations("Chat");
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [settings] = useSettings();
  const sendBehavior: SendBehavior = settings.appearance.sendBehavior;

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (sendBehavior === "enter") {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }
    if (sendBehavior === "enter-shift") {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }
    if (sendBehavior === "ctrl-enter") {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
    }
  };

  return (
    <div className="border-t border-border bg-card px-4 py-3">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-card-hover hover:text-foreground"
          aria-label="Attach file"
        >
          <Paperclip className="h-4 w-4" />
        </motion.button>

        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            placeholder={t("placeholder")}
            rows={1}
            className="w-full resize-none rounded-xl border border-input-border bg-input-bg px-4 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-input-focus focus:outline-none focus:ring-2 focus:ring-input-focus/20"
            disabled={disabled}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!input.trim() || disabled}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-40 disabled:hover:bg-primary"
          aria-label={t("send")}
        >
          <SendHorizontal className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
