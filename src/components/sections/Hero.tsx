"use client";

import { motion, type Variants } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import RingCounter from "@/components/ui/RingCounter";
import Magnetic from "@/components/ui/Magnetic";
import Globe from "@/components/ui/Globe";
import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Hero.module.css";

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

  // Stats are visual rings; display values live in siteConfig so they
  // stay in sync with other numeric mentions on the site.
  // Each ring fills over ~2.5s with easeInOut so the digit visibly
  // counts up. A 0.12s stagger gives a subtle L→R cascade.
  const [goal, services, support, launch] = siteConfig.stats;
  const stats = [
    {
      display: goal.value,
      to: 3.5,
      decimals: 1,
      suffix: "×",
      label: t.statGoal,
      fillPct: 100,
      id: "goal",
      delay: 0,
    },
    {
      display: services.value,
      to: 3,
      suffix: "",
      label: t.statServices,
      fillPct: 100,
      id: "services",
      delay: 0.12,
    },
    {
      display: support.value,
      to: 24,
      suffix: "/7",
      label: t.statSupport,
      fillPct: 100,
      id: "support",
      delay: 0.24,
    },
    {
      display: launch.value,
      to: 2026,
      label: t.statLaunch,
      fillPct: 100,
      id: "launch",
      delay: 0.36,
    },
  ];

  return (
    <section id="top" className={styles.hero}>
      <span className={styles.heroWordmark} aria-hidden="true">
        70<span className={styles.heroWordmarkOutline}>×</span>
      </span>

      <div className={styles.heroGlobe} aria-hidden="true">
        <span className={styles.heroGlobeLabelTop}>
          <span>N 40.71°</span>
          <span className={styles.heroGlobeLabelLine} />
          <span>W 74.00°</span>
        </span>
        <Globe size={220} density={4} interactive autoRotate />
        <span className={styles.heroGlobeLabelBot}>
          USA → WORLDWIDE
        </span>
      </div>

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
              id={s.id}
              display={s.display}
              to={s.to}
              suffix={s.suffix}
              decimals={s.decimals}
              label={s.label}
              fillPct={s.fillPct}
              delay={s.delay}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
