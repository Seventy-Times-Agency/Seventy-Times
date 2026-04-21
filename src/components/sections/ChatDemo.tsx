"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/ChatDemo.module.css";

export default function ChatDemo() {
  const { t } = useT();

  const openChat = () => {
    window.dispatchEvent(new Event("open-venesa"));
  };

  return (
    <section id="chat" className={styles.section}>
      <SectionWatermark text="demo" number="/ 03" position="right" />

      <div className={styles.layout}>
        <div className={styles.intro}>
          <Reveal>
            <span className="eyebrow">{t.venEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              stagger={0.1}
              words={[
                t.venTitle1,
                t.venTitle2,
                { text: t.venTitle3, className: styles.titleItalic },
              ]}
            />
          </h2>
          <Reveal delay={0.15}>
            <p className={styles.lead}>{t.venLead}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className={styles.bullets}>
              {t.venBullets.map((b) => (
                <div key={b} className={styles.bullet}>
                  <span className={styles.bulletIcon}>→</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <button type="button" className={styles.cta} onClick={openChat}>
              {t.venCta} <span aria-hidden="true">→</span>
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
              <Image
                src="/venesa.jpg"
                alt={t.chatAlt}
                className={styles.portraitImg}
                width={480}
                height={600}
                sizes="(max-width: 768px) 80vw, 480px"
                priority={false}
              />
              <span className={styles.portraitLabel}>{t.venBadgeLabel}</span>
              <div className={styles.portraitBadge}>
                <span className={styles.badgeDot} />
                <div className={styles.badgeMeta}>
                  <span className={styles.badgeName}>{t.venBadgeName}</span>
                  <span className={styles.badgeRole}>{t.venBadgeRole}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
