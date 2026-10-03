"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { PlanTradeoff, MissionGoal, WhatIfInput } from "@/lib/mission/types";
import { WhatIfSimulator } from "@/lib/simulation/whatIfSimulator";
import {
  Sparkles,
  Sliders,
  X,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Clock,
  Truck,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface WhatIfSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanTradeoff;
  goal: MissionGoal;
}

export const WhatIfSimulatorModal: React.FC<WhatIfSimulatorModalProps> = ({
  isOpen,
  onClose,
  plan,
  goal,
}) => {
  const { language } = useLanguage();

  const baseQty = goal.unit === "Quintals" ? goal.quantity * 100 : goal.quantity;

  const [inputs, setInputs] = useState<WhatIfInput>({
    buyerPriceDeltaPercent: 0,
    transportCostDeltaPercent: 0,
    deliveryDelayDays: 0,
    availableQuantity: baseQty,
    farmerWaitDays: 0,
    buyerReliabilityDeltaPercent: 0,
  });

  const resetInputs = () => {
    setInputs({
      buyerPriceDeltaPercent: 0,
      transportCostDeltaPercent: 0,
      deliveryDelayDays: 0,
      availableQuantity: baseQty,
      farmerWaitDays: 0,
      buyerReliabilityDeltaPercent: 0,
    });
  };

  const simulationResult = useMemo(() => {
    return WhatIfSimulator.simulateCounterfactual(plan, goal, inputs);
  }, [plan, goal, inputs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl rounded-3xl border border-theme-border bg-theme-card shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-theme-border bg-gradient-to-r from-theme-surface to-theme-card flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-theme-text">
                  {language === "ta" ? "சூழ்நிலை மாதிரி (What-If? Simulator)" : "What-If? Scenario Simulator"}
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-500 border border-cyan-500/30">
                  {language === "ta" ? "கணித மாதிரி" : "Deterministic Math"}
                </span>
              </div>
              <p className="text-xs text-theme-muted">
                {language === "ta"
                  ? `${plan.titleTa} க்கான மாதிரி சூழல் சோதனைகள்`
                  : `Counterfactual analysis for: ${plan.titleEn}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetInputs}
              className="p-2 rounded-xl text-theme-muted hover:text-theme-text hover:bg-theme-surface transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Reset sliders"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">{language === "ta" ? "மீட்டமைக்க" : "Reset"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-theme-muted hover:text-theme-text hover:bg-theme-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Quick Scenario Preset Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-theme-muted uppercase tracking-wider block">
              {language === "ta" ? "முன்அமைக்கப்பட்ட மாதிரி சோதனைகள்" : "Instant Stress-Test Scenarios"}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setInputs((prev) => ({ ...prev, buyerPriceDeltaPercent: -10 }))}
                className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-medium text-theme-text hover:border-theme-primary transition-colors"
              >
                📉 Price -10%
              </button>
              <button
                onClick={() => setInputs((prev) => ({ ...prev, transportCostDeltaPercent: +30 }))}
                className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-medium text-theme-text hover:border-theme-primary transition-colors"
              >
                🚚 Transport +30%
              </button>
              <button
                onClick={() => setInputs((prev) => ({ ...prev, deliveryDelayDays: 2 }))}
                className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-medium text-theme-text hover:border-theme-primary transition-colors"
              >
                ⏱️ Delivery Delay +2 Days
              </button>
              <button
                onClick={() => setInputs((prev) => ({ ...prev, availableQuantity: Math.round(baseQty * 0.8) }))}
                className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-medium text-theme-text hover:border-theme-primary transition-colors"
              >
                ⚖️ Partial Yield (80% Vol)
              </button>
              <button
                onClick={() => setInputs((prev) => ({ ...prev, buyerReliabilityDeltaPercent: -30 }))}
                className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-medium text-theme-text hover:border-theme-primary transition-colors"
              >
                ⚠️ Buyer Reliability -30%
              </button>
            </div>
          </div>

          {/* Interactive Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slider 1: Buyer Price Delta */}
            <div className="p-4 rounded-2xl border border-theme-border bg-theme-surface/70 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-theme-text">
                  {language === "ta" ? "வாங்குபவர் விலை மாற்றம்" : "Buyer Price Movement"}
                </span>
                <span
                  className={`font-black ${
                    inputs.buyerPriceDeltaPercent >= 0 ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {inputs.buyerPriceDeltaPercent > 0 ? "+" : ""}
                  {inputs.buyerPriceDeltaPercent}%
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={inputs.buyerPriceDeltaPercent}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, buyerPriceDeltaPercent: parseInt(e.target.value, 10) }))
                }
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-theme-muted">
                <span>-30% (Slump)</span>
                <span>0% (Baseline)</span>
                <span>+30% (Surge)</span>
              </div>
            </div>

            {/* Slider 2: Transport Cost Delta */}
            <div className="p-4 rounded-2xl border border-theme-border bg-theme-surface/70 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-theme-text">
                  {language === "ta" ? "போக்குவரத்து கட்டண மாற்றம்" : "Freight Cost Inflation"}
                </span>
                <span
                  className={`font-black ${
                    inputs.transportCostDeltaPercent > 0 ? "text-amber-500" : "text-emerald-500"
                  }`}
                >
                  {inputs.transportCostDeltaPercent > 0 ? "+" : ""}
                  {inputs.transportCostDeltaPercent}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="100"
                step="10"
                value={inputs.transportCostDeltaPercent}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    transportCostDeltaPercent: parseInt(e.target.value, 10),
                  }))
                }
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-theme-muted">
                <span>-50% (Subsidy)</span>
                <span>0%</span>
                <span>+100% (Fuel Strike)</span>
              </div>
            </div>

            {/* Slider 3: Delivery Delay */}
            <div className="p-4 rounded-2xl border border-theme-border bg-theme-surface/70 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-theme-text">
                  {language === "ta" ? "விநியோக தாமதம்" : "Highway Delay (Days)"}
                </span>
                <span className="font-black text-cyan-500">+{inputs.deliveryDelayDays} Days</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={inputs.deliveryDelayDays}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, deliveryDelayDays: parseInt(e.target.value, 10) }))
                }
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-theme-muted">
                <span>0 Days (On-Time)</span>
                <span>+3 Days</span>
                <span>+5 Days (Severe)</span>
              </div>
            </div>

            {/* Slider 4: Available Quantity */}
            <div className="p-4 rounded-2xl border border-theme-border bg-theme-surface/70 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-theme-text">
                  {language === "ta" ? "கிடைக்கக்கூடிய அளவு" : "Available Batch Volume"}
                </span>
                <span className="font-black text-theme-primary">
                  {inputs.availableQuantity.toLocaleString()} kg
                </span>
              </div>
              <input
                type="range"
                min={Math.round(baseQty * 0.4)}
                max={Math.round(baseQty * 1.5)}
                step="50"
                value={inputs.availableQuantity}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, availableQuantity: parseInt(e.target.value, 10) }))
                }
                className="w-full accent-theme-primary"
              />
              <div className="flex justify-between text-[10px] text-theme-muted">
                <span>{Math.round(baseQty * 0.4)} kg (Low)</span>
                <span>{baseQty} kg (Planned)</span>
                <span>{Math.round(baseQty * 1.5)} kg (Bumper)</span>
              </div>
            </div>
          </div>

          {/* Dynamic Counterfactual Outcome Panel */}
          <div className="p-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-theme-muted uppercase tracking-wider">
                {language === "ta" ? "கணித உருவகப்படுத்துதல் முடிவு" : "Counterfactual Simulation Result"}
              </span>
              <span className="text-[11px] font-semibold text-cyan-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {language === "ta" ? "தானியங்கி மறு கணக்கீடு" : "Instant Deterministic Reranking"}
              </span>
            </div>

            {/* Metric Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Expected Net Value */}
              <div className="p-3.5 rounded-xl border border-theme-border bg-theme-card">
                <span className="text-[10px] text-theme-muted block">
                  {language === "ta" ? "நிகர வருமானம்" : "Simulated Net Realization"}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-lg font-black text-theme-text">
                    ₹{simulationResult.simulatedNetRealization.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      simulationResult.difference >= 0 ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {simulationResult.difference >= 0 ? "+" : ""}
                    ₹{simulationResult.difference.toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-theme-muted block mt-0.5">
                  Base: ₹{simulationResult.baseNetRealization.toLocaleString()}
                </span>
              </div>

              {/* Risk Level */}
              <div className="p-3.5 rounded-xl border border-theme-border bg-theme-card">
                <span className="text-[10px] text-theme-muted block">
                  {language === "ta" ? "அபாய நிலை" : "Risk Profile Shift"}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-theme-muted">
                    {simulationResult.baseRisk}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-theme-muted" />
                  <span
                    className={`text-sm font-extrabold ${
                      simulationResult.simulatedRisk === "Low"
                        ? "text-emerald-500"
                        : simulationResult.simulatedRisk === "Medium"
                        ? "text-amber-500"
                        : "text-rose-500"
                    }`}
                  >
                    {simulationResult.simulatedRisk}
                  </span>
                </div>
              </div>

              {/* Deadline Status */}
              <div className="p-3.5 rounded-xl border border-theme-border bg-theme-card">
                <span className="text-[10px] text-theme-muted block">
                  {language === "ta" ? "காலக்கெடு நிலை" : "Deadline Adherence"}
                </span>
                <div className="mt-1 flex items-center gap-1.5">
                  {simulationResult.simulatedDeadlineFit ? (
                    <span className="text-xs font-extrabold text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {language === "ta" ? "காலக்கெடு பொருந்தும்" : "Within Target"}
                    </span>
                  ) : (
                    <span className="text-xs font-extrabold text-rose-500 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {language === "ta" ? "காலக்கெடு மீறல்" : "Deadline Breached"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Strategic Rationale */}
            <div className="p-3.5 rounded-xl bg-theme-card/80 border border-theme-border space-y-1.5 text-xs">
              <div className="font-bold text-theme-primary flex items-center gap-1.5">
                <span>
                  {language === "ta" ? simulationResult.actionShiftTa : simulationResult.actionShiftEn}
                </span>
              </div>
              <p className="text-[11px] text-theme-muted leading-relaxed">
                {language === "ta"
                  ? simulationResult.mathematicalReasonTa
                  : simulationResult.mathematicalReasonEn}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-theme-border bg-theme-surface flex items-center justify-between">
          <span className="text-[11px] text-theme-muted hidden sm:block">
            {language === "ta"
              ? "அனைத்து எண்களும் துல்லியமான சூத்திரங்களால் கணக்கிடப்படுகின்றன."
              : "Numerical values are strictly determined by exact formulas, never guessed."}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm ml-auto"
          >
            {language === "ta" ? "முடிந்தது" : "Done Exploring"}
          </button>
        </div>
      </div>
    </div>
  );
};
