"use client";

import Link from "next/link";
import type { CaseStatus } from "@/data/cases";
import styles from "@/components/sections/Cases.module.css";

export type CaseCardProps = {
  kind: string;
  title: string;
  task: string;
  status: CaseStatus;
  statusLabel: string;
  location: string;
  ctaLabel: string;
  href: string;
};

/** One tile on the case shelf: every tile has the same size and the same parts. */
export default function CaseCard({
  kind,
  title,
  task,
  status,
  statusLabel,
  location,
  ctaLabel,
  href,
}: CaseCardProps) {
  return (
    <Link href={href} className={`${styles.card} ${styles.cardLink}`}>
      <div className={styles.cardTop}>
        <span className={styles.tag}>{kind}</span>
        <span className={`${styles.status} ${styles[`status_${status}`]}`}>
          <span className={styles.statusDot} />
          {statusLabel}
        </span>
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.summary}>{task}</p>

      <div className={styles.cta}>
        <span>{ctaLabel}</span>
        <span className={styles.location}>{location}</span>
        <span className={styles.ctaArrow} aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
