"use client";

import { useI18n } from "../../i18n/context";

const pricing = [
  { tier: "basic", price: "$2,000", features: ["Basic user research", "Wireframes for 5 key screens", "Basic visual design", "1 round of revisions"] },
  { tier: "standard", price: "$4,000", features: ["Comprehensive user research", "Wireframes for all screens", "Full visual design system", "3 rounds of revisions"] },
  { tier: "premium", price: "custom", features: ["In-depth user research & testing", "Interactive prototypes", "Custom design system", "Unlimited revisions"] },
];

const timeline = [
  { phase: "Research & Analysis", duration: "1–2 weeks" },
  { phase: "Wireframing", duration: "2–3 weeks" },
  { phase: "Visual Design", duration: "3–4 weeks" },
  { phase: "Testing & Refinement", duration: "2–3 weeks" },
];

export default function UIUXDesign() {
  const { t, tArray } = useI18n();
  const features = tArray("servicePages.uiux.features");

  return (
    <main>
      <section className="service-hero">
        <p className="section-label">{t("servicePages.uiux.label")}</p>
        <h1>{t("servicePages.uiux.heroTitle")}</h1>
      </section>

      <section className="service-section">
        <h2>{t("servicePages.uiux.sectionTitle")}</h2>
        <p className="service-description">{t("servicePages.uiux.description")}</p>
        <ul className="service-features">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      <section className="service-section service-section--dark">
        <h2>{t("servicePages.pricing")}</h2>
        <div className="pricing-grid">
          {pricing.map((p) => (
            <div className={`pricing-card${p.tier === "standard" ? " pricing-card--highlight" : ""}`} key={p.tier}>
              <h3>{t(`servicePages.${p.tier}`)}</h3>
              <span className="pricing-price">{p.price === "custom" ? t("servicePages.custom") : p.price}</span>
              <ul>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="/#contact" className="pricing-cta">{t("servicePages.getStarted")}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="service-section">
        <h2>Design Timeline</h2>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div className="timeline-step" key={item.phase}>
              <span className="timeline-number">{i + 1}</span>
              <div>
                <h3>{item.phase}</h3>
                <p>{item.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="service-cta-section">
        <h2>{t("servicePages.uiux.cta")}</h2>
        <a href="/#contact" className="round-link">{t("servicePages.talkWithTeam")}</a>
      </section>
    </main>
  );
}
