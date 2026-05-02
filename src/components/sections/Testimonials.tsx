"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { useT } from "@/i18n/context";
import type { ApprovedReview } from "@/lib/notion";
import styles from "@/components/sections/Testimonials.module.css";

type Props = {
  reviews?: ApprovedReview[];
};

type Card =
  | {
      kind: "review";
      key: string;
      badge: string;
      name: string;
      meta: string;
      body: string;
    }
  | {
      kind: "principle";
      key: string;
      badge: string;
      title: string;
      body: string;
    };

export default function Testimonials({ reviews = [] }: Props) {
  const { t } = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const principles: Card[] = [
    { kind: "principle", key: "p1", badge: t.prin1Badge, title: t.prin1Title, body: t.prin1Body },
    { kind: "principle", key: "p2", badge: t.prin2Badge, title: t.prin2Title, body: t.prin2Body },
    { kind: "principle", key: "p3", badge: t.prin3Badge, title: t.prin3Title, body: t.prin3Body },
    { kind: "principle", key: "p4", badge: t.prin4Badge, title: t.prin4Title, body: t.prin4Body },
  ];

  // Real client reviews come first, then the brand principles. Real
  // ones get a R-prefixed badge to set them apart visually.
  const reviewCards: Card[] = reviews.map((r, i) => ({
    kind: "review",
    key: r.id,
    badge: `R${String(i + 1).padStart(2, "0")}`,
    name: r.name,
    meta: [r.role, r.location].filter(Boolean).join(" · "),
    body: r.content,
  }));

  const cards = [...reviewCards, ...principles];
  const total = cards.length;

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
    e.currentTarget.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`,
    );
    e.currentTarget.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`,
    );
  };

  const progressPct = total > 1 ? ((index + 1) / total) * 100 : 100;

  return (
    <section id="testimonials" className={styles.section}>
      <SectionWatermark text={t.testTitle3} number="/ 04" position="right" />
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">{t.testEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                t.testTitle1,
                t.testTitle2,
                { text: t.testTitle3, className: styles.titleItalic },
              ]}
            />
          </h2>
        </div>
        <Reveal delay={0.15}>
          <div className={styles.headerRight}>
            <p className={styles.lead}>{t.testLead}</p>
            <a href="#lead" className={styles.reviewBtn}>
              {t.testReviewBtn} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
      <div className={styles.carousel}>
        <div className={styles.track} ref={trackRef}>
          {cards.map((card) => (
            <div
              key={card.key}
              className={styles.card}
              onMouseMove={handleMove}
            >
              <span className={styles.principleBadge}>/ {card.badge}</span>
              {card.kind === "review" ? (
                <>
                  <p className={styles.principleBody}>“{card.body}”</p>
                  <h3 className={styles.principleTitle}>{card.name}</h3>
                  {card.meta && (
                    <p
                      className={styles.principleBody}
                      style={{ opacity: 0.7, marginTop: 4 }}
                    >
                      {card.meta}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h3 className={styles.principleTitle}>{card.title}</h3>
                  <p className={styles.principleBody}>{card.body}</p>
                </>
              )}
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
              aria-label={t.testPrev}
            >
              ←
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => scrollByOne(1)}
              disabled={index >= total - 1}
              aria-label={t.testNext}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
