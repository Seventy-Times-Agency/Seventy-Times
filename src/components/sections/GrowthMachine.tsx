"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import Magnetic from "@/components/ui/Magnetic";
import { useT } from "@/i18n/context";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/components/sections/GrowthMachine.module.css";

type Pkg = {
  id: string;
  index: number;
  tier: string;
  title: string;
  sub: string;
  includes: readonly string[];
  term: string;
  recommended?: boolean;
};

export default function GrowthMachine() {
  const { t } = useT();

  const packages: Pkg[] = [
    {
      id: "launch",
      index: 1,
      tier: t.gm1Tier,
      title: t.gm1Title,
      sub: t.gm1Sub,
      includes: t.gm1Inc,
      term: t.gm1Term,
    },
    {
      id: "growth",
      index: 2,
      tier: t.gm2Tier,
      title: t.gm2Title,
      sub: t.gm2Sub,
      includes: t.gm2Inc,
      term: t.gm2Term,
      recommended: true,
    },
    {
      id: "scale",
      index: 3,
      tier: t.gm3Tier,
      title: t.gm3Title,
      sub: t.gm3Sub,
      includes: t.gm3Inc,
      term: t.gm3Term,
    },
  ];

  return (
    <section id="growth-machine" className={styles.section}>
      <SectionWatermark
        text={t.navMachine.toLowerCase()}
        number="/ 02"
        position="right"
      />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">{t.gmEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                t.gmTitle1,
                { text: t.gmTitle2, className: styles.titleItalic },
                { text: t.gmTitle3, className: "shimmer" },
              ]}
            />
          </h2>
        </div>
        <div className={styles.headerRight}>
          <Reveal delay={0.15}>
            <p className={styles.lead}>{t.gmLead}</p>
            <div className={styles.discountTag} aria-hidden="true">
              <span className={styles.discountValue}>{t.gmDiscount}</span>
              <span className={styles.discountLabel}>{t.gmDiscountLabel}</span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className={styles.grid}>
        {packages.map((pkg, i) => (
          <Reveal key={pkg.id} delay={i * 0.08}>
            <PackageCard
              pkg={pkg}
              recommendedLabel={t.gmRecommended}
              includesLabel={t.gmIncludes}
              termLabel={t.gmTerm}
              priceLabel={t.gmPriceLabel}
              priceHint={t.gmPriceHint}
              cta={t.gmCta}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.35}>
        <div className={styles.guarantee}>
          <span className={styles.guaranteeShield} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 L20 5 V11 C20 16 16 20 12 22 C8 20 4 16 4 11 V5 Z" />
              <path d="M9 12 L11.2 14 L15 9.8" />
            </svg>
          </span>
          <div className={styles.guaranteeText}>
            <span className={styles.guaranteeTitle}>{t.gmGuaranteeTitle}</span>
            <p className={styles.guaranteeBody}>{t.gmGuaranteeBody}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

type PackageCardProps = {
  pkg: Pkg;
  recommendedLabel: Dictionary["gmRecommended"];
  includesLabel: Dictionary["gmIncludes"];
  termLabel: Dictionary["gmTerm"];
  priceLabel: Dictionary["gmPriceLabel"];
  priceHint: Dictionary["gmPriceHint"];
  cta: Dictionary["gmCta"];
};

function PackageCard({
  pkg,
  recommendedLabel,
  includesLabel,
  termLabel,
  priceLabel,
  priceHint,
  cta,
}: PackageCardProps) {
  const num = String(pkg.index).padStart(2, "0");
  const className = `${styles.card}${pkg.recommended ? ` ${styles.cardRecommended}` : ""}`;

  return (
    <article className={className}>
      {pkg.recommended && (
        <span className={styles.recommendedBadge}>
          <span className={styles.recommendedDot} />
          {recommendedLabel}
        </span>
      )}

      <header className={styles.cardHeader}>
        <span className={styles.cardNum}>/ {num}</span>
        <span className={styles.cardTier}>{pkg.tier}</span>
      </header>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{pkg.title}</h3>
        <p className={styles.cardSub}>{pkg.sub}</p>

        <span className={styles.cardListLabel}>{includesLabel}</span>
        <ul className={styles.cardList}>
          {pkg.includes.map((item) => (
            <li key={item} className={styles.cardListItem}>
              <span className={styles.cardListBullet} aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.cardFooter}>
        <div className={styles.cardTerm}>
          <span className={styles.cardTermLabel}>{termLabel}</span>
          <span className={styles.cardTermValue}>{pkg.term}</span>
        </div>

        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>{priceLabel}</span>
          <span className={styles.priceHint}>{priceHint}</span>
        </div>

        <Magnetic strength={0.3}>
          <a href="#lead" className={styles.cardCta}>
            {cta}
            <span className={styles.cardCtaArrow} aria-hidden="true">
              →
            </span>
          </a>
        </Magnetic>
      </footer>
    </article>
  );
}
