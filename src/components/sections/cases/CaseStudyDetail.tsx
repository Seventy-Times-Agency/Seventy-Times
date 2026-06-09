"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useT } from "@/i18n/context";
import { siteConfig } from "@/data/siteConfig";
import { caseCardContent, type CaseItem, type CaseStatus } from "@/data/cases";
import styles from "./CaseStudyDetail.module.css";

type Props = {
  item: CaseItem;
  related: readonly CaseItem[];
};

/**
 * Rich, immersive detail layout for inline-localized case studies.
 * Reads every block from `item.study`, renders only the ones present,
 * and tints a single per-case accent through the `--case-accent`
 * custom property. Falls back gracefully when `study` is missing.
 */
export default function CaseStudyDetail({ item, related }: Props) {
  const { t, locale, localePath } = useT();
  const home = localePath("/");
  const s = item.study;
  if (!s) return null;

  const statusLabel: Record<CaseStatus, string> = {
    live: t.casesStatusLive,
    progress: t.casesStatusProgress,
    soon: t.casesStatusSoon,
  };

  const rootStyle = { "--case-accent": s.accent } as CSSProperties;

  return (
    <main className={styles.main} style={rootStyle}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumbs} aria-label={t.casesBreadcrumbs}>
          <Link href={home}>{siteConfig.shortName}</Link>
          <span aria-hidden="true">›</span>
          <Link href={`${home}#cases`}>{t.navCases}</Link>
          <span aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {s.title[locale]}
          </span>
        </nav>

        <article className={styles.card}>
          <span className={styles.accentBar} aria-hidden="true" />
          <div className={styles.gridBg} aria-hidden="true" />

          <div className={styles.cardInner}>
            {/* Header */}
            <header className={styles.header}>
              <div className={styles.tags}>
                <span className={styles.tag}>{s.tag[locale]}</span>
                <span
                  className={`${styles.status} ${styles[`status_${item.status}`]}`}
                >
                  <span className={styles.statusDot} />
                  {statusLabel[item.status]}
                </span>
              </div>
              <span className={styles.niche}>{s.niche[locale]}</span>
            </header>

            {/* Hero */}
            <h1 className={styles.headline}>{s.headline[locale]}</h1>
            <p className={styles.meta}>{s.meta[locale]}</p>

            {/* Stat grid */}
            {s.stats && s.stats.length > 0 && (
              <div className={styles.stats}>
                {s.stats.map((stat) => (
                  <div key={stat.label[locale]} className={styles.stat}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label[locale]}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Content panels */}
            <div className={styles.panels}>
              {s.clients && (
                <section className={styles.panel}>
                  <h2 className={styles.panelTitle}>{s.clients.heading[locale]}</h2>
                  {s.clients.items.map((cl) => (
                    <div key={cl.label[locale]} className={styles.clientCard}>
                      <span className={styles.clientLabel}>{cl.label[locale]}</span>
                      {cl.rows.map((r) => (
                        <div key={r.label[locale]} className={styles.row}>
                          <span className={styles.rowLabel}>{r.label[locale]}</span>
                          <span className={styles.rowValue}>{r.value[locale]}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className={styles.result}>
                    <span className={styles.resultLabel}>
                      {s.clients.resultLabel[locale]}
                    </span>
                    <span className={styles.resultValue}>
                      {s.clients.result[locale]}
                    </span>
                  </div>
                </section>
              )}

              {s.breakdown && (
                <section className={styles.panel}>
                  <h2 className={styles.panelTitle}>{s.breakdown.heading[locale]}</h2>
                  {s.breakdown.rows.map((r) => (
                    <div key={r.label[locale]} className={styles.row}>
                      <span className={styles.rowLabel}>{r.label[locale]}</span>
                      <span className={styles.rowValue}>{r.value[locale]}</span>
                    </div>
                  ))}
                </section>
              )}

              {s.revenue && (
                <section className={styles.panel}>
                  <h2 className={styles.panelTitle}>{s.revenue.heading[locale]}</h2>
                  {s.revenue.rows.map((r) => (
                    <div key={r.label[locale]} className={styles.row}>
                      <span className={styles.rowLabel}>{r.label[locale]}</span>
                      <span className={styles.rowValue}>{r.value[locale]}</span>
                    </div>
                  ))}
                  <div className={styles.roas}>
                    <div>
                      <span className={styles.roasLabel}>
                        {s.revenue.roasLabel[locale]}
                      </span>
                      <span className={styles.roasNote}>
                        {s.revenue.roasNote[locale]}
                      </span>
                    </div>
                    <span className={styles.roasValue}>{s.revenue.roas}</span>
                  </div>
                </section>
              )}

              {s.deliverables && (
                <section className={styles.panel}>
                  <h2 className={styles.panelTitle}>
                    {s.deliverables.heading[locale]}
                  </h2>
                  <ul className={styles.checkList}>
                    {s.deliverables.items.map((d) => (
                      <li key={d[locale]} className={styles.checkItem}>
                        <span className={styles.check} aria-hidden="true">
                          ✓
                        </span>
                        {d[locale]}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {s.features && (
                <section className={styles.panel}>
                  <ul className={styles.featureList}>
                    {s.features.map((f) => (
                      <li key={f.text[locale]} className={styles.featureItem}>
                        <span className={styles.featureIcon} aria-hidden="true">
                          {f.icon}
                        </span>
                        {f.text[locale]}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {s.chat && (
                <section className={styles.panel}>
                  <div className={styles.chatHead}>
                    <span className={styles.panelTitle}>{s.chat.title[locale]}</span>
                    <span className={styles.online}>
                      <span className={styles.onlineDot} />
                      24/7
                    </span>
                  </div>
                  <div className={styles.chat}>
                    {s.chat.messages.map((m, i) => (
                      <div
                        key={i}
                        className={`${styles.bubble} ${
                          m.role === "user" ? styles.bubbleUser : styles.bubbleBot
                        }`}
                      >
                        {m.text[locale]}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Insight */}
            {s.insight && <p className={styles.insight}>{s.insight[locale]}</p>}

            {/* Footer chips */}
            {(s.services || s.stack) && (
              <div className={styles.footer}>
                {(s.services?.map((sv) => sv[locale]) ?? s.stack ?? []).map(
                  (chip) => (
                    <span key={chip} className={styles.chip}>
                      {chip}
                    </span>
                  ),
                )}
              </div>
            )}

            {/* CTA */}
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
        </article>

        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>{t.casesRelatedTitle}</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => {
                const card = caseCardContent(r, locale, t);
                return (
                  <Link
                    key={r.id}
                    href={localePath(`/cases/${r.id}`)}
                    className={styles.relatedCard}
                  >
                    <span className={styles.relatedTag}>{card.tag}</span>
                    <span className={styles.relatedName}>{card.title}</span>
                    <span className={styles.relatedArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
