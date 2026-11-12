"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Language = "en" | "ar";
const LanguageContext = createContext<{ language: Language; setLanguage: (value: Language) => void; t: (en: string, ar: string) => string }>({ language: "en", setLanguage: () => {}, t: (en) => en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    const saved = localStorage.getItem("orvana-language");
    if (saved === "ar" || saved === "en") setLanguage(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("orvana-language", language);
  }, [language]);
  const t = useCallback((en: string, ar: string) => language === "ar" ? ar : en, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage, t }}><div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div></LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);