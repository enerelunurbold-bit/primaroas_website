"use client";

import { useI18n } from "./i18n/context";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(lang === "en" ? "mn" : "en")}
      aria-label="Switch language"
    >
      {lang === "en" ? "EN" : "MN"}
    </button>
  );
}
