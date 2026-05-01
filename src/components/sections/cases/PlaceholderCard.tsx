"use client";

import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/components/sections/Cases.module.css";

type Props = {
  href: string;
  title: string;
  summary: string;
  ctaLabel: Dictionary["casesPlaceholderCta"];
};

/**
 * The "your project here" tile that closes out the case grid. Plain
 * `<a>` (not `<Link>`) so the same-page `#lead` hash triggers the
 * lead-modal's existing hashchange listener.
 */
export default function PlaceholderCard({
  href,
  title,
  summary,
  ctaLabel,
}: Props) {
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
