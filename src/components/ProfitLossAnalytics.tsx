"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { BUSINESS_PNL_DATA } from "@/lib/db";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  PieChart as PieIcon,
  TrendingUp,
  TrendingDown,
  Building2,
  DollarSign,
  Receipt,
  Layers,
} from "lucide-react";

export const ProfitLossAnalytics: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedBusiness, setSelectedBusiness] = useState<string>("user-greenfoods");
  const [timePeriod, setTimePeriod] = useState<"weekly" | "monthly" | "quarterly">("monthly");

  const businessEntry = BUSINESS_PNL_DATA[selectedBusiness] || BUSINESS_PNL_DATA["user-greenfoods"];
  const currentPeriodData = businessEntry[timePeriod];

  // Auto-calculated fields as mandated: Net Profit/Loss = Revenue - Expenses
  const revenue = currentPeriodData.revenue;
  const expenses = currentPeriodData.expenses;
  const netProfitLoss = revenue - expenses;
  const transactionsCount = currentPeriodData.transactions;

  // Colors for Pie/Donut chart
  const PIE_COLORS = ["#22c55e", "#06b6d4", "#f59e0b", "#ec4899", "#8b5cf6"];

  return (
    <div className="rounded-2xl border border-theme-border bg-theme-card p-5 sm:p-6 space-y-6 shadow-card">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-theme-border pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-theme-text flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-theme-primary" />
            <span>{t("profitLoss.title")}</span>
          </h3>
          <p className="text-xs text-theme-muted mt-1">{t("profitLoss.subtitle")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Business Enterprise Selector */}
          <div className="relative">
            <select
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              aria-label={t("profitLoss.selectBusiness")}
              className="rounded-xl border border-theme-border bg-theme-surface px-3 py-1.5 text-xs font-bold text-theme-text shadow-sm focus:outline-none focus:border-theme-primary"
            >
              <option value="user-greenfoods">Green Foods Pvt Ltd (Buyer)</option>
              <option value="user-freshmart">FreshMart Retail Chain (Retailer)</option>
              <option value="user-organicbuyers">Organic Buyers Co (Buyer)</option>
            </select>
          </div>

          {/* Time Period Filter: Weekly / Monthly / Quarterly */}
          <div className="flex items-center rounded-xl border border-theme-border bg-theme-surface p-1 text-xs">
            <button
              onClick={() => setTimePeriod("weekly")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                timePeriod === "weekly" ? "bg-theme-primary text-theme-bg" : "text-theme-muted"
              }`}
            >
              {t("profitLoss.weekly")}
            </button>
            <button
              onClick={() => setTimePeriod("monthly")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                timePeriod === "monthly" ? "bg-theme-primary text-theme-bg" : "text-theme-muted"
              }`}
            >
              {t("profitLoss.monthly")}
            </button>
            <button
              onClick={() => setTimePeriod("quarterly")}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                timePeriod === "quarterly" ? "bg-theme-primary text-theme-bg" : "text-theme-muted"
              }`}
            >
              {t("profitLoss.quarterly")}
            </button>
          </div>
        </div>
      </div>

      {/* Auto-Calculated Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-4 rounded-xl border border-theme-border bg-theme-surface space-y-1">
          <span className="text-xs text-theme-muted flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            {t("profitLoss.totalRevenue")}
          </span>
          <p className="text-2xl font-black text-theme-text">₹{revenue.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-400 font-semibold">Total inflow across channels</p>
        </div>

        {/* Total Expenses */}
        <div className="p-4 rounded-xl border border-theme-border bg-theme-surface space-y-1">
          <span className="text-xs text-theme-muted flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            {t("profitLoss.totalExpenses")}
          </span>
          <p className="text-2xl font-black text-red-400">₹{expenses.toLocaleString()}</p>
          <p className="text-[10px] text-theme-muted">Input, labor, logistics, storage</p>
        </div>

        {/* Net Profit / Loss (Auto-Calculated) */}
        <div className="p-4 rounded-xl border border-theme-primary/40 bg-theme-primary/10 space-y-1">
          <span className="text-xs text-theme-primary font-bold flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            {t("profitLoss.netProfitLoss")}
          </span>
          <p
            className={`text-2xl font-black ${
              netProfitLoss >= 0 ? "text-theme-primary" : "text-red-400"
            }`}
          >
            ₹{netProfitLoss.toLocaleString()}
          </p>
          <p className="text-[10px] text-theme-muted">Auto: Revenue − Operating Expenses</p>
        </div>

        {/* Transactions Count */}
        <div className="p-4 rounded-xl border border-theme-border bg-theme-surface space-y-1">
          <span className="text-xs text-theme-muted flex items-center gap-1">
            <Receipt className="w-3.5 h-3.5 text-cyan-400" />
            {t("profitLoss.transactionsCount")}
          </span>
          <p className="text-2xl font-black text-theme-text">{transactionsCount}</p>
          <p className="text-[10px] text-theme-muted">Fully reconciled ledger entries</p>
        </div>
      </div>

      {/* Charts Row: Trend Line Chart + Category Breakdown Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Profit & Loss Trend Line Chart */}
        <div className="lg:col-span-2 p-4 rounded-2xl border border-theme-border bg-theme-surface/50 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-theme-text">{t("profitLoss.trendChartTitle")}</h4>
            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Revenue
              </span>
              <span className="flex items-center gap-1 text-red-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                Expenses
              </span>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentPeriodData.trend} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.15)" />
                <XAxis
                  dataKey="label"
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                  domain={["auto", "auto"]}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-theme-border bg-theme-card p-3 shadow-xl text-xs space-y-1">
                          <p className="font-bold text-theme-text">{label}</p>
                          <p className="text-emerald-400 font-bold">
                            Revenue: ₹{payload[0].value?.toLocaleString()}
                          </p>
                          {payload[1] && (
                            <p className="text-red-400 font-bold">
                              Expenses: ₹{payload[1].value?.toLocaleString()}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ fill: "#22c55e", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ fill: "#ef4444", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Category Breakdown Donut / Pie Chart */}
        <div className="p-4 rounded-2xl border border-theme-border bg-theme-surface/50 space-y-3 flex flex-col justify-between">
          <h4 className="text-xs font-bold text-theme-text">{t("profitLoss.categoryBreakdown")}</h4>

          <div className="w-full h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentPeriodData.categories}
                  dataKey="value"
                  nameKey="nameKey"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {currentPeriodData.categories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      stroke="var(--bg-card)"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `₹${Number(value).toLocaleString()}`,
                    t(name),
                  ]}
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                    borderRadius: "12px",
                    color: "var(--text-main)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-[11px] pt-2 border-t border-theme-border">
            {currentPeriodData.categories.map((cat, idx) => (
              <div key={cat.nameKey} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-theme-muted">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                  />
                  <span>{t(cat.nameKey)}</span>
                </span>
                <span className="font-bold text-theme-text">₹{cat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
