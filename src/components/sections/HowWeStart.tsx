"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import Magnetic from "@/components/ui/Magnetic";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/HowWeStart.module.css";

/**
 * "How we start" — the neutral entry section that replaced the old
 * packages block. Three steps, no prices anywhere: briefing call →
 * diagnostics when needed → a plan with numbers built per case.
 * Pricing is only ever discussed after the briefing.
 */
export default function HowWeStart() {
  const { t } = useT();

  const steps = [
    { num: "01", title: t.hs1, desc: t.hs1d, tag: t.hs1t },
    { num: "02", title: t.hs2, desc: t.hs2d, tag: t.hs2t },
    { num: "03", title: t.hs3, desc: t.hs3d, tag: t.hs3t },
  ];

  return (
    <section id="how-we-start" className={styles.section}>
      <SectionWatermark text={t.navStart.toLowerCase()} number="/ 01" position="left" />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">{t.hsEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                t.hsTitle1,
                t.hsTitle2,
                { text: t.hsTitle3, className: styles.titleItalic },
              ]}
            />
          </h2>
        </div>
        <div className={styles.headerRight}>
          <Reveal delay={0.15}>
            <p className={styles.lead}>{t.hsLead}</p>
          </Reveal>
        </div>
      </div>

      <div className={styles.grid}>
        {steps.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.1}>
            <div className={styles.step}>
              <div className={styles.numberWrap}>{step.num}</div>
              <span className={styles.tag}>{step.tag}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className={styles.ctaRow}>
          <Magnetic strength={0.4}>
            <a href="#lead" className={styles.cta}>
              {t.hsCta}
              <span aria-hidden="true"> →</span>
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  );
}
