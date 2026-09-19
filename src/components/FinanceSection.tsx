"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  INITIAL_FINANCE_PRODUCTS,
  INITIAL_SEASONAL_ENTRIES,
  FinanceProduct,
  SeasonalFinancialEntry,
} from "@/lib/db";
import {
  Landmark,
  Shield,
  CreditCard,
  Plus,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Percent,
  X,
  FileCheck,
} from "lucide-react";

export const FinanceSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [products] = useState<FinanceProduct[]>(INITIAL_FINANCE_PRODUCTS);
  const [entries, setEntries] = useState<SeasonalFinancialEntry[]>(INITIAL_SEASONAL_ENTRIES);

  // Apply Modal State
  const [selectedProduct, setSelectedProduct] = useState<FinanceProduct | null>(null);
  const [applyAmount, setApplyAmount] = useState<number>(150000);
  const [acres, setAcres] = useState<number>(3);
  const [pattaNumber, setPattaNumber] = useState("TN/TJ/2026/9421");
  const [applySuccess, setApplySuccess] = useState(false);

  // New Income/Expense Entry Form State
  const [entryType, setEntryType] = useState<"income" | "expense">("expense");
  const [entryDesc, setEntryDesc] = useState("");
  const [entryAmount, setEntryAmount] = useState<number>(5000);
  const [entryCategory, setEntryCategory] = useState("Fertilizer & Seeds");

  // Dynamic calculations
  const totalIncome = entries
    .filter((e) => e.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = entries
    .filter((e) => e.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryDesc.trim() || entryAmount <= 0) return;

    const newEntry: SeasonalFinancialEntry = {
      id: `entry-${Date.now()}`,
      userId: user?.id || "user-rajesh",
      type: entryType,
      description: entryDesc,
      amount: entryAmount,
      date: new Date().toISOString().split("T")[0],
      category: entryCategory,
    };

    setEntries([newEntry, ...entries]);
    setEntryDesc("");
    setEntryAmount(5000);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedProduct(null);
    }, 2200);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
          <span>{t("finance.title")}</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary font-bold border border-theme-primary/30">
            RBI & NABARD Compliant
          </span>
        </h2>
        <p className="text-xs text-theme-muted mt-1">{t("finance.subtitle")}</p>
      </div>

      {/* Credit & Insurance Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl border border-theme-border bg-theme-card space-y-4 hover:border-theme-primary/50 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-theme-primary/15 text-theme-primary border border-theme-primary/30">
                  {p.type === "loan" ? <Landmark className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-theme-surface text-theme-muted">
                  {p.type === "loan" ? "Subsidized Loan" : "Crop Insurance"}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-theme-text">{p.title}</h3>
                <p className="text-[11px] text-theme-primary font-semibold mt-0.5">{p.provider}</p>
                <p className="text-xs text-theme-muted mt-2 leading-relaxed">{p.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-theme-surface/70 border border-theme-border text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-theme-muted">{t("finance.interestRate")}:</span>
                  <span className="font-bold text-theme-primary">{p.interestOrPremium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Limit / Cover:</span>
                  <span className="font-semibold text-theme-text">{p.maxAmountOrCover}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">{t("finance.subsidy")}:</span>
                  <span className="font-semibold text-cyan-400">{p.subsidy}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedProduct(p);
                setApplySuccess(false);
              }}
              className="w-full py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{p.type === "loan" ? t("finance.applyLoan") : t("finance.applyInsurance")}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Simple Financial Tool: Seasonal Income & Expense Tracker */}
      <div className="rounded-2xl border border-theme-border bg-theme-card p-5 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border pb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-theme-primary" />
            <div>
              <h3 className="text-base font-bold text-theme-text">{t("finance.seasonalTracker")}</h3>
              <p className="text-xs text-theme-muted">
                {language === "ta"
                  ? "பருவ கால பயிர் சாகுபடி வரவு-செலவு மற்றும் லாப இருப்பு"
                  : "Seasonal farm cash flow ledger and real-time running balance"}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Financial Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-theme-border bg-theme-surface space-y-1">
            <span className="text-xs text-theme-muted flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              {t("finance.totalIncome")}
            </span>
            <p className="text-xl sm:text-2xl font-black text-emerald-400">
              ₹{totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-theme-border bg-theme-surface space-y-1">
            <span className="text-xs text-theme-muted flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
              {t("finance.totalExpense")}
            </span>
            <p className="text-xl sm:text-2xl font-black text-red-400">
              ₹{totalExpense.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-theme-primary/40 bg-theme-primary/10 space-y-1">
            <span className="text-xs text-theme-primary font-bold flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5" />
              {t("finance.runningBalance")}
            </span>
            <p className={`text-xl sm:text-2xl font-black ${netBalance >= 0 ? "text-theme-primary" : "text-red-400"}`}>
              ₹{netBalance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Form to Add Entry + Recent Ledger List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Add Entry Form */}
          <form
            onSubmit={handleAddEntry}
            className="p-4 rounded-xl border border-theme-border bg-theme-surface/70 space-y-3 text-xs"
          >
            <h4 className="font-bold text-sm text-theme-text">{t("finance.addEntry")}</h4>

            <div>
              <label className="block font-semibold text-theme-text mb-1">
                {t("finance.type")}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEntryType("income")}
                  className={`py-1.5 rounded-lg font-bold border transition-colors ${
                    entryType === "income"
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "border-theme-border text-theme-muted hover:text-theme-text"
                  }`}
                >
                  {t("finance.income")}
                </button>
                <button
                  type="button"
                  onClick={() => setEntryType("expense")}
                  className={`py-1.5 rounded-lg font-bold border transition-colors ${
                    entryType === "expense"
                      ? "bg-red-500 text-white border-red-500"
                      : "border-theme-border text-theme-muted hover:text-theme-text"
                  }`}
                >
                  {t("finance.expense")}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-theme-text mb-1">
                {t("finance.itemDesc")}
              </label>
              <input
                type="text"
                placeholder="e.g. 10 Bags DAP, Tractor Diesel, Sowing Labor"
                value={entryDesc}
                onChange={(e) => setEntryDesc(e.target.value)}
                className="w-full rounded-xl border border-theme-border bg-theme-card p-2 text-theme-text"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-theme-text mb-1">
                {t("finance.amount")}
              </label>
              <input
                type="number"
                min="50"
                step="50"
                value={entryAmount}
                onChange={(e) => setEntryAmount(parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-theme-border bg-theme-card p-2 text-theme-text"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-theme-text mb-1">Category</label>
              <select
                value={entryCategory}
                onChange={(e) => setEntryCategory(e.target.value)}
                className="w-full rounded-xl border border-theme-border bg-theme-card p-2 text-theme-text"
              >
                <option value="Fertilizer & Seeds">Fertilizer & Seeds</option>
                <option value="Machinery & Fuel">Machinery & Fuel</option>
                <option value="Labour">Labour Wages</option>
                <option value="Harvest Sale">Harvest Produce Sale</option>
                <option value="Irrigation">Irrigation & Power</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-theme-primary text-theme-bg font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Transaction</span>
            </button>
          </form>

          {/* Ledger Table */}
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-theme-muted border-b border-theme-border">
                <tr>
                  <th className="py-2.5 px-3">{t("myActivity.date")}</th>
                  <th className="py-2.5 px-3">{t("finance.itemDesc")}</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">{t("finance.amount")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-theme-surface/40 transition-colors">
                    <td className="py-2.5 px-3 text-theme-muted">{entry.date}</td>
                    <td className="py-2.5 px-3 font-medium text-theme-text">{entry.description}</td>
                    <td className="py-2.5 px-3 text-[11px] text-theme-muted">{entry.category}</td>
                    <td
                      className={`py-2.5 px-3 text-right font-bold ${
                        entry.type === "income" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {entry.type === "income" ? "+" : "-"}₹{entry.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Credit / Insurance Application Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text flex items-center gap-2">
                <span>{selectedProduct.type === "loan" ? "🏦" : "🛡️"}</span>
                <span>{selectedProduct.title}</span>
              </h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {applySuccess ? (
              <div className="p-6 text-center space-y-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p>Application successfully submitted to {selectedProduct.provider}!</p>
                <p className="text-xs text-theme-muted">
                  Reference ID: <span className="font-mono">AGRI-FIN-{Date.now().toString().slice(-6)}</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    {selectedProduct.type === "loan" ? "Required Credit Amount (₹)" : "Sum Insured (₹)"}
                  </label>
                  <input
                    type="number"
                    value={applyAmount}
                    onChange={(e) => setApplyAmount(parseInt(e.target.value) || 50000)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-theme-text mb-1">
                      {t("finance.landAcres")}
                    </label>
                    <input
                      type="number"
                      value={acres}
                      onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
                      className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-theme-text mb-1">
                      {t("finance.surveyNo")}
                    </label>
                    <input
                      type="text"
                      value={pattaNumber}
                      onChange={(e) => setPattaNumber(e.target.value)}
                      className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-theme-text mb-1">Aadhaar Linked Phone</label>
                  <input
                    type="text"
                    defaultValue="+91 94432 10850"
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold"
                  >
                    Submit Application
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
