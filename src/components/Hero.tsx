"use client";

import { motion, type Variants } from "framer-motion";
import AnimatedText from "./AnimatedText";
import RingCounter from "./RingCounter";
import Magnetic from "./Magnetic";
import { useT } from "@/i18n/context";
import styles from "./Hero.module.css";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero() {
  const { t } = useT();

  // Each stat has a ring fill % + either a counted number or a static display.
  // Fill percentages are decorative — they show the ring "loading" toward
  // its target when the section comes into view.
  const stats = [
    {
      display: "70×",
      to: 70,
      suffix: "×",
      label: t.statGoal,
      fillPct: 100, // ambition fully drawn
    },
    {
      display: "3",
      to: 3,
      suffix: "",
      label: t.statServices,
      fillPct: 100, // 3 of 3 services
    },
    {
      display: "24/7",
      label: t.statSupport,
      fillPct: 100, // always on
    },
    {
      display: "2026",
      label: t.statLaunch,
      fillPct: 100, // launch year — full ring as marker
    },
  ];

  return (
    <section id="top" className={styles.hero}>
      <span className={styles.heroWordmark} aria-hidden="true">
        70<span className={styles.heroWordmarkOutline}>×</span>
      </span>

      <motion.div variants={container} initial="hidden" animate="visible">
        {/* Editorial meta strip */}
        <motion.div variants={item} className={styles.meta}>
          <span className={styles.metaLeft}>
            <span className={styles.metaLine} />
            {t.heroMeta1}
          </span>
          <span className={styles.metaCenter}>
            <span className={styles.metaDot} />
            {t.heroMeta2}
          </span>
          <span className={styles.metaRight}>
            {t.heroMeta3}
            <span className={styles.metaLine} />
          </span>
        </motion.div>

        {/* Massive editorial title with mask-reveal animation */}
        <h1 className={styles.title}>
          <span className={styles.titleBlock}>
            <span className={styles.titleRow}>
              <AnimatedText immediate delay={0.25} words={[t.heroTitle1]} />
            </span>
            <span className={styles.titleRow}>
              <AnimatedText
                immediate
                delay={0.35}
                words={[
                  { text: t.heroTitle2, className: styles.titleOutline },
                  { text: t.heroTitle3, className: "shimmer" },
                ]}
              />
            </span>
            <span className={styles.titleRow}>
              <AnimatedText immediate delay={0.55} words={[t.heroTitle4]} />
            </span>
          </span>
        </h1>

        {/* Sub + CTAs */}
        <motion.div variants={item} className={styles.grid}>
          <p className={styles.sub}>{t.heroSub}</p>

          <div className={styles.actions}>
            <div className={styles.actionsRow}>
              <Magnetic strength={0.4}>
                <a href="#lead" className={styles.primary}>
                  {t.heroCta1}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="#chat" className={styles.secondary}>
                  {t.heroCta2}
                </a>
              </Magnetic>
            </div>
            <span className={styles.hint}>{t.heroHint}</span>
          </div>
        </motion.div>

        {/* Stats strip — animated rings + counters */}
        <motion.div variants={item} className={styles.stats}>
          {stats.map((s) => (
            <RingCounter
              key={s.label}
              display={s.display}
              to={s.to}
              suffix={s.suffix}
              label={s.label}
              fillPct={s.fillPct}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
