"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ActionPayload } from "@/lib/mission/types";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  X,
  Truck,
  IndianRupee,
  Clock,
  Building2,
  Lock,
} from "lucide-react";

interface ActionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionPayload?: ActionPayload;
  onApprove: () => void;
  onModify: () => void;
}

export const ActionPreviewModal: React.FC<ActionPreviewModalProps> = ({
  isOpen,
  onClose,
  actionPayload,
  onApprove,
  onModify,
}) => {
  const { language } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !actionPayload) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onApprove();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-3xl border border-theme-border bg-theme-card shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-theme-border bg-gradient-to-r from-theme-surface to-theme-card flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-theme-text">
                  {language === "ta" ? "செயல் முன்னோட்டம்" : "Action Preview"}
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  {language === "ta" ? "ஒப்புதல் தேவை" : "Approval Required"}
                </span>
              </div>
              <p className="text-xs text-theme-muted">
                {language === "ta" ? actionPayload.actionTitleTa : actionPayload.actionTitleEn}
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

        {/* Content Details */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Main Target Card */}
          <div className="p-4 rounded-2xl border border-theme-border bg-theme-surface/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-theme-text">
                <Building2 className="w-4 h-4 text-theme-primary" />
                <span>{actionPayload.targetName}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-500 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                {actionPayload.buyerReliability}% {language === "ta" ? "நம்பகத்தன்மை" : "Reliability"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-theme-card border border-theme-border/60">
                <span className="text-[10px] text-theme-muted block">
                  {language === "ta" ? "விற்பனை அளவு" : "Batch Quantity"}
                </span>
                <span className="font-extrabold text-theme-text text-sm">
                  {actionPayload.quantity.toLocaleString()} {actionPayload.unit}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-theme-card border border-theme-border/60">
                <span className="text-[10px] text-theme-muted block">
                  {language === "ta" ? "வாங்குபவர் விலை" : "Buyer Gross Offer"}
                </span>
                <span className="font-extrabold text-theme-text text-sm">
                  ₹{actionPayload.grossOfferPerUnit}/{actionPayload.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Deductions & Net Realization */}
          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2.5">
            <span className="text-xs font-bold text-theme-muted uppercase tracking-wider block">
              {language === "ta" ? "நிகர வருவாய் கணக்கீடு" : "Net Realization Breakdown"}
            </span>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-theme-muted">
                <span>{language === "ta" ? "மொத்த விலை மதிப்பு" : "Gross Contract Value"}</span>
                <span className="font-semibold text-theme-text">
                  ₹{actionPayload.grossTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-theme-muted">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  {language === "ta" ? "சரக்குப் போக்குவரத்து கழிவு" : "Estimated Freight Tariff"}
                </span>
                <span className="font-semibold text-amber-500">
                  - ₹{actionPayload.transportCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-theme-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  {language === "ta" ? "விநியோக கால அளவு" : "Delivery Window"}
                </span>
                <span className="font-semibold text-theme-text">{actionPayload.deliveryWindow}</span>
              </div>
              <div className="pt-2 border-t border-theme-border flex justify-between items-baseline">
                <span className="font-extrabold text-theme-text text-sm">
                  {language === "ta" ? "நிகர விவசாய வருவாய்" : "Expected Net Farmer Realization"}
                </span>
                <span className="font-black text-emerald-500 text-lg">
                  ₹{actionPayload.netRealization.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Warnings */}
          {actionPayload.riskWarnings.length > 0 && (
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                <AlertTriangle className="w-4 h-4" />
                <span>{language === "ta" ? "அபாய எச்சரிக்கைகள்" : "Active Risk Disclosures"}</span>
              </div>
              <ul className="space-y-1">
                {actionPayload.riskWarnings.map((warn, i) => (
                  <li key={i} className="text-[11px] text-theme-muted list-disc list-inside">
                    {warn}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safe Action Gate Notice */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-theme-surface border border-theme-border text-[11px] text-theme-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              {language === "ta"
                ? "மனித ஒப்புதல் உத்தரவாதம்: உங்கள் வெளிப்படையான ஒப்புதல் இன்றி கொள்முதல் ஆணை அனுப்பப்பட மாட்டாது."
                : "Safe Action Gate Guarantee: Consequential transaction requests are never dispatched without explicit farmer consent."}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 border-t border-theme-border bg-theme-surface flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-theme-muted hover:text-theme-text hover:bg-theme-card transition-colors"
          >
            {language === "ta" ? "ரத்து செய்" : "Cancel"}
          </button>
          <button
            onClick={onModify}
            className="px-4 py-2 rounded-xl border border-theme-border bg-theme-card text-xs font-bold text-theme-text hover:border-theme-primary transition-colors"
          >
            {language === "ta" ? "மாற்றியமைக்க" : "Modify"}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-extrabold hover:bg-emerald-600 transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            {isProcessing ? (
              <span>{language === "ta" ? "செயல்படுகிறது..." : "Securing..."}</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === "ta" ? "செயலை அங்கீகரிக்கவும்" : "Approve Action"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
