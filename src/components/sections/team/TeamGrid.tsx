"use client";

import { useState, type PointerEvent } from "react";
import Image from "next/image";
import { useT } from "@/i18n/context";
import { TEAM } from "@/data/team";
import Reveal from "@/components/ui/Reveal";
import styles from "./TeamGrid.module.css";

type Props = {
  /** Heading level for names: h2 on /team (the page's main list), h3 inside /about. */
  nameAs?: "h2" | "h3";
};

/**
 * Grid of team cards from data/team.ts. Each portrait dissolves through
 * smoke into a second pose on hover (tap on touch screens), and a soft
 * light follows the cursor across the card. Renders nothing when the
 * team list is empty — callers decide what to show instead.
 */
export default function TeamGrid({ nameAs: Name = "h2" }: Props) {
  const { locale } = useT();
  // Touch screens have no hover: a tap toggles the second pose instead.
  const [turned, setTurned] = useState<string | null>(null);

  if (TEAM.length === 0) return null;

  // Cursor light — written straight to CSS vars, no re-render.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    // The inner wrapper is display: contents; the card is its parent.
    const el = e.currentTarget.parentElement;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <ul className={styles.grid}>
      {TEAM.map((member, i) => (
        <li key={member.id}>
          <Reveal
            delay={i * 0.05}
            className={`${styles.card} ${turned === member.id ? styles.cardTurned : ""}`}
          >
            <div className={styles.cardInner} onPointerMove={onMove}>
              {member.photo && (
                <span
                  className={styles.portrait}
                  onClick={() => setTurned((v) => (v === member.id ? null : member.id))}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    className={`${styles.shot} ${styles.shotBase}`}
                  />
                  {member.photoTurn && (
                    <Image
                      src={member.photoTurn}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className={`${styles.shot} ${styles.shotTurn}`}
                    />
                  )}
                  <span className={styles.haze} aria-hidden="true" />
                  <span className={styles.smoke} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
              )}
              <Name className={styles.name}>{member.name}</Name>
              <p className={styles.role}>{member.role[locale]}</p>
              <p className={styles.bio}>{member.bio[locale]}</p>
              {member.linkedin && (
                <a
                  className={styles.link}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
