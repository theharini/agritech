"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/lib/db";
import {
  User,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { t, language } = useLanguage();
  const { login, register, switchUser, demoUsers } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserProfile["role"]>("farmer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in email and password.");
      return;
    }
    setLoading(true);
    await login(email);
    setLoading(false);
    setSuccessMsg("Successfully authenticated! JWT Session active.");
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    }, 1200);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError("Please fill in all registration fields.");
      return;
    }
    setLoading(true);
    await register(name, email, role, phone);
    setLoading(false);
    setSuccessMsg("Account successfully registered! JWT Session active.");
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    }, 1200);
  };

  const handleDemoSelect = (userId: string) => {
    switchUser(userId);
    setSuccessMsg("Logged in with Demo Account!");
    setTimeout(() => {
      setSuccessMsg("");
      onClose();
      if (onLoginSuccess) onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl border border-theme-border bg-theme-card p-6 sm:p-8 shadow-2xl space-y-5 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-theme-border pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-theme-text">
              {tab === "login" ? t("auth.login") : t("auth.register")}
            </h3>
            <p className="text-xs text-theme-muted mt-0.5">
              {tab === "login" ? t("auth.loginSubtitle") : t("auth.registerSubtitle")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-theme-muted hover:text-theme-text p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Login / Register */}
        <div className="flex items-center rounded-2xl border border-theme-border bg-theme-surface p-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setError("");
            }}
            className={`w-1/2 py-2 rounded-xl font-bold transition-all ${
              tab === "login" ? "bg-theme-primary text-theme-bg shadow-sm" : "text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("nav.login")}
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setError("");
            }}
            className={`w-1/2 py-2 rounded-xl font-bold transition-all ${
              tab === "register" ? "bg-theme-primary text-theme-bg shadow-sm" : "text-theme-muted hover:text-theme-text"
            }`}
          >
            {t("nav.register")}
          </button>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        {tab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-theme-text mb-1">
                {t("auth.email")}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-theme-muted" />
                <input
                  type="email"
                  placeholder="rajesh.farmer@agritech.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-theme-border bg-theme-surface text-theme-text focus:outline-none focus:border-theme-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-theme-text mb-1">
                {t("auth.password")}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-theme-muted" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-theme-border bg-theme-surface text-theme-text focus:outline-none focus:border-theme-primary"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-theme-primary text-theme-bg font-bold text-xs hover:bg-theme-primary-hover transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? t("common.loading") : t("auth.submitLogin")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-theme-text mb-1">
                {t("auth.fullName")}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-theme-muted" />
                <input
                  type="text"
                  placeholder="e.g. Ramesh Velu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-theme-border bg-theme-surface text-theme-text focus:outline-none focus:border-theme-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-theme-text mb-1">
                {t("auth.role")}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full rounded-xl border border-theme-border bg-theme-surface p-2 text-theme-text focus:outline-none focus:border-theme-primary font-medium"
              >
                <option value="farmer">{t("auth.roles.farmer")}</option>
                <option value="buyer">{t("auth.roles.buyer")}</option>
                <option value="equipment">{t("auth.roles.equipment")}</option>
                <option value="grocery">{t("auth.roles.grocery")}</option>
                <option value="agronomist">{t("auth.roles.agronomist")}</option>
                <option value="finance">{t("auth.roles.finance")}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("auth.email")}
                </label>
                <input
                  type="email"
                  placeholder="user@agritech.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2 text-theme-text focus:outline-none focus:border-theme-primary"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-theme-text mb-1">
                  {t("auth.phone")}
                </label>
                <input
                  type="tel"
                  placeholder="+91 98400 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-theme-border bg-theme-surface p-2 text-theme-text focus:outline-none focus:border-theme-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-theme-text mb-1">
                {t("auth.password")}
              </label>
              <input
                type="password"
                placeholder="Choose password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-theme-border bg-theme-surface p-2 text-theme-text focus:outline-none focus:border-theme-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-theme-primary text-theme-bg font-bold text-xs hover:bg-theme-primary-hover transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? t("common.loading") : t("auth.submitRegister")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Instant Single-Click Demo Accounts */}
        <div className="pt-4 border-t border-theme-border space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
            <span>{t("auth.demoLoginTitle")}</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {demoUsers.slice(0, 6).map((du) => (
              <button
                key={du.id}
                type="button"
                onClick={() => handleDemoSelect(du.id)}
                className="p-2 rounded-xl border border-theme-border bg-theme-surface hover:border-theme-primary text-left text-xs transition-colors flex items-center gap-2"
              >
                <span className="text-base">{du.avatar}</span>
                <div className="truncate">
                  <p className="font-bold text-theme-text truncate">{du.name}</p>
                  <p className="text-[10px] text-theme-primary capitalize">{du.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
