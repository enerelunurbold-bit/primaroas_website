"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageToggle from "./language-toggle";
import { useI18n } from "./i18n/context";

export function Brand() {
  return (
    <Link className="brand" href="/">
      <span className="brand-mark">P</span>
      <span>primaroas</span>
    </Link>
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
          <Link href="/#services">{t("nav.services")}</Link>
          <Link href="/resources">{t("nav.freeResources")}</Link>
          <Link href="/about">{t("nav.about")}</Link>
        </nav>
        <Link className="dock-cta" href="/#contact">
          {t("nav.contact")}
        </Link>
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
            <Link href="/#services" onClick={() => setMenuOpen(false)}>{t("nav.services")}</Link>
            <Link href="/resources" onClick={() => setMenuOpen(false)}>{t("nav.freeResources")}</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>{t("nav.about")}</Link>
          </nav>
          <Link className="mobile-menu-cta" href="/#contact" onClick={() => setMenuOpen(false)}>
            {t("nav.contact")}
          </Link>
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
          <Link href="/services/web-development">{t("footer.webDev")}</Link>
          <Link href="/services/mobile-apps">{t("footer.mobileApps")}</Link>
          <Link href="/services/ui-ux-design">{t("footer.uiux")}</Link>
          <Link href="/services/ai-integration">{t("footer.aiIntegration")}</Link>
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
