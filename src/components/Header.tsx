"use client";

import React, { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme, ThemeType } from "@/theme/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import {
  Sprout,
  Sun,
  Moon,
  Droplets,
  Zap,
  Globe,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sparkles,
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openAuthModal,
}) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, logout, switchUser, demoUsers } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: "home", labelKey: "nav.home" },
    { id: "missionControl", labelKey: "nav.missionControl", badge: "Agent" },
    { id: "evaluationLab", labelKey: "nav.evaluationLab", badge: "Lab" },
    { id: "about", labelKey: "nav.about" },
    { id: "blog", labelKey: "nav.blog" },
    { id: "agNews", labelKey: "nav.agNews" },
    { id: "schemes", labelKey: "nav.schemes" },
    { id: "forum", labelKey: "nav.forum" },
    { id: "services", labelKey: "nav.services" },
    { id: "myActivity", labelKey: "nav.myActivity" },
    { id: "market", labelKey: "nav.market" },
    { id: "analytics", labelKey: "nav.analytics" },
    { id: "faq", labelKey: "nav.faq" },
  ];

  const themes: { id: ThemeType; labelKey: string; icon: React.ReactNode; color: string }[] = [
    { id: "light", labelKey: "nav.themeLight", icon: <Sun className="w-4 h-4" />, color: "bg-emerald-500" },
    { id: "dark", labelKey: "nav.themeDark", icon: <Moon className="w-4 h-4" />, color: "bg-gray-800" },
    { id: "ocean", labelKey: "nav.themeOcean", icon: <Droplets className="w-4 h-4" />, color: "bg-cyan-500" },
    { id: "neon", labelKey: "nav.themeNeon", icon: <Zap className="w-4 h-4" />, color: "bg-lime-400" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-theme-border bg-theme-bg/95 backdrop-blur supports-[backdrop-filter]:bg-theme-bg/85 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-theme-primary/20 border border-theme-primary/40 flex items-center justify-center text-theme-primary group-hover:scale-105 transition-transform shadow-sm">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-theme-text flex items-center gap-1">
                Agri<span className="text-theme-primary">Tech</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-theme-primary/20 text-theme-primary border border-theme-primary/30">
                  {language === "ta" ? "வேளாண்" : "Pro"}
                </span>
              </span>
              <p className="text-[10px] text-theme-muted hidden sm:block">
                {language === "ta" ? "ஒருங்கிணைந்த வேளாண் தளம்" : "Unified Agricultural Ecosystem"}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-theme-primary text-theme-bg shadow-sm"
                      : item.id === "missionControl"
                      ? "text-theme-primary bg-theme-primary/10 hover:bg-theme-primary/20"
                      : item.id === "evaluationLab"
                      ? "text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
                      : "text-theme-muted hover:text-theme-text hover:bg-theme-surface"
                  }`}
                >
                  <span>{t(item.labelKey)}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                        isActive
                          ? "bg-black/20 text-white"
                          : item.id === "missionControl"
                          ? "bg-theme-primary/20 text-theme-primary"
                          : "bg-cyan-500/20 text-cyan-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme, Language, User, Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "ta" : "en")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-theme-border bg-theme-card text-xs font-bold text-theme-text hover:border-theme-primary transition-colors shadow-sm"
              title="Toggle Language / மொழியை மாற்ற"
            >
              <Globe className="w-3.5 h-3.5 text-theme-primary" />
              <span className={language === "ta" ? "text-theme-primary" : ""}>
                {language === "en" ? "தமிழ்" : "English"}
              </span>
            </button>

            {/* Theme Dropdown */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-theme-border bg-theme-card text-xs font-medium text-theme-text hover:border-theme-primary transition-colors shadow-sm capitalize"
                title="Select Theme"
              >
                {theme === "light" && <Sun className="w-3.5 h-3.5 text-amber-500" />}
                {theme === "dark" && <Moon className="w-3.5 h-3.5 text-emerald-400" />}
                {theme === "ocean" && <Droplets className="w-3.5 h-3.5 text-cyan-400" />}
                {theme === "neon" && <Zap className="w-3.5 h-3.5 text-lime-400" />}
                <span className="hidden md:inline">{t(`nav.theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`)}</span>
                <ChevronDown className="w-3 h-3 text-theme-muted" />
              </button>

              {themeDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 rounded-xl border border-theme-border bg-theme-card p-1 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setThemeDropdownOpen(false)}
                >
                  {themes.map((th) => (
                    <button
                      key={th.id}
                      onClick={() => setTheme(th.id)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors ${
                        theme === th.id
                          ? "bg-theme-primary text-theme-bg font-bold"
                          : "text-theme-text hover:bg-theme-surface"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${th.color}`} />
                      {t(th.labelKey)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile / Quick User Switcher */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg border border-theme-border bg-theme-card text-xs text-theme-text hover:border-theme-primary transition-colors shadow-sm"
                >
                  <span className="text-base">{user.avatar}</span>
                  <div className="text-left hidden lg:block">
                    <p className="font-semibold leading-tight text-theme-text truncate max-w-[110px]">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-theme-primary capitalize font-medium">
                      {t(`auth.roles.${user.role}`)}
                    </p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-theme-muted" />
                </button>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-primary text-theme-bg text-xs font-bold hover:bg-theme-primary-hover transition-colors shadow-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t("nav.login")}</span>
                </button>
              )}

              {userDropdownOpen && user && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-theme-border bg-theme-card p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="p-2 border-b border-theme-border mb-1">
                    <p className="text-xs text-theme-muted">{t("nav.profile")}</p>
                    <p className="text-sm font-bold text-theme-text">{user.name}</p>
                    <p className="text-xs text-theme-primary font-medium capitalize">
                      {t(`auth.roles.${user.role}`)}
                    </p>
                    <p className="text-[11px] text-theme-muted mt-0.5">{user.location}</p>
                  </div>

                  <div className="py-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-theme-muted px-2 py-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-theme-primary" />
                      {t("nav.demoUsers")}
                    </p>
                    <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
                      {demoUsers.map((du) => (
                        <button
                          key={du.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            switchUser(du.id);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-left transition-colors ${
                            user.id === du.id
                              ? "bg-theme-primary/20 text-theme-primary font-bold border border-theme-primary/30"
                              : "text-theme-text hover:bg-theme-surface"
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <span>{du.avatar}</span>
                            <span className="truncate">{du.name}</span>
                          </span>
                          <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-theme-surface text-theme-muted">
                            {du.role}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-theme-border pt-1 mt-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t("nav.logout")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-surface"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-theme-border space-y-1 animate-in slide-in-from-top-2 duration-150">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === item.id
                    ? "bg-theme-primary text-theme-bg"
                    : "text-theme-text hover:bg-theme-surface"
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
