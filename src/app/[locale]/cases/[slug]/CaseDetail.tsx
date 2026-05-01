"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import { siteConfig } from "@/data/siteConfig";
import type { CaseItem, CaseStatus } from "@/data/cases";
import styles from "./CaseDetail.module.css";

type Props = {
  item: CaseItem;
  related: readonly CaseItem[];
};

export default function CaseDetail({ item, related }: Props) {
  const { t, localePath } = useT();
  const home = localePath("/");

  const statusLabel: Record<CaseStatus, string> = {
    live: t.casesStatusLive,
    progress: t.casesStatusProgress,
    soon: t.casesStatusSoon,
  };

  const title = t[item.titleKey];
  const tag = t[item.tagKey];
  const summary = t[item.summaryKey];
  const metrics = item.metricsKey ? t[item.metricsKey] : undefined;

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        {/* Breadcrumbs — match the JSON-LD on the page so users and
            search engines see the same trail. */}
        <nav className={styles.breadcrumbs} aria-label={t.casesBreadcrumbs}>
          <Link href={home}>{siteConfig.shortName}</Link>
          <span aria-hidden="true">›</span>
          <Link href={`${home}#cases`}>{t.navCases}</Link>
          <span aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {title}
          </span>
        </nav>

        <div className={styles.head}>
          <span className={styles.tag}>{tag}</span>
          <h1 className={styles.title}>{title}</h1>
          <span
            className={`${styles.status} ${styles[`status_${item.status}`]}`}
          >
            <span className={styles.statusDot} />
            {statusLabel[item.status]}
          </span>
        </div>

        <p className={styles.summary}>{summary}</p>

        {metrics && metrics.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t.casesWhatWeBuilt}</h2>
            <ul className={styles.metricList}>
              {metrics.map((m) => (
                <li key={m} className={styles.metricItem}>
                  <span aria-hidden="true">◆</span> {m}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.casesStatusHeading}</h2>
          <p className={styles.statusBody}>
            {item.status === "live"
              ? t.casesStatusBodyLive
              : item.status === "progress"
                ? t.casesStatusBodyProgress
                : t.casesStatusBodySoon}
          </p>
        </section>

        <div className={styles.ctaRow}>
          <Link href={`${home}#lead`} className={styles.primaryCta}>
            {t.casesPrimaryCta} <span aria-hidden="true">→</span>
          </Link>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryCta}
            >
              {t.casesExternalCta} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionTitle}>{t.casesRelatedTitle}</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={localePath(`/cases/${r.id}`)}
                  className={styles.relatedCard}
                >
                  <span className={styles.relatedTag}>{t[r.tagKey]}</span>
                  <span className={styles.relatedTitle}>{t[r.titleKey]}</span>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
