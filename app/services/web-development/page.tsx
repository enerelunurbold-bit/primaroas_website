"use client";

import { useI18n } from "../../i18n/context";

const pricing = [
  { tier: "basic", price: "$5,000", features: ["5-page website", "Basic SEO setup", "Contact form integration", "1 month support"] },
  { tier: "standard", price: "$12,000", features: ["10–15 pages", "Advanced SEO", "Custom integrations", "3 months support"] },
  { tier: "premium", price: "custom", features: ["Unlimited pages", "Full SEO & marketing setup", "Custom CMS", "6 months support"] },
];

const timeline = [
  { phase: "Planning & Design", duration: "2–3 weeks" },
  { phase: "Development", duration: "4–8 weeks" },
  { phase: "Testing & QA", duration: "1–2 weeks" },
  { phase: "Launch & Support", duration: "Ongoing" },
];

export default function WebDevelopment() {
  const { t, tArray } = useI18n();
  const features = tArray("servicePages.webDev.features");

  return (
    <main>
      <section className="service-hero">
        <p className="section-label">{t("servicePages.webDev.label")}</p>
        <h1>{t("servicePages.webDev.heroTitle")}</h1>
      </section>

      <section className="service-section">
        <h2>{t("servicePages.webDev.sectionTitle")}</h2>
        <p className="service-description">{t("servicePages.webDev.description")}</p>
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
        <h2>Project Timeline</h2>
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
        <h2>{t("servicePages.webDev.cta")}</h2>
        <a href="/#contact" className="round-link">{t("servicePages.talkWithTeam")}</a>
      </section>
    </main>
  );
}
