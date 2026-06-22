"use client";

import { createContext, useContext, useState, useCallback } from "react";
import en from "./en.json";
import mn from "./mn.json";

type Lang = "en" | "mn";
const dictionaries = { en, mn } as const;

type Dictionary = typeof en;

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
  tArray: (path: string) => string[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = useCallback(
    (path: string): string => {
      const val = getNestedValue(dictionaries[lang] as unknown as Record<string, unknown>, path);
      return typeof val === "string" ? val : path;
    },
    [lang],
  );

  const tArray = useCallback(
    (path: string): string[] => {
      const val = getNestedValue(dictionaries[lang] as unknown as Record<string, unknown>, path);
      return Array.isArray(val) ? val : [];
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t, tArray }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
