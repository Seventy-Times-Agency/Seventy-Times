"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/GrowthSimulator.module.css";

const STORAGE_KEY = "st-simulator-levels-v1";

/**
 * 70× Growth Simulator — level-based, illustrative model.
 *
 * Each pillar (Ads, Automation, AI) has 4 concrete levels with clear
 * descriptions of what's included at each level. Every level carries
 * a specific growth contribution percentage based on industry-average
 * digital channel effects. The three pillar contributions compound:
 *
 *   total = (1 + adsPct) × (1 + autoPct) × (1 + aiPct)
 *
 * Maximum at all-full: (1+0.85)(1+0.50)(1+0.70) ≈ 4.72× — realistic,
 * explicitly below the 70× brand ambition so the tool stays honest.
 * A separate formula strip under the pillars explains this plainly.
 */

// Contribution percentages per level per pillar.
//
// Rough anchors from industry-reported lift ranges on lead volume:
//   - Ads: 1 channel +30%, 2 channels +60%, 3 channels +85% (compounding
//     reach across Meta / Google / TikTok).
//   - Automation: basic funnel +15%, CRM + reminders +30%, full stack +50%
//     (based on recovered conversions from speed-to-reply and consistent
//     follow-up, not "new traffic").
//   - AI agent: site only +25%, multi-channel +45%, full stack +70%
//     (qualification quality + off-hours coverage).
//
// These are conservative midpoints — the max combined multiplier is ~4.7×,
// deliberately well below the 70× brand ambition so the tool stays honest.
const ADS_CONTRIB = [0, 0.30, 0.60, 0.85];
const AUTO_CONTRIB = [0, 0.15, 0.30, 0.50];
const AI_CONTRIB = [0, 0.25, 0.45, 0.70];

export default function GrowthSimulator() {
  const { t } = useT();

  const [adsLevel, setAdsLevel] = useState(2);
  const [autoLevel, setAutoLevel] = useState(1);
  const [aiLevel, setAiLevel] = useState(1);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as {
          ads?: number;
          auto?: number;
          ai?: number;
        };
        const clamp = (n: unknown) =>
          typeof n === "number" && n >= 0 && n <= 3 ? n : null;
        const a = clamp(saved.ads);
        const b = clamp(saved.auto);
        const c = clamp(saved.ai);
        if (a !== null) setAdsLevel(a);
        if (b !== null) setAutoLevel(b);
        if (c !== null) setAiLevel(c);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ads: adsLevel, auto: autoLevel, ai: aiLevel })
      );
    } catch {
      // ignore quota
    }
  }, [adsLevel, autoLevel, aiLevel, hydrated]);

  const adsContrib = ADS_CONTRIB[adsLevel];
  const autoContrib = AUTO_CONTRIB[autoLevel];
  const aiContrib = AI_CONTRIB[aiLevel];
  const total = (1 + adsContrib) * (1 + autoContrib) * (1 + aiContrib);

  const baseline = 100;
  const projected = Math.round(baseline * total);
  const delta = projected - baseline;

  const openTess = () => {
    window.dispatchEvent(new Event("open-tess"));
  };

  const pillars = [
    {
      key: "ads",
      tag: t.simAdsTag,
      name: t.simAdsName,
      desc: t.simAdsDesc,
      level: adsLevel,
      setLevel: setAdsLevel,
      contrib: adsContrib,
      levelLabels: [
        t.simAdsLvl0,
        t.simAdsLvl1,
        t.simAdsLvl2,
        t.simAdsLvl3,
      ],
      levelDescs: [
        t.simAdsLvl0Desc,
        t.simAdsLvl1Desc,
        t.simAdsLvl2Desc,
        t.simAdsLvl3Desc,
      ],
    },
    {
      key: "auto",
      tag: t.simAutoTag,
      name: t.simAutoName,
      desc: t.simAutoDesc,
      level: autoLevel,
      setLevel: setAutoLevel,
      contrib: autoContrib,
      levelLabels: [
        t.simAutoLvl0,
        t.simAutoLvl1,
        t.simAutoLvl2,
        t.simAutoLvl3,
      ],
      levelDescs: [
        t.simAutoLvl0Desc,
        t.simAutoLvl1Desc,
        t.simAutoLvl2Desc,
        t.simAutoLvl3Desc,
      ],
    },
    {
      key: "ai",
      tag: t.simAiTag,
      name: t.simAiName,
      desc: t.simAiDesc,
      level: aiLevel,
      setLevel: setAiLevel,
      contrib: aiContrib,
      levelLabels: [t.simAiLvl0, t.simAiLvl1, t.simAiLvl2, t.simAiLvl3],
      levelDescs: [
        t.simAiLvl0Desc,
        t.simAiLvl1Desc,
        t.simAiLvl2Desc,
        t.simAiLvl3Desc,
      ],
    },
  ];

  const barMax = Math.max(projected, baseline);
  const baselinePct = (baseline / barMax) * 100;
  const projectedPct = (projected / barMax) * 100;

  return (
    <section id="simulator" className={styles.section}>
      <SectionWatermark text="70×" number="/ 06" position="left" />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">{t.simEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                t.simTitle1,
                t.simTitle2,
                { text: t.simTitle3, className: styles.titleItalic },
              ]}
            />
          </h2>
        </div>
        <Reveal delay={0.15}>
          <p className={styles.lead}>{t.simLead}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className={styles.pillars}>
          {pillars.map((p) => (
            <div key={p.key} className={styles.pillar}>
              <div className={styles.pillarHead}>
                <span className={styles.pillarTag}>{p.tag}</span>
                <h3 className={styles.pillarName}>{p.name}</h3>
                <span className={styles.pillarDesc}>{p.desc}</span>
              </div>

              <div className={styles.steps}>
                {p.levelLabels.map((label, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.step} ${
                      p.level === i ? styles.stepActive : ""
                    }`}
                    onClick={() => p.setLevel(i)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className={styles.selectedBlock}>
                <span className={styles.selectedLabel}>{t.simCurrent}</span>
                <span className={styles.selectedDesc}>
                  {p.levelDescs[p.level]}
                </span>
                <div className={styles.selectedContribution}>
                  <span className={styles.contributionValue}>
                    +{Math.round(p.contrib * 100)}%
                  </span>
                  <span className={styles.contributionLabel}>
                    {t.simContribution}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className={styles.formula}>
          <span className={styles.formulaLabel}>{t.simFormula}</span>
          <span className={styles.formulaDesc}>{t.simFormulaDesc}</span>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className={styles.result}>
          <div className={styles.resultLeft}>
            <span className={styles.resultEyebrow}>{t.simResultEyebrow}</span>
            <div className={styles.resultMulti}>
              <span className={styles.resultMultiValue}>
                {total.toFixed(1)}
              </span>
              <span className={styles.resultMultiSign}>×</span>
            </div>
            <p className={styles.resultMultiLabel}>{t.simMultiLabel}</p>
            <button type="button" className={styles.cta} onClick={openTess}>
              {t.simCta} <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className={styles.comparison}>
            <div className={styles.compareLine}>
              <span className={styles.compareLabel}>{t.simCompareLabel}</span>
              <div className={styles.compareBar}>
                <div
                  className={`${styles.compareBarFill} ${styles.compareBarBase}`}
                  style={{ width: `${baselinePct}%` }}
                />
              </div>
              <span className={styles.compareValue}>{baseline}</span>
            </div>

            <div className={styles.compareLine}>
              <span className={styles.compareLabel}>
                {t.simCompareLabelAfter}
              </span>
              <div className={styles.compareBar}>
                <div
                  className={`${styles.compareBarFill} ${styles.compareBarBoosted}`}
                  style={{ width: `${projectedPct}%` }}
                />
              </div>
              <span className={styles.compareValue}>{projected}</span>
            </div>

            <div className={styles.compareDelta}>
              <span className={styles.compareDeltaLabel}>{t.simDeltaLabel}</span>
              <span className={styles.compareDeltaValue}>
                +{delta} {t.simLeadsUnit}
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      <p className={styles.disclaimer}>{t.simDisclaimer}</p>
    </section>
  );
}
