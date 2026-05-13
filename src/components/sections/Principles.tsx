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
  const [spineLive, setSpineLive] = useState(false);

  // Reveal each row when it scrolls into view. As soon as the first
  // row arrives we mark the spine as "live" so the SVG animation
  // (draw-in + flowing pulse) starts on its own timeline — independent
  // of scroll position, so it can't jitter with the page scroll.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (wrap) {
      const wrapObserver = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setSpineLive(true);
              wrapObserver.disconnect();
              break;
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
      );
      wrapObserver.observe(wrap);
    }

    const rowObserver = new IntersectionObserver(
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
    rowRefs.current.forEach((row) => row && rowObserver.observe(row));
    return () => rowObserver.disconnect();
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

  // Pulse nodes sit where the spine crosses each row's centre. Their
  // X coordinate matches the side of the row that the spine snakes
  // through (opposite to the card).
  const nodes = [
    { cx: 85, cy: 12.5 },
    { cx: 15, cy: 37.5 },
    { cx: 85, cy: 62.5 },
    { cx: 15, cy: 87.5 },
  ];

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${spineLive ? styles.wrapLive : ""}`}
    >
      <svg
        className={styles.spine}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="principles-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
          </linearGradient>
          <filter
            id="principles-glow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft outer glow — wide, low-opacity, pure decoration. */}
        <path
          d={spineD}
          className={styles.spineHalo}
          pathLength={1}
        />

        {/* Main spine — drawn in once via stroke-dashoffset keyframes. */}
        <path
          d={spineD}
          className={styles.spinePath}
          pathLength={1}
          filter="url(#principles-glow)"
        />

        {/* The traveller: a short bright dash that loops along the path
            forever, giving the spine a sense of flow without depending
            on scrollY. */}
        <path
          d={spineD}
          className={styles.spineTraveller}
          pathLength={1}
        />

        {/* Pulse nodes at each row centre. */}
        {nodes.map((n, i) => (
          <g key={i} className={styles.nodeGroup}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r={2.2}
              className={styles.nodeHalo}
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={0.85}
              className={styles.nodeDot}
            />
          </g>
        ))}
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
