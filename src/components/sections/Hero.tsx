"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Hero.module.css";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Board pieces drop in after the copy; each keeps its own tilt in CSS,
// so the animation only moves them vertically.
const drop: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

// The order "runs": steps tick one by one, then the lead toast pops.
const STEP_START = 1.3;
const STEP_GAP = 0.5;
const TOAST_AT = STEP_START + STEP_GAP * 3 + 0.3;

const step: Variants = {
  hidden: { opacity: 0.35 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: STEP_START + i * STEP_GAP },
  }),
};

const tick: Variants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 18, delay: STEP_START + i * STEP_GAP },
  }),
};

const status: Variants = {
  hidden: { opacity: 0, x: 6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: STEP_START + i * STEP_GAP + 0.1 },
  }),
};

const toast: Variants = {
  hidden: { opacity: 0, y: -14, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 16, delay: TOAST_AT },
  },
};

/** Paints the formula operators (×, =) in the accent colour. */
function withOps(text: string) {
  return text.split(/([×=])/).map((part, i) =>
    part === "×" || part === "=" ? (
      <span key={i} className={styles.op}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function Hero() {
  const { t } = useT();
  const reduce = useReducedMotion();
  // With reduced motion everything renders in its final state.
  const start = reduce ? "visible" : "hidden";

  const steps = [
    { label: t.hxStep1, state: t.hxDone },
    { label: t.hxStep2, state: t.hxDone },
    { label: t.hxStep3, state: t.hxLive },
    { label: t.hxStep4, state: t.hxNow, now: true },
  ];

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.chips}>
          <span className={styles.chip}>{t.heroMeta1}</span>
          <span className={styles.chip}>{t.heroMeta3}</span>
        </div>

        <h1 className={styles.title}>
          <span className={styles.line}>{withOps(t.heroTitle1)}</span>
          <span className={`${styles.line} ${styles.lineOutline}`}>
            <span className="neonOutline">{t.heroTitle2.replace("×", "")}</span>
            <span className={styles.op}>×</span>{" "}
            <span className="neonOutline">{t.heroTitle3}</span>
          </span>
          <span className={styles.line}>{withOps(t.heroTitle4)}</span>
        </h1>

        <p className={styles.lead}>
          {t.hxPlain}
        </p>

        <div className={styles.facts}>
          <div className={styles.fact}>
            <b>{t.hxFact1N}</b>
            {t.hxFact1}
          </div>
          <div className={styles.fact}>
            <b>24/7</b>
            {t.hxFact2}
          </div>
          <div className={styles.fact}>
            <b>{t.hxFact3N}</b>
            {t.hxFact3}
          </div>
        </div>

        <div className={styles.ctas}>
          <Magnetic strength={0.3}>
            <a href="#lead" className={styles.primary}>
              {t.hxCtaBrief}
              <i aria-hidden="true">↗</i>
            </a>
          </Magnetic>
          <a href="#services" className={styles.secondary}>
            {t.hxCta2} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Illustrative board: one order moving through the machine. */}
      <motion.div
        className={styles.board}
        aria-label={t.hxBoard}
        role="img"
        initial={start}
        animate="visible"
      >
        <div className={styles.well} />
        <span className={`${styles.cross} ${styles.crossTL}`} />
        <span className={`${styles.cross} ${styles.crossTR}`} />
        <span className={`${styles.cross} ${styles.crossBL}`} />
        <span className={`${styles.cross} ${styles.crossBR}`} />

        <motion.div variants={drop} custom={0.3} className={styles.siteWrap}>
          <span className={`${styles.tag} ${styles.tagSite}`}>
            <b>01</b> · {t.hxSite}
          </span>
          <div className={`${styles.card} ${styles.site}`}>
            <div className={styles.bar}>
              <i />
              <i />
              <i />
              <span>yourbrand.com</span>
            </div>
            <div className={styles.page}>
              <p className={styles.pageTitle}>
                {t.hxSiteH1}
                <br />
                <span>{t.hxSiteH2}</span>
              </p>
              <div className={styles.ln} />
              <div className={`${styles.ln} ${styles.lnShort}`} />
              <div className={styles.pageBtns}>
                <i />
                <i />
              </div>
            </div>
            <div className={styles.checks}>
              <span>{t.hxChkMobile}</span>
              <span>SEO</span>
              <span>Google Maps</span>
              <span>{t.hxChkLangs}</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={drop} custom={0.45} className={styles.adsWrap}>
          <span className={`${styles.tag} ${styles.tagAds}`}>
            <b>02</b> · {t.hxAds}
          </span>
          <div className={`${styles.card} ${styles.ads}`}>
            <div className={styles.head}>
              {t.hxCampaign}
              <span className={styles.live}>{t.hxActive}</span>
            </div>
            <div className={styles.adName}>{t.hxCampName}</div>
            <div className={styles.adSub}>{t.hxCampSub}</div>
            <svg className={styles.spark} viewBox="0 0 200 60" preserveAspectRatio="none">
              <motion.path
                className={styles.sparkArea}
                d="M0 52 L25 48 L50 50 L75 38 L100 40 L125 28 L150 24 L175 12 L200 6 L200 60 L0 60 Z"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8, delay: 1.9 } },
                }}
              />
              <motion.path
                className={styles.sparkLine}
                d="M0 52 L25 48 L50 50 L75 38 L100 40 L125 28 L150 24 L175 12 L200 6"
                variants={{
                  hidden: { pathLength: 0 },
                  visible: { pathLength: 1, transition: { duration: 1.4, delay: 0.9, ease: "easeInOut" } },
                }}
              />
            </svg>
            <div className={styles.axis}>
              <span>{t.hxWeek1}</span>
              <span>{t.hxWeek8}</span>
            </div>
            <div className={styles.platforms}>
              <span>Meta</span>
              <span>Google</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={toast} className={styles.toastWrap}>
          <div className={styles.toast}>
            <i aria-hidden="true">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </i>
            <div>
              {t.hxToast}
              <small>{t.hxToastSub}</small>
            </div>
          </div>
        </motion.div>

        <motion.div variants={drop} custom={0.6} className={styles.orderWrap}>
          <div className={styles.order}>
            <div className={styles.orderTop}>
              <span className={styles.orderNo}>{t.hxOrder}</span>
              <span className={styles.orderStatus}>{t.hxInProgress}</span>
            </div>
            <ol className={styles.steps}>
              {steps.map((s, i) => (
                <motion.li
                  key={s.label}
                  custom={i}
                  variants={step}
                  className={s.now ? styles.stepNow : undefined}
                >
                  <motion.i custom={i} variants={tick}>
                    {s.now ? "→" : "✓"}
                  </motion.i>
                  {s.label}
                  <motion.em custom={i} variants={status}>
                    {s.state}
                  </motion.em>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.div variants={drop} custom={0.75} className={styles.stickerWrap}>
          <div className={styles.sticker}>
            70×
            <small>Seventy Times</small>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
