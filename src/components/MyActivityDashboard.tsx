"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import {
  INITIAL_TRANSACTIONS,
  DEMO_USERS,
  Transaction,
  UserProfile,
} from "@/lib/db";
import {
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  ArrowUpDown,
  User,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export const MyActivityDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, switchUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [filterType, setFilterType] = useState<"all" | "sold" | "purchased">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const currentUserId = user?.id || "user-rajesh";

  // Filter transactions belonging to the selected user
  const userTransactions = transactions.filter((t) => t.userId === currentUserId);

  // Dynamic calculations as mandated:
  // 1. Items Sold (count and aggregate sum)
  const soldTxns = userTransactions.filter((t) => t.type === "sold");
  const itemsSoldCount = soldTxns.length;
  const itemsSoldTotal = soldTxns.reduce((sum, item) => sum + item.amount, 0);

  // 2. Items Purchased (count and aggregate sum)
  const purchasedTxns = userTransactions.filter((t) => t.type === "purchased");
  const itemsPurchasedCount = purchasedTxns.length;
  const itemsPurchasedTotal = purchasedTxns.reduce((sum, item) => sum + item.amount, 0);

  // 3. Total Revenue (for farmers: sum of sold; for buyers: turnover; overall net turnover)
  const totalRevenue = itemsSoldTotal > 0 ? itemsSoldTotal : itemsPurchasedTotal;

  // Filter & Sort table items
  const displayTxns = userTransactions
    .filter((t) => {
      if (filterType === "sold") return t.type === "sold";
      if (filterType === "purchased") return t.type === "purchased";
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-8">
      {/* Section Header & User Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
            <span>{t("myActivity.title")}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-theme-primary/20 text-theme-primary font-bold border border-theme-primary/30">
              Live Commercial Ledger
            </span>
          </h2>
          <p className="text-xs text-theme-muted mt-1">{t("myActivity.subtitle")}</p>
        </div>

        {/* User Profile Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-theme-muted hidden sm:inline">
            {t("myActivity.selectUser")}:
          </label>
          <div className="relative">
            <select
              value={currentUserId}
              onChange={(e) => switchUser(e.target.value)}
              aria-label={t("myActivity.selectUser")}
              className="rounded-xl border border-theme-border bg-theme-card px-3 py-2 text-xs font-bold text-theme-text shadow-sm focus:outline-none focus:border-theme-primary"
            >
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.avatar} {u.name} ({u.role.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards (Dynamically calculated from stored transactions) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Items Sold Card */}
        <div className="p-5 rounded-2xl border border-theme-border bg-theme-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-theme-muted">{t("myActivity.itemsSold")}</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-theme-text">{itemsSoldCount}</p>
          <p className="text-xs text-emerald-400 font-semibold">
            Value: ₹{itemsSoldTotal.toLocaleString()}
          </p>
          <p className="text-[10px] text-theme-muted">
            Auto-aggregated from {soldTxns.length} completed trade entries
          </p>
        </div>

        {/* Items Purchased Card */}
        <div className="p-5 rounded-2xl border border-theme-border bg-theme-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-theme-muted">{t("myActivity.itemsPurchased")}</span>
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-theme-text">{itemsPurchasedCount}</p>
          <p className="text-xs text-blue-400 font-semibold">
            Value: ₹{itemsPurchasedTotal.toLocaleString()}
          </p>
          <p className="text-[10px] text-theme-muted">
            Procurement & farm inputs dynamically totaled
          </p>
        </div>

        {/* Total Revenue Card */}
        <div className="p-5 rounded-2xl border border-theme-primary/40 bg-theme-primary/10 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-theme-primary">{t("myActivity.totalRevenue")}</span>
            <div className="p-2 rounded-xl bg-theme-primary text-theme-bg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-theme-primary">
            ₹{totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-theme-text font-medium">
            Active entity: <span className="font-bold">{user?.name}</span>
          </p>
          <p className="text-[10px] text-theme-muted">
            Dynamic ledger balance across all settlement dates
          </p>
        </div>
      </div>

      {/* Recent Transactions List with Filter and Sort */}
      <div className="rounded-2xl border border-theme-border bg-theme-card p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme-border pb-3">
          <div>
            <h3 className="text-sm font-bold text-theme-text">{t("myActivity.recentTransactions")}</h3>
            <p className="text-xs text-theme-muted">
              Showing {displayTxns.length} records for {user?.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Pills */}
            <div className="flex items-center rounded-xl border border-theme-border bg-theme-surface p-1 text-xs">
              <button
                onClick={() => setFilterType("all")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  filterType === "all" ? "bg-theme-primary text-theme-bg font-bold" : "text-theme-muted"
                }`}
              >
                {t("myActivity.filterAll")}
              </button>
              <button
                onClick={() => setFilterType("sold")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  filterType === "sold" ? "bg-theme-primary text-theme-bg font-bold" : "text-theme-muted"
                }`}
              >
                {t("myActivity.filterSold")}
              </button>
              <button
                onClick={() => setFilterType("purchased")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  filterType === "purchased" ? "bg-theme-primary text-theme-bg font-bold" : "text-theme-muted"
                }`}
              >
                {t("myActivity.filterPurchased")}
              </button>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="p-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs font-semibold text-theme-text hover:border-theme-primary transition-colors flex items-center gap-1"
              title="Toggle Date Sort Order"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-theme-primary" />
              <span className="hidden sm:inline">
                {sortOrder === "desc" ? t("myActivity.sortNewest") : t("myActivity.sortOldest")}
              </span>
            </button>
          </div>
        </div>

        {displayTxns.length === 0 ? (
          <div className="p-8 text-center text-xs text-theme-muted">
            {t("myActivity.noTransactions")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-theme-muted border-b border-theme-border bg-theme-surface/50">
                <tr>
                  <th className="py-2.5 px-3">{t("myActivity.transactionId")}</th>
                  <th className="py-2.5 px-3">{t("myActivity.item")}</th>
                  <th className="py-2.5 px-3">{t("myActivity.type")}</th>
                  <th className="py-2.5 px-3">{t("myActivity.date")}</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3 text-right">{t("myActivity.amount")}</th>
                  <th className="py-2.5 px-3 text-center">{t("common.status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {displayTxns.map((txn) => (
                  <tr key={txn.id} className="hover:bg-theme-surface/40 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-theme-muted">{txn.id}</td>
                    <td className="py-3 px-3 font-bold text-theme-text">{txn.item}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
                          txn.type === "sold"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {txn.type === "sold" ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownLeft className="w-3 h-3" />
                        )}
                        <span>{txn.type}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-theme-muted">{txn.date}</td>
                    <td className="py-3 px-3 font-medium text-theme-text">{txn.quantity}</td>
                    <td
                      className={`py-3 px-3 text-right font-black text-sm ${
                        txn.type === "sold" ? "text-emerald-400" : "text-blue-400"
                      }`}
                    >
                      {txn.type === "sold" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-theme-surface text-theme-muted">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
