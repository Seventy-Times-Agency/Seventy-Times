"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import type { CaseItem, CaseStatus } from "@/data/cases";
import styles from "./CaseDetail.module.css";

type Props = { item: CaseItem };

export default function CaseDetail({ item }: Props) {
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
        <Link href={`${home}#cases`} className={styles.back}>
          ← {t.casesBack}
        </Link>

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
      </div>
    </main>
  );
}
