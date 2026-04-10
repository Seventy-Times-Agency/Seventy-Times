"use client";

import { motion, type Variants } from "framer-motion";
import AnimatedText from "./AnimatedText";
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

const STATS = [
  { value: "50+", label: "Клиентов" },
  { value: "24/7", label: "AI-поддержка" },
  { value: "3×", label: "Рост конверсий" },
  { value: "2026", label: "Следующий виток" },
];

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <motion.div variants={container} initial="hidden" animate="visible">
        {/* Editorial meta strip */}
        <motion.div variants={item} className={styles.meta}>
          <span className={styles.metaLeft}>
            <span className={styles.metaLine} />
            AI · Marketing · Automation
          </span>
          <span className={styles.metaCenter}>
            <span className={styles.metaDot} />
            Принимаем проекты · 2026
          </span>
          <span className={styles.metaRight}>
            Алматы → Мир
            <span className={styles.metaLine} />
          </span>
        </motion.div>

        {/* Massive editorial title with mask-reveal animation */}
        <h1 className={styles.title}>
          <span className={styles.titleBlock}>
            <span className={styles.titleRow}>
              <AnimatedText immediate delay={0.25} words={["Автоматизируем"]} />
            </span>
            <span className={styles.titleRow}>
              <AnimatedText
                immediate
                delay={0.35}
                words={[
                  { text: "рост", className: styles.titleOutline },
                  { text: "вашего", className: "shimmer" },
                ]}
              />
            </span>
            <span className={styles.titleRow}>
              <AnimatedText immediate delay={0.55} words={["бизнеса."]} />
            </span>
          </span>
        </h1>

        {/* Sub + CTAs */}
        <motion.div variants={item} className={styles.grid}>
          <p className={styles.sub}>
            <span className={styles.subStrong}>Aicore</span> — команда, которая
            превращает AI и digital-маркетинг в предсказуемый поток клиентов.
            Таргет, автоматизация и умные боты, настроенные под один KPI — ваш
            рост.
          </p>

          <div className={styles.actions}>
            <div className={styles.actionsRow}>
              <a href="#chat" className={styles.primary}>
                Поговорить с AI
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
              <a href="#services" className={styles.secondary}>
                Услуги
              </a>
            </div>
            <span className={styles.hint}>
              Ответ за 10 секунд · Без обязательств
            </span>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div variants={item} className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
