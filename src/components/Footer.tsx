"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Sprout, Phone, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-theme-border bg-theme-card/70 mt-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-theme-primary/20 border border-theme-primary/40 flex items-center justify-center text-theme-primary">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-theme-text">
                Agri<span className="text-theme-primary">Tech</span>
              </span>
            </div>
            <p className="text-xs text-theme-muted leading-relaxed">
              {language === "ta"
                ? "விவசாயிகள், கொள்முதல் நிறுவனங்கள் மற்றும் வேளாண் விஞ்ஞானிகளை ஒருங்கிணைக்கும் அதிநவீன விவசாய தளம்."
                : "Empowering agricultural stakeholders with real-time price discovery, agronomic science, and digital market access."}
            </p>
            <div className="flex items-center gap-2 text-xs text-theme-primary font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("common.verified")} Platform • ISO 27001</span>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-3">
              {language === "ta" ? "விரைவு இணைப்புகள்" : "Quick Navigation"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab("home")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("nav.home")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("market")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("nav.market")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("nav.analytics")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("schemes")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("nav.schemes")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("forum")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("nav.forum")}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Operational Sections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-3">
              {language === "ta" ? "வேளாண் சேவைகள்" : "Ecosystem Services"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab("services")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("services.farmerServices")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("services")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("services.buyerServices")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("services")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("services.equipmentServices")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("faq")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("nav.faq")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("blog")}
                  className="text-theme-muted hover:text-theme-primary transition-colors"
                >
                  {t("nav.blog")}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Kisan Helpline & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-text mb-3">
              {language === "ta" ? "விவசாயிகள் அவசர உதவி" : "Farmer Support & Helplines"}
            </h4>
            <div className="p-3 rounded-xl border border-theme-border bg-theme-surface space-y-2">
              <div className="flex items-center gap-2 text-theme-primary">
                <Phone className="w-4 h-4" />
                <span className="text-xs font-bold">1800-180-1551</span>
              </div>
              <p className="text-[11px] text-theme-muted">
                {language === "ta"
                  ? "தேசிய கிசான் உதவி மையம் (கட்டணமில்லா சேவை - 24x7)"
                  : "National Kisan Call Center (Toll-Free 24x7)"}
              </p>
            </div>
            <p className="text-[11px] text-theme-muted mt-3 flex items-center gap-1">
              <span>{language === "ta" ? "விவசாயிகளின் வளர்ச்சிக்காக" : "Built with"}</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
              <span>{language === "ta" ? "அர்ப்பணிக்கப்பட்டது" : "for Indian Agriculture"}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-theme-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
          <p>© {new Date().getFullYear()} AgriTech Platform. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab("about")} className="hover:text-theme-primary">
              {t("nav.about")}
            </button>
            <button onClick={() => setActiveTab("faq")} className="hover:text-theme-primary">
              {t("nav.faq")}
            </button>
            <span className="text-theme-border">|</span>
            <span>EN / தமிழ் Bilingual Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
