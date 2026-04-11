"use client";

import { type MouseEvent } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  };

  return (
    <section id="testimonials" className={styles.section}>
      <SectionWatermark text="отзывы" number="/ 04" position="right" />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">— Отзывы / Клиенты</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                "Что",
                "говорят",
                { text: "клиенты", className: styles.titleItalic },
              ]}
            />
          </h2>
        </div>
        <Reveal delay={0.15}>
          <p className={styles.lead}>
            Команды из США и Европы, с которыми мы запускали проекты в
            последние месяцы.
          </p>
        </Reveal>
      </div>

      <div className={styles.grid}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <div className={styles.card} onMouseMove={handleMove}>
              <div className={styles.quoteMark}>&ldquo;</div>
              <p className={styles.quote}>{t.content}</p>
              <div className={styles.author}>
                <span className={styles.authorName}>{t.name}</span>
                <span className={styles.authorRole}>{t.role}</span>
                <span className={styles.authorLocation}>{t.location}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
