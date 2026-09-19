"use client";

import React from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { CloudRain, Wind, Droplets, AlertTriangle, SunMedium, Compass } from "lucide-react";

export const WeatherAlertWidget: React.FC = () => {
  const { t, language } = useLanguage();

  const forecastDays = [
    { day: "Today", temp: "31°C / 24°C", icon: "🌧️", rain: "85%", desc: "Scattered Rains" },
    { day: "Tomorrow", temp: "30°C / 23°C", icon: "⛈️", rain: "70%", desc: "Thunderstorm" },
    { day: "Mon", temp: "32°C / 25°C", icon: "⛅", rain: "30%", desc: "Partly Cloudy" },
    { day: "Tue", temp: "33°C / 26°C", icon: "☀️", rain: "10%", desc: "Clear & Sunny" },
  ];

  return (
    <div className="rounded-2xl border border-theme-border bg-theme-card p-5 shadow-sm space-y-4">
      {/* Alert Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-theme-border">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500">
            <AlertTriangle className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-theme-text flex items-center gap-2">
              <span>{t("weather.title")}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-extrabold border border-red-500/30 uppercase">
                {language === "ta" ? "நேரலை எச்சரிக்கை" : "Live Alert"}
              </span>
            </h3>
            <p className="text-[11px] text-theme-muted">{t("weather.subtitle")}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-theme-primary">
            {language === "ta" ? "காவிரி டெல்டா மண்டலம்" : "Cauvery Delta Zone (Thanjavur)"}
          </span>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs space-y-1.5">
        <p className="font-bold text-amber-400 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          <span>{t("weather.alertTitle")}</span>
        </p>
        <p className="text-theme-text text-xs leading-relaxed">{t("weather.monsoonAlert")}</p>
        <p className="text-theme-primary font-medium text-[11px]">{t("weather.soilAdvisory")}</p>
      </div>

      {/* Key Climate Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl border border-theme-border bg-theme-surface flex items-center gap-3">
          <div className="p-2 rounded-lg bg-theme-primary/20 text-theme-primary">
            <SunMedium className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-theme-muted">{t("weather.temp")}</p>
            <p className="text-sm font-bold text-theme-text">31.4 °C</p>
          </div>
        </div>

        <div className="p-3 rounded-xl border border-theme-border bg-theme-surface flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-theme-muted">{t("weather.humidity")}</p>
            <p className="text-sm font-bold text-theme-text">78% RH</p>
          </div>
        </div>

        <div className="p-3 rounded-xl border border-theme-border bg-theme-surface flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-theme-muted">{t("weather.rainfall")}</p>
            <p className="text-sm font-bold text-theme-text">85% High</p>
          </div>
        </div>

        <div className="p-3 rounded-xl border border-theme-border bg-theme-surface flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-theme-muted">{t("weather.wind")}</p>
            <p className="text-sm font-bold text-theme-text">14 km/h NE</p>
          </div>
        </div>
      </div>

      {/* 4-Day Forecast Preview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {forecastDays.map((f, i) => (
          <div
            key={i}
            className="p-2.5 rounded-lg border border-theme-border bg-theme-surface/50 text-center space-y-1"
          >
            <p className="text-[10px] font-semibold text-theme-muted">{f.day}</p>
            <div className="text-lg">{f.icon}</div>
            <p className="text-xs font-bold text-theme-text">{f.temp}</p>
            <p className="text-[10px] text-cyan-400 font-medium">Rain: {f.rain}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
