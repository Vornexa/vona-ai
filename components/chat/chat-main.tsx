"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, PanelLeft } from "lucide-react";
import { ChatSidebar } from "./chat-sidebar";
import { ChatInput } from "./chat-input";
import { MessageBubble } from "./message-bubble";
import { EmptyChat } from "./empty-chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  category: "today" | "yesterday" | "previous";
}

const aiResponses = [
  "That's a great question! Let me think about this carefully. Based on my understanding, I'd recommend breaking this down into smaller, manageable steps. Each step should build upon the previous one, creating a solid foundation for your project.",
  "I'd be happy to help with that! Here's what I suggest: First, identify the core requirements. Then, create a plan of action. Finally, execute each step methodically while testing along the way.",
  "Interesting! Let me provide you with a comprehensive answer. The key to solving this is understanding the underlying principles. Once you grasp those, the implementation becomes much more straightforward.",
  "Great choice! Here's a detailed breakdown: Start by setting up your environment, then configure the necessary tools, and finally implement the solution step by step. I can guide you through each phase.",
  "I understand what you're looking for. Here are several approaches you can take, each with its own advantages. Let me walk you through the most effective one for your specific use case.",
];

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

function buildSeedConversations(): Conversation[] {
  const now = Date.now();
  return [
    {
      id: "1",
      title: "Welcome conversation",
      timestamp: new Date(now),
      category: "today",
    },
    {
      id: "2",
      title: "How to build a REST API",
      timestamp: new Date(now - 86400000),
      category: "yesterday",
    },
    {
      id: "3",
      title: "React performance tips",
      timestamp: new Date(now - 172800000),
      category: "previous",
    },
    {
      id: "4",
      title: "TypeScript best practices",
      timestamp: new Date(now - 432000000),
      category: "previous",
    },
  ];
}

export function ChatMain() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(() => buildSeedConversations());
  const [activeConversationId, setActiveConversationId] = useState<
    string | undefined
  >();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Detect mobile after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(max-width: 1023px)");
    if (mql.matches) setSidebarOpen(false);

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleNewChat = () => {
    const newConv: Conversation = {
      id: generateId(),
      title: "New conversation",
      timestamp: new Date(),
      category: "today",
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setMessages([]);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(undefined);
      setMessages([]);
    }
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    if (id === "1") {
      setMessages([
        {
          id: "w1",
          role: "assistant",
          content:
            "Hello! I'm Vona AI, your intelligent assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    } else {
      setMessages([
        {
          id: "h1",
          role: "assistant",
          content:
            "This is a simulated conversation. In a real app, messages would be loaded from a database.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <ChatSidebar
        isOpen={mounted ? sidebarOpen : false}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={handleSelectConversation}
        onNewChat={handleNewChat}
        onDelete={handleDeleteConversation}
      />

      <div className="flex flex-1 flex-col">
        <div className="flex h-12 items-center gap-3 border-b border-border bg-card px-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card-hover hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </motion.button>
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Vona AI</span>
          {activeConversationId && (
            <>
              <span className="text-xs text-muted-foreground">-</span>
              <span className="text-sm text-muted-foreground truncate">
                {conversations.find((c) => c.id === activeConversationId)?.title}
              </span>
            </>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyChat onSuggestionClick={handleSend} />
          ) : (
            <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isLatest={index === messages.length - 1}
                  />
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-ai-bubble px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                            className="h-2 w-2 rounded-full bg-muted-foreground"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
