"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  INITIAL_AGRONOMIST_QUERIES,
  AgronomistQuery,
} from "@/lib/db";
import {
  Stethoscope,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  UserCheck,
  Calendar,
  Sparkles,
  X,
  FileText,
} from "lucide-react";

export const AgronomistSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [queries, setQueries] = useState<AgronomistQuery[]>(INITIAL_AGRONOMIST_QUERIES);
  const [activeTab, setActiveTab] = useState<"farmer" | "expert">(
    user?.role === "agronomist" ? "expert" : "farmer"
  );

  // Farmer New Issue Form State
  const [crop, setCrop] = useState("Rice / Paddy");
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState<"High" | "Medium" | "Low">("Medium");
  const [postSuccess, setPostSuccess] = useState(false);

  // Agronomist Diagnosis Form State
  const [selectedQuery, setSelectedQuery] = useState<AgronomistQuery | null>(null);
  const [diagnosisText, setDiagnosisText] = useState("");
  const [treatmentText, setTreatmentText] = useState("");
  const [diagnosisSuccess, setDiagnosisSuccess] = useState(false);

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    const newQ: AgronomistQuery = {
      id: `AGRO-${Math.floor(500 + Math.random() * 500)}`,
      farmerName: user?.name || "Rajesh Kumar",
      crop,
      symptoms,
      severity,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setQueries([newQ, ...queries]);
    setSymptoms("");
    setPostSuccess(true);
    setTimeout(() => setPostSuccess(false), 3000);
  };

  const handleAgronomistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuery) return;

    setQueries((prev) =>
      prev.map((q) =>
        q.id === selectedQuery.id
          ? {
              ...q,
              status: "answered",
              diagnosis: diagnosisText,
              treatment: treatmentText,
              advisorName: user?.name || "Dr. K. Murugan (Agronomist)",
              resolvedDate: new Date().toISOString().split("T")[0],
            }
          : q
      )
    );

    setDiagnosisSuccess(true);
    setTimeout(() => {
      setDiagnosisSuccess(false);
      setSelectedQuery(null);
      setDiagnosisText("");
      setTreatmentText("");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
            <span>{t("agronomist.title")}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary font-bold border border-theme-primary/30">
              TNAU & ICAR Certified
            </span>
          </h2>
          <p className="text-xs text-theme-muted mt-1">{t("agronomist.subtitle")}</p>
        </div>

        {/* Perspective Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-theme-border bg-theme-card text-xs">
          <button
            onClick={() => setActiveTab("farmer")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === "farmer"
                ? "bg-theme-primary text-theme-bg"
                : "text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("agronomist.postIssue")}
          </button>
          <button
            onClick={() => setActiveTab("expert")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === "expert"
                ? "bg-theme-primary text-theme-bg"
                : "text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("agronomist.expertReview")}
          </button>
        </div>
      </div>

      {activeTab === "farmer" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Post Issue Form */}
          <div className="lg:col-span-1 rounded-2xl border border-theme-border bg-theme-card p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-theme-border pb-3">
              <Stethoscope className="w-5 h-5 text-theme-primary" />
              <h3 className="text-sm font-bold text-theme-text">{t("agronomist.farmerPostTitle")}</h3>
            </div>

            {postSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("agronomist.querySubmitted")}</span>
              </div>
            )}

            <form onSubmit={handleFarmerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("agronomist.cropName")}
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                >
                  <option value="Rice / Paddy">Rice / Paddy (நெல்)</option>
                  <option value="Cotton">Cotton (பருத்தி)</option>
                  <option value="Tomato">Tomato (தக்காளி)</option>
                  <option value="Wheat">Wheat (கோதுமை)</option>
                  <option value="Maize">Maize (மக்காச்சோளம்)</option>
                  <option value="Sugarcane">Sugarcane (கரும்பு)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("agronomist.severity")}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Low", "Medium", "High"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeverity(lvl)}
                      className={`py-1.5 rounded-lg font-bold border transition-colors ${
                        severity === lvl
                          ? "bg-theme-primary text-theme-bg border-theme-primary"
                          : "border-theme-border text-theme-muted hover:text-theme-text"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("agronomist.symptoms")}
                </label>
                <textarea
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe discoloration, insect presence, leaf curling, or stem rotting..."
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text focus:outline-none focus:border-theme-primary"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-theme-primary text-theme-bg font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t("agronomist.submitQuery")}</span>
              </button>
            </form>
          </div>

          {/* Advice History Timeline */}
          <div className="lg:col-span-2 rounded-2xl border border-theme-border bg-theme-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-theme-primary" />
                <h3 className="text-sm font-bold text-theme-text">{t("agronomist.adviceHistory")}</h3>
              </div>
              <span className="text-xs text-theme-muted">{queries.length} Consultations</span>
            </div>

            <div className="space-y-4">
              {queries.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-xl border border-theme-border bg-theme-surface/60 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-theme-text">{q.crop}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            q.severity === "High"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {q.severity} Severity
                        </span>
                      </div>
                      <p className="text-[11px] text-theme-muted mt-0.5">
                        Posted by {q.farmerName} • {q.date}
                      </p>
                    </div>

                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 ${
                        q.status === "answered"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {q.status === "answered" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <HelpCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{t(`agronomist.status.${q.status}`)}</span>
                    </span>
                  </div>

                  <p className="text-xs text-theme-text bg-theme-card p-2.5 rounded-lg border border-theme-border">
                    <strong>Symptoms:</strong> {q.symptoms}
                  </p>

                  {q.status === "answered" && q.diagnosis && (
                    <div className="p-3 rounded-lg bg-theme-primary/10 border border-theme-primary/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-theme-primary font-bold">
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{q.advisorName}</span>
                        </span>
                        <span>{q.resolvedDate}</span>
                      </div>
                      <p>
                        <strong className="text-theme-text">{t("agronomist.diagnosis")}:</strong>{" "}
                        <span className="text-theme-muted">{q.diagnosis}</span>
                      </p>
                      <p>
                        <strong className="text-theme-text">{t("agronomist.treatment")}:</strong>{" "}
                        <span className="text-theme-primary font-medium">{q.treatment}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Agronomist Expert Panel */
        <div className="rounded-2xl border border-theme-border bg-theme-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-theme-primary" />
              <h3 className="text-sm font-bold text-theme-text">Agronomist Clinical Inquiries Queue</h3>
            </div>
            <span className="text-xs text-theme-muted">
              {queries.filter((q) => q.status === "pending").length} Awaiting Diagnosis
            </span>
          </div>

          <div className="space-y-3">
            {queries.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-theme-border bg-theme-surface/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-theme-primary">{q.id}</span>
                    <span className="font-bold text-sm text-theme-text">{q.crop}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        q.severity === "High" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {q.severity}
                    </span>
                  </div>
                  <p className="text-xs text-theme-text line-clamp-2">{q.symptoms}</p>
                  <p className="text-[11px] text-theme-muted">
                    Farmer: {q.farmerName} • Submitted: {q.date}
                  </p>
                </div>

                <div>
                  {q.status === "answered" ? (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold inline-flex items-center gap-1 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Prescribed
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedQuery(q);
                        setDiagnosisText("");
                        setTreatmentText("");
                      }}
                      className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t("agronomist.respondBtn")}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agronomist Diagnosis Prescription Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-theme-primary" />
                <span>{t("agronomist.respondTitle")}</span>
              </h3>
              <button
                onClick={() => setSelectedQuery(null)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {diagnosisSuccess ? (
              <div className="p-6 text-center space-y-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p>{t("agronomist.treatmentSubmitted")}</p>
                <p className="text-xs text-theme-muted">
                  Prescription transmitted directly to {selectedQuery.farmerName} with dosage instructions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAgronomistSubmit} className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-border space-y-1">
                  <p className="font-bold text-theme-text">
                    Crop: {selectedQuery.crop} ({selectedQuery.severity} Severity)
                  </p>
                  <p className="text-theme-muted">Symptoms: {selectedQuery.symptoms}</p>
                </div>

                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    {t("agronomist.diagnosis")}
                  </label>
                  <input
                    type="text"
                    value={diagnosisText}
                    onChange={(e) => setDiagnosisText(e.target.value)}
                    placeholder="e.g. Blossom End Rot due to rapid calcium uptake restriction"
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    {t("agronomist.treatment")} & Precise Dosage
                  </label>
                  <textarea
                    rows={4}
                    value={treatmentText}
                    onChange={(e) => setTreatmentText(e.target.value)}
                    placeholder="Prescribe foliar spray, biological agent, or soil amendments with exact grams/liter and timing..."
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedQuery(null)}
                    className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold"
                  >
                    Confirm & Publish Advice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
