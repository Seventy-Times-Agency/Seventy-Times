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

  // One grid for every case. Current work leads (in-progress → soon →
  // live) and the 2020–2021 "early" projects sort last, but they share
  // the same shelf: each of those cards already carries a
  // "· 2020–2021" tag, so the period reads off the card itself and a
  // separate captioned block would only cost vertical space. Array.sort
  // is stable, so the authored order survives within each group.
  const statusWeight: Record<CaseStatus, number> = {
    progress: 0,
    soon: 1,
    live: 2,
  };
  const cases = [...CASES].sort(
    (a, b) =>
      Number(a.era === "early") - Number(b.era === "early") ||
      statusWeight[a.status] - statusWeight[b.status],
  );

  return (
    <section id="cases" className={styles.section}>
      <SectionWatermark
        text={t.navCases.toLowerCase()}
        number="/ 04"
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
        {cases.map((item, i) => {
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
        <Reveal delay={cases.length * 0.08} className={styles.placeholderSlot}>
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
