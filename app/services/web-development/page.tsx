"use client";

import { useI18n } from "../../i18n/context";
import HeroCanvas from "../../hero-canvas";

const tiers = ["basic", "standard", "premium"];

export default function WebDevelopment() {
  const { t, tArray } = useI18n();
  const pricing = tArray("servicePages.webDev.pricing") as unknown as { price: string; features: string[] }[];
  const timeline = tArray("servicePages.webDev.timeline") as unknown as { phase: string; duration: string }[];
  const features = tArray("servicePages.webDev.features");

  return (
    <main>
      <section className="service-hero">
        <HeroCanvas />
        <div className="service-hero-radial" aria-hidden="true" />
        <div className="service-hero-grid-bg" aria-hidden="true" />
        <div className="service-hero-center">
          <p className="section-label">{t("servicePages.webDev.label")}</p>
          <h1>{t("servicePages.webDev.heroTitle")}</h1>
        </div>
      </section>

      <section className="service-section service-section--dark">
        <h2>{t("servicePages.webDev.sectionTitle")}</h2>
        <p className="service-description">{t("servicePages.webDev.description")}</p>
        <ul className="service-features">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      <section className="service-section service-section--dark">
        <h2>{t("servicePages.pricing")}</h2>
        <div className="pricing-grid">
          {pricing.map((p, i) => (
            <div className={`pricing-card${i === 1 ? " pricing-card--highlight" : ""}`} key={i}>
              <h3>{t(`servicePages.${tiers[i]}`)}</h3>
              <span className="pricing-price">{p.price === "custom" ? t("servicePages.custom") : p.price}</span>
              <ul>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <a href="/#contact" className="pricing-cta">{t("servicePages.getStarted")}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="service-section service-section--dark timeline-section">
        <h2>{t("servicePages.webDev.timelineTitle")}</h2>
        <div className="timeline">
          <svg className="timeline-zigzag" viewBox="0 0 800 200" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-400 180 L93 20 L195 180 L298 20 L400 180 L503 20 L605 180 L708 20 L1200 180" />
            <path className="timeline-glow" d="M-400 180 L93 20 L195 180 L298 20 L400 180 L503 20 L605 180 L708 20 L1200 180" />
            <circle className="timeline-endpoint" cx="-400" cy="180" r="8" />
            <circle className="timeline-endpoint" cx="1200" cy="180" r="8" />
            <circle className="timeline-particle" r="6">
              <animateMotion dur="5s" repeatCount="indefinite" path="M-400 180 L93 20 L195 180 L298 20 L400 180 L503 20 L605 180 L708 20 L1200 180" />
            </circle>
            <circle className="timeline-particle" r="5">
              <animateMotion dur="5s" begin="-2.5s" repeatCount="indefinite" path="M1200 180 L708 20 L605 180 L503 20 L400 180 L298 20 L195 180 L93 20 L-400 180" />
            </circle>
          </svg>
          <svg className="timeline-zigzag-z" viewBox="-60 0 450 161" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-60 22 L77 22 L250 22 L77 139 L250 139 L390 139" />
            <path className="timeline-glow" d="M-60 22 L77 22 L250 22 L77 139 L250 139 L390 139" />
            <circle className="timeline-endpoint" cx="-60" cy="22" r="5" />
            <circle className="timeline-endpoint" cx="390" cy="139" r="5" />
            <circle className="timeline-particle" r="4">
              <animateMotion dur="4s" repeatCount="indefinite" path="M-60 22 L77 22 L250 22 L77 139 L250 139 L390 139" />
            </circle>
            <circle className="timeline-particle" r="3.5">
              <animateMotion dur="4s" begin="-2s" repeatCount="indefinite" path="M390 139 L250 139 L77 139 L250 22 L77 22 L-60 22" />
            </circle>
          </svg>
          {timeline.map((item, i) => (
            <div className="timeline-step" key={i}>
              <span className="timeline-number">{i + 1}</span>
              <div>
                <h3>{item.phase}</h3>
                <p>{item.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
