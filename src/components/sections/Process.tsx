"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Process.module.css";

type Mod = "site" | "ads" | "bot" | "auto";
type ModState = "off" | "setup" | "live" | "on";

/**
 * "How we work" after the plan is agreed. Steps scroll on the right; a
 * sticky "project console" on the left reacts to the step in view:
 * modules light up, the leads chart grows, weak/strong tags appear, the
 * account badge shows, and later modules join the system. Each brand
 * principle is attached to the step where it actually applies.
 */

// Console state per step (index = step).
const MODULES: Record<Mod, ModState>[] = [
  { site: "setup", ads: "setup", bot: "off", auto: "off" },
  { site: "live", ads: "live", bot: "off", auto: "off" },
  { site: "live", ads: "live", bot: "off", auto: "off" },
  { site: "live", ads: "live", bot: "off", auto: "off" },
  { site: "live", ads: "live", bot: "on", auto: "on" },
];

// Bar heights (%) of the weekly leads chart per step — illustrative shape only.
const BARS: number[][] = [
  [4, 4, 4, 4, 4, 4, 4, 4],
  [10, 16, 14, 4, 4, 4, 4, 4],
  [10, 16, 14, 24, 30, 38, 4, 4],
  [10, 16, 14, 24, 30, 38, 44, 4],
  [10, 16, 14, 24, 30, 38, 52, 70],
];

// Which principle sits on which step (title keys).
const PRINCIPLE = ["prin1Title", null, "prin3Title", "prin4Title", "prin2Title"] as const;

export default function Process() {
  const { t } = useT();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  // True while the closing "your machine is next" step is in view.
  const [finale, setFinale] = useState(false);
  const stepsRef = useRef<HTMLOListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const finaleNodeRef = useRef<HTMLSpanElement>(null);

  // Active step = the last step whose top has passed the middle of the
  // viewport. Measured on scroll so a fast fling can't skip a step.
  useEffect(() => {
    const list = stepsRef.current;
    if (!list) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mid = window.innerHeight * 0.55;
      const items = Array.from(list.children) as HTMLElement[];
      let idx = 0;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top < mid) idx = i;
      });
      const last = items.length - 1; // the finale
      setFinale(idx === last);
      setActive(Math.min(idx, last - 1));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Stop the rail at the centre of the finale node (its card height varies).
  useEffect(() => {
    const wrap = wrapRef.current;
    const node = finaleNodeRef.current;
    if (!wrap || !node) return;
    const measure = () => {
      const w = wrap.getBoundingClientRect();
      const n = node.getBoundingClientRect();
      wrap.style.setProperty("--rail-end", `${w.bottom - (n.top + n.height / 2)}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 60%", "end 85%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  const steps = [
    { title: t.proc1, desc: t.proc1d, dur: t.proc1t },
    { title: t.proc2, desc: t.proc2d, dur: t.proc2t },
    { title: t.proc3, desc: t.proc3d, dur: t.proc3t },
    { title: t.proc4, desc: t.proc4d, dur: t.proc4t },
    { title: t.proc5, desc: t.proc5d, dur: t.proc5t },
  ];

  const modules: { key: Mod; name: string }[] = [
    { key: "site", name: t.hxSite },
    { key: "ads", name: t.hxAds },
    { key: "bot", name: t.svc3Title },
    { key: "auto", name: t.svc2Title },
  ];
  const stateLabel: Record<ModState, string> = {
    off: t.procStLater,
    setup: t.procStSetup,
    live: t.procStLive,
    on: t.procStOn,
  };

  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 200, damping: 22 };

  return (
    <section id="process" className={styles.section}>
      <SectionWatermark text={t.navProcess.toLowerCase()} number="/ 05" position="left" />

      <div className={styles.header}>
        <div>
          <Reveal>
            <span className="eyebrow">{t.procEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[t.procTitle1, t.procTitle2, { text: t.procTitle3, className: "neonOutline" }]}
            />
          </h2>
        </div>
        <Reveal delay={0.15}>
          <p className={styles.lead}>{t.procLead}</p>
        </Reveal>
      </div>

      <div className={styles.layout}>
        {/* ── Sticky project console ── */}
        <div className={styles.consoleWrap}>
          <div className={styles.console} aria-hidden="true">
            <div className={styles.consoleHead}>
              <span className={styles.consoleTitle}>{t.procPanel}</span>
              <motion.span
                key={active}
                className={styles.consoleStep}
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <b>{String(active + 1).padStart(2, "0")}</b> · {steps[active].title}
              </motion.span>
            </div>

            <div className={styles.mods}>
              {modules.map((m) => {
                const st = MODULES[active][m.key];
                return (
                  <div key={m.key} className={`${styles.mod} ${styles[`mod_${st}`]}`}>
                    <i />
                    <span className={styles.modName}>{m.name}</span>
                    <span className={styles.modState}>{stateLabel[st]}</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.chart}>
              <span className={styles.chartLabel}>{t.procLeads}</span>
              <div className={styles.bars}>
                {BARS[active].map((h, i) => (
                  <motion.span
                    key={i}
                    className={h > 4 ? styles.barOn : undefined}
                    animate={{ height: `${h}%` }}
                    transition={{ ...spring, delay: reduce ? 0 : i * 0.03 }}
                  />
                ))}
              </div>
            </div>

            <div className={styles.tags}>
              {active >= 1 && (
                <motion.span className={styles.tagLeads} initial={reduce ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  {t.procToYou}
                </motion.span>
              )}
              {active === 2 && (
                <>
                  <motion.span className={styles.tagCut} initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                    − {t.procCut}
                  </motion.span>
                  <motion.span className={styles.tagScale} initial={reduce ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>
                    + {t.procScale}
                  </motion.span>
                </>
              )}
              {active === 3 && (
                <motion.span className={styles.tagAccount} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="15" r="4" />
                    <path d="M10.85 12.15 19 4M18 5l2 2M15 8l2 2" />
                  </svg>
                  {t.procAccount}
                </motion.span>
              )}
            </div>
          </div>
        </div>

        {/* ── Steps ── */}
        <div className={styles.stepsWrap} ref={wrapRef}>
          <div className={styles.rail} aria-hidden="true">
            <motion.span style={{ scaleY: reduce ? 1 : fill }} />
          </div>
          <ol className={styles.steps} ref={stepsRef}>
            {steps.map((s, i) => {
              const principle = PRINCIPLE[i];
              return (
                <motion.li
                  key={s.title}
                  className={`${styles.step} ${i === active ? styles.stepActive : ""}`}
                >
                  <span className={styles.node} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.card}>
                    <div className={styles.cardTop}>
                      <h3 className={styles.stepTitle}>{s.title}</h3>
                      <span className={styles.dur}>{s.dur}</span>
                    </div>
                    <p className={styles.desc}>{s.desc}</p>
                    {principle && (
                      <span className={styles.principle}>
                        <b>{t.procPrinciple}</b> {t[principle]}
                      </span>
                    )}
                  </div>
                </motion.li>
              );
            })}

            {/* The rail ends here: the next step is the visitor's own briefing. */}
            <motion.li
              className={`${styles.step} ${styles.finale} ${finale ? styles.finaleOn : ""}`}
            >
              <span ref={finaleNodeRef} className={`${styles.node} ${styles.finaleNode}`} aria-hidden="true">
                ↗
              </span>
              <div className={styles.finaleCard}>
                <p className={styles.finaleTitle}>{t.procFinTitle}</p>
                <p className={styles.finaleBody}>{t.procFinBody}</p>
                <a href="#lead" className={styles.finaleBtn}>
                  {t.hxCtaBrief} <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.li>
          </ol>
        </div>
      </div>
    </section>
  );
}
