"use client";

import Link from "next/link";
import { useI18n } from "../../i18n/context";
import HeroCanvas from "../../hero-canvas";

const tiers = ["basic", "standard", "premium"];

export default function UIUXDesign() {
  const { t, tArray } = useI18n();
  const pricing = tArray("servicePages.uiux.pricing") as unknown as { price: string; features: string[] }[];
  const timeline = tArray("servicePages.uiux.timeline") as unknown as { phase: string; duration: string }[];
  const features = tArray("servicePages.uiux.features");

  return (
    <main>
      <section className="service-hero">
        <HeroCanvas />
        <div className="service-hero-radial" aria-hidden="true" />
        <div className="service-hero-grid-bg" aria-hidden="true" />
        <div className="service-hero-center">
          <p className="section-label">{t("servicePages.uiux.label")}</p>
          <h1>{t("servicePages.uiux.heroTitle")}</h1>
        </div>
      </section>

      <section className="service-section service-section--dark">
        <h2>{t("servicePages.uiux.sectionTitle")}</h2>
        <p className="service-description">{t("servicePages.uiux.description")}</p>
        <ul className="service-features">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      <section className="service-section service-section--dark">
        <h2>{t("servicePages.pricing")}</h2>
        <div className="pricing-grid">
          {pricing.map((p, i) => {
            const plan = t(`servicePages.${tiers[i]}`);
            const price = p.price === "custom" ? t("servicePages.custom") : p.price;
            const quoteHref = `/quote?service=${encodeURIComponent(t("servicePages.uiux.label"))}&plan=${encodeURIComponent(plan)}&price=${encodeURIComponent(price)}`;

            return (
            <div className={`pricing-card${i === 1 ? " pricing-card--highlight" : ""}`} key={i}>
              <h3>{plan}</h3>
              <span className="pricing-price">{price}</span>
              <ul>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <Link href={quoteHref} className="pricing-cta">{t("servicePages.getStarted")}</Link>
            </div>
            );
          })}
        </div>
      </section>

      <section className="service-section service-section--dark timeline-section">
        <h2>{t("servicePages.uiux.timelineTitle")}</h2>
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
          <svg className="timeline-zigzag-z" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-5 8.5 L25 8.5 L75 8.5 L25 62.3 L75 62.3 L105 62.3" />
            <path className="timeline-glow" d="M-5 8.5 L25 8.5 L75 8.5 L25 62.3 L75 62.3 L105 62.3" />
            <circle className="timeline-particle" r="1.3">
              <animateMotion dur="4s" repeatCount="indefinite" path="M-5 8.5 L25 8.5 L75 8.5 L25 62.3 L75 62.3 L105 62.3" />
            </circle>
            <circle className="timeline-particle" r="1.1">
              <animateMotion dur="4s" begin="-2s" repeatCount="indefinite" path="M105 62.3 L75 62.3 L25 62.3 L75 8.5 L25 8.5 L-5 8.5" />
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
