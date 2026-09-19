"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { X, Calculator, Sprout, CheckCircle2, RefreshCw } from "lucide-react";

interface FertilizerRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FertilizerRecommendationModal: React.FC<FertilizerRecommendationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage();
  const [crop, setCrop] = useState<string>("rice");
  const [soil, setSoil] = useState<string>("alluvial");
  const [landSize, setLandSize] = useState<number>(2);
  const [result, setResult] = useState<{
    npkPerAcre: string;
    totalNPK: { n: number; p: number; k: number };
    totalCompost: number;
    irrigation: string;
    note: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const acres = Math.max(0.25, landSize);

    // Baseline NPK kg/acre
    let baseN = 120;
    let baseP = 40;
    let baseK = 40;
    let compostPerAcre = 5; // tons
    let irrigationEn = "Maintain 2-5 cm standing water layer during tillering and panicle stage.";
    let irrigationTa = "தூர்கட்டும் மற்றும் பால்பிடிக்கும் பருவத்தில் 2-5 செ.மீ நீர் தேங்க வேண்டும்.";
    let noteEn = "Apply Nitrogen in 3 splits (basal, active tillering, panicle initiation).";
    let noteTa = "தழைச்சத்தை 3 தவணைகளாக (அடியுரம், தூர் கட்டும்போது, கதிர் வரும்போது) பிரிக்கவும்.";

    if (crop === "wheat") {
      baseN = 100;
      baseP = 60;
      baseK = 40;
      compostPerAcre = 4;
      irrigationEn = "Provide 4-5 irrigations: CRI stage (21 days), tillering, flowering, and grain filling.";
      irrigationTa = "4-5 பாசனங்கள்: கிரவுன் வேர் கட்டும் பருவம் (21 நாள்), தூர் கட்டுதல், பூக்கும் தருணம், தானியம் திரளும் பருவம்.";
      noteEn = "Apply all P & K at basal sowing; top dress N with first irrigation.";
      noteTa = "பாஸ்பரஸ் மற்றும் பொட்டாஷ் முழுவதையும் அடியுரமாக இடவும்; தழைச்சத்தை முதல் பாசனத்தின் போது இடவும்.";
    } else if (crop === "maize") {
      baseN = 135;
      baseP = 62;
      baseK = 50;
      compostPerAcre = 4.5;
      irrigationEn = "Irrigate once every 10-12 days; prevent waterlogging around roots.";
      irrigationTa = "10-12 நாட்களுக்கு ஒருமுறை பாசனம்; வேர் பகுதியில் நீர் தேங்காமல் பார்த்துக் கொள்ளவும்.";
      noteEn = "Apply Zinc Sulphate @ 10 kg/acre to prevent khaira leaf chlorosis.";
      noteTa = "துத்தநாக பற்றாக்குறையை தடுக்க ஏக்கருக்கு 10 கிலோ ஜிங்க் சல்பேட் இடவும்.";
    } else if (crop === "cotton") {
      baseN = 80;
      baseP = 40;
      baseK = 40;
      compostPerAcre = 4;
      irrigationEn = "Provide alternate furrow irrigation during flowering and boll formation.";
      irrigationTa = "பூக்கும் மற்றும் காய் பிடிக்கும் பருவத்தில் ஒரு சால் விட்டு ஒரு சால் முறையில் பாசனம் செய்யவும்.";
      noteEn = "Foliar spray with 0.5% Magnesium Sulphate + 0.1% Borax at peak square formation.";
      noteTa = "சதுர அரும்புகள் தோன்றும் போது 0.5% மெக்னீசியம் சல்பேட் + 0.1% போராக்ஸ் தெளிக்கவும்.";
    } else if (crop === "sugarcane") {
      baseN = 275;
      baseP = 65;
      baseK = 115;
      compostPerAcre = 10;
      irrigationEn = "Regular irrigation every 7-10 days depending on soil moisture.";
      irrigationTa = "மண்ணின் ஈரப்பதத்தைப் பொறுத்து 7-10 நாட்களுக்கு ஒருமுறை முறையான பாசனம்.";
      noteEn = "Complete final N application within 90 days of planting.";
      noteTa = "நட்ட 90 நாட்களுக்குள் தழைச்சத்து இடுவதை முழுமையாக முடிக்கவும்.";
    } else if (crop === "tomato") {
      baseN = 150;
      baseP = 100;
      baseK = 100;
      compostPerAcre = 8;
      irrigationEn = "Drip irrigation with fertigation at 3-day intervals.";
      irrigationTa = "சொட்டு நீர்ப் பாசனம் மூலம் 3 நாட்களுக்கு ஒருமுறை உரப்பாசனம் செய்யவும்.";
      noteEn = "Foliar spray of Calcium Nitrate @ 2g/L to prevent blossom end rot.";
      noteTa = "பழ அழுகல் நோயைத் தடுக்க கால்சியம் நைட்ரேட் லிட்டருக்கு 2 கிராம் வீதம் தெளிக்கவும்.";
    }

    // Soil adjustments
    if (soil === "sandy") {
      noteEn += " In sandy soil, split Nitrogen into 4 light doses to prevent leaching.";
      noteTa += " மணல் கலந்த மண்ணில் தழைச்சத்தை 4 தவணைகளாக பிரித்து இடவும்.";
    } else if (soil === "clay") {
      noteEn += " In heavy clay, provide deep drainage ditches to avoid root asphyxiation.";
      noteTa += " களிமண் நிலங்களில் வேர் அழுகலைத் தடுக்க முறையான வடிகால் வாய்க்கால் அமைக்கவும்.";
    }

    setResult({
      npkPerAcre: `${baseN} : ${baseP} : ${baseK} (N-P-K kg/acre)`,
      totalNPK: {
        n: Math.round(baseN * acres),
        p: Math.round(baseP * acres),
        k: Math.round(baseK * acres),
      },
      totalCompost: Number((compostPerAcre * acres).toFixed(1)),
      irrigation: language === "ta" ? irrigationTa : irrigationEn,
      note: language === "ta" ? noteTa : noteEn,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-theme-border">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-theme-primary/20 text-theme-primary flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-theme-text">{t("fertilizer.title")}</h3>
              <p className="text-xs text-theme-muted">{t("fertilizer.subtitle")}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCalculate} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-semibold text-theme-text mb-1.5">
                {t("fertilizer.cropType")}
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full rounded-xl border border-theme-border bg-theme-surface px-3 py-2.5 text-xs text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
              >
                <option value="rice">{t("fertilizer.crops.rice")}</option>
                <option value="wheat">{t("fertilizer.crops.wheat")}</option>
                <option value="maize">{t("fertilizer.crops.maize")}</option>
                <option value="cotton">{t("fertilizer.crops.cotton")}</option>
                <option value="sugarcane">{t("fertilizer.crops.sugarcane")}</option>
                <option value="tomato">{t("fertilizer.crops.tomato")}</option>
              </select>
            </div>

            {/* Soil Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-theme-text mb-1.5">
                {t("fertilizer.soilType")}
              </label>
              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                className="w-full rounded-xl border border-theme-border bg-theme-surface px-3 py-2.5 text-xs text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
              >
                <option value="alluvial">{t("fertilizer.soils.alluvial")}</option>
                <option value="black">{t("fertilizer.soils.black")}</option>
                <option value="red">{t("fertilizer.soils.red")}</option>
                <option value="clay">{t("fertilizer.soils.clay")}</option>
                <option value="sandy">{t("fertilizer.soils.sandy")}</option>
              </select>
            </div>
          </div>

          {/* Land Size Input */}
          <div>
            <label className="block text-xs font-semibold text-theme-text mb-1.5">
              {t("fertilizer.landSize")}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.25"
                max="500"
                step="0.25"
                value={landSize}
                onChange={(e) => setLandSize(parseFloat(e.target.value) || 1)}
                className="w-full rounded-xl border border-theme-border bg-theme-surface px-3 py-2.5 text-xs text-theme-text focus:outline-none focus:border-theme-primary transition-colors pr-16"
              />
              <span className="absolute right-3 top-2.5 text-xs text-theme-muted pointer-events-none">
                {t("fertilizer.acres")}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setCrop("rice");
                setSoil("alluvial");
                setLandSize(2);
                setResult(null);
              }}
              className="px-4 py-2 rounded-xl border border-theme-border text-xs font-medium text-theme-muted hover:text-theme-text hover:bg-theme-surface transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t("fertilizer.reset")}</span>
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-md flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{t("fertilizer.calculate")}</span>
            </button>
          </div>
        </form>

        {/* Output Result Card */}
        {result && (
          <div className="mt-6 p-4 rounded-xl border border-theme-primary/40 bg-theme-primary/10 animate-in fade-in zoom-in-95 duration-150 space-y-3">
            <div className="flex items-center gap-2 text-theme-primary font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <h4>{t("fertilizer.resultTitle")}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-theme-card border border-theme-border text-center">
                <p className="text-[11px] text-theme-muted">Nitrogen (N)</p>
                <p className="text-base font-extrabold text-theme-primary">{result.totalNPK.n} kg</p>
                <p className="text-[10px] text-theme-muted mt-0.5">Urea / DAP split</p>
              </div>
              <div className="p-3 rounded-lg bg-theme-card border border-theme-border text-center">
                <p className="text-[11px] text-theme-muted">Phosphorus (P)</p>
                <p className="text-base font-extrabold text-theme-primary">{result.totalNPK.p} kg</p>
                <p className="text-[10px] text-theme-muted mt-0.5">Single Super Phosphate</p>
              </div>
              <div className="p-3 rounded-lg bg-theme-card border border-theme-border text-center">
                <p className="text-[11px] text-theme-muted">Potassium (K)</p>
                <p className="text-base font-extrabold text-theme-primary">{result.totalNPK.k} kg</p>
                <p className="text-[10px] text-theme-muted mt-0.5">Muriate of Potash</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-theme-card border border-theme-border text-xs space-y-1.5">
              <p>
                <strong className="text-theme-text">{t("fertilizer.recommendedNPK")}:</strong>{" "}
                <span className="text-theme-primary font-semibold">{result.npkPerAcre}</span>
              </p>
              <p>
                <strong className="text-theme-text">{t("fertilizer.organicCompost")}:</strong>{" "}
                <span className="text-theme-primary font-semibold">{result.totalCompost} Tons (FYM / Vermicompost)</span>
              </p>
              <p>
                <strong className="text-theme-text">{t("fertilizer.irrigationSchedule")}:</strong>{" "}
                <span className="text-theme-muted">{result.irrigation}</span>
              </p>
              <p>
                <strong className="text-theme-text">{t("fertilizer.notes")}:</strong>{" "}
                <span className="text-theme-muted">{result.note}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
