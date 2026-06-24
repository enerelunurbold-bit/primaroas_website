"use client";

import { useI18n } from "../../i18n/context";
import HeroCanvas from "../../hero-canvas";

const tiers = ["basic", "standard", "premium"];

export default function MobileApps() {
  const { t, tArray } = useI18n();
  const pricing = tArray("servicePages.mobileApps.pricing") as unknown as { price: string; features: string[] }[];
  const timeline = tArray("servicePages.mobileApps.timeline") as unknown as { phase: string; duration: string }[];
  const features = tArray("servicePages.mobileApps.features");

  return (
    <main>
      <section className="service-hero">
        <HeroCanvas />
        <div className="service-hero-radial" aria-hidden="true" />
        <div className="service-hero-grid-bg" aria-hidden="true" />
        <div className="service-hero-center">
          <p className="section-label">{t("servicePages.mobileApps.label")}</p>
          <h1>{t("servicePages.mobileApps.heroTitle")}</h1>
        </div>
      </section>

      <section className="service-section service-section--white">
        <h2>{t("servicePages.mobileApps.sectionTitle")}</h2>
        <p className="service-description">{t("servicePages.mobileApps.description")}</p>
        <ul className="service-features">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      <section className="service-section service-section--white mobile-pricing-section">
        <div className="blue-network" aria-hidden="true">
          <svg className="blue-network-canvas" viewBox="0 0 1440 800" preserveAspectRatio="none">
            <g className="blue-network__links">
              <path d="M-10 150 L230 180 L470 120 L710 170 L950 110 L1190 155 L1460 140" />
              <path d="M20 400 L250 440 L490 380 L730 425 L970 365 L1210 410 L1450 395" />
              <path d="M470 -10 L490 380 L510 810" />
              <path d="M950 110 L970 365 L990 810" />
            </g>
            <g className="blue-network__particles">
              <circle r="2">
                <animateMotion dur="7s" repeatCount="indefinite" path="M-10 150 L230 180 L470 120 L710 170 L950 110 L1190 155 L1460 140" />
              </circle>
              <circle r="2">
                <animateMotion dur="8s" begin="-3s" repeatCount="indefinite" path="M1450 395 L1210 410 L970 365 L730 425 L490 380 L250 440 L20 400" />
              </circle>
            </g>
          </svg>
        </div>
        <h2>{t("servicePages.pricing")}</h2>
        <div className="pricing-grid pricing-grid--light">
          {pricing.map((p, i) => (
            <div className={`pricing-card pricing-card--light${i === 1 ? " pricing-card--light-highlight" : ""}`} key={i}>
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

      <section className="service-section service-section--white timeline-section mobile-timeline-light">
        <div className="blue-network blue-network--subtle" aria-hidden="true">
          <svg className="blue-network-canvas" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <g className="blue-network__links">
              <path d="M-20 100 L300 160 L600 80 L900 150 L1200 70 L1460 120" />
              <path d="M-20 400 L280 340 L560 420 L840 350 L1120 430 L1460 380" />
            </g>
            <g className="blue-network__particles">
              <circle r="2">
                <animateMotion dur="6s" repeatCount="indefinite" path="M-20 100 L300 160 L600 80 L900 150 L1200 70 L1460 120" />
              </circle>
              <circle r="2">
                <animateMotion dur="7s" begin="-3s" repeatCount="indefinite" path="M1460 380 L1120 430 L840 350 L560 420 L280 340 L-20 400" />
              </circle>
            </g>
          </svg>
        </div>
        <h2>{t("servicePages.mobileApps.timelineTitle")}</h2>
        <div className="timeline">
          <svg className="timeline-zigzag timeline-zigzag--blue" viewBox="0 0 800 200" preserveAspectRatio="none" aria-hidden="true">
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
          <svg className="timeline-zigzag-z timeline-zigzag--blue" viewBox="-60 0 450 161" preserveAspectRatio="none" aria-hidden="true">
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
