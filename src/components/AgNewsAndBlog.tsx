"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  BLOG_ARTICLES,
  NEWS_ITEMS,
  BlogArticle,
  NewsItem,
} from "@/lib/db";
import {
  Newspaper,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  X,
} from "lucide-react";

export const AgNewsAndBlog: React.FC<{ defaultView?: "blog" | "news" }> = ({
  defaultView = "news",
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"news" | "blog">(defaultView);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <div className="space-y-8">
      {/* Section Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
            <span>{activeTab === "news" ? t("agNews.title") : t("blog.title")}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary font-bold border border-theme-primary/30">
              Live Feed
            </span>
          </h2>
          <p className="text-xs text-theme-muted mt-1">
            {activeTab === "news" ? t("agNews.subtitle") : t("blog.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-theme-border bg-theme-card text-xs">
          <button
            onClick={() => setActiveTab("news")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === "news"
                ? "bg-theme-primary text-theme-bg"
                : "text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("nav.agNews")}
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === "blog"
                ? "bg-theme-primary text-theme-bg"
                : "text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("nav.blog")}
          </button>
        </div>
      </div>

      {activeTab === "news" ? (
        /* Ag News Feed Layout */
        <div className="space-y-4">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                item.isBreaking
                  ? "border-red-500/40 bg-gradient-to-r from-red-500/10 to-theme-card"
                  : "border-theme-border bg-theme-card hover:border-theme-primary/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.isBreaking && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500 text-white font-extrabold uppercase animate-pulse">
                      {t("agNews.breaking")}
                    </span>
                  )}
                  <span className="text-xs text-theme-primary font-bold">{item.source}</span>
                </div>
                <span className="text-[11px] text-theme-muted">{item.date}</span>
              </div>

              <h3 className="font-bold text-base text-theme-text leading-snug">
                {language === "ta" ? item.titleTa : item.titleEn}
              </h3>

              <p className="text-xs text-theme-muted leading-relaxed">
                {language === "ta" ? item.summaryTa : item.summaryEn}
              </p>
            </div>
          ))}
        </div>
      ) : (
        /* Blog Articles Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="p-5 rounded-2xl border border-theme-border bg-theme-card space-y-4 hover:border-theme-primary/50 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="w-full h-32 rounded-xl bg-theme-surface flex items-center justify-center text-4xl border border-theme-border">
                  {article.image}
                </div>

                <div className="flex items-center justify-between text-[11px] text-theme-muted">
                  <span className="font-bold text-theme-primary uppercase">{article.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base text-theme-text leading-snug">
                  {language === "ta" ? article.titleTa : article.titleEn}
                </h3>

                <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed">
                  {language === "ta" ? article.summaryTa : article.summaryEn}
                </p>

                <p className="text-[11px] text-theme-muted">
                  {t("blog.author")} <strong>{article.author}</strong> • {article.date}
                </p>
              </div>

              <button
                onClick={() => setSelectedArticle(article)}
                className="w-full py-2.5 rounded-xl bg-theme-surface border border-theme-border hover:border-theme-primary text-theme-text text-xs font-bold hover:bg-theme-hover transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{t("blog.readMore")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Blog Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl border border-theme-border bg-theme-card p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-theme-border pb-3">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-theme-surface text-theme-primary">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-theme-text mt-2 leading-tight">
                  {language === "ta" ? selectedArticle.titleTa : selectedArticle.titleEn}
                </h3>
                <p className="text-xs text-theme-muted">
                  {t("blog.author")} {selectedArticle.author} • {selectedArticle.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-theme-muted hover:text-theme-text p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-theme-text space-y-4 leading-relaxed whitespace-pre-line">
              <p className="font-semibold text-theme-primary bg-theme-surface p-3.5 rounded-xl border border-theme-border">
                {language === "ta" ? selectedArticle.summaryTa : selectedArticle.summaryEn}
              </p>
              <p>{language === "ta" ? selectedArticle.contentTa : selectedArticle.contentEn}</p>
            </div>

            <div className="pt-3 border-t border-theme-border flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold text-xs"
              >
                {t("blog.backToList")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
