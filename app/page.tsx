"use client";

import AIROICalculator from "./ai-roi-calculator";
import LanguageToggle from "./language-toggle";
import KlinderCarousel from "./klinder-carousel";
import { useI18n } from "./i18n/context";

const cardKeys = [
  { key: "webDev", href: "/services/web-development" },
  { key: "mobileDev", href: "/services/mobile-apps" },
  { key: "uiux", href: "/services/ui-ux-design" },
];

const solutionKeys = [
  { key: "ai", href: "#ai-integration" },
  { key: "seo", href: "#contact" },
];

const storyKeys = ["guide", "checklist"];

function Brand() {
  return (
    <a className="brand" href="#top">
      <span className="brand-mark">P</span>
      <span>primaroas</span>
    </a>
  );
}

export default function Home() {
  const { t } = useI18n();

  return (
    <main id="top" className="itz-layout">
      <header className="dock">
        <Brand />
        <div className="dock-line" />
        <nav aria-label="Main navigation">
          <a href="#services">{t("nav.services")}</a>
          <a href="#ai-integration">{t("nav.aiIntegration")}</a>
          <a href="#resources">{t("nav.freeResources")}</a>
          <a href="#about">{t("nav.about")}</a>
        </nav>
        <a className="dock-cta" href="#contact">
          {t("nav.contact")}
        </a>
        <LanguageToggle />
        <span className="menu-dots" aria-label="Menu">
          •••
        </span>
      </header>

      <section className="zone-hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="software-network" aria-hidden="true">
          <svg
            className="network-canvas"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
          >
            <g className="network-canvas__links">
              <path d="M-30 162 L170 202 L324 136 L618 184 L972 119 L1170 174 L1470 145" />
              <path d="M12 351 L170 202 L358 306 L694 392 L1017 315 L1321 282 L1445 346" />
              <path d="M-16 586 L234 544 L404 554 L732 632 L1071 524 L1377 522 L1458 565" />
              <path d="M166 -20 L170 202 L358 306 L404 554 L499 826" />
              <path d="M618 184 L694 392 L732 632 L816 836" />
              <path d="M972 119 L1017 315 L1071 524 L1133 829" />
              <path d="M324 136 L358 306 L694 392 L1017 315" />
              <path d="M234 544 L404 554 L694 392 L972 119" />
              <path d="M404 554 L732 632 L1017 315 L1321 282" />
              <path d="M170 202 L404 554 L694 392 L1071 524" />
              <path d="M358 306 L618 184 L972 119 L1321 282" />
              <path d="M732 632 L1071 524 L1377 522" />
            </g>
            <g className="network-canvas__particles">
              <circle r="2.5">
                <animateMotion dur="6s" repeatCount="indefinite" path="M-30 162 L170 202 L324 136 L618 184 L972 119 L1170 174 L1470 145" />
              </circle>
              <circle r="2.5">
                <animateMotion dur="7s" begin="-2s" repeatCount="indefinite" path="M1445 346 L1321 282 L1017 315 L694 392 L358 306 L170 202 L12 351" />
              </circle>
              <circle r="3">
                <animateMotion dur="8s" begin="-4s" repeatCount="indefinite" path="M-16 586 L234 544 L404 554 L732 632 L1071 524 L1377 522 L1458 565" />
              </circle>
              <circle r="2.5">
                <animateMotion dur="5.5s" begin="-1s" repeatCount="indefinite" path="M499 826 L404 554 L358 306 L170 202 L166 -20" />
              </circle>
              <circle r="2.5">
                <animateMotion dur="6.5s" begin="-3s" repeatCount="indefinite" path="M972 119 L1017 315 L1071 524 L1133 829" />
              </circle>
              <circle r="2">
                <animateMotion dur="5s" begin="-2.5s" repeatCount="indefinite" path="M1470 145 L1170 174 L972 119 L618 184 L324 136 L170 202 L-30 162" />
              </circle>
              <circle r="2">
                <animateMotion dur="6s" begin="-4.2s" repeatCount="indefinite" path="M12 351 L170 202 L358 306 L694 392 L1017 315 L1321 282 L1445 346" />
              </circle>
              <circle r="2">
                <animateMotion dur="7s" begin="-1.8s" repeatCount="indefinite" path="M1458 565 L1377 522 L1071 524 L732 632 L404 554 L234 544 L-16 586" />
              </circle>
              <circle r="2">
                <animateMotion dur="5.8s" begin="-3.6s" repeatCount="indefinite" path="M499 826 L404 554 L358 306 L170 202 L166 -20" />
              </circle>
              <circle r="2">
                <animateMotion dur="6.8s" begin="-5.1s" repeatCount="indefinite" path="M972 119 L1017 315 L1071 524 L1133 829" />
              </circle>
              <circle r="2.2">
                <animateMotion dur="7.4s" begin="-2.9s" repeatCount="indefinite" path="M972 119 L694 392 L404 554 L234 544" />
              </circle>
              <circle r="2.2">
                <animateMotion dur="6.2s" begin="-4.7s" repeatCount="indefinite" path="M404 554 L732 632 L1017 315 L1321 282" />
              </circle>
              <circle r="2">
                <animateMotion dur="5.4s" begin="-1.4s" repeatCount="indefinite" path="M170 202 L404 554 L694 392 L1071 524" />
              </circle>
            </g>
          </svg>
        </div>
        <div className="hero-copy">
          <h1 id="hero-title">{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
        </div>
        <div className="hero-cards">
          {cardKeys.map(({ key, href }) => (
            <a className="hero-card" href={href} key={key}>
              <div>
                <h2>{t(`cards.${key}.title`)}</h2>
                <p>{t(`cards.${key}.text`)}</p>
              </div>
              <span className="card-link">{t(`cards.${key}.link`)}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="intro-section" id="about">
        <p className="section-label">{t("about.label")}</p>
        <h2>{t("about.title")}</h2>
        <p className="intro-body">{t("about.body")}</p>
      </section>

      <section className="solutions-section" id="services">
        <div className="section-heading">
          <p className="section-label">{t("services.label")}</p>
          <h2>{t("services.title")}</h2>
        </div>
        <div className="solution-grid">
          {solutionKeys.map(({ key, href }, index) => (
            <article
              className={`solution-card solution-card--${index + 1}`}
              key={key}
            >
              <div className="solution-art" aria-hidden="true">
                <span />
                <i />
                <b />
              </div>
              <div className="solution-copy">
                <h3>{t(`solutions.${key}.title`)}</h3>
                <p>{t(`solutions.${key}.text`)}</p>
                <a href={href}>{t(`solutions.${key}.link`)}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="projects-header">
          <p className="section-label">{t("projects.label")}</p>
        </div>
        <div className="projects-grid">
          <div className="project-preview">
            <KlinderCarousel />
          </div>
          <div className="project-info">
            <h3>{t("projects.title")}</h3>
            <p className="project-description">{t("projects.description")}</p>
            <ul className="project-features">
              {["projects.features.0", "projects.features.1", "projects.features.2", "projects.features.3"].map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <a href="https://klinder.us/" target="_blank" rel="noreferrer" className="project-link">
              {t("projects.cta")} <span>&rsaquo;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="insights-section" id="resources">
        <div className="section-heading">
          <p className="section-label">{t("resources.label")}</p>
          <h2>{t("resources.title")}</h2>
        </div>
        <div className="story-grid">
          {storyKeys.map((key, index) => (
            <a
              href="#contact"
              className={`story-card story-card--${index + 1}`}
              key={key}
            >
              <div className="story-image" aria-hidden="true">
                <span />
              </div>
              <div className="story-body">
                <div>
                  <span>{t(`stories.${key}.tag`)}</span>
                </div>
                <h3>{t(`stories.${key}.title`)}</h3>
                <p>{t(`stories.${key}.text`)}</p>
                <em>{t("resources.explore")}</em>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="systems-section" id="ai-integration">
        <div className="systems-copy">
          <p className="section-label">{t("calculator.label")}</p>
          <h2>{t("calculator.title")}</h2>
          <p>{t("calculator.subtitle")}</p>
          <a href="#contact">{t("calculator.cta")}</a>
        </div>
        <AIROICalculator />
      </section>

      <footer className="zone-footer" id="contact">
        <div>
          <Brand />
          <p>{t("footer.tagline")}</p>
        </div>
        <div className="footer-links">
          <div>
            <h3>{t("footer.contactTitle")}</h3>
            <a className="footer-email" href="mailto:contact@primaroas.com">
              contact@primaroas.com
            </a>
            <span className="footer-detail">🇲🇳 +976 7250 3910</span>
            <span className="footer-detail">🇺🇸 +1 571 671 5661</span>
          </div>
          <div>
            <h3>{t("footer.projectsTitle")}</h3>
            <a href="https://klinder.us/" target="_blank" rel="noreferrer">
              Klinder
            </a>
          </div>
          <div>
            <h3>{t("footer.servicesTitle")}</h3>
            <a href="/services/web-development">{t("footer.webDev")}</a>
            <a href="/services/mobile-apps">{t("footer.mobileApps")}</a>
            <a href="/services/ui-ux-design">{t("footer.uiux")}</a>
            <a href="#ai-integration">{t("footer.aiIntegration")}</a>
          </div>
        </div>
        <div className="footer-base">
          <span>{t("footer.copyright")}</span>
          <div className="footer-social">
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/company/primaroas" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
