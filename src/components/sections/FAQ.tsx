"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/FAQ.module.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useT();
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const items = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
    { q: t.faq6q, a: t.faq6a },
    { q: t.faq7q, a: t.faq7a },
    { q: t.faq8q, a: t.faq8a },
  ];

  const focus = (i: number) => {
    const el = btnRefs.current[i];
    if (el) el.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focus(i === last ? 0 : i + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focus(i === 0 ? last : i - 1);
        break;
      case "Home":
        e.preventDefault();
        focus(0);
        break;
      case "End":
        e.preventDefault();
        focus(last);
        break;
    }
  };

  return (
    <section id="faq" className={styles.section}>
      <SectionWatermark text={t.faqTitle2} number="/ 05" position="left" />
      <div className={styles.layout}>
        <div className={styles.intro}>
          <Reveal><span className="eyebrow">{t.faqEyebrow}</span></Reveal>
          <h2 className={styles.title}>
            <AnimatedText stagger={0.1} words={[t.faqTitle1, { text: t.faqTitle2, className: styles.titleItalic }]} />
          </h2>
          <Reveal delay={0.2}><p className={styles.lead}>{t.faqLead}</p></Reveal>
          <Reveal delay={0.3}>
            <p className={styles.note}>
              {t.faqNote}{" "}
              <a className={styles.noteLink} href={siteConfig.contacts.telegram.url} target="_blank" rel="noopener noreferrer">
                {t.faqNoteLink}
              </a>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className={styles.listWrap}>
          <div className={styles.list}>
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={item.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
                  <button
                    ref={(el) => { btnRefs.current[i] = el; }}
                    className={styles.question}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    type="button"
                  >
                    <span className={styles.qIndex}>/ {num}</span>
                    <span className={styles.qText}>{item.q}</span>
                    <span className={styles.toggle} aria-hidden="true">+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="content" id={`faq-${i}`} className={styles.answer}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}>
                        <p className={styles.answerInner}>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          <div className={styles.still}>
            <span className={styles.stillText}>{t.faqStill}</span>
            <a href="#lead" className={styles.stillCta}>
              {t.faqStillCta}
            </a>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
