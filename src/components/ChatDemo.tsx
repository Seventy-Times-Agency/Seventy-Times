"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import styles from "./ChatDemo.module.css";

const BULLETS = [
  "Обучена на материалах и тон-оф-войсе вашего бренда",
  "Отвечает на любом языке, работает 24/7",
  "Собирает заявки прямо в CRM или Telegram",
  "Вы контролируете что она знает и как общается",
];

/**
 * Promotional showcase for Venesa — the AI consultant. No actual chat
 * inline; the CTA opens the floating ChatWidget via a custom event.
 */
export default function ChatDemo() {
  const openChat = () => {
    window.dispatchEvent(new Event("open-venesa"));
  };

  return (
    <section id="chat" className={styles.section}>
      <SectionWatermark text="демо" number="/ 03" position="right" />

      <div className={styles.layout}>
        <div className={styles.intro}>
          <Reveal>
            <span className="eyebrow">— Знакомьтесь / Венеса</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              stagger={0.1}
              words={[
                "Ваш",
                "AI-консультант",
                { text: "Венеса.", className: styles.titleItalic },
              ]}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className={styles.lead}>
              Венеса — AI-ассистент на базе Claude, обученный под ваш бизнес.
              Она общается с клиентами на сайте, в Telegram и Instagram,
              квалифицирует лиды и передаёт горячих вам напрямую. Такого же
              бота мы создаём под каждый проект.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className={styles.bullets}>
              {BULLETS.map((b) => (
                <div key={b} className={styles.bullet}>
                  <span className={styles.bulletIcon}>→</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <button
              type="button"
              className={styles.cta}
              onClick={openChat}
            >
              Написать Венесе <span aria-hidden="true">→</span>
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className={styles.portrait}>
            <motion.div
              className={`${styles.ring} ${styles.ringA}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className={`${styles.ring} ${styles.ringB}`}
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            />
            <div className={styles.portraitFrame}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/venesa.jpg"
                alt="Венеса — AI-консультант IAA agency"
                className={styles.portraitImg}
              />
              <span className={styles.portraitLabel}>AI Agent</span>
              <div className={styles.portraitBadge}>
                <span className={styles.badgeDot} />
                <div className={styles.badgeMeta}>
                  <span className={styles.badgeName}>Венеса</span>
                  <span className={styles.badgeRole}>AI-консультант · Онлайн</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
