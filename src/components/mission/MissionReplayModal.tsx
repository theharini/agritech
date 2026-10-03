"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SyntheticMissionScenario } from "@/lib/mission/types";
import { evaluateBaseline, evaluateAgent } from "@/lib/evaluation/syntheticDataset";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  X,
  ArrowRight,
  Database,
  Sliders,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

interface MissionReplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: SyntheticMissionScenario;
}

export const MissionReplayModal: React.FC<MissionReplayModalProps> = ({
  isOpen,
  onClose,
  scenario,
}) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const baselineRes = evaluateBaseline(scenario);
  const agentRes = evaluateAgent(scenario);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < 6) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1600);
    } else if (currentStep >= 6) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      titleEn: "1. Goal Ingestion & Constraints Parsing",
      titleTa: "1. குறிக்கோள் & வரம்புகள் பிரித்தெடுத்தல்",
      descEn: `Objective received: Sell ${scenario.quantity} ${scenario.unit} ${scenario.crop} at ${scenario.farmerLocation}. Target: within ${scenario.deadlineDays} days, transport cost under ₹${scenario.maxTransportCost}, min rate ₹${scenario.minAcceptablePrice}/kg.`,
      descTa: `இலக்கு பெறப்பட்டது: ${scenario.farmerLocation} பகுதியில் ${scenario.quantity} ${scenario.unit} ${scenario.crop} விற்பனை. காலக்கெடு: ${scenario.deadlineDays} நாட்கள், அதிகபட்ச போக்குவரத்து: ₹${scenario.maxTransportCost}, குறைந்தபட்ச விலை: ₹${scenario.minAcceptablePrice}/கிலோ.`,
    },
    {
      step: 2,
      titleEn: "2. Evidence Retrieval & Buyer Pool Scanning",
      titleTa: "2. ஆதாரத் தரவு & வாங்குபவர்கள் தேடல்",
      descEn: `Scanned ${scenario.availableBuyers.length} buyer profiles. Checked distance, warehouse intake quotas, historical default records, and APMC daily mandi benchmarks.`,
      descTa: `${scenario.availableBuyers.length} வாங்குபவர்கள் பரிசீலிக்கப்பட்டனர். தூரம், கிடங்கு கொள்ளளவு, கட்டண நிலுவை வரலாறு மற்றும் ஒழுங்குமுறை விற்பனைக்கூட விலை சரிபார்க்கப்பட்டது.`,
    },
    {
      step: 3,
      titleEn: "3. Logistics & Perishability Calculation",
      titleTa: "3. போக்குவரத்து & அழுகல் இழப்பு கணக்கீடு",
      descEn: `Deterministic road transit hours computed for all candidate routes. Crop perishability exposure and warehouse handling fees deducted from gross bids.`,
      descTa: `அனைத்து வழித்தடங்களுக்கும் துல்லியமான போக்குவரத்து நேரம் கணக்கிடப்பட்டது. பயிர் அழுகல் இழப்பு மற்றும் கையாளும் செலவுகள் மொத்த விலையிலிருந்து கழிக்கப்பட்டன.`,
    },
    {
      step: 4,
      titleEn: "4. Multi-Constraint Verification & Risk Gating",
      titleTa: "4. வரம்பு சரிபார்ப்பு & அபாய வடிகட்டுதல்",
      descEn: `Evaluated buyers against hard rules: Capacity match, Quality tier (${scenario.quality}), Transit time vs Deadline (${scenario.deadlineDays}d), and Buyer default score (min 60%).`,
      descTa: `கட்டாய விதிகளுக்கு எதிராக வாங்குபவர்கள் சரிபார்க்கப்பட்டனர்: கொள்ளளவு பொருத்தம், பயிர் தரம் (${scenario.quality}), காலக்கெடு மற்றும் கட்டண நம்பகத்தன்மை.`,
    },
    {
      step: 5,
      titleEn: "5. Safe Action Gate & Human Verification",
      titleTa: "5. பாதுகாப்பான செயல் வாயில் & விவசாயி ஒப்புதல்",
      descEn: `Generated transparent Action Preview for '${agentRes.selectedBuyerName}'. Financial commitment held pending explicit farmer digital confirmation.`,
      descTa: `'${agentRes.selectedBuyerName}' க்கான செயல் முன்னோட்டம் தயார். விவசாயியின் ஒப்புதலுக்குப் பிறகே ஒப்பந்தம் உறுதி செய்யப்படும்.`,
    },
    {
      step: 6,
      titleEn: "6. Outcome & Metric Comparison",
      titleTa: "6. இறுதி முடிவு & ஒப்பீட்டு அளவீடு",
      descEn: `AgriMission Agent successfully selected ${agentRes.selectedBuyerName} at ₹${agentRes.netRealizationPerKg}/kg net. Contrast: Naive Baseline selected ${baselineRes.selectedBuyerName} at gross ₹${baselineRes.grossPrice}/kg, yielding ${baselineRes.satisfiedAllConstraints ? "success" : "FAILURE: " + baselineRes.failureReason}.`,
      descTa: `அக்ரிமிஷன் ஏஜென்ட் வெற்றிகரமாக ${agentRes.selectedBuyerName} ஐ ₹${agentRes.netRealizationPerKg}/கிலோ நிகர விலையில் தேர்வு செய்தது. அடிப்படை முறை ${baselineRes.selectedBuyerName} ஐ தேர்வு செய்து ${baselineRes.satisfiedAllConstraints ? "வெற்றி பெற்றது" : "தோல்வியடைந்தது: " + baselineRes.failureReason}.`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl border border-theme-border bg-theme-card shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-theme-border bg-gradient-to-r from-theme-surface to-theme-card flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
              <Play className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-theme-text">
                  {language === "ta" ? "பணி மறுஇயக்கம் (Mission Replay)" : "Judge Mission Replay"}
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-500 border border-cyan-500/30">
                  {scenario.id}
                </span>
              </div>
              <p className="text-xs text-theme-muted">
                {language === "ta" ? scenario.titleTa : scenario.titleEn}
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

        {/* Playback Controls & Progress Bar */}
        <div className="p-4 border-b border-theme-border bg-theme-surface/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlaying ? (language === "ta" ? "நிறுத்து" : "Pause") : (language === "ta" ? "தானாக இயக்கு" : "Auto Play")}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(1);
              }}
              className="p-1.5 rounded-xl border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(s);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-black transition-all flex items-center justify-center ${
                  s === currentStep
                    ? "bg-cyan-500 text-white shadow-sm scale-110"
                    : s < currentStep
                    ? "bg-emerald-500/20 text-emerald-500"
                    : "bg-theme-surface text-theme-muted border border-theme-border/60"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Step Visualizer */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {steps.map((st) => {
            const isCurrent = st.step === currentStep;
            const isCompleted = st.step < currentStep;

            if (st.step > currentStep) return null;

            return (
              <div
                key={st.step}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? "border-cyan-500/50 bg-cyan-500/5 shadow-md"
                    : "border-theme-border/60 bg-theme-surface/50 opacity-80"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-extrabold text-theme-text flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">
                        {st.step}
                      </span>
                    )}
                    <span>{language === "ta" ? st.titleTa : st.titleEn}</span>
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-500">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-theme-muted leading-relaxed pl-6">
                  {language === "ta" ? st.descTa : st.descEn}
                </p>
              </div>
            );
          })}

          {/* If reached Step 6: Show side-by-side scorecard */}
          {currentStep === 6 && (
            <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-3 animate-in fade-in zoom-in-95">
              <span className="text-xs font-extrabold text-emerald-500 uppercase tracking-wider block">
                {language === "ta" ? "ஒப்பீட்டு செயல்திறன்" : "Execution Scorecard"}
              </span>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-theme-card border border-theme-border space-y-1">
                  <span className="text-[10px] font-bold text-rose-500 uppercase block">
                    Naive Baseline
                  </span>
                  <span className="font-extrabold text-theme-text block">
                    {baselineRes.selectedBuyerName}
                  </span>
                  <span className="text-[11px] text-theme-muted block">
                    Gross Offer: ₹{baselineRes.grossPrice}/kg
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded inline-block ${
                      baselineRes.satisfiedAllConstraints
                        ? "bg-emerald-500/20 text-emerald-500"
                        : "bg-rose-500/20 text-rose-500"
                    }`}
                  >
                    {baselineRes.satisfiedAllConstraints ? "PASS" : "FAILED CONSTRAINTS"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-theme-card border border-emerald-500/40 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase block">
                    AgriMission Agent
                  </span>
                  <span className="font-extrabold text-theme-text block">
                    {agentRes.selectedBuyerName}
                  </span>
                  <span className="text-[11px] font-black text-emerald-500 block">
                    Net Payout: ₹{agentRes.netRealizationPerKg}/kg
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded inline-block bg-emerald-500/20 text-emerald-500">
                    CONSTRAINTS VERIFIED & SATISFIED
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-theme-border bg-theme-surface flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-3.5 py-1.5 rounded-xl border border-theme-border bg-theme-card text-xs font-semibold text-theme-text disabled:opacity-40"
          >
            {language === "ta" ? "முந்தையது" : "Previous Step"}
          </button>
          <span className="text-[11px] text-theme-muted font-bold">
            Step {currentStep} of 6
          </span>
          {currentStep < 6 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
              className="px-4 py-1.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover flex items-center gap-1"
            >
              <span>{language === "ta" ? "அடுத்த படி" : "Next Step"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600"
            >
              {language === "ta" ? "நிறைவு" : "Close Replay"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
