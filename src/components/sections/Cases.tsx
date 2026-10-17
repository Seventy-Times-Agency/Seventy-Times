"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { CASE_DECK, type DeckCase } from "@/data/caseDeck";
import { CASES } from "@/data/cases";
import { useT } from "@/i18n/context";
import type { Locale } from "@/i18n/config";
import styles from "@/components/sections/Cases.module.css";

const AUTOPLAY_MS = 8000;
// Names longer than this (e.g. "Пассажирские") get a smaller title.
const LONG_NAME = 10;
const SWIPE_PX = 80;
// Cases that already have a page; the rest show "coming soon".
const HAS_PAGE = new Set(CASES.map((c) => c.id));

/** Where a card sits in the stack: 0 = front, 1..n-1 = behind. */
function depthOf(i: number, active: number, n: number) {
  return (i - active + n) % n;
}

function Card({ c, locale, t, localePath }: {
  c: DeckCase;
  locale: Locale;
  t: ReturnType<typeof useT>["t"];
  localePath: (p: string) => string;
}) {
  const [before, after] = c.note[locale].split("{b}");
  const long = c.name.some((part) => part[locale].length > LONG_NAME);
  return (
    <div className={styles.card}>
      <div className={styles.copy}>
        <span className={styles.chip}>{c.chip[locale]}</span>
        <h3 className={`${styles.name} ${long ? styles.nameLong : ""}`}>
          {c.name[0][locale]}
          <span>{c.name[1][locale]}</span>
        </h3>

        <div className={styles.path}>
          <div className={styles.start}>
            <small>{t.deckStart}</small>
            <p>{c.start[locale]}</p>
          </div>
          <span className={styles.arrow} aria-hidden="true">→</span>
          <div className={styles.finish}>
            <small>{t.deckFinish}</small>
            <p>{c.finish[locale]}</p>
          </div>
        </div>

        <div className={styles.figureBlock}>
          <small>{c.figureLabel[locale]}</small>
          <span className={styles.figure}>{c.figure[locale]}</span>
          <p className={styles.note}>
            {before}
            <b>{c.bold[locale]}</b>
            {after}
          </p>
        </div>

        {HAS_PAGE.has(c.id) ? (
          <Link href={localePath(`/cases/${c.id}`)} className={styles.open}>
            {t.deckOpen} <i aria-hidden="true">↗</i>
          </Link>
        ) : (
          <span className={`${styles.open} ${styles.openSoon}`}>{t.deckSoon}</span>
        )}
      </div>

      <div className={styles.collage} aria-hidden="true">
        <div className={styles.well} />
        {c.shots ? (
          <>
            <span className={`${styles.tag} ${styles.tagSite}`}>{c.shots.site.host}</span>
            <figure className={styles.shotSite}>
              <div className={styles.bar}>
                <i />
                <i />
                <i />
              </div>
              <Image src={c.shots.site.src} alt="" width={900} height={560} sizes="420px" />
            </figure>
            <figure className={styles.shotSecond}>
              <Image src={c.shots.second.src} alt="" width={700} height={290} sizes="320px" />
            </figure>
            <span className={`${styles.tag} ${styles.tagSecond}`}>{c.shots.second.label}</span>
          </>
        ) : c.scheme ? (
          <>
            {c.scheme.photo ? (
              <>
                <figure className={`${styles.shotSite} ${styles.shotPhoto}`}>
                  <div className={styles.bar}>
                    <i />
                    <i />
                    <i />
                  </div>
                  <Image src={c.scheme.photo} alt="" width={900} height={560} sizes="420px" />
                </figure>
                <span className={`${styles.tag} ${styles.tagRoute}`}>
                  {c.scheme.route[0][locale]} <em>⇄</em> {c.scheme.route[1][locale]}
                </span>
              </>
            ) : (
              <div className={styles.board}>
                <span className={styles.route}>
                  <b>{c.scheme.route[0][locale]}</b>
                  <em>⇄</em>
                  <b>{c.scheme.route[1][locale]}</b>
                </span>
              </div>
            )}
            <ol className={styles.funnel}>
              {c.scheme.funnel.map((f) => (
                <li key={f.label.en}>
                  <small>{f.label[locale]}</small>
                  <b>{f.value[locale]}</b>
                </li>
              ))}
            </ol>
          </>
        ) : null}

        <div className={styles.stickerTop}>
          {c.stickers.top.value[locale]}
          <small>{c.stickers.top.label[locale]}</small>
        </div>
        {c.stickers.bottom && (
          <div className={styles.stickerBottom}>
            {c.stickers.bottom.value[locale]}
            <small>{c.stickers.bottom.label[locale]}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Cases() {
  const { t, locale, localePath } = useT();
  const reduce = useReducedMotion();
  const n = CASE_DECK.length;
  const [active, setActive] = useState(0);
  // The card that just left the front flies out instead of sliding back.
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const go = (next: number, forward: boolean) => {
    setLeaving(forward ? active : null);
    setActive(((next % n) + n) % n);
  };
  const nextCase = () => go(active + 1, true);
  const prevCase = () => go(active - 1, false);

  useEffect(() => {
    // Phones: no autoplay — the card must not slide away mid-read.
    if (reduce || paused || !window.matchMedia("(min-width: 1024px)").matches) return;
    const id = window.setTimeout(nextCase, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, reduce]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_PX) nextCase();
    else if (info.offset.x > SWIPE_PX) prevCase();
  };

  const current = CASE_DECK[active];

  return (
    <section
      ref={sectionRef}
      id="cases"
      className={styles.section}
      style={{ "--case-accent": current.accent } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <SectionWatermark text={t.navCases.toLowerCase()} number="/ 02" position="right" />

      <div className={styles.header}>
        <div>
          <Reveal>
            <span className="eyebrow">{t.casesEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[t.casesTitle1, t.casesTitle2, { text: t.casesTitle3, className: "neonOutline" }]}
            />
          </h2>
        </div>
        <Reveal delay={0.15}>
          <p className={styles.lead}>{t.deckLead}</p>
        </Reveal>
      </div>

      <div className={styles.layout}>
        <nav className={styles.index} aria-label={t.navCases}>
          <ol>
            {CASE_DECK.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={`${styles.indexItem} ${i === active ? styles.indexActive : ""}`}
                  style={{ "--item-accent": c.accent } as CSSProperties}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => i !== active && go(i, i > active)}
                >
                  <span className={styles.indexNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.indexName}>
                    {c.name[0][locale]} {c.name[1][locale]}
                    <small>{c.chip[locale]}</small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <a href="#lead" className={styles.yours}>
            <span>+</span> {t.deckYours}
          </a>

        </nav>

        <div className={styles.controls}>
          <button type="button" className={styles.ctrl} onClick={prevCase} aria-label={t.deckPrev}>
            ←
          </button>
          <span className={styles.counter}>
            <b>{String(active + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
          </span>
          <button type="button" className={styles.ctrl} onClick={nextCase} aria-label={t.deckNext}>
            →
          </button>
        </div>

        <div className={styles.stage}>
          {CASE_DECK.map((c, i) => {
            const k = depthOf(i, active, n);
            const front = k === 0;
            const flyOut = i === leaving && !reduce;
            // No scaling: the cards behind must peek out to the upper right.
            const rest = {
              x: k * 34,
              y: -k * 26,
              rotate: k * 1.6,
              scale: 1,
              opacity: k > 2 ? 0 : 1 - k * 0.3,
            };
            return (
              <motion.div
                key={c.id}
                className={styles.slot}
                style={{ zIndex: n - k, pointerEvents: front ? "auto" : "none" }}
                initial={false}
                animate={
                  flyOut
                    ? { ...rest, x: [0, -560, rest.x], rotate: [0, -14, rest.rotate], opacity: [1, 0, rest.opacity] }
                    : rest
                }
                transition={
                  flyOut
                    ? { duration: 0.8, times: [0, 0.45, 1], ease: "easeInOut" }
                    : { type: "spring", stiffness: 260, damping: 30 }
                }
                drag={front ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={front ? onDragEnd : undefined}
                aria-hidden={front ? undefined : true}
                // Back cards stay out of the tab order (`inert` isn't in React 18's types).
                {...({ inert: front ? undefined : true } as Record<string, boolean | undefined>)}
              >
                <div style={{ "--case-accent": c.accent } as CSSProperties} className={styles.slotInner}>
                  <Card c={c} locale={locale} t={t} localePath={localePath} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Phones: a swipeable row of compact cards — figure first, no collage. */}
        <ul className={styles.mobileCards}>
          {CASE_DECK.map((c) => {
            const [before, after] = c.note[locale].split("{b}");
            return (
              <li key={c.id} style={{ "--case-accent": c.accent } as CSSProperties}>
                <article className={styles.mCard}>
                  <span className={styles.mChip}>{c.chip[locale]}</span>
                  <h3 className={styles.mName}>
                    {c.name[0][locale]} <span>{c.name[1][locale]}</span>
                  </h3>
                  <small className={styles.mLabel}>{c.figureLabel[locale]}</small>
                  <span className={styles.mFigure}>{c.figure[locale]}</span>
                  <p className={styles.mNote}>
                    {before}
                    <b>{c.bold[locale]}</b>
                    {after}
                  </p>
                  <p className={styles.mFinish}>
                    <b>{t.deckFinish}</b> {c.finish[locale]}
                  </p>
                  {HAS_PAGE.has(c.id) && (
                    <Link href={localePath(`/cases/${c.id}`)} className={styles.mOpen}>
                      {t.deckOpen} <i aria-hidden="true">↗</i>
                    </Link>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
