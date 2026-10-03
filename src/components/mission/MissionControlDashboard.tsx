"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  AgriMissionRecord,
  MissionGoal,
  PlanTradeoff,
  SyntheticMissionScenario,
} from "@/lib/mission/types";
import { MissionEngine } from "@/lib/mission/missionEngine";
import { SYNTHETIC_BUILDATHON_DATASET } from "@/lib/evaluation/syntheticDataset";
import { PlanComparisonCard } from "./PlanComparisonCard";
import { ActionPreviewModal } from "./ActionPreviewModal";
import { WhatIfSimulatorModal } from "./WhatIfSimulatorModal";
import { MissionAuditTrailModal } from "./MissionAuditTrailModal";
import { MissionCreationModal } from "./MissionCreationModal";
import { MissionReplayModal } from "./MissionReplayModal";
import { LimitationsPanel } from "./LimitationsPanel";
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Truck,
  IndianRupee,
  ShieldCheck,
  Plus,
  History,
  Layers,
  Sliders,
  ListChecks,
  Building2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export const MissionControlDashboard: React.FC<{
  onNavigateToEvaluation?: () => void;
}> = ({ onNavigateToEvaluation }) => {
  const { language } = useLanguage();

  // Active missions list initialized with seed scenario
  const [missions, setMissions] = useState<AgriMissionRecord[]>(() => {
    const defaultGoal: MissionGoal = {
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
      rawGoalText:
        "I have 500 kg of rice. I want to sell it within 3 days, maximize expected farmer realization, keep transportation cost low, and avoid unreliable buyers.",
      constraints: ["low transport cost", "verified buyer", "reliable payment", "low spoilage risk"],
    };
    return [
      MissionEngine.runMission({
        goal: defaultGoal,
        farmerId: "user-rajesh",
        farmerName: "Rajesh Kumar",
      }),
    ];
  });

  const [selectedMissionId, setSelectedMissionId] = useState<string>(() => missions[0]?.id || "");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isWhatIfModalOpen, setIsWhatIfModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isReplayModalOpen, setIsReplayModalOpen] = useState(false);

  // Selected plan for Action Preview / What-If
  const [activePlanForModal, setActivePlanForModal] = useState<PlanTradeoff | null>(null);
  const [activeScenarioForReplay, setActiveScenarioForReplay] =
    useState<SyntheticMissionScenario>(SYNTHETIC_BUILDATHON_DATASET[0]);

  // Operational alerts
  const [alerts, setAlerts] = useState<
    {
      id: string;
      titleEn: string;
      titleTa: string;
      descEn: string;
      descTa: string;
      severity: "critical" | "warning" | "info";
      time: string;
    }[]
  >([
    {
      id: "alt-1",
      titleEn: "NH-45 Highway Toll Rate Revision",
      titleTa: "NH-45 நெடுஞ்சாலை சுங்கக் கட்டண மாற்றம்",
      descEn: "Freight corridor between Thanjavur & Chennai increased by 6%. Logistics tariff updated.",
      descTa: "தஞ்சாவூர்-சென்னை சரக்கு வழித்தட கட்டணம் 6% அதிகரித்துள்ளது. போக்குவரத்து செலவு புதுப்பிக்கப்பட்டது.",
      severity: "warning",
      time: "10:15 AM",
    },
    {
      id: "alt-2",
      titleEn: "APMC Daily Spot Benchmarks Synced",
      titleTa: "ஒழுங்குமுறை விற்பனைக்கூட நேரலை விலை இணைக்கப்பட்டது",
      descEn: "7-day weighted average price for Paddy and Wheat updated across 48 regulated mandis.",
      descTa: "48 ஒழுங்குமுறை விற்பனைக்கூடங்களின் 7 நாள் சராசரி விலை வெற்றிகரமாக இணைக்கப்பட்டது.",
      severity: "info",
      time: "09:30 AM",
    },
  ]);


  const activeMission = missions.find((m) => m.id === selectedMissionId) || missions[0];

  // 1-Click Judge Demo runner
  const handleRunJudgeDemo = () => {
    const demoGoal: MissionGoal = {
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
      rawGoalText:
        "Demo Mission: Sell 500 kg rice within 3 days, maximize farmer net payout, enforce verified buyer.",
      constraints: ["low transport cost", "verified buyer", "reliable payment"],
    };

    const newMission = MissionEngine.runMission({
      goal: demoGoal,
      farmerId: "user-rajesh",
      farmerName: "Rajesh Kumar (Judge Demo)",
    });

    setMissions((prev) => [newMission, ...prev]);
    setSelectedMissionId(newMission.id);
  };

  // Create new mission from modal
  const handleCreateMission = (goal: MissionGoal) => {
    const newMission = MissionEngine.runMission({
      goal,
      farmerId: "user-rajesh",
      farmerName: "Rajesh Kumar",
    });

    setMissions((prev) => [newMission, ...prev]);
    setSelectedMissionId(newMission.id);
    setIsCreateModalOpen(false);
  };

  // Plan recovery trigger
  const handleTriggerRecovery = () => {
    if (!activeMission) return;
    const recovered = MissionEngine.recoverMission(activeMission);
    setMissions((prev) => prev.map((m) => (m.id === recovered.id ? recovered : m)));

    // Add alert
    setAlerts((prev) => [
      {
        id: `alt-${Date.now()}`,
        titleEn: "Adaptive Plan Recovery Activated",
        titleTa: "மீட்பு திட்டம் வெற்றிகரமாக செயல்படுத்தப்பட்டது",
        descEn: `Primary intake suspended. Switched to Plan B with zero highway default risk.`,
        descTa: `முதன்மை வாங்குபவர் ரத்து செய்ததால் திட்டம் B க்கு பாதுகாப்பாக மாற்றப்பட்டது.`,
        severity: "critical",
        time: "Just now",
      },
      ...prev,
    ]);
  };

  // Action approval
  const handleApproveAction = () => {
    if (!activeMission) return;
    const approved = MissionEngine.approveAction(activeMission);
    setMissions((prev) => prev.map((m) => (m.id === approved.id ? approved : m)));
    setIsActionModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner with Judge 1-Click Demo */}
      <div className="relative rounded-3xl border border-theme-primary/30 bg-gradient-to-r from-theme-card via-theme-surface to-theme-card p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-theme-primary/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-theme-primary/20 text-theme-primary border border-theme-primary/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {language === "ta" ? "ஹேக்கத்தான் புதுமை" : "Buildathon Open Problem Statement"}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-500 border border-cyan-500/30">
                {language === "ta" ? "முடிவெடுக்கும் அடுக்கு" : "Agentic Decision Layer"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-theme-text tracking-tight">
              {language === "ta" ? "அக்ரிமிஷன் ஏஜென்ட்" : "AgriMission Agent"}
            </h1>
            <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
              {language === "ta"
                ? "விவசாய இலக்குகளிலிருந்து சரிபார்க்கப்பட்ட செயல் திட்டங்கள் வரை. சந்தை விலை, சரக்குக் கட்டணம், வாங்குபவரின் நம்பகத்தன்மை மற்றும் மனித ஒப்புதலுடன் கூடிய தன்னியக்க முடிவெடுக்கும் கட்டமைப்பு."
                : "From agricultural goals to verified action plans. Evaluates trade-offs, guarantees deterministic math, validates counterparty solvency, and gates consequential executions behind farmer approval."}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRunJudgeDemo}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-theme-primary to-emerald-600 text-theme-bg font-extrabold text-xs hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              title="One-click realistic simulation for hackathon judges"
            >
              <Play className="w-4 h-4 fill-current" />
              <div className="text-left">
                <span className="block leading-tight">
                  {language === "ta" ? "நடுவர் மாதிரி (1-Click Demo)" : "Judge 1-Click Demo"}
                </span>
                <span className="text-[10px] opacity-80 font-medium block">
                  {language === "ta" ? "ராஜேஷ் குமார் (500kg நெல்)" : "Rajesh Kumar • 500kg Rice"}
                </span>
              </div>
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-3 rounded-2xl border border-theme-border bg-theme-surface text-theme-text font-bold text-xs hover:border-theme-primary hover:text-theme-primary transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{language === "ta" ? "புதிய பணி" : "New Mission"}</span>
            </button>

            {onNavigateToEvaluation && (
              <button
                onClick={onNavigateToEvaluation}
                className="px-4 py-3 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-500 font-bold text-xs hover:bg-cyan-500/20 transition-all flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>{language === "ta" ? "மதிப்பீட்டு கூடம்" : "Evaluation Lab"}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Active Missions List & Active Mission Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Missions Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-theme-muted uppercase tracking-wider">
              {language === "ta" ? "செயலில் உள்ள பணிகள்" : "Active Missions"} ({missions.length})
            </h3>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="text-[11px] font-bold text-theme-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>{language === "ta" ? "சேர்க்க" : "Add Goal"}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {missions.map((m) => {
              const isSelected = m.id === selectedMissionId;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMissionId(m.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-theme-primary bg-theme-primary/10 shadow-sm"
                      : "border-theme-border bg-theme-card hover:bg-theme-surface/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-theme-surface border border-theme-border text-theme-muted">
                      {m.id}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        m.status === "completed"
                          ? "bg-emerald-500/20 text-emerald-500"
                          : m.status === "recovered"
                          ? "bg-cyan-500/20 text-cyan-500"
                          : "bg-amber-500/20 text-amber-500"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-xs text-theme-text mt-2 block">
                    {m.missionName}
                  </h4>
                  <p className="text-[11px] text-theme-muted mt-0.5">
                    {m.goal.quantity} {m.goal.unit} • {m.goal.location.split(",")[0]} • {m.goal.deadlineDays}d deadline
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-theme-border/50 flex items-center justify-between text-[10px]">
                    <span className="text-theme-muted">
                      Quality: <strong className="text-theme-text">{m.evidenceQuality}</strong>
                    </span>
                    <span className="font-extrabold text-emerald-500">
                      ₹{m.plans[0]?.netRealization.toLocaleString()} net
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Alerts Box */}
          <div className="rounded-2xl border border-theme-border bg-theme-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-theme-muted uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                {language === "ta" ? "செயல்பாட்டு எச்சரிக்கைகள்" : "Operational Alerts"}
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500">
                {alerts.length}
              </span>
            </div>

            <div className="space-y-2">
              {alerts.map((alt) => (
                <div
                  key={alt.id}
                  className="p-2.5 rounded-xl border border-theme-border/60 bg-theme-surface/70 space-y-1 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-theme-text text-[11px]">
                      {language === "ta" ? alt.titleTa : alt.titleEn}
                    </span>
                    <span className="text-[9px] text-theme-muted">{alt.time}</span>
                  </div>
                  <p className="text-[10px] text-theme-muted leading-tight">
                    {language === "ta" ? alt.descTa : alt.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Active Mission Selected Details & Actions */}
        {activeMission && (
          <div className="lg:col-span-2 space-y-6">
            {/* Mission Objective Card */}
            <div className="p-5 rounded-3xl border border-theme-border bg-theme-card space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-theme-text">
                      {activeMission.missionName}
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                      Farmer: {activeMission.farmerName}
                    </span>
                  </div>
                  <p className="text-xs text-theme-muted mt-0.5">
                    "{activeMission.goal.rawGoalText || "Goal initialized via AgriMission"}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAuditModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-theme-text text-xs font-bold hover:border-theme-primary transition-all flex items-center gap-1.5"
                  >
                    <ListChecks className="w-3.5 h-3.5 text-theme-primary" />
                    <span>{language === "ta" ? "தணிக்கை சுவடு" : "Audit Trail"}</span>
                  </button>

                  <button
                    onClick={handleTriggerRecovery}
                    className="px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-500 text-xs font-bold hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
                    title="Simulate buyer rejection and test adaptive recovery"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{language === "ta" ? "மீட்பு சோதனை" : "Test Plan Recovery"}</span>
                  </button>
                </div>
              </div>

              {/* Goal Constraints Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-theme-border/60">
                <span className="text-[10px] font-bold text-theme-muted uppercase mr-1">
                  Active Constraints:
                </span>
                {activeMission.goal.constraints.map((c, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-theme-surface border border-theme-border text-theme-text flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {c}
                  </span>
                ))}
              </div>

              {/* Evidence Quality Indicator Panel */}
              <div className="p-4 rounded-2xl bg-theme-surface/60 border border-theme-border space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-theme-text flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-theme-primary" />
                    {language === "ta" ? "ஆதாரத் தரம் (Evidence Quality):" : "Transparent Evidence Quality:"}
                    <strong
                      className={`ml-1 px-2 py-0.5 rounded text-[10px] uppercase font-black ${
                        activeMission.evidenceQuality === "HIGH"
                          ? "bg-emerald-500/20 text-emerald-500"
                          : activeMission.evidenceQuality === "MEDIUM"
                          ? "bg-amber-500/20 text-amber-500"
                          : "bg-rose-500/20 text-rose-500"
                      }`}
                    >
                      {activeMission.evidenceQuality}
                    </strong>
                  </span>
                  <span className="text-[10px] text-theme-muted">
                    Confidence: {activeMission.marketEvidence.confidenceScore}/100
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  {activeMission.qualityReasons.map((qr, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-theme-muted">
                      {qr.positive ? (
                        <span className="text-emerald-500 font-bold">✓</span>
                      ) : (
                        <span className="text-amber-500 font-bold">⚠</span>
                      )}
                      <span>{language === "ta" ? qr.ta : qr.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Approval Banner if action is waiting */}
            {activeMission.pendingApprovalAction &&
              activeMission.pendingApprovalAction.status === "pending_approval" && (
                <div className="p-4 rounded-3xl border border-amber-500/40 bg-amber-500/10 flex flex-wrap items-center justify-between gap-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-theme-text uppercase">
                        {language === "ta"
                          ? "பாதுகாப்பான செயல் வாயில் — ஒப்புதல் நிலுவையில் உள்ளது"
                          : "Safe Action Gate — Consequential Action Pending"}
                      </h4>
                      <p className="text-[11px] text-theme-muted">
                        {activeMission.pendingApprovalAction.actionTitleEn} (₹
                        {activeMission.pendingApprovalAction.netRealization.toLocaleString()} net)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActivePlanForModal(activeMission.plans[0]);
                      setIsActionModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-extrabold hover:bg-emerald-600 transition-all shadow-md"
                  >
                    {language === "ta" ? "செயலை அங்கீகரிக்கவும்" : "Review & Approve Action"}
                  </button>
                </div>
              )}

            {/* Candidate Plans Comparison Card */}
            <PlanComparisonCard
              plans={activeMission.plans}
              goal={activeMission.goal}
              onSelectAction={(plan) => {
                setActivePlanForModal(plan);
                setIsActionModalOpen(true);
              }}
              onOpenWhatIf={(plan) => {
                setActivePlanForModal(plan);
                setIsWhatIfModalOpen(true);
              }}
            />

            {/* Limitations Panel */}
            <LimitationsPanel />
          </div>
        )}
      </div>

      {/* Action Preview Modal */}
      {activePlanForModal && (
        <ActionPreviewModal
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
          actionPayload={activePlanForModal.actionPayload}
          onApprove={handleApproveAction}
          onModify={() => {
            setIsActionModalOpen(false);
            setIsWhatIfModalOpen(true);
          }}
        />
      )}

      {/* What-If Simulator Modal */}
      {activePlanForModal && activeMission && (
        <WhatIfSimulatorModal
          isOpen={isWhatIfModalOpen}
          onClose={() => setIsWhatIfModalOpen(false)}
          plan={activePlanForModal}
          goal={activeMission.goal}
        />
      )}

      {/* Audit Trail Modal */}
      {activeMission && (
        <MissionAuditTrailModal
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
          auditTrail={activeMission.auditTrail}
          missionName={activeMission.missionName}
        />
      )}

      {/* Mission Creation Modal */}
      <MissionCreationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitMission={handleCreateMission}
      />

      {/* Mission Replay Modal */}
      <MissionReplayModal
        isOpen={isReplayModalOpen}
        onClose={() => setIsReplayModalOpen(false)}
        scenario={activeScenarioForReplay}
      />
    </div>
  );
};
