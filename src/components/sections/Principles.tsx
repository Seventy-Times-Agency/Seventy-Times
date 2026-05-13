"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Principles.module.css";

type Principle = {
  badge: string;
  title: string;
  body: string;
};

export default function Principles() {
  const { t } = useT();
  const items: Principle[] = [
    { badge: t.prin1Badge, title: t.prin1Title, body: t.prin1Body },
    { badge: t.prin2Badge, title: t.prin2Title, body: t.prin2Body },
    { badge: t.prin3Badge, title: t.prin3Title, body: t.prin3Body },
    { badge: t.prin4Badge, title: t.prin4Title, body: t.prin4Body },
  ];

  const wrapRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [inView, setInView] = useState<boolean[]>(() => items.map(() => false));
  const [drawProgress, setDrawProgress] = useState(0);

  // Reveal each row as it scrolls into view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isFinite(idx)) {
            setInView((prev) => {
              if (prev[idx]) return prev;
              const next = prev.slice();
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.25 },
    );
    rowRefs.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, []);

  // Draw the spine SVG path proportionally to how far the section has
  // scrolled past the top of the viewport. 0 → invisible, 1 → fully drawn.
  useEffect(() => {
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start drawing when the section enters the bottom 80% of the
      // viewport and finish once its bottom passes the centre line.
      const start = vh * 0.85;
      const end = vh * 0.15;
      const span = start - end || 1;
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / (rect.height * 0.7 + span)));
      setDrawProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

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

  // Serpentine path expressed in a 100×100 viewBox (preserveAspectRatio
  // is set to none on the SVG, so the curve stretches with the section).
  // Anchors line up with the alternating row centers (≈12.5%, 37.5%,
  // 62.5%, 87.5% of height).
  const spineD =
    "M 85 12.5 " +
    "C 60 12.5, 40 12.5, 15 37.5 " +
    "S 60 62.5, 85 62.5 " +
    "S 40 87.5, 15 87.5";

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <svg
        className={styles.spine}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="principles-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path
          d={spineD}
          className={`${styles.spinePath} ${drawProgress > 0.02 ? styles.spinePathLive : ""}`}
          style={{ strokeDashoffset: 1 - drawProgress }}
          pathLength={1}
        />
      </svg>

      <ol className={styles.list}>
        {items.map((p, i) => {
          const placeRight = i % 2 === 0; // 01 + 03 sit on the right
          return (
            <li
              key={p.badge}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              data-index={i}
              className={`${styles.row} ${placeRight ? styles.rowRight : styles.rowLeft} ${inView[i] ? styles.inView : ""}`}
            >
              <span className={styles.nodeWrap} aria-hidden="true">
                <span className={styles.node}>{p.badge}</span>
              </span>
              <article className={styles.card} onMouseMove={handleMove}>
                <span className={styles.cardKicker}>
                  / {p.badge}
                </span>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardBody}>{p.body}</p>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
