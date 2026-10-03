"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { PlanTradeoff, MissionGoal } from "@/lib/mission/types";
import {
  ShieldCheck,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  XCircle,
  Truck,
  IndianRupee,
  Clock,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";

interface PlanComparisonCardProps {
  plans: PlanTradeoff[];
  goal: MissionGoal;
  onSelectAction: (plan: PlanTradeoff) => void;
  onOpenWhatIf: (plan: PlanTradeoff) => void;
}

export const PlanComparisonCard: React.FC<PlanComparisonCardProps> = ({
  plans,
  goal,
  onSelectAction,
  onOpenWhatIf,
}) => {
  const { language } = useLanguage();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[0]?.id || "");

  const activePlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  return (
    <div className="space-y-6">
      {/* Comparative Trade-Off Matrix Table */}
      <div className="rounded-3xl border border-theme-border bg-theme-card shadow-sm overflow-hidden">
        <div className="p-5 border-b border-theme-border bg-gradient-to-r from-theme-surface to-theme-card flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-theme-text flex items-center gap-2">
              {language === "ta" ? "செயல் திட்டங்களின் ஒப்பீட்டு அட்டவணை" : "Plan Trade-off Matrix"}
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary border border-theme-primary/30">
                {plans.length} {language === "ta" ? "சாத்தியமான திட்டங்கள்" : "Feasible Strategies"}
              </span>
            </h3>
            <p className="text-xs text-theme-muted">
              {language === "ta"
                ? "விவசாயியின் குறிப்பிட்ட நிபந்தனைகளின் அடிப்படையில் வர்த்தக சமநிலைகள் கணக்கிடப்பட்டுள்ளன"
                : "Multi-criteria optimization matching stated farmer constraints — trade-offs are explicitly exposed"}
            </p>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-theme-border bg-theme-surface/50 text-[11px] font-bold text-theme-muted uppercase tracking-wider">
                <th className="p-4">{language === "ta" ? "திட்டம்" : "Plan & Strategy"}</th>
                <th className="p-4">{language === "ta" ? "கொள்முதல் நிறுவனம்" : "Buyer Entity"}</th>
                <th className="p-4">{language === "ta" ? "நிகர வருமானம்" : "Expected Net Value"}</th>
                <th className="p-4">{language === "ta" ? "போக்குவரத்து" : "Logistics Tariff"}</th>
                <th className="p-4">{language === "ta" ? "அபாய நிலை" : "Risk Profile"}</th>
                <th className="p-4">{language === "ta" ? "காலக்கெடு" : "Deadline Fit"}</th>
                <th className="p-4">{language === "ta" ? "வரம்பு நிலை" : "Constraint Check"}</th>
                <th className="p-4 text-right">{language === "ta" ? "செயல்கள்" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60 text-xs">
              {plans.map((p) => {
                const isSelected = p.id === selectedPlanId;
                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPlanId(p.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "bg-theme-primary/5 font-medium" : "hover:bg-theme-surface/40"
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center font-black text-[10px] text-theme-primary">
                          {p.planCode.replace("PLAN_", "")}
                        </span>
                        <div>
                          <span className="font-extrabold text-theme-text block">
                            {language === "ta" ? p.titleTa.split("—")[1] || p.titleTa : p.titleEn.split("—")[1] || p.titleEn}
                          </span>
                          <span className="text-[10px] text-theme-muted capitalize">
                            {p.strategyType.replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-theme-text block">{p.buyerName}</span>
                      <span className="text-[10px] text-emerald-500 font-semibold">
                        {p.buyerReliability}% {language === "ta" ? "நம்பகத்தன்மை" : "Reliability"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-black text-theme-text text-sm block">
                        ₹{p.netRealization.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-theme-muted">
                        ₹{p.netRealizationPerUnit}/kg net
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-amber-500 block">
                        ₹{p.transportCost.toLocaleString()}
                      </span>
                      {p.storageCost > 0 && (
                        <span className="text-[10px] text-theme-muted block">
                          +₹{p.storageCost} store
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          p.riskLevel === "Low"
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : p.riskLevel === "Medium"
                            ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                            : "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                        }`}
                      >
                        {p.riskLevel}
                      </span>
                    </td>
                    <td className="p-4">
                      {p.deadlineFit ? (
                        <span className="inline-flex items-center gap-1 text-emerald-500 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {language === "ta" ? "பொருந்தும்" : "Yes"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-500 font-bold text-[11px]">
                          <XCircle className="w-3.5 h-3.5" />
                          {language === "ta" ? "தாமதம்" : "Borderline"}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          p.constraintStatus === "PASS"
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : p.constraintStatus === "WARNING"
                            ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                            : "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                        }`}
                      >
                        {p.constraintStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenWhatIf(p);
                        }}
                        className="p-1.5 rounded-lg border border-theme-border bg-theme-surface text-theme-muted hover:text-cyan-500 hover:border-cyan-500 transition-colors"
                        title="Run What-If Simulation"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAction(p);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-theme-primary text-theme-bg font-bold text-xs hover:bg-theme-primary-hover transition-colors shadow-sm inline-flex items-center gap-1"
                      >
                        <span>{language === "ta" ? "ஒப்புதல்" : "Review"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Plan Deep-Dive Breakdown */}
      {activePlan && (
        <div className="p-6 rounded-3xl border border-theme-border bg-theme-card/80 space-y-5 animate-in fade-in duration-150">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-theme-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center font-black text-theme-primary text-sm">
                {activePlan.planCode.replace("PLAN_", "")}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-theme-text">
                  {language === "ta" ? activePlan.titleTa : activePlan.titleEn}
                </h4>
                <p className="text-xs text-theme-muted">
                  {activePlan.deliveryWindow} • {activePlan.buyerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenWhatIf(activePlan)}
                className="px-3 py-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-500 text-xs font-bold hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{language === "ta" ? "சூழ்நிலை சோதனை (What-If?)" : "What-If? Simulator"}</span>
              </button>
              <button
                onClick={() => onSelectAction(activePlan)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-extrabold hover:bg-emerald-600 transition-all shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === "ta" ? "செயல் முன்னோட்டம் & ஒப்புதல்" : "Preview & Approve"}</span>
              </button>
            </div>
          </div>

          {/* Explanation Banner */}
          <div className="p-4 rounded-2xl bg-theme-surface/60 border border-theme-border text-xs leading-relaxed text-theme-text flex items-start gap-2.5">
            <Info className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
            <p>{language === "ta" ? activePlan.explanationTa : activePlan.explanationEn}</p>
          </div>

          {/* Warnings List if any */}
          {activePlan.constraintWarnings.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider block">
                {language === "ta" ? "கவனிக்க வேண்டிய வரம்பு எச்சரிக்கைகள்" : "Constraint Notes & Warnings"}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activePlan.constraintWarnings.map((warn, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                      warn.severity === "blocked"
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-500"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{language === "ta" ? warn.textTa : warn.textEn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
