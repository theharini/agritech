"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Sprout,
  Target,
  Eye,
  ShieldCheck,
  Tractor,
  Cpu,
  TrendingUp,
} from "lucide-react";

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold border border-theme-primary/20">
          <Sprout className="w-3.5 h-3.5" />
          <span>{t("nav.about")}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-theme-text">{t("about.title")}</h2>
        <p className="text-sm text-theme-muted max-w-2xl mx-auto">{t("about.subtitle")}</p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-theme-border bg-theme-card space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-theme-primary/20 text-theme-primary flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-theme-text">{t("about.mission")}</h3>
          <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
            {t("about.missionText")}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-theme-border bg-theme-card space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-theme-text">{t("about.vision")}</h3>
          <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
            {t("about.visionText")}
          </p>
        </div>
      </div>

      {/* Pillars of AgriTech */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-theme-text text-center">
          {language === "ta" ? "அக்ரிடெக் மூன்று முதன்மைக் கோட்பாடுகள்" : "Core Platform Pillars"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-theme-border bg-theme-surface space-y-2">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 w-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-theme-text">{t("about.pillars.fairPrice")}</h4>
            <p className="text-xs text-theme-muted leading-relaxed">
              {t("about.pillars.fairPriceDesc")}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-theme-border bg-theme-surface space-y-2">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 w-fit">
              <Tractor className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-theme-text">{t("about.pillars.mechanization")}</h4>
            <p className="text-xs text-theme-muted leading-relaxed">
              {t("about.pillars.mechanizationDesc")}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-theme-border bg-theme-surface space-y-2">
            <div className="p-2 rounded-lg bg-theme-primary/20 text-theme-primary w-fit">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-theme-text">{t("about.pillars.science")}</h4>
            <p className="text-xs text-theme-muted leading-relaxed">
              {t("about.pillars.scienceDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
