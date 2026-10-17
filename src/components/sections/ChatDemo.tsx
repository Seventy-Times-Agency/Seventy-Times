"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/ChatDemo.module.css";

// Scripted demo: visitor asks → Vanessa types and answers → visitor
// leaves a contact → the lead is handed to a specialist. Each step is
// the delay (ms) before it appears, counted from the previous one.
const STEPS = [400, 900, 2200, 1400, 900] as const;

export default function ChatDemo() {
  const { t, localePath } = useT();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  // 0 = empty; 1 = Q1; 2 = typing; 3 = A1; 4 = Q2; 5 = handed over.
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStep(5);
      return;
    }
    if (step >= STEPS.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), STEPS[step]);
    return () => window.clearTimeout(id);
  }, [inView, reduce, step]);

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat"));
  };

  const bubble = {
    initial: { opacity: 0, y: 10, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: "spring" as const, stiffness: 320, damping: 24 },
  };

  return (
    <section id="chat" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <Reveal>
            <span className="eyebrow">{t.venEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            {t.venTitle1} {t.venTitle2}{" "}
            <span className="neonOutline">{t.venTitle3}</span>
          </h2>
          <Reveal delay={0.1}>
            <p className={styles.lead}>{t.venLead}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className={styles.bullets}>
              {t.venBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <button type="button" className={styles.cta} onClick={openChat}>
              {t.venCta}
              <i aria-hidden="true">↗</i>
            </button>
          </Reveal>
          <Reveal delay={0.25}>
            <p className={styles.team}>
              {t.venTeamLead}{" "}
              <Link href={localePath("/team")} className={styles.teamLink}>
                {t.venTeamLink} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </Reveal>
        </div>

        {/* Illustrative conversation — the live chat is the floating widget. */}
        <div className={styles.stage} ref={ref} aria-hidden="true">
          <span className={`${styles.cross} ${styles.crossTL}`} />
          <span className={`${styles.cross} ${styles.crossTR}`} />
          <span className={`${styles.cross} ${styles.crossBL}`} />
          <span className={`${styles.cross} ${styles.crossBR}`} />

          <div className={styles.window}>
            <div className={styles.head}>
              <span className={styles.avatar}>
                <Image src="/vanessa-avatar.png" alt="" width={40} height={40} sizes="40px" />
              </span>
              <span className={styles.who}>
                {t.venBadgeName}
                <small>{t.venDemoOnline}</small>
              </span>
              <span className={styles.agent}>{t.venBadgeLabel}</span>
            </div>

            <div className={styles.log}>
              {step >= 1 && (
                <motion.p className={`${styles.msg} ${styles.msgIn}`} {...bubble}>
                  {t.venDemoQ1}
                </motion.p>
              )}
              {step === 2 && (
                <motion.span className={styles.typing} {...bubble}>
                  <i />
                  <i />
                  <i />
                </motion.span>
              )}
              {step >= 3 && (
                <motion.p className={`${styles.msg} ${styles.msgOut}`} {...bubble}>
                  {t.venDemoA1}
                </motion.p>
              )}
              {step >= 4 && (
                <motion.p className={`${styles.msg} ${styles.msgIn}`} {...bubble}>
                  {t.venDemoQ2}
                </motion.p>
              )}
            </div>
          </div>

          {step >= 5 && (
            <motion.div
              className={styles.handoff}
              initial={{ opacity: 0, y: -12, rotate: -6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              <i>✓</i>
              {t.venDemoDone}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
