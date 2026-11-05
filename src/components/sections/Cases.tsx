"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { CASES, caseCardContent, type CaseStatus } from "@/data/cases";
import { CASE_CARDS } from "@/data/caseCards";
import { useT } from "@/i18n/context";
import CaseCard from "@/components/sections/cases/CaseCard";
import PlaceholderCard from "@/components/sections/cases/PlaceholderCard";
import styles from "@/components/sections/Cases.module.css";

type Props = {
  /** /cases opens with this section, so its title is the page's h1. */
  titleAs?: "h1" | "h2";
};

export default function Cases({ titleAs: Title = "h2" }: Props) {
  const { t, locale, localePath } = useT();

  const statusLabel: Record<CaseStatus, string> = {
    live: t.casesStatusLive,
    progress: t.casesStatusProgress,
    soon: t.casesStatusSoon,
  };

  const cases = Object.keys(CASE_CARDS)
    .map((id) => CASES.find((c) => c.id === id))
    .filter((c) => c !== undefined);

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
          <Title className={styles.title}>
            <AnimatedText
              words={[
                t.casesTitle1,
                { text: t.casesTitle2, className: styles.titleItalic },
                t.casesTitle3,
              ]}
            />
          </Title>
        </div>
        <div className={styles.headerRight}>
          <Reveal delay={0.15}>
            <p className={styles.lead}>{t.casesLead}</p>
          </Reveal>
        </div>
      </div>

      <div className={styles.grid}>
        {cases.map((item, i) => {
          const copy = CASE_CARDS[item.id];
          return (
            <Reveal key={item.id} delay={i * 0.06} className={styles.slot}>
              <CaseCard
                kind={copy.kind[locale]}
                title={copy.title[locale]}
                task={copy.task[locale]}
                status={item.status}
                statusLabel={statusLabel[item.status]}
                location={caseCardContent(item, locale).regionLabel}
                ctaLabel={t.casesCta}
                href={localePath(`/cases/${item.id}`)}
              />
            </Reveal>
          );
        })}
        <Reveal delay={cases.length * 0.06} className={styles.slot}>
          <PlaceholderCard
            href="#lead"
            title={t.casesPlaceholderTitle}
            summary={t.casesPlaceholderSummary}
            ctaLabel={t.casesPlaceholderCta}
          />
        </Reveal>
      </div>
    </section>
  );
}
