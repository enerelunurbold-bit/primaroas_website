"use client";

import Link from "next/link";
import { useI18n } from "../../i18n/context";
import HeroCanvas from "../../hero-canvas";

export default function SEOOptimization() {
  const { t, tArray } = useI18n();
  const features = tArray("servicePages.seo.features") as string[];
  const pricing = tArray("servicePages.seo.pricing") as unknown as {
    tier: string;
    price: string;
    features: string[];
  }[];
  const timeline = tArray("servicePages.seo.timeline") as unknown as {
    title: string;
    text: string;
    duration: string;
  }[];

  return (
    <main>
      <section className="service-hero">
        <HeroCanvas />
        <div className="service-hero-radial" aria-hidden="true" />
        <div className="service-hero-grid-bg" aria-hidden="true" />
        <div className="service-hero-center">
          <p className="section-label">{t("servicePages.seo.label")}</p>
          <h1>{t("servicePages.seo.heroTitle")}</h1>
        </div>
      </section>

      <section className="seo-solutions">
        <div className="seo-solutions-grid">
          <div className="seo-solutions-copy">
            <h2>{t("servicePages.seo.solutionsTitle")}</h2>
            <p>{t("servicePages.seo.solutionsText")}</p>
            <ul className="seo-checklist">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="seo-solutions-image">
            <img src="/seo-optimization-v2.png" alt="SEO analytics dashboard" />
          </div>
        </div>
      </section>

      <section className="seo-timeline">
        <h2>{t("servicePages.seo.timelineTitle")}</h2>
        <p className="seo-timeline-sub">{t("servicePages.seo.timelineSubtitle")}</p>
        <div className="seo-timeline-list">
          <svg className="seo-timeline-svg" viewBox="0 0 800 1000" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0 L650 200 L150 400 L650 600 L150 800 L750 1050" />
            <path className="timeline-glow" d="M50 0 L650 200 L150 400 L650 600 L150 800 L750 1050" />
            <circle className="timeline-endpoint" cx="50" cy="0" r="8" />
            <circle className="timeline-endpoint" cx="750" cy="1050" r="8" />
            <circle className="timeline-particle" r="6">
              <animateMotion dur="5s" repeatCount="indefinite" path="M50 0 L650 200 L150 400 L650 600 L150 800 L750 1050" />
            </circle>
            <circle className="timeline-particle" r="5">
              <animateMotion dur="5s" begin="-2.5s" repeatCount="indefinite" path="M750 1050 L150 800 L650 600 L150 400 L650 200 L50 0" />
            </circle>
          </svg>
          {timeline.map((step, i) => (
            <div className={`seo-step${i % 2 === 0 ? " seo-step--right" : " seo-step--left"}`} key={step.title}>
              <div className="seo-step-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="seo-step-duration">{step.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="seo-pricing">
        <h2>{t("servicePages.seo.pricingTitle")}</h2>
        <p className="seo-pricing-sub">{t("servicePages.seo.pricingSubtitle")}</p>
        <div className="seo-pricing-grid">
          {pricing.map((p, i) => {
            const quoteHref = `/quote?service=${encodeURIComponent(t("servicePages.seo.label"))}&plan=${encodeURIComponent(p.tier)}&price=${encodeURIComponent(p.price)}`;

            return (
            <div className={`seo-price-card${i === 1 ? " seo-price-card--highlight" : ""}`} key={p.tier}>
              <h3>{p.tier}</h3>
              <span className="seo-price">{p.price}</span>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link href={quoteHref} className="seo-price-cta">{t("servicePages.getStarted")}</Link>
            </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
