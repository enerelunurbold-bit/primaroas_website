"use client";

import { useState } from "react";
import AIROICalculator from "./ai-roi-calculator";
import LanguageToggle from "./language-toggle";
import KlinderCarousel from "./klinder-carousel";
import HeroCanvas from "./hero-canvas";
import HeroGlobe from "./hero-globe";
import { useI18n } from "./i18n/context";


const cardKeys = [
  { key: "webDev", href: "/services/web-development" },
  { key: "mobileDev", href: "/services/mobile-apps" },
  { key: "uiux", href: "/services/ui-ux-design" },
];

const solutionKeys = [
  { key: "ai", href: "/services/ai-integration" },
  { key: "seo", href: "/services/seo-optimization" },
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main id="top" className="itz-layout">
      <header className="dock">
        <Brand />
        <div className="dock-line dock-line--desktop" />
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
        <div className="dock-line dock-line--mobile" />
        <button
          className={`menu-burger ${menuOpen ? "menu-burger--open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          <nav>
            <a href="#services" onClick={() => setMenuOpen(false)}>{t("nav.services")}</a>
            <a href="#ai-integration" onClick={() => setMenuOpen(false)}>{t("nav.aiIntegration")}</a>
            <a href="#resources" onClick={() => setMenuOpen(false)}>{t("nav.freeResources")}</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{t("nav.about")}</a>
          </nav>
          <a className="mobile-menu-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            {t("nav.contact")}
          </a>
        </div>
      )}

      <section className="zone-hero" aria-labelledby="hero-title">
        <HeroCanvas />
        <div className="hero-radial" aria-hidden="true" />
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 id="hero-title">
              {t("hero.title1")} <span className="hero-gradient-text">{t("hero.title2")}</span> {t("hero.title3")}
            </h1>
            <p>{t("hero.subtitle")}</p>
          </div>
          <div className="hero-globe-wrap"><HeroGlobe /></div>
        </div>
      </section>

      <section className="services-grid-section" id="services">
        <div className="services-header">
          <p className="section-label">{t("services.label")}</p>
          <h2>{t("services.title")}</h2>
          <p className="services-sub">{t("services.subtitle")}</p>
        </div>
        <div className="services-cards">
          <a href="/services/web-development" className="svc-card">
            <span className="svc-icon"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 8l-5 5 5 5M17 8l5 5-5 5" /></svg></span>
            <h3>{t("cards.webDev.title")}</h3>
            <p>{t("cards.webDev.text")}</p>
            <span className="svc-learn">{t("cards.webDev.link")} →</span>
          </a>
          <a href="/services/mobile-apps" className="svc-card">
            <span className="svc-icon"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="3" width="12" height="20" rx="2.5" /><path d="M11 19h4" /></svg></span>
            <h3>{t("cards.mobileDev.title")}</h3>
            <p>{t("cards.mobileDev.text")}</p>
            <span className="svc-learn">{t("cards.mobileDev.link")} →</span>
          </a>
          <a href="/services/ui-ux-design" className="svc-card">
            <span className="svc-icon"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3l9 5-9 5-9-5z" /><path d="M4 13l9 5 9-5" /></svg></span>
            <h3>{t("cards.uiux.title")}</h3>
            <p>{t("cards.uiux.text")}</p>
            <span className="svc-learn">{t("cards.uiux.link")} →</span>
          </a>
          <a href="/services/ai-integration" className="svc-card svc-card--featured">
            <span className="svc-icon"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="10" height="10" rx="2" /><path d="M11 3v3M15 3v3M11 20v3M15 20v3M3 11h3M3 15h3M20 11h3M20 15h3" /></svg></span>
            <span className="svc-badge">{t("services.featured")}</span>
            <h3>{t("solutions.ai.title")}</h3>
            <p>{t("solutions.ai.text")}</p>
            <span className="svc-learn">{t("solutions.ai.link")} →</span>
          </a>
          <a href="/services/seo-optimization" className="svc-card">
            <span className="svc-icon"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6" /><path d="M16 16l5 5" /></svg></span>
            <h3>{t("solutions.seo.title")}</h3>
            <p>{t("solutions.seo.text")}</p>
            <span className="svc-learn">{t("solutions.seo.link")} →</span>
          </a>
          <div className="svc-card svc-card--cta">
            <h3>{t("services.ctaTitle")}</h3>
            <p>{t("services.ctaText")}</p>
            <a href="#contact" className="svc-cta-link">{t("services.ctaLink")}</a>
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">

        <div className="projects-header">
          <p className="section-label">{t("projects.label")}</p>
          <h2>{t("projects.heading")}</h2>
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
          {[
            { key: "guide", pdf: "/ai-integration-guide.pdf", downloadKey: "downloadGuide" },
            { key: "checklist", pdf: "/ai-readiness-checklist.pdf", downloadKey: "downloadChecklist" },
          ].map(({ key, pdf, downloadKey }, index) => (
            <div
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
                <a className="story-download" href={pdf} download>
                  {t(`resources.${downloadKey}`)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="systems-section" id="ai-integration">

        <div className="systems-copy">
          <p className="section-label">{t("calculator.label")}</p>
          <h2>{t("calculator.title")}</h2>
          <p>{t("calculator.subtitle")}</p>
        </div>
        <AIROICalculator />
      </section>

      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-left">
            <p className="section-label">{t("about.label")}</p>
            <h2>{t("about.heading")}</h2>
            <p className="about-body">{t("about.body")}</p>
            <div className="about-cards">
              <div className="about-card">
                <span className="about-card-label">{t("about.missionLabel")}</span>
                <p>{t("about.missionText")}</p>
              </div>
              <div className="about-card">
                <span className="about-card-label">{t("about.valuesLabel")}</span>
                <p>{t("about.valuesText")}</p>
              </div>
            </div>
          </div>
          <div className="about-right">
            <div className="about-how">
              <span className="about-how-title">{t("about.howWeWork")}</span>
              <div className="about-how-list">
                <div className="about-how-item">
                  <span className="about-dot" />
                  <div>
                    <strong>{t("about.cleanCode")}</strong>
                    <p>{t("about.cleanCodeDesc")}</p>
                  </div>
                </div>
                <div className="about-how-item">
                  <span className="about-dot" />
                  <div>
                    <strong>{t("about.beautifulDesign")}</strong>
                    <p>{t("about.beautifulDesignDesc")}</p>
                  </div>
                </div>
                <div className="about-how-item">
                  <span className="about-dot" />
                  <div>
                    <strong>{t("about.greatFunc")}</strong>
                    <p>{t("about.greatFuncDesc")}</p>
                  </div>
                </div>
                <div className="about-how-item">
                  <span className="about-dot" />
                  <div>
                    <strong>{t("about.privacy")}</strong>
                    <p>{t("about.privacyDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/company/primaroas" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
