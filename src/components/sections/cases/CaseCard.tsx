"use client";

import Link from "next/link";
import type { CaseStatus } from "@/data/cases";
import styles from "@/components/sections/Cases.module.css";

export type CaseCardProps = {
  index: number;
  title: string;
  tag: string;
  summary: string;
  metrics?: readonly string[];
  status: CaseStatus;
  statusLabel: string;
  location: string;
  ctaLabel: string;
  href: string;
};

/**
 * Single portfolio card on the landing grid. Wraps a `<Link>` so the
 * whole card is clickable and ships a status pill, an optional
 * metrics list, and a CTA arrow that nudges on hover.
 */
export default function CaseCard({
  index,
  title,
  tag,
  summary,
  metrics,
  status,
  statusLabel,
  location,
  ctaLabel,
  href,
}: CaseCardProps) {
  const num = String(index).padStart(2, "0");

  return (
    <Link href={href} className={`${styles.card} ${styles.cardLink}`}>
      <div className={styles.cardTop}>
        <div className={styles.cardTopLeft}>
          <span className={styles.number}>/ {num}</span>
          <span className={styles.location}>
            <span className={styles.locationPin} aria-hidden="true" />
            {location}
          </span>
        </div>
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
