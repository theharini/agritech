"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { INITIAL_EQUIPMENT, EquipmentItem } from "@/lib/db";
import {
  Wrench,
  Calendar,
  CheckCircle,
  PlusCircle,
  MapPin,
  Tag,
  Shield,
  X,
  Clock,
  DollarSign,
} from "lucide-react";

export const EquipmentSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [filterType, setFilterType] = useState<"all" | "rent" | "buy">("all");

  // Booking Modal State
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const [bookingDays, setBookingDays] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>("2026-09-21");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Add Equipment Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Tractor & Tillage");
  const [newRate, setNewRate] = useState(800);
  const [newIsRent, setNewIsRent] = useState(true);
  const [newIsSale, setNewIsSale] = useState(false);
  const [newSalePrice, setNewSalePrice] = useState(650000);
  const [newSpecs, setNewSpecs] = useState("45 HP, heavy-duty hitch");

  const filtered = equipmentList.filter((item) => {
    if (filterType === "rent") return item.isRental;
    if (filterType === "buy") return item.isSale;
    return true;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedItem(null);
    }, 2200);
  };

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: EquipmentItem = {
      id: `eq-${Date.now()}`,
      name: newName,
      category: newCategory,
      isRental: newIsRent,
      isSale: newIsSale,
      rentalRate: newRate,
      rentalUnit: "hour",
      purchasePrice: newIsSale ? newSalePrice : undefined,
      supplier: "AgriEquip Hub",
      location: "Salem Region",
      image: "🚜",
      specs: newSpecs,
      available: true,
    };
    setEquipmentList([newItem, ...equipmentList]);
    setShowAddModal(false);
    setNewName("");
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
            <span>{t("equipment.title")}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              {language === "ta" ? "இயந்திர வாடகை மையம்" : "Mechanization Desk"}
            </span>
          </h2>
          <p className="text-xs text-theme-muted mt-1">{t("equipment.subtitle")}</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t("equipment.listEquipment")}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterType("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterType === "all"
              ? "bg-theme-primary text-theme-bg"
              : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
          }`}
        >
          {t("common.all")} ({equipmentList.length})
        </button>
        <button
          onClick={() => setFilterType("rent")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterType === "rent"
              ? "bg-theme-primary text-theme-bg"
              : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
          }`}
        >
          {t("equipment.forRent")}
        </button>
        <button
          onClick={() => setFilterType("buy")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            filterType === "buy"
              ? "bg-theme-primary text-theme-bg"
              : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
          }`}
        >
          {t("equipment.forBuy")}
        </button>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl border border-theme-border bg-theme-card space-y-3 hover:border-theme-primary/50 transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-full h-28 rounded-xl bg-theme-surface flex items-center justify-center text-4xl border border-theme-border/60">
                {item.image}
              </div>

              <div className="pt-3 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-theme-primary">
                  {item.category}
                </span>
                <h3 className="font-bold text-sm text-theme-text line-clamp-1">{item.name}</h3>
                <p className="text-[11px] text-theme-muted line-clamp-2">{item.specs}</p>
              </div>

              <div className="pt-3 border-t border-theme-border mt-3 space-y-1 text-xs">
                {item.isRental && (
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-theme-muted text-[11px]">Rental:</span>
                    <span className="text-theme-primary">
                      ₹{item.rentalRate} / {item.rentalUnit}
                    </span>
                  </div>
                )}
                {item.isSale && item.purchasePrice && (
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-theme-muted text-[11px]">Purchase:</span>
                    <span className="text-cyan-400">
                      ₹{(item.purchasePrice / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-[11px] text-theme-muted pt-1">
                  <MapPin className="w-3 h-3 text-theme-primary" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedItem(item)}
                className="w-full py-2 rounded-xl bg-theme-surface border border-theme-border hover:border-theme-primary text-theme-text text-xs font-bold hover:bg-theme-hover transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-theme-primary" />
                <span>{item.isRental ? t("equipment.bookRental") : t("equipment.buyNow")}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text flex items-center gap-2">
                <span>{selectedItem.image}</span>
                <span>{selectedItem.name}</span>
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <p>{t("equipment.bookingSuccess")}</p>
                <p className="text-xs text-theme-muted">
                  Supplier {selectedItem.supplier} will confirm delivery to your farm location.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    Start Date of Operation
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-theme-text mb-1">
                      Required Duration ({selectedItem.rentalUnit}s)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={bookingDays}
                      onChange={(e) => setBookingDays(parseInt(e.target.value) || 1)}
                      className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-theme-text mb-1">
                      Est. Total Cost
                    </label>
                    <div className="w-full rounded-xl border border-theme-border bg-theme-surface/70 p-2.5 font-bold text-theme-primary">
                      ₹{(selectedItem.rentalRate * bookingDays).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    Farm Location & Plot Number
                  </label>
                  <input
                    type="text"
                    defaultValue="Survey No. 142/B, Orathanadu Block, Thanjavur"
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold"
                  >
                    Confirm Rental Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* List Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text">{t("equipment.addTitle")}</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEquipment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("equipment.name")}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kubota MU4501 4WD Tractor"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    {t("equipment.category")}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  >
                    <option value="Tractor & Tillage">Tractor & Tillage</option>
                    <option value="Drone Technology">Drone Technology</option>
                    <option value="Harvesting">Harvesting</option>
                    <option value="Irrigation Kit">Irrigation Kit</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    Rental Rate (₹ / hour)
                  </label>
                  <input
                    type="number"
                    value={newRate}
                    onChange={(e) => setNewRate(parseInt(e.target.value) || 500)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("equipment.specs")}
                </label>
                <textarea
                  rows={2}
                  value={newSpecs}
                  onChange={(e) => setNewSpecs(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  required
                />
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
