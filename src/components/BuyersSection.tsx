"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  INITIAL_PRODUCE_LISTINGS,
  INITIAL_BULK_ORDERS,
  ProduceListing,
  BulkOrder,
} from "@/lib/db";
import {
  ShoppingBag,
  Truck,
  Calendar,
  Phone,
  CheckCircle,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  X,
} from "lucide-react";

export const BuyersSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [produceList, setProduceList] = useState<ProduceListing[]>(INITIAL_PRODUCE_LISTINGS);
  const [orders, setOrders] = useState<BulkOrder[]>(INITIAL_BULK_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");

  // Contact Modal State
  const [contactFarmer, setContactFarmer] = useState<ProduceListing | null>(null);
  const [contactSent, setContactSent] = useState(false);

  // Delivery Scheduling Modal State
  const [scheduleOrder, setScheduleOrder] = useState<BulkOrder | null>(null);
  const [newDeliveryDate, setNewDeliveryDate] = useState("2026-09-25");
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // New Bulk Order Modal State
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [selectedProduce, setSelectedProduce] = useState("Paddy (Ponni Raw)");
  const [orderQty, setOrderQty] = useState("40 Quintals");
  const [orderAmount, setOrderAmount] = useState(92000);
  const [orderFarmer, setOrderFarmer] = useState("Rajesh Kumar");
  const [orderDestination, setOrderDestination] = useState("Central Distribution Hub, Chennai");

  const filteredProduce = produceList.filter((p) =>
    p.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactFarmer(null);
    }, 2000);
  };

  const handleUpdateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleOrder) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === scheduleOrder.id
          ? { ...o, deliveryDate: newDeliveryDate, status: "Scheduled" }
          : o
      )
    );
    setScheduleSuccess(true);
    setTimeout(() => {
      setScheduleSuccess(false);
      setScheduleOrder(null);
    }, 2000);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: BulkOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerName: "Green Foods Pvt Ltd",
      farmerName: orderFarmer,
      produce: selectedProduce,
      quantity: orderQty,
      totalAmount: orderAmount,
      deliveryDate: "2026-09-28",
      destination: orderDestination,
      status: "Confirmed",
    };
    setOrders([newOrder, ...orders]);
    setShowNewOrderModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-theme-text flex items-center gap-2">
            <span>{t("buyers.title")}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
              {language === "ta" ? "நேரடி கொள்முதல்" : "Wholesale Hub"}
            </span>
          </h2>
          <p className="text-xs text-theme-muted mt-1">{t("buyers.subtitle")}</p>
        </div>

        <button
          onClick={() => setShowNewOrderModal(true)}
          className="px-4 py-2.5 rounded-xl bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t("buyers.createOrder")}</span>
        </button>
      </div>

      {/* Verified Produce Listings */}
      <div className="rounded-2xl border border-theme-border bg-theme-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme-border pb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-theme-primary" />
            <h3 className="text-sm font-bold text-theme-text">{t("buyers.browseProduce")}</h3>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-theme-muted" />
            <input
              type="text"
              placeholder={t("common.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-theme-border bg-theme-surface text-xs text-theme-text focus:outline-none focus:border-theme-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProduce.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-theme-border bg-theme-surface/70 space-y-3 hover:border-theme-primary/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-theme-text">{p.crop}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="text-xs text-theme-muted mt-0.5">{p.variety}</p>

                <div className="mt-3 p-2.5 rounded-lg bg-theme-card border border-theme-border text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-theme-muted">{t("buyers.farmer")}:</span>
                    <span className="font-semibold text-theme-text">{p.farmerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">{t("buyers.quantity")}:</span>
                    <span className="font-semibold text-theme-text">{p.quantity} {p.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-theme-muted">Mandi Avg:</span>
                    <span className="text-theme-muted line-through">₹{p.mandiPrice}</span>
                  </div>
                  <div className="flex justify-between text-theme-primary font-bold">
                    <span>Direct Price:</span>
                    <span>₹{p.farmerPrice} / qtl</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setContactFarmer(p)}
                className="w-full py-2 rounded-xl bg-theme-card border border-theme-border hover:border-theme-primary text-theme-text text-xs font-bold hover:bg-theme-surface transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-theme-primary" />
                <span>{t("buyers.contact")}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Order Management Table */}
      <div className="rounded-2xl border border-theme-border bg-theme-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-theme-border pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-theme-primary" />
            <h3 className="text-sm font-bold text-theme-text">{t("buyers.bulkOrders")}</h3>
          </div>
          <span className="text-xs text-theme-muted">{orders.length} Orders Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-theme-muted border-b border-theme-border bg-theme-surface/50">
              <tr>
                <th className="py-2.5 px-3">{t("buyers.orderId")}</th>
                <th className="py-2.5 px-3">{t("buyers.produce")}</th>
                <th className="py-2.5 px-3">{t("buyers.farmer")}</th>
                <th className="py-2.5 px-3">{t("buyers.quantity")}</th>
                <th className="py-2.5 px-3">{t("buyers.total")}</th>
                <th className="py-2.5 px-3">{t("buyers.date")}</th>
                <th className="py-2.5 px-3">{t("common.status")}</th>
                <th className="py-2.5 px-3 text-right">{t("common.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-theme-surface/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-theme-text">{ord.id}</td>
                  <td className="py-3 px-3 font-semibold text-theme-text">{ord.produce}</td>
                  <td className="py-3 px-3 text-theme-muted">{ord.farmerName}</td>
                  <td className="py-3 px-3 font-medium text-theme-text">{ord.quantity}</td>
                  <td className="py-3 px-3 font-bold text-theme-primary">
                    ₹{ord.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-theme-muted">{ord.deliveryDate}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.status === "Delivered"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : ord.status === "In Transit"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setScheduleOrder(ord);
                        setNewDeliveryDate(ord.deliveryDate);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-theme-border bg-theme-surface text-[11px] font-semibold text-theme-text hover:border-theme-primary transition-colors inline-flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3 text-theme-primary" />
                      <span>{t("buyers.schedule")}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Farmer Modal */}
      {contactFarmer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text flex items-center gap-2">
                <Phone className="w-4 h-4 text-theme-primary" />
                <span>Connect with {contactFarmer.farmerName}</span>
              </h3>
              <button
                onClick={() => setContactFarmer(null)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {contactSent ? (
              <div className="p-6 text-center space-y-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <p>Inquiry successfully routed! Farmer notified via SMS.</p>
              </div>
            ) : (
              <form onSubmit={handleSendContact} className="space-y-3 text-xs">
                <div>
                  <p className="text-theme-muted mb-2">
                    Inquiring about <strong>{contactFarmer.crop}</strong> ({contactFarmer.quantity} {contactFarmer.unit}) at ₹{contactFarmer.farmerPrice}/qtl.
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-theme-text mb-1">Your Procurement Message</label>
                  <textarea
                    rows={3}
                    defaultValue="Interested in purchasing batch with immediate truck dispatch to Chennai. Please confirm available pickup timing."
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactFarmer(null)}
                    className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold"
                  >
                    Send Direct Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delivery Scheduling Modal */}
      {scheduleOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text flex items-center gap-2">
                <Calendar className="w-4 h-4 text-theme-primary" />
                <span>{t("buyers.deliveryScheduling")}</span>
              </h3>
              <button
                onClick={() => setScheduleOrder(null)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {scheduleSuccess ? (
              <div className="p-6 text-center space-y-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <p>Delivery schedule updated and logistics dispatch confirmed!</p>
              </div>
            ) : (
              <form onSubmit={handleUpdateSchedule} className="space-y-3 text-xs">
                <div>
                  <p className="text-theme-muted">
                    Order <strong>{scheduleOrder.id}</strong> — {scheduleOrder.produce} ({scheduleOrder.quantity})
                  </p>
                </div>
                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    {t("buyers.dispatchDate")}
                  </label>
                  <input
                    type="date"
                    value={newDeliveryDate}
                    onChange={(e) => setNewDeliveryDate(e.target.value)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-theme-text mb-1">
                    {t("buyers.destination")}
                  </label>
                  <input
                    type="text"
                    defaultValue={scheduleOrder.destination}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setScheduleOrder(null)}
                    className="px-4 py-2 rounded-xl border border-theme-border text-theme-muted"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-theme-primary text-theme-bg font-bold"
                  >
                    Confirm Schedule
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* New Bulk Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-theme-border bg-theme-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-sm font-bold text-theme-text">{t("buyers.createOrder")}</h3>
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-theme-text mb-1">Commodity / Produce</label>
                <input
                  type="text"
                  value={selectedProduce}
                  onChange={(e) => setSelectedProduce(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-theme-text mb-1">Quantity</label>
                  <input
                    type="text"
                    value={orderQty}
                    onChange={(e) => setOrderQty(e.target.value)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-theme-text mb-1">Total (₹)</label>
                  <input
                    type="number"
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(parseInt(e.target.value) || 50000)}
                    className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-theme-text mb-1">Farmer / Entity</label>
                <input
                  type="text"
                  value={orderFarmer}
                  onChange={(e) => setOrderFarmer(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-theme-text mb-1">Delivery Destination</label>
                <input
                  type="text"
                  value={orderDestination}
                  onChange={(e) => setOrderDestination(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2.5 text-theme-text"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
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
