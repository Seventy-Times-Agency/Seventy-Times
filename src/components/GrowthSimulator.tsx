"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import { useT } from "@/i18n/context";
import styles from "./GrowthSimulator.module.css";

/**
 * 70× Growth Simulator — card-based, illustrative model.
 *
 * Three pillar cards (Ads, Automation, AI), each with an intensity
 * slider 0–100%. Each pillar contributes its own multiplier to a
 * combined coefficient. The result panel shows: total ×, and a clear
 * "today vs in 6 months" lead-flow comparison anchored to a fixed
 * baseline of 100 leads/mo so the user immediately understands what
 * the multiplier means in concrete terms.
 *
 * Math (intentionally conservative):
 *   adsM   = 1 + ads  * 0.012   // up to +120% from a strong ads engine
 *   autoM  = 1 + auto * 0.005   // up to +50% from automation efficiency
 *   aiM    = 1 + ai   * 0.008   // up to +80% from AI conversion lift
 *   total  = adsM * autoM * aiM        (compounding)
 *   leads6 = 100 * total
 *
 * With every slider at 100%: total ≈ 5.9× — well under the 70× brand
 * ambition so the tool stays realistic, not overpromising.
 */
export default function GrowthSimulator() {
  const { t } = useT();

  const [ads, setAds] = useState(60);
  const [auto, setAuto] = useState(40);
  const [ai, setAi] = useState(50);

  const adsMulti = 1 + ads * 0.012;
  const autoMulti = 1 + auto * 0.005;
  const aiMulti = 1 + ai * 0.008;
  const total = adsMulti * autoMulti * aiMulti;

  const baseline = 100; // illustrative anchor
  const projected = Math.round(baseline * total);
  const delta = projected - baseline;

  const openVenesa = () => {
    window.dispatchEvent(new Event("open-venesa"));
  };

  const pillars = [
    {
      tag: t.simAdsTag,
      name: t.simAdsName,
      desc: t.simAdsDesc,
      metric: t.simAdsMetric,
      value: ads,
      setValue: setAds,
      contribution: Math.round((adsMulti - 1) * 100),
    },
    {
      tag: t.simAutoTag,
      name: t.simAutoName,
      desc: t.simAutoDesc,
      metric: t.simAutoMetric,
      value: auto,
      setValue: setAuto,
      contribution: Math.round((autoMulti - 1) * 100),
    },
    {
      tag: t.simAiTag,
      name: t.simAiName,
      desc: t.simAiDesc,
      metric: t.simAiMetric,
      value: ai,
      setValue: setAi,
      contribution: Math.round((aiMulti - 1) * 100),
    },
  ];

  // Comparison bar widths (relative to projected for both bars)
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
            <div key={p.name} className={styles.pillar}>
              <div className={styles.pillarHead}>
                <span className={styles.pillarTag}>{p.tag}</span>
                <h3 className={styles.pillarName}>{p.name}</h3>
              </div>
              <p className={styles.pillarDesc}>{p.desc}</p>

              <div className={styles.pillarMetric}>
                <span className={styles.pillarMetricValue}>
                  +{p.contribution}%
                </span>
                <span className={styles.pillarMetricLabel}>{p.metric}</span>
              </div>

              <div className={styles.pillarBar}>
                <div
                  className={styles.pillarBarFill}
                  style={{ width: `${p.value}%` }}
                />
              </div>

              <div className={styles.intensity}>
                <span>{t.simIntensity}</span>
                <span className={styles.intensityValue}>{p.value}%</span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={p.value}
                onChange={(e) => p.setValue(Number(e.target.value))}
                className={styles.range}
                aria-label={`${p.name} ${t.simIntensity}`}
              />
            </div>
          ))}
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
            <button type="button" className={styles.cta} onClick={openVenesa}>
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
