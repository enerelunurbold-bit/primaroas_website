"use client";

import { Header, Footer } from "../site-chrome";
import { useI18n } from "../i18n/context";

export default function ResourcesPage() {
  const { t } = useI18n();

  return (
    <div className="itz-layout">
      <Header />
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
      <Footer />
    </div>
  );
}
