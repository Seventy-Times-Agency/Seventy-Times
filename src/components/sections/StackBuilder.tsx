"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import type { ServiceKey } from "@/data/services";
import { SERVICES } from "@/data/services";
import { FLOW } from "@/components/sections/services/flow";
import { requestLeadPrefill } from "@/lib/leadDraft";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/StackBuilder.module.css";

/**
 * "Build your stack": tick the services you need and watch how one lead
 * travels with that set. It describes the route and promises no numbers;
 * figures come from the briefing. The chosen set goes into the lead form.
 */
const STEPS = [
  { key: "targeting", label: "stackStep1", on: "stackStep1On", off: "stackStep1Off" },
  { key: "sites", label: "stackStep2", on: "stackStep2On", off: "stackStep2Off" },
  { key: "aibot", label: "stackStep3", on: "stackStep3On", off: "stackStep3Off" },
  { key: "automation", label: "stackStep4", on: "stackStep4On", off: "stackStep4Off" },
] as const;

export default function StackBuilder() {
  const { t } = useT();
  const [picked, setPicked] = useState<ReadonlySet<ServiceKey>>(new Set(["targeting"]));

  const titleOf = (key: ServiceKey) => t[SERVICES.find((s) => s.key === key)!.i18n.title];
  const chosen = FLOW.filter((key) => picked.has(key));
  const names = chosen.map(titleOf).join(" → ");

  const toggle = (key: ServiceKey) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const discuss = () => {
    if (chosen.length > 0) {
      requestLeadPrefill(`${t.stackPrefill} ${chosen.map(titleOf).join(", ")}`);
    }
    window.location.hash = "#lead";
  };

  return (
    <section id="stack" className={styles.section}>
      <SectionWatermark text={t.stackTitle3} number="/ 05" position="right" />

      <div className={styles.header}>
        <div>
          <Reveal>
            <span className="eyebrow">{t.stackEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[t.stackTitle1, t.stackTitle2, { text: t.stackTitle3, className: "neonOutline" }]}
            />
          </h2>
        </div>
        <Reveal delay={0.15}>
          <p className={styles.lead}>{t.stackLead}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className={styles.board}>
          <div className={styles.pick}>
            <h3 className={styles.label}>{t.stackPick}</h3>
            <div className={styles.switches}>
              {FLOW.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`${styles.switch}${picked.has(key) ? ` ${styles.switchOn}` : ""}`}
                  aria-pressed={picked.has(key)}
                  onClick={() => toggle(key)}
                >
                  <span className={styles.knob} aria-hidden="true" />
                  {titleOf(key)}
                </button>
              ))}
            </div>

            <div className={styles.order}>
              <span className={styles.label}>{t.stackOrder}</span>
              <p className={styles.orderValue}>{names || t.stackEmpty}</p>
            </div>

            <button type="button" className={styles.cta} onClick={discuss}>
              {chosen.length > 0 ? t.stackCta : t.navCta}
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className={styles.path}>
            <h3 className={styles.label}>{t.stackPath}</h3>
            <ol className={styles.steps}>
              {STEPS.map((step) => {
                const on = picked.has(step.key);
                return (
                  <li key={step.key} className={`${styles.step}${on ? ` ${styles.stepOn}` : ""}`}>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.stepLabel}>{t[step.label]}</span>
                    <span className={styles.stepValue}>{on ? t[step.on] : t[step.off]}</span>
                  </li>
                );
              })}
            </ol>
            <p className={styles.note}>{t.stackNote}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
