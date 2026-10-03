"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { MissionGoal, MissionClarification } from "@/lib/mission/types";
import { MissionUnderstandingAgent } from "@/lib/agents/MissionUnderstandingAgent";
import {
  Sparkles,
  Layers,
  MessageSquare,
  X,
  ArrowRight,
  HelpCircle,
  Sprout,
  CheckCircle2,
  Calendar,
  IndianRupee,
  Truck,
  ShieldCheck,
} from "lucide-react";

interface MissionCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMission: (goal: MissionGoal) => void;
}

export const MissionCreationModal: React.FC<MissionCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmitMission,
}) => {
  const { language } = useLanguage();
  const [activeMode, setActiveMode] = useState<"natural" | "structured">("natural");

  // Natural Language State
  const [naturalPrompt, setNaturalPrompt] = useState(
    "I have 500 kg of rice in Thanjavur. I want to sell it within 3 days, maximize expected farmer realization, keep transportation cost low, and avoid unreliable buyers."
  );
  const [clarification, setClarification] = useState<MissionClarification | null>(null);

  // Structured Form State
  const [structuredForm, setStructuredForm] = useState<Partial<MissionGoal>>({
    crop: "Rice",
    quantity: 500,
    unit: "kg",
    location: "Thanjavur, Tamil Nadu",
    quality: "Grade-A / Premium",
    deadlineDays: 3,
    minExpectedPricePerUnit: 24,
    maxTransportCost: 2000,
    buyerPreference: "high_reliability",
    riskPreference: "balanced",
    constraints: ["low transport cost", "verified buyer", "reliable payment"],
  });

  if (!isOpen) return null;

  const handleNaturalSubmit = () => {
    if (!naturalPrompt.trim()) return;
    const { goal, clarification: neededClarification } =
      MissionUnderstandingAgent.parseNaturalLanguage(naturalPrompt);

    if (neededClarification?.needsClarification) {
      setClarification(neededClarification);
      return;
    }

    setClarification(null);
    onSubmitMission(goal);
  };

  const handleClarificationPick = (suggestionText: string) => {
    const updatedPrompt = `${naturalPrompt} (${suggestionText})`;
    setNaturalPrompt(updatedPrompt);
    const { goal } = MissionUnderstandingAgent.parseNaturalLanguage(updatedPrompt);
    setClarification(null);
    onSubmitMission(goal);
  };

  const handleStructuredSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal = MissionUnderstandingAgent.fromStructuredForm(structuredForm);
    onSubmitMission(goal);
  };

  const sampleNLPrompts = [
    {
      labelEn: "Paddy in Thanjavur (500kg, 3 Days)",
      labelTa: "தஞ்சாவூர் நெல் (500கிலோ, 3 நாட்கள்)",
      text: "I have 500 kg of rice in Thanjavur. I want to sell it within 3 days, maximize expected farmer realization, keep transportation cost low, and avoid unreliable buyers.",
    },
    {
      labelEn: "Perishable Tomatoes (800kg, 2 Days)",
      labelTa: "அழுகக்கூடிய தக்காளி (800கிலோ, 2 நாட்கள்)",
      text: "Sell 800 kg fresh country tomatoes in Coimbatore within 48 hours to minimize spoilage and get immediate same-day payment.",
    },
    {
      labelEn: "Premium Wheat (1200kg, 5 Days)",
      labelTa: "சான்றளிக்கப்பட்ட கோதுமை (1200கிலோ, 5 நாட்கள்)",
      text: "I have 1200 kg certified Grade-A Sharbati Wheat in Madurai. Need to dispatch within 5 days with freight under ₹2,500.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl border border-theme-border bg-theme-card shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-theme-border bg-gradient-to-r from-theme-surface to-theme-card flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-theme-text">
                  {language === "ta" ? "புதிய அக்ரிமிஷன் தொடங்கு" : "Launch AgriMission"}
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary border border-theme-primary/30">
                  {language === "ta" ? "முடிவெடுக்கும் அடுக்கு" : "Agentic Decision Layer"}
                </span>
              </div>
              <p className="text-xs text-theme-muted">
                {language === "ta"
                  ? "விவசாய இலக்குகளிலிருந்து சரிபார்க்கப்பட்ட செயல் திட்டங்கள் வரை"
                  : "From agricultural goals to verified action plans."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-theme-muted hover:text-theme-text hover:bg-theme-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-6 pt-4 border-b border-theme-border flex gap-4 bg-theme-surface/40">
          <button
            onClick={() => {
              setActiveMode("natural");
              setClarification(null);
            }}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeMode === "natural"
                ? "border-theme-primary text-theme-primary"
                : "border-transparent text-theme-muted hover:text-theme-text"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{language === "ta" ? "இயல்பு மொழி இலக்கு" : "Natural Language Goal"}</span>
          </button>
          <button
            onClick={() => {
              setActiveMode("structured");
              setClarification(null);
            }}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeMode === "structured"
                ? "border-theme-primary text-theme-primary"
                : "border-transparent text-theme-muted hover:text-theme-text"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === "ta" ? "படிவ முறை (Parameters)" : "Structured Form"}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {activeMode === "natural" && (
            <div className="space-y-4">
              {/* Preset Quick Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-theme-muted uppercase tracking-wider block">
                  {language === "ta" ? "எடுத்துக்காட்டு இலக்குகள்" : "Quick Example Goals"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {sampleNLPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setNaturalPrompt(p.text);
                        setClarification(null);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-medium text-theme-text hover:border-theme-primary hover:text-theme-primary transition-all text-left"
                    >
                      {language === "ta" ? p.labelTa : p.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-theme-text block">
                  {language === "ta"
                    ? "உங்கள் விவசாய இலக்கை விவரிக்கவும்"
                    : "State Your Agricultural Objective"}
                </label>
                <textarea
                  rows={4}
                  value={naturalPrompt}
                  onChange={(e) => {
                    setNaturalPrompt(e.target.value);
                    setClarification(null);
                  }}
                  placeholder={
                    language === "ta"
                      ? "எ.கா: என்னிடம் 500 கிலோ நெல் உள்ளது. 3 நாட்களுக்குள் குறைந்த போக்குவரத்து செலவில் நம்பகமான வாங்குபவருக்கு விற்க வேண்டும்..."
                      : "e.g., I have 500 kg of rice. I want to sell it within 3 days, maximize expected farmer realization, keep transportation cost low, and avoid unreliable buyers."
                  }
                  className="w-full p-4 rounded-2xl border border-theme-border bg-theme-surface text-xs text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-theme-primary leading-relaxed resize-none shadow-inner"
                />
              </div>

              {/* Clarification Box if triggered */}
              {clarification && (
                <div className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-start gap-2 text-xs font-bold text-amber-500">
                    <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {language === "ta" ? clarification.questionTa : clarification.questionEn}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {clarification.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleClarificationPick(sug)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-500 text-xs font-bold hover:bg-amber-500/30 transition-colors border border-amber-500/30"
                      >
                        + {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMode === "structured" && (
            <form onSubmit={handleStructuredSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Crop */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-theme-muted uppercase">
                    {language === "ta" ? "பயிர்" : "Crop"}
                  </label>
                  <select
                    value={structuredForm.crop}
                    onChange={(e) => setStructuredForm({ ...structuredForm, crop: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                  >
                    <option value="Rice">Rice / நெல்</option>
                    <option value="Wheat">Wheat / கோதுமை</option>
                    <option value="Maize">Maize / மக்காச்சோளம்</option>
                    <option value="Cotton">Cotton / பருத்தி</option>
                    <option value="Tomato">Tomato / தக்காளி</option>
                  </select>
                </div>

                {/* Quantity & Unit */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-theme-muted uppercase">
                    {language === "ta" ? "அளவு & அலகு" : "Quantity & Unit"}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="10"
                      value={structuredForm.quantity}
                      onChange={(e) =>
                        setStructuredForm({
                          ...structuredForm,
                          quantity: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="flex-1 p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                    />
                    <select
                      value={structuredForm.unit}
                      onChange={(e) =>
                        setStructuredForm({
                          ...structuredForm,
                          unit: e.target.value as "kg" | "Quintals",
                        })
                      }
                      className="w-24 p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                    >
                      <option value="kg">kg</option>
                      <option value="Quintals">Quintals</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-theme-muted uppercase">
                    {language === "ta" ? "விவசாயி இருப்பிடம்" : "Farmer Location"}
                  </label>
                  <input
                    type="text"
                    value={structuredForm.location}
                    onChange={(e) =>
                      setStructuredForm({ ...structuredForm, location: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                  />
                </div>

                {/* Quality */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-theme-muted uppercase">
                    {language === "ta" ? "தரம்" : "Quality Specification"}
                  </label>
                  <select
                    value={structuredForm.quality}
                    onChange={(e) =>
                      setStructuredForm({
                        ...structuredForm,
                        quality: e.target.value as MissionGoal["quality"],
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                  >
                    <option value="Grade-A / Premium">Grade-A / Premium</option>
                    <option value="Standard / Grade-B">Standard / Grade-B</option>
                    <option value="Organic Certified">Organic Certified</option>
                    <option value="Fair / Grade-C">Fair / Grade-C</option>
                  </select>
                </div>

                {/* Deadline Days */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-theme-muted uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-500" />
                    {language === "ta" ? "காலக்கெடு (நாட்கள்)" : "Deadline (Days)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={structuredForm.deadlineDays}
                    onChange={(e) =>
                      setStructuredForm({
                        ...structuredForm,
                        deadlineDays: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                  />
                </div>

                {/* Min Expected Price */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-theme-muted uppercase flex items-center gap-1">
                    <IndianRupee className="w-3 h-3 text-emerald-500" />
                    {language === "ta" ? "குறைந்தபட்ச விலை (₹/கிலோ)" : "Min Expected Net Rate (₹/kg)"}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={structuredForm.minExpectedPricePerUnit}
                    onChange={(e) =>
                      setStructuredForm({
                        ...structuredForm,
                        minExpectedPricePerUnit: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                  />
                </div>

                {/* Max Transport Cost */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-theme-muted uppercase flex items-center gap-1">
                    <Truck className="w-3 h-3 text-amber-500" />
                    {language === "ta" ? "அதிகபட்ச போக்குவரத்து (₹)" : "Max Transport Tariff Cap (₹)"}
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={structuredForm.maxTransportCost}
                    onChange={(e) =>
                      setStructuredForm({
                        ...structuredForm,
                        maxTransportCost: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                  />
                </div>

                {/* Risk Tolerance */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-theme-muted uppercase">
                    {language === "ta" ? "அபாய சகிப்புத்தன்மை" : "Risk Tolerance"}
                  </label>
                  <select
                    value={structuredForm.riskPreference}
                    onChange={(e) =>
                      setStructuredForm({
                        ...structuredForm,
                        riskPreference: e.target.value as "low" | "balanced" | "aggressive",
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none focus:border-theme-primary"
                  >
                    <option value="low">{language === "ta" ? "பாதுகாப்பானது (Low Risk)" : "Conservative (Low Risk)"}</option>
                    <option value="balanced">{language === "ta" ? "சமநிலையானது (Balanced)" : "Balanced (Recommended)"}</option>
                    <option value="aggressive">{language === "ta" ? "அதிக லாபம் (Aggressive)" : "Maximum Price (Higher Risk)"}</option>
                  </select>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-theme-border bg-theme-surface flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-theme-muted hover:text-theme-text hover:bg-theme-card transition-colors"
          >
            {language === "ta" ? "ரத்து செய்" : "Cancel"}
          </button>
          <button
            onClick={activeMode === "natural" ? handleNaturalSubmit : handleStructuredSubmit}
            className="px-6 py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-extrabold hover:bg-theme-primary-hover transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {language === "ta" ? "திட்டங்களை பகுப்பாய்வு செய்க" : "Plan & Verify Strategies"}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
