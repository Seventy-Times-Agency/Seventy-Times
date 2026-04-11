"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;

  // Track current index by watching scroll position
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const cardWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth
        : 1;
      const gap = 22;
      const step = cardWidth + gap;
      const next = Math.round(el.scrollLeft / step);
      setIndex(Math.max(0, Math.min(total - 1, next)));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [total]);

  const scrollByOne = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 0;
    const gap = 22;
    el.scrollBy({ left: (cardWidth + gap) * direction, behavior: "smooth" });
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  };

  const progressPct = total > 1 ? ((index + 1) / total) * 100 : 100;

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
          <div className={styles.headerRight}>
            <p className={styles.lead}>
              Команды из США и Европы, с которыми мы запускали проекты в
              последние месяцы.
            </p>
            <a href="#review" className={styles.reviewBtn}>
              Оставить отзыв
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className={styles.carousel}>
        <div className={styles.track} ref={trackRef}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className={styles.card}
              onMouseMove={handleMove}
            >
              <div className={styles.quoteMark}>&ldquo;</div>
              <p className={styles.quote}>{t.content}</p>
              <div className={styles.author}>
                <span className={styles.authorName}>{t.name}</span>
                <span className={styles.authorRole}>{t.role}</span>
                <span className={styles.authorLocation}>{t.location}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.progress}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className={styles.counter}>
            / {String(index + 1).padStart(2, "0")} —{" "}
            {String(total).padStart(2, "0")}
          </span>
          <div className={styles.navButtons}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => scrollByOne(-1)}
              disabled={index === 0}
              aria-label="Предыдущий отзыв"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => scrollByOne(1)}
              disabled={index >= total - 1}
              aria-label="Следующий отзыв"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
