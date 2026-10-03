"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { MissionAuditItem, FreshnessLabel } from "@/lib/mission/types";
import {
  ListChecks,
  X,
  Clock,
  Database,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

interface MissionAuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditTrail: MissionAuditItem[];
  missionName: string;
}

export const MissionAuditTrailModal: React.FC<MissionAuditTrailModalProps> = ({
  isOpen,
  onClose,
  auditTrail,
  missionName,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const getBadgeStyle = (freshness: FreshnessLabel) => {
    switch (freshness) {
      case "LIVE":
        return "bg-emerald-500/15 text-emerald-500 border-emerald-500/30";
      case "RECENT":
        return "bg-cyan-500/15 text-cyan-500 border-cyan-500/30";
      case "SIMULATED":
        return "bg-amber-500/15 text-amber-500 border-amber-500/30";
      case "ESTIMATED":
        return "bg-purple-500/15 text-purple-500 border-purple-500/30";
      case "USER PROVIDED":
        return "bg-blue-500/15 text-blue-500 border-blue-500/30";
      default:
        return "bg-gray-500/15 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl border border-theme-border bg-theme-card shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-theme-border bg-gradient-to-r from-theme-surface to-theme-card flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-theme-primary/10 border border-theme-primary/30 flex items-center justify-center text-theme-primary">
              <ListChecks className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-theme-text">
                  {language === "ta" ? "பணி தணிக்கை சுவடு" : "Mission Audit Trail"}
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary border border-theme-primary/30">
                  {language === "ta" ? "சரிபார்க்கப்பட்டது" : "Factual Trace"}
                </span>
              </div>
              <p className="text-xs text-theme-muted">{missionName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-theme-muted hover:text-theme-text hover:bg-theme-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Factual Trace Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="p-3.5 rounded-xl border border-theme-border bg-theme-surface/50 text-xs text-theme-muted flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
            <span>
              {language === "ta"
                ? "வெளிப்படையான தணிக்கை சுவடு: மறைமுக ஊகங்களின்றி, ஒவ்வொரு முடிவின் சான்றுகளும் மூலமும் கால முத்திரையுடன் துல்லியமாக பதிவு செய்யப்பட்டுள்ளன."
                : "Deterministic verification trace: Every reasoning step discloses its exact data origin, freshness grade, and execution timestamp without hidden hallucinations."}
            </span>
          </div>

          <div className="space-y-3.5 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-theme-border before:z-0">
            {auditTrail.map((item) => (
              <div key={item.stepNumber} className="relative z-10 flex items-start gap-3.5">
                {/* Step circle */}
                <div className="w-10 h-10 rounded-2xl bg-theme-card border-2 border-theme-border flex items-center justify-center font-black text-xs text-theme-primary shrink-0 shadow-sm">
                  {item.stepNumber}
                </div>

                {/* Step content card */}
                <div className="flex-1 p-4 rounded-2xl border border-theme-border bg-theme-surface/80 space-y-2 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-xs font-extrabold text-theme-text flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {language === "ta" ? item.actionNameTa : item.actionNameEn}
                    </h4>
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${getBadgeStyle(
                        item.freshness
                      )}`}
                    >
                      {item.freshness}
                    </span>
                  </div>

                  <p className="text-[11px] text-theme-muted leading-relaxed">
                    {language === "ta" ? item.detailsTa : item.detailsEn}
                  </p>

                  <div className="pt-2 border-t border-theme-border/50 flex flex-wrap items-center justify-between text-[10px] text-theme-muted gap-2">
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3 text-theme-primary" />
                      {item.sourceType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-theme-muted" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-theme-border bg-theme-surface flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm"
          >
            {language === "ta" ? "மூடுக" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};
