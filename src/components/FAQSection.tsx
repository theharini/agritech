"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { FAQ_ITEMS, FAQItem } from "@/lib/db";
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const FAQSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [faqs] = useState<FAQItem[]>(FAQ_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "faq-1": true });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const question = language === "ta" ? faq.questionTa : faq.questionEn;
    const answer = language === "ta" ? faq.answerTa : faq.answerEn;
    const matchesSearch =
      question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-theme-text flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-theme-primary" />
          <span>{t("faq.title")}</span>
        </h2>
        <p className="text-xs sm:text-sm text-theme-muted max-w-lg mx-auto">
          {t("faq.subtitle")}
        </p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        <div className="relative max-w-lg mx-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-theme-muted" />
          <input
            type="text"
            placeholder={t("faq.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-theme-border bg-theme-card text-xs text-theme-text focus:outline-none focus:border-theme-primary shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", labelKey: "faq.categories.all" },
            { id: "general", labelKey: "faq.categories.general" },
            { id: "farming", labelKey: "faq.categories.farming" },
            { id: "trading", labelKey: "faq.categories.trading" },
            { id: "equipment", labelKey: "faq.categories.equipment" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === cat.id
                  ? "bg-theme-primary text-theme-bg"
                  : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Q&A List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = !!openIds[faq.id];
          return (
            <div
              key={faq.id}
              className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden shadow-sm transition-colors"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 hover:bg-theme-surface/50 transition-colors"
              >
                <span className="font-bold text-sm text-theme-text flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-theme-primary/15 text-theme-primary text-xs flex items-center justify-center font-extrabold shrink-0">
                    Q
                  </span>
                  <span>{language === "ta" ? faq.questionTa : faq.questionEn}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-theme-muted transition-transform shrink-0 duration-200 ${
                    isOpen ? "rotate-180 text-theme-primary" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-theme-muted leading-relaxed border-t border-theme-border/50 animate-in fade-in duration-150">
                  <p className="bg-theme-surface/60 p-3.5 rounded-xl border border-theme-border/40 text-theme-text">
                    {language === "ta" ? faq.answerTa : faq.answerEn}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
