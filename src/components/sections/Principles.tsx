"use client";

import Reveal from "@/components/ui/Reveal";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Principles.module.css";

type Principle = {
  badge: string;
  title: string;
  body: string;
};

/**
 * The four brand principles, rendered as a calm 2×2 card grid inside
 * the Process section. The old serpentine "spine" decoration (curved
 * SVG threads with pulse nodes) is gone by owner's call — it read as
 * hanging fishing line rather than structure.
 */
export default function Principles() {
  const { t } = useT();
  const items: Principle[] = [
    { badge: t.prin1Badge, title: t.prin1Title, body: t.prin1Body },
    { badge: t.prin2Badge, title: t.prin2Title, body: t.prin2Body },
    { badge: t.prin3Badge, title: t.prin3Title, body: t.prin3Body },
    { badge: t.prin4Badge, title: t.prin4Title, body: t.prin4Body },
  ];

  return (
    <div className={styles.wrap}>
      <Reveal>
        <p className={styles.lead}>{t.testLead}</p>
      </Reveal>
      <div className={styles.grid}>
        {items.map((p, i) => (
          <Reveal key={p.badge} delay={i * 0.08}>
            <article className={styles.card}>
              <span className={styles.badge}>/ {p.badge}</span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardBody}>{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
