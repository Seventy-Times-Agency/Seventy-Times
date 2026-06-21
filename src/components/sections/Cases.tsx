"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { CASES, caseCardContent, type CaseStatus } from "@/data/cases";
import { useT } from "@/i18n/context";
import CaseCard from "@/components/sections/cases/CaseCard";
import PlaceholderCard from "@/components/sections/cases/PlaceholderCard";
import styles from "@/components/sections/Cases.module.css";

export default function Cases() {
  const { t, locale, localePath } = useT();

  const statusLabel: Record<CaseStatus, string> = {
    live: t.casesStatusLive,
    progress: t.casesStatusProgress,
    soon: t.casesStatusSoon,
  };

  // In-progress work leads the grid, "soon" follows, and finished
  // (live) cases settle at the end. Array.sort is stable, so the
  // authored order is preserved within each status group.
  const statusWeight: Record<CaseStatus, number> = {
    progress: 0,
    soon: 1,
    live: 2,
  };
  const orderedCases = [...CASES].sort(
    (a, b) => statusWeight[a.status] - statusWeight[b.status],
  );

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
        {orderedCases.map((item, i) => {
          const card = caseCardContent(item, locale);
          return (
            <Reveal key={item.id} delay={i * 0.08}>
              <CaseCard
                index={i + 1}
                title={card.title}
                tag={card.tag}
                summary={card.summary}
                metrics={card.metrics}
                status={item.status}
                statusLabel={statusLabel[item.status]}
                location={card.regionLabel}
                ctaLabel={t.casesCta}
                href={localePath(`/cases/${item.id}`)}
              />
            </Reveal>
          );
        })}
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
