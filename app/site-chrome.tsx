"use client";

import { useState } from "react";
import LanguageToggle from "./language-toggle";
import { useI18n } from "./i18n/context";

export function Brand() {
  return (
    <a className="brand" href="/">
      <span className="brand-mark">P</span>
      <span>primaroas</span>
    </a>
  );
}

export function Header() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="dock">
        <Brand />
        <div className="dock-line dock-line--desktop" />
        <nav aria-label="Main navigation">
          <a href="/#services">{t("nav.services")}</a>
          <a href="/ai-integration">{t("nav.aiIntegration")}</a>
          <a href="/resources">{t("nav.freeResources")}</a>
          <a href="/about">{t("nav.about")}</a>
        </nav>
        <a className="dock-cta" href="/#contact">
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
            <a href="/#services" onClick={() => setMenuOpen(false)}>{t("nav.services")}</a>
            <a href="/ai-integration" onClick={() => setMenuOpen(false)}>{t("nav.aiIntegration")}</a>
            <a href="/resources" onClick={() => setMenuOpen(false)}>{t("nav.freeResources")}</a>
            <a href="/about" onClick={() => setMenuOpen(false)}>{t("nav.about")}</a>
          </nav>
          <a className="mobile-menu-cta" href="/#contact" onClick={() => setMenuOpen(false)}>
            {t("nav.contact")}
          </a>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
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
          <a href="/ai-integration">{t("footer.aiIntegration")}</a>
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
  );
}
