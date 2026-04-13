"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import { useT } from "@/i18n/context";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const { t } = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;

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
    el.scrollBy({ left: (cardWidth + 22) * direction, behavior: "smooth" });
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const progressPct = total > 1 ? ((index + 1) / total) * 100 : 100;

  return (
    <section id="testimonials" className={styles.section}>
      <SectionWatermark text={t.testTitle3} number="/ 04" position="right" />
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal><span className="eyebrow">{t.testEyebrow}</span></Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[t.testTitle1, t.testTitle2, { text: t.testTitle3, className: styles.titleItalic }]}
            />
          </h2>
        </div>
        <Reveal delay={0.15}>
          <div className={styles.headerRight}>
            <p className={styles.lead}>{t.testLead}</p>
            <a href="#review" className={styles.reviewBtn}>
              {t.testReviewBtn} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
      <div className={styles.carousel}>
        <div className={styles.track} ref={trackRef}>
          {TESTIMONIALS.map((tm) => (
            <div key={tm.name} className={styles.card} onMouseMove={handleMove}>
              <div className={styles.quoteMark}>&ldquo;</div>
              <p className={styles.quote}>{tm.content}</p>
              <div className={styles.author}>
                <span className={styles.authorName}>{tm.name}</span>
                <span className={styles.authorRole}>{tm.role}</span>
                <span className={styles.authorLocation}>{tm.location}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <div className={styles.progress}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
          <span className={styles.counter}>/ {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}</span>
          <div className={styles.navButtons}>
            <button type="button" className={styles.navBtn} onClick={() => scrollByOne(-1)} disabled={index === 0} aria-label={t.testPrev}>←</button>
            <button type="button" className={styles.navBtn} onClick={() => scrollByOne(1)} disabled={index >= total - 1} aria-label={t.testNext}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
