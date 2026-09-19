"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Layers,
  Sprout,
  ShoppingBag,
  Tractor,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (tab: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { t, language } = useLanguage();

  const services = [
    {
      id: "farmers",
      titleKey: "services.farmerServices",
      icon: <Sprout className="w-6 h-6 text-emerald-400" />,
      desc:
        language === "ta"
          ? "பயிர் ஆரோக்கியம், செயற்கைக்கோள் NDVI கண்காணிப்பு மற்றும் மண்டி நியாய விலையில் விளைபொருட்களை விற்கும் வசதி."
          : "Real-time crop monitoring, precision soil moisture sensors, fair price indicators, and incoming wholesale buyer demands.",
      tabTarget: "farmers",
      features: [
        "Real-time Crop Health Monitoring",
        "Mandi Benchmark Fair Price Indicator",
        "Direct Live Buyer Inquiries Access",
      ],
    },
    {
      id: "buyers",
      titleKey: "services.buyerServices",
      icon: <ShoppingBag className="w-6 h-6 text-cyan-400" />,
      desc:
        language === "ta"
          ? "விவசாயிகளிடமிருந்து நேரடியாக தரமான விளைபொருட்களை இடைத்தரகர்களின்றி வாங்குதல் மற்றும் மொத்த விநியோக அட்டவணை."
          : "Source verified farm produce directly from cultivating farmers, manage bulk delivery logistics, and schedule warehouse arrivals.",
      tabTarget: "buyers",
      features: [
        "Verified Produce Traceability",
        "Direct Farmer Connection Desk",
        "Bulk Logistics & Delivery Scheduling",
      ],
    },
    {
      id: "equipment",
      titleKey: "services.equipmentServices",
      icon: <Tractor className="w-6 h-6 text-amber-400" />,
      desc:
        language === "ta"
          ? "நவீன டிராக்டர்கள், அறுவடை இயந்திரங்கள் மற்றும் பூச்சிக்கொல்லி தெளிக்கும் ட்ரோன்களை வாடகைக்கு அல்லது விலைக்கு பெறும் தளம்."
          : "On-demand mechanization marketplace for tractors, combined harvesters, power tillers, and precision agricultural drone sprayers.",
      tabTarget: "equipment",
      features: [
        "Hourly / Daily Tractor Rentals",
        "Autonomous Spraying Drones",
        "Supplier Machinery Listing Desk",
      ],
    },
    {
      id: "finance",
      titleKey: "services.financeServices",
      icon: <Landmark className="w-6 h-6 text-theme-primary" />,
      desc:
        language === "ta"
          ? "மானிய கிசான் கடன் அட்டைகள், பிரதமரின் பயிர் காப்பீட்டுத் திட்டம் மற்றும் பருவ கால வரவு செலவு ஏடு."
          : "Subsidized 4% Kisan Credit Cards (KCC), Pradhan Mantri Fasal Bima Yojana (PMFBY), and seasonal running ledger tracker.",
      tabTarget: "finance",
      features: [
        "Subsidized Kisan Credit Facilities",
        "Weather-Index Crop Insurance Cover",
        "Seasonal Running Balance Sheet",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary text-xs font-bold border border-theme-primary/20">
          <Layers className="w-3.5 h-3.5" />
          <span>{t("nav.services")}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-theme-text">{t("services.title")}</h2>
        <p className="text-sm text-theme-muted max-w-2xl mx-auto">{t("services.subtitle")}</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-2xl border border-theme-border bg-theme-card space-y-4 hover:border-theme-primary/50 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-theme-surface flex items-center justify-center border border-theme-border">
                  {srv.icon}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-theme-surface text-theme-muted">
                  Ecosystem Capability
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-theme-text">{t(srv.titleKey)}</h3>
                <p className="text-xs text-theme-muted mt-1 leading-relaxed">{srv.desc}</p>
              </div>

              <div className="p-3 rounded-xl bg-theme-surface/70 border border-theme-border text-xs space-y-1.5">
                {srv.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-theme-text">
                    <Check className="w-3.5 h-3.5 text-theme-primary shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService(srv.tabTarget)}
              className="w-full py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>{t("common.explore")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
