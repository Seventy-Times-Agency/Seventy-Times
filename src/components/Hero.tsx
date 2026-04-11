"use client";

import { motion, type Variants } from "framer-motion";
import AnimatedText from "./AnimatedText";
import Counter from "./Counter";
import Magnetic from "./Magnetic";
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

type Stat = {
  label: string;
  counter?: { to: number; suffix?: string; prefix?: string };
  static?: string;
};

const STATS: Stat[] = [
  { label: "Клиентов", counter: { to: 50, suffix: "+" } },
  { label: "AI-поддержка", static: "24/7" },
  { label: "Рост конверсий", counter: { to: 3, suffix: "×" } },
  { label: "Следующий виток", static: "2026" },
];

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <span className={styles.heroWordmark} aria-hidden="true">
        ia<span className={styles.heroWordmarkOutline}>a</span>
      </span>

      <motion.div variants={container} initial="hidden" animate="visible">
        {/* Editorial meta strip */}
        <motion.div variants={item} className={styles.meta}>
          <span className={styles.metaLeft}>
            <span className={styles.metaLine} />
            Реклама · Автоматизация · AI
          </span>
          <span className={styles.metaCenter}>
            <span className={styles.metaDot} />
            Принимаем проекты · 2026
          </span>
          <span className={styles.metaRight}>
            США → Весь мир
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
            <span className={styles.subStrong}>IAA agency</span> — команда,
            которая превращает AI и digital-маркетинг в предсказуемый поток
            клиентов. Реклама, автоматизация и умные боты, настроенные под
            один KPI — ваш рост.
          </p>

          <div className={styles.actions}>
            <div className={styles.actionsRow}>
              <Magnetic strength={0.4}>
                <a href="#chat" className={styles.primary}>
                  Поговорить с Венесой
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a href="#services" className={styles.secondary}>
                  Услуги
                </a>
              </Magnetic>
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
              <span className={styles.statValue}>
                {s.counter ? (
                  <Counter
                    to={s.counter.to}
                    suffix={s.counter.suffix}
                    prefix={s.counter.prefix}
                  />
                ) : (
                  s.static
                )}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
