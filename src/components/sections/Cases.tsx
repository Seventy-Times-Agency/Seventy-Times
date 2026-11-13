"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { CASES, caseCardContent, type CaseStatus } from "@/data/cases";
import { CASE_CARDS } from "@/data/caseCards";
import { useT } from "@/i18n/context";
import CaseCard from "@/components/sections/cases/CaseCard";
import PlaceholderCard from "@/components/sections/cases/PlaceholderCard";
import CaseCarousel from "@/components/sections/cases/CaseCarousel";
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

      <Reveal>
        <CaseCarousel
          label={t.casesCarousel}
          prevLabel={t.casesPrev}
          nextLabel={t.casesNext}
          // Open on the last case so the "your project" card sits on the right.
          initialIndex={Math.max(0, cases.length - 1)}
        >
        {cases.map((item) => {
          const copy = CASE_CARDS[item.id];
          return (
              <CaseCard
                key={item.id}
                kind={copy.kind[locale]}
                title={copy.title[locale]}
                task={copy.task[locale]}
                status={item.status}
                statusLabel={statusLabel[item.status]}
                location={caseCardContent(item, locale).regionLabel}
                ctaLabel={t.casesCta}
                href={localePath(`/cases/${item.id}`)}
              />
          );
        })}
          <PlaceholderCard
            href="#lead"
            title={t.casesPlaceholderTitle}
            summary={t.casesPlaceholderSummary}
            ctaLabel={t.casesPlaceholderCta}
          />
        </CaseCarousel>
      </Reveal>
    </section>
  );
}
