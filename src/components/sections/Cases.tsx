"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { CASES, type CaseStatus } from "@/data/cases";
import { useT } from "@/i18n/context";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/components/sections/Cases.module.css";

export default function Cases() {
  const { t, localePath } = useT();

  const statusLabel: Record<CaseStatus, string> = {
    live: t.casesStatusLive,
    progress: t.casesStatusProgress,
    soon: t.casesStatusSoon,
  };

  return (
    <section id="cases" className={styles.section}>
      <SectionWatermark
        text={t.navCases.toLowerCase()}
        number="/ 05"
        position="left"
      />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">{t.casesEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                t.casesTitle1,
                { text: t.casesTitle2, className: styles.titleItalic },
                t.casesTitle3,
              ]}
            />
          </h2>
        </div>
        <div className={styles.headerRight}>
          <Reveal delay={0.15}>
            <p className={styles.lead}>{t.casesLead}</p>
          </Reveal>
        </div>
      </div>

      <div className={styles.grid}>
        {CASES.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08}>
            <CaseCard
              index={i + 1}
              title={t[item.titleKey]}
              tag={t[item.tagKey]}
              summary={t[item.summaryKey]}
              metrics={item.metricsKey ? t[item.metricsKey] : undefined}
              status={item.status}
              statusLabel={statusLabel[item.status]}
              ctaLabel={t.casesCta}
              href={localePath(`/cases/${item.id}`)}
            />
          </Reveal>
        ))}
        <Reveal delay={CASES.length * 0.08}>
          <PlaceholderCard
            href={`${localePath("/")}#lead`}
            title={t.casesPlaceholderTitle}
            summary={t.casesPlaceholderSummary}
            ctaLabel={t.casesPlaceholderCta}
          />
        </Reveal>
      </div>
    </section>
  );
}

type CaseCardProps = {
  index: number;
  title: string;
  tag: string;
  summary: string;
  metrics?: readonly string[];
  status: CaseStatus;
  statusLabel: string;
  ctaLabel: string;
  href: string;
};

function CaseCard({
  index,
  title,
  tag,
  summary,
  metrics,
  status,
  statusLabel,
  ctaLabel,
  href,
}: CaseCardProps) {
  const num = String(index).padStart(2, "0");

  return (
    <Link href={href} className={`${styles.card} ${styles.cardLink}`}>
      <div className={styles.cardTop}>
        <span className={styles.number}>/ {num}</span>
        <span
          className={`${styles.status} ${styles[`status_${status}`]}`}
          aria-label={statusLabel}
        >
          <span className={styles.statusDot} />
          {statusLabel}
        </span>
      </div>

      <span className={styles.tag}>{tag}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.summary}>{summary}</p>

      {metrics && metrics.length > 0 && (
        <ul className={styles.metricList}>
          {metrics.map((m) => (
            <li key={m} className={styles.metricItem}>
              <span className={styles.metricBullet} aria-hidden="true">
                ◆
              </span>
              {m}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.cta}>
        <span>{ctaLabel}</span>
        <span className={styles.ctaArrow} aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}

function PlaceholderCard({
  href,
  title,
  summary,
  ctaLabel,
}: {
  href: string;
  title: string;
  summary: string;
  ctaLabel: Dictionary["casesPlaceholderCta"];
}) {
  return (
    <a
      href={href}
      className={`${styles.card} ${styles.cardPlaceholder} ${styles.cardLink}`}
    >
      <div className={styles.cardTop}>
        <span className={styles.number}>+</span>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.cta}>
        <span>{ctaLabel}</span>
        <span className={styles.ctaArrow} aria-hidden="true">
          →
        </span>
      </div>
    </a>
  );
}
