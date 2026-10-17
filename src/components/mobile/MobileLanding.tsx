"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import ServiceVisual from "@/components/sections/services/ServiceVisual";
import { FLOW, FLOW_COPY } from "@/components/sections/services/flow";
import { SERVICES } from "@/data/services";
import { CASE_DECK } from "@/data/caseDeck";
import { CASES } from "@/data/cases";
import { useT } from "@/i18n/context";
import styles from "./MobileLanding.module.css";

/**
 * The phone landing, built as a sales funnel: hook → pain → solution →
 * proof → AI → start → objections → close. One idea and one action per
 * block. Rendered below 768px only; the desktop sections are hidden there.
 * Section ids carry an "m-" prefix — the nav resolves anchors to them.
 */

const STORY_MS = 5500;
const HAS_PAGE = new Set(CASES.map((c) => c.id));

function Stage({ n, label }: { n: string; label: string }) {
  return (
    <span className={styles.stage}>
      <b>{n}</b> {label}
    </span>
  );
}

/** "= одна машина роста." → last word outlined. */
function outlineLast(text: string) {
  const i = text.trimEnd().lastIndexOf(" ");
  if (i < 0) return <span className={styles.o}>{text}</span>;
  return (
    <>
      {text.slice(0, i + 1)}
      <span className={styles.o}>{text.slice(i + 1)}</span>
    </>
  );
}

function Formula({ parts }: { parts: string[] }) {
  return (
    <p className={styles.formula}>
      {parts
        .join(" ")
        .split(/([×=])/)
        .map((p, i) => (p === "×" || p === "=" ? <em key={i}>{p}</em> : <Fragment key={i}>{p}</Fragment>))}
    </p>
  );
}

function Stories() {
  const { t, locale, localePath } = useT();
  const reduce = useReducedMotion();
  const n = CASE_DECK.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const holdRef = useRef<number | null>(null);
  const x0 = useRef<number | null>(null);

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  const onHoldStart = () => {
    holdRef.current = window.setTimeout(() => setPaused(true), 180);
  };
  const onHoldEnd = () => {
    if (holdRef.current) window.clearTimeout(holdRef.current);
    setPaused(false);
  };

  return (
    <>
      <div
        className={`${styles.story} ${paused ? styles.paused : ""}`}
        onPointerDown={onHoldStart}
        onPointerUp={onHoldEnd}
        onPointerLeave={onHoldEnd}
        onPointerCancel={onHoldEnd}
        onTouchStart={(e) => {
          x0.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (x0.current === null) return;
          const dx = e.changedTouches[0].clientX - x0.current;
          x0.current = null;
          if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        }}
      >
        <div className={styles.bars} aria-hidden="true">
          {CASE_DECK.map((c, k) => (
            <i key={c.id} className={k < i ? styles.done : undefined}>
              {k === i && (
                <b
                  key={`${c.id}-${i}`}
                  className={reduce ? styles.barFull : styles.barRun}
                  style={{ animationDuration: `${STORY_MS}ms` }}
                  onAnimationEnd={() => go(i + 1)}
                />
              )}
            </i>
          ))}
        </div>

        {CASE_DECK.map((c, k) => {
          const [before, after] = c.note[locale].split("{b}");
          const photo = c.shots?.site.src ?? c.scheme?.photo;
          return (
            <article
              key={c.id}
              className={`${styles.slide} ${k === i ? styles.on : ""}`}
              style={{ "--c": c.accent } as CSSProperties}
              aria-hidden={k === i ? undefined : true}
            >
              {photo && (
                <Image className={styles.slidePhoto} src={photo} alt="" fill sizes="430px" />
              )}
              <span className={styles.sChip}>{c.chip[locale]}</span>
              <p className={styles.sName}>
                {c.name[0][locale]} <span>{c.name[1][locale]}</span>
              </p>
              <span className={styles.sLabel}>{c.figureLabel[locale]}</span>
              <span className={styles.sFig}>{c.figure[locale]}</span>
              <p className={styles.sNote}>
                {before}
                <b>{c.bold[locale]}</b>
                {after}
              </p>
              <p className={styles.sFin}>
                <small>{t.mStartFin}</small>
                {c.finish[locale]}
              </p>
              {HAS_PAGE.has(c.id) && (
                <Link
                  href={localePath(`/cases/${c.id}`)}
                  className={styles.sOpen}
                  tabIndex={k === i ? undefined : -1}
                >
                  {t.deckOpen} <i aria-hidden="true">↗</i>
                </Link>
              )}
            </article>
          );
        })}

        <button type="button" className={styles.tapL} aria-label={t.deckPrev} onClick={() => go(i - 1)} />
        <button type="button" className={styles.tapR} aria-label={t.deckNext} onClick={() => go(i + 1)} />
      </div>
      <p className={styles.hint}>{t.mStoriesHint}</p>
    </>
  );
}

function Modules() {
  const { t, localePath } = useT();
  const railRef = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const first = rail.firstElementChild as HTMLElement | null;
      if (!first) return;
      const w = first.getBoundingClientRect().width + 12;
      setDot(Math.min(FLOW.length - 1, Math.round(rail.scrollLeft / w)));
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={styles.rail} ref={railRef}>
        {FLOW.map((key, i) => {
          const s = SERVICES.find((x) => x.key === key)!;
          return (
            <article key={key} className={styles.mod}>
              <div className={styles.screen}>
                <span className={styles.tag}>
                  <b>{String(i + 1).padStart(2, "0")}</b> · {t[FLOW_COPY[key].role]}
                </span>
                <ServiceVisual kind={key} t={t} />
              </div>
              <h3>{t[s.i18n.title]}</h3>
              <p>{t[FLOW_COPY[key].pitch]}</p>
              <Link href={localePath(`/services/${s.slug}`)} className={styles.more}>
                {t.svcExpand} →
              </Link>
            </article>
          );
        })}
      </div>
      <div className={styles.dots} aria-hidden="true">
        {FLOW.map((k, i) => (
          <i key={k} className={i === dot ? styles.dotOn : undefined} />
        ))}
      </div>
    </>
  );
}

export default function MobileLanding() {
  const { t } = useT();
  const openChat = () => window.dispatchEvent(new Event("open-chat"));

  const flow = [
    { name: t.hxAds, note: t.mFlow1 },
    { name: t.hxSite, note: t.mFlow2 },
    { name: "AI", note: t.mFlow3 },
    { name: t.svcVisAlert, note: t.mFlow4 },
  ];

  return (
    <div className={styles.root}>
      {/* 1 · Hook */}
      <section id="m-top" className={styles.hero}>
        <span className={styles.chip}>
          {t.heroMeta1} · {t.heroMeta3}
        </span>
        <Formula parts={[t.heroTitle1, t.heroTitle2, t.heroTitle3]} />
        <h1 className={styles.h1}>{outlineLast(t.heroTitle4)}</h1>
        <p className={styles.lede}>{t.hxPlain}</p>
        <a className={styles.btn} href="#lead">
          {t.hxCtaBrief} <i aria-hidden="true">↗</i>
        </a>
        <p className={styles.under}>{t.mUnder}</p>

        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerHead}>
            <span>{t.mFlowTitle}</span>
            {t.mFlowNow}
          </div>
          <div className={styles.flow}>
            {flow.map((f) => (
              <div key={f.name} className={styles.node}>
                {f.name}
                <small>{f.note}</small>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.facts}>
          <div className={styles.fact}>
            <b>{t.mFact1N}</b>
            {t.mFact1}
          </div>
          <div className={styles.fact}>
            <b>24/7</b>
            {t.hxFact2}
          </div>
          <div className={styles.fact}>
            <b>{t.hxFact1N}</b>
            {t.hxFact1}
          </div>
        </div>
      </section>

      {/* 2 · Pain */}
      <section id="m-pain" className={styles.section}>
        <Stage n="01" label={t.mStagePain} />
        <h2 className={styles.h2}>
          {t.mPainTitle1} <span className={styles.o}>{t.mPainTitle2}</span>
        </h2>
        <div className={styles.pains}>
          {[
            [t.mPain1T, t.mPain1D],
            [t.mPain2T, t.mPain2D],
            [t.mPain3T, t.mPain3D],
          ].map(([title, desc]) => (
            <div key={title} className={styles.pain}>
              <i aria-hidden="true">×</i>
              <div>
                <b>{title}</b>
                <span>{desc}</span>
              </div>
            </div>
          ))}
        </div>
        <a href="#m-services" className={styles.bridge}>
          {t.mBridge}
        </a>
      </section>

      {/* 3 · Solution */}
      <section id="m-services" className={styles.section}>
        <Stage n="02" label={t.mStageSolution} />
        <h2 className={styles.h2}>
          {t.svcMTitle1} <span className={styles.o}>{t.svcMTitle2}</span>
        </h2>
        <Modules />
        <div className={styles.result}>
          <i aria-hidden="true">↓</i>
          <div>
            <b>{t.svcOutTitle}</b>
            <span>{t.svcOutBody}</span>
          </div>
        </div>
      </section>

      {/* 4 · Proof */}
      <section id="m-cases" className={styles.section}>
        <Stage n="03" label={t.mStageProof} />
        <h2 className={styles.h2}>
          {t.mProofTitle1} <span className={styles.o}>{t.mProofTitle2}</span>
        </h2>
        <Stories />
      </section>

      {/* 5 · AI */}
      <section id="m-chat" className={styles.section}>
        <Stage n="04" label={t.mStageAi} />
        <h2 className={styles.h2}>
          {t.mAiTitle1} <span className={styles.o}>{t.mAiTitle2}</span>
        </h2>
        <div className={styles.chat}>
          <div className={styles.chatHead}>
            <Image className={styles.ava} src="/vanessa-avatar.png" alt="" width={40} height={40} sizes="40px" />
            <div>
              <b>{t.venBadgeName}</b>
              <small>{t.venDemoOnline}</small>
            </div>
          </div>
          <div className={styles.log}>
            <p className={`${styles.msg} ${styles.msgIn}`}>{t.venDemoQ1}</p>
            <p className={`${styles.msg} ${styles.msgOut}`}>{t.venDemoA1}</p>
            <span className={styles.typing} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>
        <button type="button" className={styles.ghost} onClick={openChat}>
          {t.venCta} <span aria-hidden="true">↗</span>
        </button>
      </section>

      {/* 6 · Start */}
      <section id="m-how-we-start" className={styles.section}>
        <Stage n="05" label={t.mStageStart} />
        <h2 className={styles.h2}>
          {t.mStartTitle1} <span className={styles.o}>{t.mStartTitle2}</span>
        </h2>
        <ol className={styles.steps}>
          {[
            [t.mStep1, t.mStep1D, t.mStep1T],
            [t.mStep2, t.mStep2D, t.mStep2T],
            [t.mStep3, t.mStep3D, t.mStep3T],
          ].map(([title, desc, tag]) => (
            <li key={title} className={styles.step}>
              <div>
                <b>{title}</b>
                <span>{desc}</span>
              </div>
              <em>{tag}</em>
            </li>
          ))}
        </ol>
      </section>

      {/* 7 · Objections */}
      <section id="m-faq" className={styles.section}>
        <Stage n="06" label={t.mStageFaq} />
        <h2 className={styles.h2}>
          {t.mFaqTitle1} <span className={styles.o}>{t.mFaqTitle2}</span>
        </h2>
        <div className={styles.faq}>
          {[
            [t.faq1q, t.faq1a],
            [t.faq2q, t.faq2a],
            [t.faq3q, t.faq3a],
            [t.faq9q, t.faq9a],
          ].map(([q, a]) => (
            <details key={q} className={styles.details}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 8 · Close */}
      <section id="m-contact" className={styles.section}>
        <div className={styles.close}>
          <h2 className={styles.h2}>
            {t.ctaTitle1} <span className={styles.o}>{t.ctaTitle2}</span>
            {t.ctaTitle3.trim()}
          </h2>
          <p>{t.ctaShort}</p>
          <a className={styles.btn} href="#lead">
            {t.hxCtaBrief} <i aria-hidden="true">↗</i>
          </a>
          <div className={styles.pair}>
            <a href="#callback">{t.ctaCallback}</a>
            <button type="button" onClick={openChat}>
              {t.mChatCta}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
