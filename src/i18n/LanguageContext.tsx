"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import en from "./en.json";
import ta from "./ta.json";

export type Language = "en" | "ta";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, any> = {
  en,
  ta,
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("agritech_lang") as Language;
    if (savedLang === "en" || savedLang === "ta") {
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("agritech_lang", lang);
  };

  const t = (key: string, fallback?: string): string => {
    const keys = key.split(".");
    let currentEn = translations.en;
    let currentSelected = translations[language];

    for (const k of keys) {
      if (currentSelected && currentSelected[k] !== undefined) {
        currentSelected = currentSelected[k];
      } else {
        currentSelected = undefined;
        break;
      }
    }

    if (typeof currentSelected === "string") {
      return currentSelected;
    }

    // Fallback to English dictionary if missing in target
    for (const k of keys) {
      if (currentEn && currentEn[k] !== undefined) {
        currentEn = currentEn[k];
      } else {
        currentEn = undefined;
        break;
      }
    }

    if (typeof currentEn === "string") {
      return currentEn;
    }

    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
