"use client";

import { useI18n } from "../../i18n/context";

const pricing = [
  { tier: "basic", price: "$5,000", features: ["Both platforms", "Basic UI/UX implementation", "Core functionality", "3 months support"] },
  { tier: "standard", price: "$10,000", features: ["Both platforms", "Custom UI/UX design", "Advanced features & integrations", "6 months support"] },
  { tier: "premium", price: "custom", features: ["React Native cross-platform", "Premium UI/UX design", "Enterprise features & security", "12 months support"] },
];

const timeline = [
  { phase: "Planning & Design", duration: "2–3 weeks" },
  { phase: "Core Development", duration: "4–6 weeks" },
  { phase: "Advanced Features", duration: "4–6 weeks" },
  { phase: "Testing & Launch", duration: "2–3 weeks" },
];

export default function MobileApps() {
  const { t, tArray } = useI18n();
  const features = tArray("servicePages.mobileApps.features");

  return (
    <main>
      <section className="service-hero">
        <p className="section-label">{t("servicePages.mobileApps.label")}</p>
        <h1>{t("servicePages.mobileApps.heroTitle")}</h1>
      </section>

      <section className="service-section">
        <h2>{t("servicePages.mobileApps.sectionTitle")}</h2>
        <p className="service-description">{t("servicePages.mobileApps.description")}</p>
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
        <h2>Development Process</h2>
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
        <h2>{t("servicePages.mobileApps.cta")}</h2>
        <a href="/#contact" className="round-link">{t("servicePages.talkWithTeam")}</a>
      </section>
    </main>
  );
}
