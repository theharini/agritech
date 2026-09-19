"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  ShoppingBag,
  Search,
  CheckCircle,
  Truck,
  ShieldCheck,
  Send,
  X,
  MapPin,
  Box,
} from "lucide-react";

interface SupplierItem {
  id: string;
  name: string;
  location: string;
  products: ("rice" | "wheat" | "vegetables" | "fruits" | "corn")[];
  productName: string;
  minOrder: string;
  stockAvailable: string;
  pricePerUnit: string;
  cooperativeRating: number;
  icon: string;
}

const SUPPLIERS: SupplierItem[] = [
  {
    id: "sup-1",
    name: "Cauvery Delta Paddy Cooperative",
    location: "Thanjavur, Tamil Nadu",
    products: ["rice"],
    productName: "Organic Ponni Raw Rice & Boiled Rice",
    minOrder: "20 Quintals",
    stockAvailable: "450 Quintals",
    pricePerUnit: "₹38 / kg wholesale",
    cooperativeRating: 4.9,
    icon: "🌾",
  },
  {
    id: "sup-2",
    name: "Malwa Golden Wheat Producers Co",
    location: "Coimbatore Hub Depot",
    products: ["wheat"],
    productName: "Sharbati Gold MP Wheat & Stone Ground Atta",
    minOrder: "15 Quintals",
    stockAvailable: "320 Quintals",
    pricePerUnit: "₹34 / kg wholesale",
    cooperativeRating: 4.8,
    icon: "🍞",
  },
  {
    id: "sup-3",
    name: "Nilgiris & Oddanchatram Fresh Veg Collective",
    location: "Dindigul & Coimbatore",
    products: ["vegetables"],
    productName: "Country Tomatoes, Ridge Gourd, Green Chillies, Beans",
    minOrder: "10 Crates (250 kg)",
    stockAvailable: "85 Crates ready today",
    pricePerUnit: "₹24 / kg bulk avg",
    cooperativeRating: 4.9,
    icon: "🥦",
  },
  {
    id: "sup-4",
    name: "Dharmapuri & Krishnagiri Orchard Orchards",
    location: "Krishnagiri, Tamil Nadu",
    products: ["fruits"],
    productName: "Alphonso & Banginapalli Mangoes, Pomegranate",
    minOrder: "500 Kg",
    stockAvailable: "2.5 Tons",
    pricePerUnit: "₹65 / kg graded",
    cooperativeRating: 4.7,
    icon: "🍎",
  },
  {
    id: "sup-5",
    name: "Kongu Hybrid Corn & Millet Society",
    location: "Tiruppur, Tamil Nadu",
    products: ["corn"],
    productName: "Sweet Corn & Hybrid Yellow Feed Maize",
    minOrder: "25 Quintals",
    stockAvailable: "600 Quintals",
    pricePerUnit: "₹22 / kg",
    cooperativeRating: 4.6,
    icon: "🌽",
  },
];

export const GrocerySection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierItem | null>(null);
  const [orderAmount, setOrderAmount] = useState<number>(10);
  const [requestSubmitted, setRequestSubmitted] = useState<boolean>(false);

  const filtered = SUPPLIERS.filter((s) => {
    const matchesCategory =
      activeCategory === "all" ||
      s.products.includes(activeCategory as "rice" | "wheat" | "vegetables" | "fruits" | "corn");
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setSelectedSupplier(null);
    }, 2200);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
          <span>{t("grocery.title")}</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
            {language === "ta" ? "நேரடி மளிகை கொள்முதல்" : "Farm to Shelf"}
          </span>
        </h2>
        <p className="text-xs text-theme-muted mt-1">{t("grocery.subtitle")}</p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", labelKey: "grocery.categories.all" },
            { id: "rice", labelKey: "grocery.categories.rice" },
            { id: "wheat", labelKey: "grocery.categories.wheat" },
            { id: "vegetables", labelKey: "grocery.categories.vegetables" },
            { id: "fruits", labelKey: "grocery.categories.fruits" },
            { id: "corn", labelKey: "grocery.categories.corn" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === cat.id
                  ? "bg-theme-primary text-theme-bg"
                  : "border border-theme-border bg-theme-card text-theme-muted hover:text-theme-text"
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-theme-muted" />
          <input
            type="text"
            placeholder={t("grocery.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-theme-border bg-theme-surface text-xs text-theme-text focus:outline-none focus:border-theme-primary"
          />
        </div>
      </div>

      {/* Suppliers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-2xl border border-theme-border bg-theme-card space-y-4 hover:border-theme-primary/50 transition-all flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-theme-surface flex items-center justify-center text-2xl border border-theme-border">
                  {s.icon}
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-theme-primary/15 text-theme-primary text-[11px] font-bold border border-theme-primary/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>★ {s.cooperativeRating}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm text-theme-text">{s.name}</h3>
                <p className="text-[11px] text-theme-muted flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-theme-primary" />
                  {s.location}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-theme-surface/70 border border-theme-border text-xs space-y-1.5">
                <p className="font-semibold text-theme-text">{s.productName}</p>
                <div className="flex justify-between text-theme-muted text-[11px]">
                  <span>{t("grocery.minOrder")}:</span>
                  <span className="font-medium text-theme-text">{s.minOrder}</span>
                </div>
                <div className="flex justify-between text-theme-muted text-[11px]">
                  <span>{t("grocery.inStock")}:</span>
                  <span className="font-medium text-theme-text">{s.stockAvailable}</span>
                </div>
                <div className="flex justify-between text-theme-primary font-bold text-xs pt-1 border-t border-theme-border">
                  <span>Price:</span>
                  <span>{s.pricePerUnit}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedSupplier(s)}
              className="w-full py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t("grocery.requestSupply")}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Request Supply Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text flex items-center gap-2">
                <span>{selectedSupplier.icon}</span>
                <span>{t("grocery.supplyModalTitle")}</span>
              </h3>
              <button
                onClick={() => setSelectedSupplier(null)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="p-6 text-center space-y-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <p>{t("grocery.requestSuccess")}</p>
                <p className="text-xs text-theme-muted">
                  The cooperative logistics desk will confirm dispatch timetable and invoice.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-3 text-xs">
                <div>
                  <p className="text-theme-text font-bold">{selectedSupplier.name}</p>
                  <p className="text-theme-muted text-[11px]">{selectedSupplier.productName}</p>
                </div>

                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    {t("grocery.orderQuantity")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(parseInt(e.target.value) || 5)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                  <p className="text-[10px] text-theme-muted mt-1">
                    Min requirement: {selectedSupplier.minOrder}
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    Retail Delivery Store Address
                  </label>
                  <input
                    type="text"
                    defaultValue="FreshMart Store #14, Gandhipuram, Coimbatore"
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSupplier(null)}
                    className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold"
                  >
                    {t("grocery.confirmOrder")}
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
