"use client";

import AIROICalculator from "../ai-roi-calculator";
import { Header, Footer } from "../site-chrome";
import { useI18n } from "../i18n/context";

export default function AIIntegrationPage() {
  const { t } = useI18n();

  return (
    <div className="itz-layout">
      <Header />
      <section className="systems-section" id="ai-integration">
        <div className="systems-copy">
          <p className="section-label">{t("calculator.label")}</p>
          <h2>{t("calculator.title")}</h2>
          <p>{t("calculator.subtitle")}</p>
        </div>
        <AIROICalculator />
      </section>
      <Footer />
    </div>
  );
}
