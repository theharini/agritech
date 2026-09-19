"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  INITIAL_PRODUCE_LISTINGS,
  INITIAL_BUYER_REQUESTS,
  ProduceListing,
  BuyerRequest,
  CROP_PRICE_DATA,
} from "@/lib/db";
import {
  Activity,
  CheckCircle,
  PlusCircle,
  TrendingUp,
  Tag,
  Store,
  Check,
  ShieldCheck,
  MapPin,
  Clock,
} from "lucide-react";

export const FarmersSection: React.FC<{ onNavigateToMarket?: () => void }> = ({
  onNavigateToMarket,
}) => {
  const { t, language } = useLanguage();
  const [listings, setListings] = useState<ProduceListing[]>(INITIAL_PRODUCE_LISTINGS);
  const [requests, setRequests] = useState<BuyerRequest[]>(INITIAL_BUYER_REQUESTS);
  const [acceptedId, setAcceptedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Harvest Listing Form State
  const [newCrop, setNewCrop] = useState("Paddy (Deluxe Ponni)");
  const [newQuantity, setNewQuantity] = useState(30);
  const [newPrice, setNewPrice] = useState(2320);

  const handleAcceptOffer = (requestId: string) => {
    setAcceptedId(requestId);
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "accepted" } : r))
    );
    setTimeout(() => setAcceptedId(null), 3500);
  };

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: ProduceListing = {
      id: `prod-${Date.now()}`,
      farmerId: "user-rajesh",
      farmerName: "Rajesh Kumar",
      crop: newCrop,
      variety: "Organic Verified Grade-A",
      quantity: newQuantity,
      unit: "Quintals",
      farmerPrice: newPrice,
      mandiPrice: 2250,
      isFairPrice: newPrice >= 2250,
      location: "Thanjavur, Tamil Nadu",
      harvestDate: new Date().toISOString().split("T")[0],
    };
    setListings([newEntry, ...listings]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
            <span>{t("farmers.title")}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              {language === "ta" ? "நேரலை கண்காணிப்பு" : "Active Dashboard"}
            </span>
          </h2>
          <p className="text-xs text-theme-muted mt-1">{t("farmers.subtitle")}</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t("farmers.newListing")}</span>
        </button>
      </div>

      {/* Real-time Crop Health & Soil Monitoring Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-theme-muted">{t("farmers.soilMoisture")}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              Optimal
            </span>
          </div>
          <p className="text-2xl font-black text-theme-text">68%</p>
          <div className="w-full bg-theme-surface h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[68%] rounded-full" />
          </div>
          <p className="text-[11px] text-theme-muted">Cauvery Delta plot #4 • TNAU Sensor probe</p>
        </div>

        <div className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-theme-muted">{t("farmers.cropHealth")}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">
              High Vigour
            </span>
          </div>
          <p className="text-2xl font-black text-theme-text">92 / 100</p>
          <div className="w-full bg-theme-surface h-2 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full w-[92%] rounded-full" />
          </div>
          <p className="text-[11px] text-theme-muted">Satellite NDVI chlorophyll index verified</p>
        </div>

        <div className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-theme-muted">{t("farmers.fairPriceIndicator")}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-theme-primary/20 text-theme-primary font-bold">
              +4.8% Premium
            </span>
          </div>
          <p className="text-2xl font-black text-theme-primary">₹2,300 / qtl</p>
          <p className="text-xs text-theme-muted">
            {t("farmers.mandiRate")}: ₹2,250 • {t("farmers.farmerRate")}: ₹2,300
          </p>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t("farmers.fairPriceBadge")}</span>
          </p>
        </div>
      </div>

      {/* Direct Market Access: Incoming Buyer Requests Feed */}
      <div className="rounded-2xl border border-theme-border bg-theme-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-theme-border pb-3">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-theme-primary" />
            <h3 className="text-sm font-bold text-theme-text">{t("farmers.directMarketAccess")}</h3>
          </div>
          <span className="text-xs text-theme-muted">
            {requests.filter((r) => r.status === "open").length} {language === "ta" ? "நேரலை தேவைகள்" : "Active Inquiries"}
          </span>
        </div>

        <div className="space-y-3">
          {requests.map((req) => {
            const isAccepted = req.status === "accepted";
            return (
              <div
                key={req.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isAccepted
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-theme-border bg-theme-surface/70 hover:border-theme-primary/50"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-theme-text">{req.crop}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-theme-primary/20 text-theme-primary font-bold">
                      {req.requiredQuantity}
                    </span>
                  </div>
                  <p className="text-xs text-theme-muted">
                    <strong className="text-theme-text">{req.buyerName}</strong> • {req.location}
                  </p>
                  <p className="text-xs text-theme-primary font-semibold">
                    {t("farmers.offeredPrice")}: ₹{req.offeredPrice.toLocaleString()} / quintal
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isAccepted ? (
                    <span className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30">
                      <Check className="w-3.5 h-3.5" />
                      <span>{t("farmers.offerAccepted")}</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcceptOffer(req.id)}
                      className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm"
                    >
                      {t("farmers.acceptOffer")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farmer's Active Produce Listings with Fair Price Benchmark */}
      <div className="rounded-2xl border border-theme-border bg-theme-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-theme-border pb-3">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-theme-primary" />
            <h3 className="text-sm font-bold text-theme-text">
              {language === "ta" ? "விவசாயியின் நேரலை விளைபொருட்கள் பட்டியல்" : "Farmer Direct Produce Listings"}
            </h3>
          </div>
          {onNavigateToMarket && (
            <button
              onClick={onNavigateToMarket}
              className="text-xs font-semibold text-theme-primary hover:underline flex items-center gap-1"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t("nav.market")}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-theme-border bg-theme-surface/60 space-y-2 hover:border-theme-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-theme-text">{item.crop}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  {t("farmers.fairPriceBadge")}
                </span>
              </div>
              <p className="text-xs text-theme-muted">{item.variety}</p>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-theme-border/60">
                <span className="text-theme-muted">
                  {item.quantity} {item.unit} available
                </span>
                <span className="font-bold text-theme-primary text-sm">
                  ₹{item.farmerPrice.toLocaleString()} / qtl
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-theme-muted">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Harvest: {item.harvestDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: List New Harvest */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-theme-text">{t("farmers.newListing")}</h3>
            <form onSubmit={handleAddListing} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("farmers.crop")}
                </label>
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-theme-text mb-1">Quantity (qtl)</label>
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(parseInt(e.target.value) || 10)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-theme-text mb-1">Ask Price (₹/qtl)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseInt(e.target.value) || 2200)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold"
                >
                  {t("common.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
