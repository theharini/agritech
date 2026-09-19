"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { queryRAG, ChatResponse } from "@/lib/rag";
import {
  MessageSquare,
  Bot,
  User,
  Send,
  Sparkles,
  X,
  RotateCcw,
  BookOpen,
  ChevronDown,
  Info,
  ShieldCheck,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  sources?: { title: string; type: string }[];
  isFound?: boolean;
  timestamp: string;
}

export const ChatbotWidget: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting based on language
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: "msg-init",
        sender: "bot",
        text:
          language === "ta"
            ? "வணக்கம்! நான் உங்கள் அக்ரிடெக் AI உதவியாளர். அரசு திட்டங்கள், உர பரிந்துரைகள், மண்டி சந்தை விலைகள் அல்லது பயிர் நோய்கள் குறித்து என்னிடம் கேட்கலாம். நான் உங்களுக்கு எவ்வாறு உதவட்டும்?"
            : "Hello! I am your AgriTech RAG AI Advisor. Ask me anything regarding Government Schemes (PM-KISAN, PMFBY), precision fertilizers, live Mandi rates, or crop pest advisories. How may I assist your farm today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([initialGreeting]);
    }
  }, [language]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsTyping(true);

    try {
      // Execute RAG query
      const ragResponse: ChatResponse = await queryRAG(query, language);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: ragResponse.answer,
        sources: ragResponse.sources,
        isFound: ragResponse.isFound,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text:
          language === "ta"
            ? "மன்னிக்கவும், தகவலைப் பெறுவதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
            : "Sorry, an error occurred while searching the knowledge base. Please retry.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    const freshGreeting: ChatMessage = {
      id: `init-${Date.now()}`,
      sender: "bot",
      text:
        language === "ta"
          ? "அரட்டை மீட்டமைக்கப்பட்டது. உங்கள் புதிய விவசாயக் கேள்வியை கேட்கலாம்."
          : "Chat history cleared. You may enter your agricultural query.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([freshGreeting]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-2xl bg-theme-primary text-theme-bg shadow-2xl hover:bg-theme-primary-hover hover:scale-105 transition-all duration-200 flex items-center gap-2.5 active:scale-95 border border-theme-primary/30"
          aria-label={t("chatbot.openChat")}
        >
          <Bot className="w-6 h-6" />
          <span className="font-extrabold text-xs hidden sm:inline">
            {language === "ta" ? "AI உதவியாளர்" : "AgriTech AI (RAG)"}
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-theme-bg animate-pulse" />
        </button>
      )}

      {/* Expandable Chat Drawer */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl border border-theme-border bg-theme-card shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-theme-border bg-theme-surface flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-theme-primary/20 text-theme-primary flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-theme-text flex items-center gap-1.5">
                  <span>{t("chatbot.title")}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                </h3>
                <p className="text-[10px] text-theme-primary font-semibold">
                  {t("chatbot.status")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title={t("chatbot.clear")}
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-card transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title={t("chatbot.closeChat")}
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-card transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="px-3 py-2 border-b border-theme-border bg-theme-surface/50 overflow-x-auto whitespace-nowrap space-x-1.5 scrollbar-none text-[11px]">
            <span className="text-[10px] uppercase font-bold text-theme-muted mr-1">
              {t("chatbot.quickQuestions")}:
            </span>
            <button
              onClick={() => handleSendMessage(t("chatbot.q1"))}
              className="px-2.5 py-1 rounded-full border border-theme-border bg-theme-card text-theme-text hover:border-theme-primary transition-colors inline-block"
            >
              {t("chatbot.q1")}
            </button>
            <button
              onClick={() => handleSendMessage(t("chatbot.q2"))}
              className="px-2.5 py-1 rounded-full border border-theme-border bg-theme-card text-theme-text hover:border-theme-primary transition-colors inline-block"
            >
              {t("chatbot.q2")}
            </button>
            <button
              onClick={() => handleSendMessage(t("chatbot.q3"))}
              className="px-2.5 py-1 rounded-full border border-theme-border bg-theme-card text-theme-text hover:border-theme-primary transition-colors inline-block"
            >
              {t("chatbot.q3")}
            </button>
            <button
              onClick={() => handleSendMessage(t("chatbot.q4"))}
              className="px-2.5 py-1 rounded-full border border-theme-border bg-theme-card text-theme-text hover:border-theme-primary transition-colors inline-block"
            >
              {t("chatbot.q4")}
            </button>
          </div>

          {/* Message History Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-lg bg-theme-primary/20 text-theme-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 space-y-2 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-theme-primary text-theme-bg font-medium rounded-tr-none shadow-sm"
                      : "bg-theme-surface text-theme-text border border-theme-border rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line text-xs">{msg.text}</p>

                  {/* Grounded Citation Badges */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="pt-2 border-t border-theme-border/50 text-[10px] space-y-1">
                      <p className="font-bold text-theme-primary flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{t("chatbot.sources")}:</span>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {msg.sources.map((src, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-theme-card border border-theme-border text-theme-muted font-medium"
                          >
                            [{src.type}] {src.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p
                    className={`text-[9px] text-right ${
                      msg.sender === "user" ? "text-theme-bg/70" : "text-theme-muted"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-theme-surface text-theme-text flex items-center justify-center shrink-0 border border-theme-border mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-theme-muted">
                <div className="w-7 h-7 rounded-lg bg-theme-primary/20 text-theme-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-theme-surface border border-theme-border rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-theme-primary animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-theme-primary animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-theme-primary animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1">{t("chatbot.thinking")}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-theme-border bg-theme-surface flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t("chatbot.placeholder")}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 rounded-xl border border-theme-border bg-theme-card px-3.5 py-2.5 text-xs text-theme-text focus:outline-none focus:border-theme-primary"
            />
            <button
              type="submit"
              disabled={isTyping || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-theme-primary text-theme-bg font-bold hover:bg-theme-primary-hover disabled:opacity-40 transition-colors shadow-sm"
              title={t("chatbot.send")}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
