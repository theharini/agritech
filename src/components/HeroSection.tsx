"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Calculator, MessageSquare, TrendingUp, Users, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onOpenFertilizerModal: () => void;
  onNavigateToForum: () => void;
  onNavigateToMarket: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenFertilizerModal,
  onNavigateToForum,
  onNavigateToMarket,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-theme-border bg-gradient-to-b from-theme-surface/80 to-theme-card p-6 sm:p-10 lg:p-12 shadow-card">
      {/* Background Accent Glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-theme-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-theme-secondary/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-theme-primary/30 bg-theme-primary/10 text-theme-primary text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t("hero.badge")}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-theme-text tracking-tight leading-tight">
          {language === "ta" ? (
            <>
              தொழில்நுட்பம் மூலம் <span className="text-theme-primary underline decoration-theme-primary/30">விவசாயத்தை</span> வலுப்படுத்துதல்
            </>
          ) : (
            <>
              Empowering Agriculture Through{" "}
              <span className="text-theme-primary underline decoration-theme-primary/30">Technology</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-theme-muted max-w-2xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {/* Two Prominent Required CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onOpenFertilizerModal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-theme-primary text-theme-bg font-extrabold text-sm hover:bg-theme-primary-hover transition-all shadow-lg hover:shadow-theme-glow hover:scale-[1.02] flex items-center justify-center gap-2.5 active:scale-95"
          >
            <Calculator className="w-4 h-4" />
            <span>{t("hero.getRecommendation")}</span>
          </button>

          <button
            onClick={onNavigateToForum}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-theme-border bg-theme-card hover:bg-theme-surface text-theme-text font-bold text-sm transition-all hover:border-theme-primary flex items-center justify-center gap-2.5 shadow-sm active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-theme-primary" />
            <span>{t("hero.communityForum")}</span>
            <ArrowRight className="w-4 h-4 text-theme-muted" />
          </button>
        </div>

        {/* Live Metrics Counter Bar */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-theme-border mt-8">
          <div className="p-3 rounded-xl bg-theme-card/60 border border-theme-border flex items-center justify-center gap-2.5 text-xs font-semibold text-theme-text">
            <Users className="w-4 h-4 text-theme-primary" />
            <span>{t("hero.statFarmers")}</span>
          </div>

          <div className="p-3 rounded-xl bg-theme-card/60 border border-theme-border flex items-center justify-center gap-2.5 text-xs font-semibold text-theme-text">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>{t("hero.statProduce")}</span>
          </div>

          <div
            onClick={onNavigateToMarket}
            className="p-3 rounded-xl bg-theme-card/60 border border-theme-border hover:border-theme-primary cursor-pointer flex items-center justify-center gap-2.5 text-xs font-semibold text-theme-text transition-colors"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>{t("hero.statMandis")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
