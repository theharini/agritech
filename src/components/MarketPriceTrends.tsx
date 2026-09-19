"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { CROP_PRICE_DATA, CropPriceData } from "@/lib/db";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
} from "lucide-react";

export const MarketPriceTrends: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCropKey, setSelectedCropKey] = useState<string>("wheat");
  const [timeframe, setTimeframe] = useState<"daily" | "weekly">("daily");

  const cropData: CropPriceData = CROP_PRICE_DATA[selectedCropKey] || CROP_PRICE_DATA.wheat;
  const chartData = timeframe === "daily" ? cropData.dailyData : cropData.weeklyData;

  const isIncreasing = cropData.trend === "increasing";

  return (
    <div className="rounded-2xl border border-theme-border bg-theme-card p-5 sm:p-6 space-y-6 shadow-card">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-theme-border pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-theme-text flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-theme-primary" />
            <span>{t("marketTrends.title")}</span>
          </h3>
          <p className="text-xs text-theme-muted mt-1">{t("marketTrends.subtitle")}</p>
        </div>

        {/* Timeframe & Crop Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Daily / Weekly Toggle */}
          <div className="flex items-center rounded-xl border border-theme-border bg-theme-surface p-1 text-xs">
            <button
              onClick={() => setTimeframe("daily")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                timeframe === "daily" ? "bg-theme-primary text-theme-bg" : "text-theme-muted"
              }`}
            >
              {t("marketTrends.daily")}
            </button>
            <button
              onClick={() => setTimeframe("weekly")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                timeframe === "weekly" ? "bg-theme-primary text-theme-bg" : "text-theme-muted"
              }`}
            >
              {t("marketTrends.weekly")}
            </button>
          </div>

          {/* Crop Selector Buttons */}
          <div className="flex items-center gap-1">
            {(["wheat", "rice", "maize", "cotton"] as const).map((cKey) => (
              <button
                key={cKey}
                onClick={() => setSelectedCropKey(cKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors capitalize ${
                  selectedCropKey === cKey
                    ? "bg-theme-primary text-theme-bg shadow-sm"
                    : "border border-theme-border bg-theme-surface text-theme-muted hover:text-theme-text"
                }`}
              >
                {t(`marketTrends.crops.${cKey}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-theme-border bg-theme-surface">
          <p className="text-xs text-theme-muted">{t("marketTrends.currentPrice")}</p>
          <p className="text-2xl font-black text-theme-primary mt-1">
            ₹{cropData.currentPrice.toLocaleString()}
          </p>
          <p className="text-[10px] text-theme-muted mt-0.5">per Quintal (100 kg)</p>
        </div>

        <div className="p-4 rounded-xl border border-theme-border bg-theme-surface">
          <p className="text-xs text-theme-muted">{t("marketTrends.priceChange")}</p>
          <div className="flex items-center gap-1.5 mt-1">
            {isIncreasing ? (
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-red-400" />
            )}
            <span
              className={`text-2xl font-black ${
                isIncreasing ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {cropData.change > 0 ? `+${cropData.change}%` : `${cropData.change}%`}
            </span>
          </div>
          <p className="text-[10px] text-theme-muted mt-0.5">Rolling 24 Hours</p>
        </div>

        <div className="p-4 rounded-xl border border-theme-border bg-theme-surface">
          <p className="text-xs text-theme-muted">Trend Direction</p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase inline-flex items-center gap-1 ${
                isIncreasing
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {isIncreasing ? (
                <>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t("marketTrends.trendIncreasing")}</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{t("marketTrends.trendDecreasing")}</span>
                </>
              )}
            </span>
          </div>
          <p className="text-[10px] text-theme-muted mt-0.5">Based on mandi arrival volume</p>
        </div>

        <div className="p-4 rounded-xl border border-theme-border bg-theme-surface">
          <p className="text-xs text-theme-muted">APMC Mandi Benchmark</p>
          <p className="text-2xl font-black text-theme-text mt-1">
            ₹{cropData.mandiBenchmark.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3 h-3" />
            <span>Fair Trade Floor Price</span>
          </p>
        </div>
      </div>

      {/* Recharts Responsive Line Chart */}
      <div className="p-4 rounded-2xl border border-theme-border bg-theme-surface/50">
        <h4 className="text-xs font-bold text-theme-text mb-4 flex items-center gap-2">
          <span>{t("marketTrends.chartTitle")}</span>
          <span className="text-[10px] text-theme-muted font-normal">
            ({timeframe === "daily" ? "Past 7 Days" : "5-Week Moving Average"})
          </span>
        </h4>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.15)" />
              <XAxis
                dataKey="date"
                stroke="var(--text-muted)"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="var(--text-muted)"
                fontSize={11}
                tickLine={false}
                domain={["auto", "auto"]}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl border border-theme-border bg-theme-card p-3 shadow-xl text-xs space-y-1">
                        <p className="font-bold text-theme-text">{label}</p>
                        <p className="text-theme-primary font-black text-sm">
                          ₹{payload[0].value?.toLocaleString()} / qtl
                        </p>
                        <p className="text-[10px] text-theme-muted">Commodity: {cropData.id.toUpperCase()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ fill: "var(--primary)", r: 5, strokeWidth: 2, stroke: "var(--bg-main)" }}
                activeDot={{ r: 7, stroke: "var(--primary)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
