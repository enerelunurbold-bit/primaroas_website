"use client";

import { Header, Footer } from "../site-chrome";
import { useI18n } from "../i18n/context";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="itz-layout">
      <Header />
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
                    <strong>{t("about.privacy")}</strong>
                    <p>{t("about.privacyDesc")}</p>
                  </div>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
