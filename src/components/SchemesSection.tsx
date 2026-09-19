"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SCHEMES_DATABASE, SchemeItem } from "@/lib/db";
import {
  FileText,
  ExternalLink,
  CheckCircle,
  ShieldCheck,
  Building,
  Info,
  X,
  FileCheck2,
} from "lucide-react";

export const SchemesSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [schemes] = useState<SchemeItem[]>(SCHEMES_DATABASE);
  const [filter, setFilter] = useState<"all" | "central" | "state">("all");
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);

  const filtered = schemes.filter((s) => {
    if (filter === "central") return s.category === "central";
    if (filter === "state") return s.category === "state";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
            <span>{t("schemes.title")}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              DBT & Welfare Portal
            </span>
          </h2>
          <p className="text-xs text-theme-muted mt-1">{t("schemes.subtitle")}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "all"
                ? "bg-theme-primary text-theme-bg"
                : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("schemes.all")}
          </button>
          <button
            onClick={() => setFilter("central")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "central"
                ? "bg-theme-primary text-theme-bg"
                : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("schemes.central")}
          </button>
          <button
            onClick={() => setFilter("state")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "state"
                ? "bg-theme-primary text-theme-bg"
                : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("schemes.state")}
          </button>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((scheme) => (
          <div
            key={scheme.id}
            className="p-5 rounded-2xl border border-theme-border bg-theme-card space-y-4 hover:border-theme-primary/50 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-theme-surface text-theme-primary border border-theme-border">
                  {scheme.category === "central" ? "Govt of India" : "Govt of Tamil Nadu"}
                </span>
                <span className="text-[11px] text-theme-muted font-medium truncate max-w-[200px]">
                  {scheme.authority}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-theme-text leading-snug">
                  {language === "ta" ? scheme.titleTa : scheme.titleEn}
                </h3>
                <p className="text-xs text-theme-muted mt-2 leading-relaxed line-clamp-3">
                  {language === "ta" ? scheme.summaryTa : scheme.summaryEn}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-theme-surface/70 border border-theme-border text-xs space-y-1.5">
                <p className="font-bold text-theme-primary flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{t("schemes.benefits")}:</span>
                </p>
                <p className="text-theme-muted text-[11px]">
                  {language === "ta" ? scheme.benefitsTa : scheme.benefitsEn}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedScheme(scheme)}
                className="flex-1 py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{t("schemes.details")}</span>
              </button>

              <a
                href={scheme.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-theme-border bg-theme-surface hover:border-theme-primary text-theme-muted hover:text-theme-text transition-colors"
                title="Official Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Details Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-theme-border pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-theme-surface text-theme-primary">
                  {selectedScheme.category === "central" ? "Central Scheme" : "State Scheme"}
                </span>
                <h3 className="text-base font-bold text-theme-text mt-1">
                  {language === "ta" ? selectedScheme.titleTa : selectedScheme.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="text-theme-muted hover:text-theme-text p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-theme-surface border border-theme-border space-y-1">
                <p className="font-bold text-theme-text">{t("schemes.benefits")}:</p>
                <p className="text-theme-muted leading-relaxed">
                  {language === "ta" ? selectedScheme.benefitsTa : selectedScheme.benefitsEn}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-theme-surface border border-theme-border space-y-1">
                <p className="font-bold text-theme-text">{t("schemes.eligibility")}:</p>
                <p className="text-theme-muted leading-relaxed">
                  {language === "ta" ? selectedScheme.eligibilityTa : selectedScheme.eligibilityEn}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-theme-surface border border-theme-border space-y-1.5">
                <p className="font-bold text-theme-text flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-theme-primary" />
                  <span>{t("schemes.documents")}:</span>
                </p>
                <ul className="list-disc list-inside text-theme-muted space-y-1">
                  {(language === "ta" ? selectedScheme.documentsTa : selectedScheme.documentsEn).map(
                    (doc, idx) => (
                      <li key={idx}>{doc}</li>
                    )
                  )}
                </ul>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedScheme(null)}
                  className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                >
                  {t("common.close")}
                </button>
                <a
                  href={selectedScheme.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold hover:bg-theme-primary-hover transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>{t("schemes.applyOnline")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
