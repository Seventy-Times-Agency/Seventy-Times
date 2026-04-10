"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ_ITEMS } from "@/data/faq";
import { siteConfig } from "@/data/siteConfig";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.intro}>
          <Reveal>
            <span className="eyebrow">— FAQ / Questions</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              stagger={0.1}
              words={[
                "Частые",
                { text: "вопросы", className: styles.titleItalic },
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className={styles.lead}>
              Самое частое, что спрашивают перед стартом. Если не нашли свой
              вопрос — напишите напрямую, ответим в течение часа.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className={styles.note}>
              Нужен ответ быстрее?{" "}
              <a
                className={styles.noteLink}
                href={siteConfig.contacts.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Напишите в Telegram →
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className={styles.list}>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const num = String(i + 1).padStart(2, "0");
              return (
                <div
                  key={item.q}
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                >
                  <button
                    className={styles.question}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                  >
                    <span className={styles.qIndex}>/ {num}</span>
                    <span className={styles.qText}>{item.q}</span>
                    <span className={styles.toggle} aria-hidden="true">
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={`faq-${i}`}
                        className={styles.answer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                      >
                        <p className={styles.answerInner}>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
