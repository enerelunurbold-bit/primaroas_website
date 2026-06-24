"use client";

import { useI18n } from "../../i18n/context";
import HeroCanvas from "../../hero-canvas";

import type { ReactNode } from "react";

const iconSvgs: Record<string, ReactNode> = {
  shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  bolt: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  lock: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
};

export default function AIIntegration() {
  const { t, tArray } = useI18n();
  const benefits = tArray("servicePages.aiIntegration.benefits") as unknown as {
    title: string;
    text: string;
    icon: string;
  }[];
  const solutions = tArray("servicePages.aiIntegration.solutions") as string[];

  return (
    <main>
      <section className="service-hero">
        <HeroCanvas />
        <div className="service-hero-radial" aria-hidden="true" />
        <div className="service-hero-grid-bg" aria-hidden="true" />
        <div className="service-hero-center">
          <p className="section-label">
            {t("servicePages.aiIntegration.label")}
          </p>
          <h1>{t("servicePages.aiIntegration.heroTitle")}</h1>
        </div>
      </section>

      <section className="ai-detail">
        <div className="ai-detail-grid">
          <div className="ai-benefits">
            <h2>{t("servicePages.aiIntegration.whyTitle")}</h2>
            <div className="ai-benefits-list">
              {benefits.map((b) => (
                <div className="ai-benefit" key={b.title}>
                  <span className="ai-benefit-icon">
                    {iconSvgs[b.icon] || iconSvgs.shield}
                  </span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ai-solutions-card">
            <h2>{t("servicePages.aiIntegration.solutionsTitle")}</h2>
            <ul>
              {solutions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
