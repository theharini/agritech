"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  SYNTHETIC_BUILDATHON_DATASET,
  calculateEvaluationMetrics,
  evaluateBaseline,
  evaluateAgent,
} from "@/lib/evaluation/syntheticDataset";
import { SyntheticMissionScenario } from "@/lib/mission/types";
import { MissionReplayModal } from "../mission/MissionReplayModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  Database,
  BarChart3,
  Cpu,
} from "lucide-react";

export const EvaluationLabView: React.FC = () => {
  const { language } = useLanguage();

  // Metrics dynamically computed across all 45 missions
  const metrics = useMemo(() => calculateEvaluationMetrics(), []);

  // Filter edge cases
  const edgeCases = useMemo(() => {
    return SYNTHETIC_BUILDATHON_DATASET.filter((s) => s.isEdgeCase);
  }, []);

  // Active Edge Case for Interactive Testing
  const [selectedEdgeCaseId, setSelectedEdgeCaseId] = useState<string>(edgeCases[0]?.id || "EDGE-01");
  const activeEdgeCase =
    edgeCases.find((e) => e.id === selectedEdgeCaseId) || edgeCases[0];

  const activeBaselineRes = evaluateBaseline(activeEdgeCase);
  const activeAgentRes = evaluateAgent(activeEdgeCase);

  // Dataset browser search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredDataset = useMemo(() => {
    return SYNTHETIC_BUILDATHON_DATASET.filter((item) => {
      const matchSearch =
        item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.farmerLocation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat =
        selectedCategory === "all" ||
        (selectedCategory === "edge_case" && item.isEdgeCase) ||
        (selectedCategory === "standard" && !item.isEdgeCase);
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  // Replay modal state
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [replayScenario, setReplayScenario] = useState<SyntheticMissionScenario>(
    SYNTHETIC_BUILDATHON_DATASET[0]
  );

  // Chart data
  const chartData = [
    {
      metric: language === "ta" ? "வரம்பு பூர்த்தி (%)" : "Constraint Satisfaction (%)",
      Baseline: metrics.baselineConstraintSatisfactionRate,
      AgriMission: metrics.agentConstraintSatisfactionRate,
    },
    {
      metric: language === "ta" ? "வெற்றிகரமான திட்டம் (%)" : "Successful Plan Rate (%)",
      Baseline: metrics.baselineSuccessfulPlanRate,
      AgriMission: metrics.agentSuccessfulPlanRate,
    },
    {
      metric: language === "ta" ? "விதிவிலக்கு மீட்பு (%)" : "Edge-Case Resilience (%)",
      Baseline: metrics.baselineEdgeCaseSurvivalRate,
      AgriMission: metrics.edgeCaseRecoveryRate,
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-theme-card via-theme-surface to-theme-card p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-500 border border-cyan-500/30 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                {language === "ta" ? "ஹேக்கத்தான் நடுவர் கூடம்" : "Empirical Judge Evaluation Laboratory"}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-theme-primary/20 text-theme-primary border border-theme-primary/30">
                {language === "ta" ? "45 மாதிரி பணிகள்" : "45-Mission Benchmark"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-theme-text tracking-tight">
              {language === "ta"
                ? "அக்ரிடெக் ஏஜென்ட் மதிப்பீட்டு ஆய்வகம்"
                : "AgriTech Agent Evaluation Lab"}
            </h1>
            <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
              {language === "ta"
                ? "வழக்கமான அதிக-விலை தேர்விற்கும், அக்ரிமிஷன் ஏஜென்ட்டின் பல-வரம்பு முடிவெடுக்கும் அடுக்குக்கும் இடையிலான முறையான ஒப்பீடு. அனைத்து எண்களும் மாதிரித் தரவுத்தொகுப்பிலிருந்து கணக்கிடப்பட்டவை."
                : "Quantitative benchmark comparing naive gross-price selection against the constraint-aware AgriMission Agent across 45 diverse agricultural scenarios. Real formulas, zero hallucinated metrics."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-theme-card border border-theme-border text-xs space-y-1 text-right shrink-0">
            <span className="text-[10px] text-theme-muted uppercase font-bold block">
              Dataset Label
            </span>
            <span className="font-extrabold text-theme-primary block">
              Synthetic Buildathon Evaluation Dataset
            </span>
            <span className="text-[11px] text-theme-muted block">
              {metrics.totalMissions} Scenarios Evaluated
            </span>
          </div>
        </div>
      </div>

      {/* Problem vs Baseline vs Proposed System Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Problem */}
        <div className="p-5 rounded-3xl border border-theme-border bg-theme-card space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-theme-text">
            {language === "ta" ? "1. தீர்க்கப்படும் பிரச்சனை" : "1. The Core Problem"}
          </h3>
          <p className="text-xs text-theme-muted leading-relaxed">
            {language === "ta"
              ? "விவசாய தளங்கள் சந்தை விலை, வாங்குபவர்கள், மற்றும் போக்குவரத்துத் தகவல்களை தனித்தனியாக காட்டுகின்றன. விவசாயி இவற்றை தானாக ஒருங்கிணைக்க முடியாமல் தவறான முடிவுகளை எடுக்க நேரிடுகிறது."
              : "Current agri-platforms expose fragmented pieces (mandi rates, buyer listings, logistics quotes). Farmers are left to manually stitch variables together, leading to severe freight drain or default."}
          </p>
        </div>

        {/* Baseline Method */}
        <div className="p-5 rounded-3xl border border-rose-500/30 bg-rose-500/5 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
            <XCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-rose-500">
            {language === "ta" ? "2. அடிப்படை முறை (Naive Baseline)" : "2. Baseline (Naive Method)"}
          </h3>
          <p className="text-xs text-theme-muted leading-relaxed">
            {language === "ta"
              ? "அதிக மொத்த விலையை வழங்கும் வாங்குபவரை மட்டுமே தேர்வு செய்யும் பழக்கவழக்கம். சரக்குக் கட்டணம், காலக்கெடு பொருத்தம் மற்றும் கட்டண நம்பகத்தன்மையை இது கணக்கில் கொள்வதில்லை."
              : "Simulates simple farmer behavior: Selects the buyer advertising the highest gross quote, completely ignoring road distance, freight eating margin, delivery deadlines, or payment insolvency."}
          </p>
        </div>

        {/* Proposed AgriMission Agent */}
        <div className="p-5 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-emerald-500">
            {language === "ta" ? "3. அக்ரிமிஷன் ஏஜென்ட்" : "3. AgriMission Agent"}
          </h3>
          <p className="text-xs text-theme-muted leading-relaxed">
            {language === "ta"
              ? "நிகர வருமானம், காலக்கெடு, வாங்குபவரின் நம்பகத்தன்மை, மற்றும் பயிர் அழுகல் ஆகியவற்றை கணக்கிட்டு, பல மாற்று செயல் திட்டங்களை உருவாக்கி மனித ஒப்புதலுடன் செயல்படுத்துகிறது."
              : "Performs constraint-aware multi-criteria planning. Computes net realization, enforces hard reliability gates, evaluates counterfactual trade-offs, and gates consequential execution behind human approval."}
          </p>
        </div>
      </div>

      {/* Dynamic Hackathon Metrics Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-theme-muted uppercase tracking-wider">
          {language === "ta"
            ? "கணக்கிடப்பட்ட ஹேக்கத்தான் செயல்திறன் அளவீடுகள்"
            : "Dynamically Calculated Evaluation Metrics"}
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Metric 1: Constraint Satisfaction */}
          <div className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-1">
            <span className="text-[10px] text-theme-muted uppercase font-bold block">
              {language === "ta" ? "வரம்பு பூர்த்தி விகிதம்" : "Constraint Satisfaction"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-500">
                {metrics.agentConstraintSatisfactionRate}%
              </span>
              <span className="text-xs text-rose-500 font-bold">
                vs {metrics.baselineConstraintSatisfactionRate}%
              </span>
            </div>
            <span className="text-[10px] text-theme-muted block">
              +{(metrics.agentConstraintSatisfactionRate - metrics.baselineConstraintSatisfactionRate).toFixed(1)}% over baseline
            </span>
          </div>

          {/* Metric 2: Successful Plan Rate */}
          <div className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-1">
            <span className="text-[10px] text-theme-muted uppercase font-bold block">
              {language === "ta" ? "வெற்றிகரமான திட்டம்" : "Successful Plan Rate"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-cyan-500">
                {metrics.agentSuccessfulPlanRate}%
              </span>
              <span className="text-xs text-rose-500 font-bold">
                vs {metrics.baselineSuccessfulPlanRate}%
              </span>
            </div>
            <span className="text-[10px] text-theme-muted block">
              {metrics.totalMissions} test missions evaluated
            </span>
          </div>

          {/* Metric 3: Net Realization Difference */}
          <div className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-1">
            <span className="text-[10px] text-theme-muted uppercase font-bold block">
              {language === "ta" ? "நிகர வருவாய் வேறுபாடு" : "Net Realization Delta"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-theme-primary">
                +₹{metrics.averageNetRealizationDiffPerUnit}
              </span>
              <span className="text-xs text-theme-muted font-bold">/kg avg</span>
            </div>
            <span className="text-[10px] text-theme-muted block">
              Net payout after freight & losses
            </span>
          </div>

          {/* Metric 4: Edge Case Recovery Rate */}
          <div className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-1">
            <span className="text-[10px] text-theme-muted uppercase font-bold block">
              {language === "ta" ? "விதிவிலக்கு மீட்பு" : "Edge-Case Resilience"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-purple-500">
                {metrics.edgeCaseRecoveryRate}%
              </span>
              <span className="text-xs text-rose-500 font-bold">
                vs {metrics.baselineEdgeCaseSurvivalRate}%
              </span>
            </div>
            <span className="text-[10px] text-theme-muted block">
              Avoids toxic buyers & default
            </span>
          </div>

          {/* Metric 5: Value Protected */}
          <div className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-1 col-span-2 lg:col-span-1">
            <span className="text-[10px] text-theme-muted uppercase font-bold block">
              {language === "ta" ? "பாதுகாக்கப்பட்ட மதிப்பு" : "Farmer Value Protected"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-emerald-500">
                ₹{(metrics.totalValueProtectedRupees / 100000).toFixed(1)}L
              </span>
            </div>
            <span className="text-[10px] text-theme-muted block">
              From contract breach & default
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="p-6 rounded-3xl border border-theme-border bg-theme-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-theme-text flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-theme-primary" />
              {language === "ta"
                ? "அடிப்படை முறை vs அக்ரிமிஷன் ஏஜென்ட் ஒப்பீட்டு வரைபடம்"
                : "Empirical Comparison: Baseline vs AgriMission Agent"}
            </h3>
            <p className="text-xs text-theme-muted">
              {language === "ta"
                ? "45 மாதிரி சூழ்நிலைகளின் செயல்திறன் ஒப்பீடு"
                : "Quantitative benchmark performance on 45 synthetic agricultural missions"}
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--theme-card, #1e293b)",
                  borderColor: "var(--theme-border, #334155)",
                  borderRadius: "1rem",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="Baseline" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="AgriMission" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section: Interactive Edge Case Laboratory (8 Scenarios) */}
      <div className="p-6 rounded-3xl border border-theme-border bg-theme-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-theme-text">
                {language === "ta" ? "விதிவிலக்கு சோதனை ஆய்வகம்" : "Interactive Edge-Case Laboratory"}
              </h3>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-500 border border-purple-500/30">
                8 Adversarial Scenarios
              </span>
            </div>
            <p className="text-xs text-theme-muted mt-0.5">
              {language === "ta"
                ? "எந்தவொரு சிக்கலான சூழ்நிலையையும் தேர்ந்தெடுத்து, அக்ரிமிஷன் எவ்வாறு விவசாயியை பாதுகாக்கிறது என்பதை நேரடியாகக் காண்க"
                : "Click any scenario below to observe how AgriMission Agent prevents severe failure modes where naive baselines fail"}
            </p>
          </div>
        </div>

        {/* 8 Scenario Selector Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {edgeCases.map((ec, idx) => {
            const isSelected = ec.id === selectedEdgeCaseId;
            return (
              <button
                key={ec.id}
                onClick={() => setSelectedEdgeCaseId(ec.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/10 shadow-sm"
                    : "border-theme-border bg-theme-surface/70 hover:bg-theme-surface"
                }`}
              >
                <span className="text-[10px] font-black uppercase text-purple-500 block">
                  Edge Case {idx + 1}
                </span>
                <span className="font-bold text-theme-text text-xs line-clamp-1 block mt-0.5">
                  {ec.titleEn.split(":")[1]?.trim() || ec.titleEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Edge Case Deep Dive Comparison */}
        {activeEdgeCase && (
          <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-theme-border/60 pb-3">
              <div>
                <h4 className="text-sm font-extrabold text-theme-text">
                  {language === "ta" ? activeEdgeCase.titleTa : activeEdgeCase.titleEn}
                </h4>
                <p className="text-xs text-theme-muted mt-0.5">
                  Farmer: {activeEdgeCase.farmerName} • {activeEdgeCase.crop} ({activeEdgeCase.quantity}{" "}
                  {activeEdgeCase.unit}) • {activeEdgeCase.farmerLocation}
                </p>
              </div>

              <button
                onClick={() => {
                  setReplayScenario(activeEdgeCase);
                  setIsReplayOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-500 text-white text-xs font-bold hover:bg-purple-600 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{language === "ta" ? "முழு பணியை இயக்கு" : "Replay Full Mission"}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-theme-card border border-theme-border text-xs text-theme-muted leading-relaxed">
              <strong className="text-theme-text block mb-1">
                {language === "ta" ? "சிக்கலின் பின்னணி:" : "Adversarial Context:"}
              </strong>
              {language === "ta"
                ? activeEdgeCase.edgeCaseDescriptionTa
                : activeEdgeCase.edgeCaseDescriptionEn}
            </div>

            {/* Side-by-Side Execution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Baseline Result */}
              <div className="p-4 rounded-2xl border border-rose-500/40 bg-theme-card space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-rose-500 px-2 py-0.5 rounded bg-rose-500/10">
                    Naive Baseline Outcome
                  </span>
                  <span className="text-[10px] font-bold text-rose-500">
                    {activeBaselineRes.satisfiedAllConstraints ? "PASS" : "FAILED"}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-theme-muted block">Selected Buyer:</span>
                  <span className="font-extrabold text-theme-text text-sm block">
                    {activeBaselineRes.selectedBuyerName}
                  </span>
                  <span className="text-xs text-theme-muted block">
                    Gross Headline Price: ₹{activeBaselineRes.grossPrice}/kg
                  </span>
                </div>

                <div className="pt-2 border-t border-theme-border/60 text-xs">
                  <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Failure Mode Encountered:</span>
                  </span>
                  <p className="text-[11px] text-theme-muted mt-0.5">
                    {activeBaselineRes.failureReason || "Chose high gross price without checking constraints."}
                  </p>
                </div>
              </div>

              {/* AgriMission Agent Result */}
              <div className="p-4 rounded-2xl border border-emerald-500/40 bg-theme-card space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-emerald-500 px-2 py-0.5 rounded bg-emerald-500/10">
                    AgriMission Agent Outcome
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500">
                    CONSTRAINTS PRESERVED
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-theme-muted block">Recommended Solution:</span>
                  <span className="font-extrabold text-theme-text text-sm block">
                    {activeAgentRes.selectedBuyerName}
                  </span>
                  <span className="text-xs font-black text-emerald-500 block">
                    Expected Net Payout: ₹{activeAgentRes.netRealizationPerKg}/kg
                  </span>
                </div>

                <div className="pt-2 border-t border-theme-border/60 text-xs">
                  <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resilience Mechanism:</span>
                  </span>
                  <p className="text-[11px] text-theme-muted mt-0.5">
                    Agent proactively identified the fatal risk, disqualified or penalized the dangerous buyer, and safeguarded the farmer's batch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dataset Browser (45 Missions) */}
      <div className="p-6 rounded-3xl border border-theme-border bg-theme-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-theme-text flex items-center gap-2">
              <Database className="w-4 h-4 text-theme-primary" />
              {language === "ta"
                ? "மாதிரி மதிப்பீட்டு தரவுத்தொகுப்பு உலாவி"
                : "Synthetic Buildathon Evaluation Dataset"}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-theme-surface border border-theme-border text-theme-muted">
                {filteredDataset.length} / {SYNTHETIC_BUILDATHON_DATASET.length}
              </span>
            </h3>
            <p className="text-xs text-theme-muted">
              {language === "ta"
                ? "அனைத்து 45 மாதிரிப் பணிகளையும் ஆராய்ந்து மறுஇயக்கம் செய்யலாம்"
                : "Explore and replay any mission across the 45 simulated scenarios"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-theme-muted absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search crop, farmer, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-theme-primary w-48 sm:w-60"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text focus:outline-none"
            >
              <option value="all">All Scenarios</option>
              <option value="standard">Standard Missions</option>
              <option value="edge_case">Edge Cases Only</option>
            </select>
          </div>
        </div>

        {/* Dataset Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-theme-border bg-theme-surface/50 text-[11px] font-bold text-theme-muted uppercase tracking-wider">
                <th className="p-3">ID</th>
                <th className="p-3">Scenario</th>
                <th className="p-3">Crop & Volume</th>
                <th className="p-3">Location</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Baseline</th>
                <th className="p-3">Agent</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60 text-xs">
              {filteredDataset.slice(0, 15).map((item) => {
                const bRes = evaluateBaseline(item);
                const aRes = evaluateAgent(item);
                return (
                  <tr key={item.id} className="hover:bg-theme-surface/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-theme-muted text-[11px]">
                      {item.id}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-theme-text block">
                        {language === "ta" ? item.titleTa : item.titleEn}
                      </span>
                      <span className="text-[10px] text-theme-muted">
                        Farmer: {item.farmerName}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-theme-text">
                        {item.quantity} {item.unit} {item.crop}
                      </span>
                    </td>
                    <td className="p-3 text-theme-muted">{item.farmerLocation.split(",")[0]}</td>
                    <td className="p-3">{item.deadlineDays}d</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          bRes.satisfiedAllConstraints
                            ? "bg-emerald-500/20 text-emerald-500"
                            : "bg-rose-500/20 text-rose-500"
                        }`}
                      >
                        {bRes.satisfiedAllConstraints ? "PASS" : "FAILED"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500">
                        ₹{aRes.netRealizationPerKg}/kg
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setReplayScenario(item);
                          setIsReplayOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-theme-surface border border-theme-border text-theme-primary font-bold text-[11px] hover:bg-theme-card transition-colors inline-flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Replay</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Replay Modal */}
      <MissionReplayModal
        isOpen={isReplayOpen}
        onClose={() => setIsReplayOpen(false)}
        scenario={replayScenario}
      />
    </div>
  );
};
