"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { AlertCircle, ShieldAlert, CheckCircle2, Info } from "lucide-react";

export const LimitationsPanel: React.FC = () => {
  const { language } = useLanguage();

  const limitations = [
    {
      titleEn: "Synthetic & Calibrated Data Sources",
      titleTa: "மாதிரி மற்றும் கணிக்கப்பட்ட தரவு ஆதாரங்கள்",
      descEn:
        "Evaluation results, historical price series, and buyer bidding responses utilize the Synthetic Buildathon Evaluation Dataset calibrated to Tamil Nadu APMC mandi averages.",
      descTa:
        "மதிப்பீட்டு முடிவுகள், வரலாற்று விலைப் போக்குகள் மற்றும் வாங்குபவர் ஏல விவரங்கள் தமிழ்நாட்டின் ஒழுங்குமுறை விற்பனைக்கூட சராசரிகளுக்கு ஏற்ப மாதிரித் தரவுத்தொகுப்பைப் பயன்படுத்துகின்றன.",
    },
    {
      titleEn: "Freight & Loss Values are Deterministic Estimates",
      titleTa: "சரக்கு மற்றும் அழுகல் இழப்பு மதிப்பிடப்பட்ட அளவுகோல்கள்",
      descEn:
        "Highway freight tariffs, toll estimates, and crop perishability degradation indices are calculated deterministically based on standard ICAR/NHAI freight models and may fluctuate under real highway conditions.",
      descTa:
        "சாலை சரக்குக் கட்டணங்கள், சுங்கச் செலவுகள் மற்றும் பயிர் அழுகல் விகிதங்கள் ICAR/NHAI சூத்திரங்களின்படி கணக்கிடப்படுகின்றன; நிஜச் சாலைகளில் இவை சற்று மாறுபடலாம்.",
    },
    {
      titleEn: "No Future Market Price Guarantee",
      titleTa: "எதிர்கால சந்தை விலைக்கான உத்தரவாதம் இல்லை",
      descEn:
        "Forward contract projections (e.g. Plan C storage hold) represent risk-adjusted statistical trends and cannot guarantee future spot arrival market shocks.",
      descTa:
        "எதிர்கால விலை கணிப்புகள் (திட்டம் C கிடங்கு இருப்பு) புள்ளிவிவரப் போக்குகளைக் காட்டுகின்றனவே அன்றி, எதிர்பாராத சந்தை மாற்றங்களுக்கு முழு உத்தரவாதம் அளிக்காது.",
    },
    {
      titleEn: "Strict Human-in-the-Loop Safe Action Gate",
      titleTa: "விவசாயியின் நேரடி ஒப்புதல் வாயில்",
      descEn:
        "The agent never autonomously commits financial payouts or dispatches produce. Every consequential action requires explicit farmer review and digital confirmation.",
      descTa:
        "ஏஜென்ட் தன்னிச்சையாக பணப் பரிவர்த்தனைகளையோ சரக்கு விநியோகத்தையோ மேற்கொள்ளாது. ஒவ்வொரு முக்கிய செயலுக்கும் விவசாயியின் தெளிவான ஒப்புதல் அவசியமாகும்.",
    },
  ];

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-theme-text flex items-center gap-2">
            {language === "ta" ? "தற்போதைய முன்மாதிரி வரம்புகள்" : "Current Prototype Limitations"}
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
              {language === "ta" ? "வெளிப்படையான கொள்கை" : "Transparent Governance"}
            </span>
          </h3>
          <p className="text-xs text-theme-muted">
            {language === "ta"
              ? "நடுவர்கள் மற்றும் பயனர்களுக்கான வெளிப்படையான செயல்பாட்டுக் குறிப்பு"
              : "Clear disclosure of operational assumptions and regulatory boundaries for hackathon evaluation"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
        {limitations.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-theme-border/60 bg-theme-card/70 flex items-start gap-2.5"
          >
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-theme-text">
                {language === "ta" ? item.titleTa : item.titleEn}
              </h4>
              <p className="text-[11px] text-theme-muted leading-relaxed">
                {language === "ta" ? item.descTa : item.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
