"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSettings } from "@/lib/settings/store";
import type { ChatBubbleStyle } from "@/lib/settings/types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isLatest?: boolean;
}

const styleMap: Record<ChatBubbleStyle, {
  user: string;
  ai: string;
  userShape: string;
  aiShape: string;
}> = {
  rounded: {
    user: "bg-user-bubble text-user-bubble-foreground",
    ai: "bg-ai-bubble text-ai-bubble-foreground border border-border",
    userShape: "rounded-2xl rounded-br-md",
    aiShape: "rounded-2xl rounded-bl-md",
  },
  sharp: {
    user: "bg-user-bubble text-user-bubble-foreground",
    ai: "bg-ai-bubble text-ai-bubble-foreground border border-border",
    userShape: "rounded-md",
    aiShape: "rounded-md",
  },
  minimal: {
    user: "bg-transparent text-foreground border border-border",
    ai: "bg-transparent text-foreground border border-border",
    userShape: "rounded-lg",
    aiShape: "rounded-lg",
  },
};

export function MessageBubble({ message, isLatest = false }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const [settings] = useSettings();
  const tokens = styleMap[settings.appearance.chatStyle] ?? styleMap.rounded;

  return (
    <motion.div
      initial={isLatest ? { opacity: 0, y: 12, scale: 0.98 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border text-primary"
        }`}
      >
        {isUser ? (
          <span className="text-xs font-bold">U</span>
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
      </div>

      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`${tokens.userShape} ${tokens.aiShape} px-4 py-3 text-sm leading-relaxed ${
            isUser ? tokens.user : tokens.ai
          }`}
        >
          {message.content}
        </div>
        <p className="mt-1 px-1 text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}
