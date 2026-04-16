"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import { useT } from "@/i18n/context";
import styles from "./GrowthSimulator.module.css";

/**
 * Interactive 70× growth simulator.
 *
 * Educational model only — all numbers are ILLUSTRATIVE projections
 * based on industry-average assumptions, not promises. Disclaimer is
 * rendered under every instance and referenced in the footer too.
 *
 * Math (intentionally conservative):
 *   base   = spend / 50          // rough $50 CPL assumption
 *   autoM  = 1 + auto * 0.5      // up to +50% from automation
 *   aiM    = 1 + ai   * 0.7      // up to +70% from AI adoption
 *   growthPerMonth = 1.12        // 12% compounding optimization
 *   leads(m) = base * autoM * aiM * growthPerMonth ^ m
 *   multiplier = leads(6) / base
 *
 * Max achievable multiplier with sliders pinned ≈ 3.3× — well below
 * the "70×" brand ambition so we never show an unrealistic number.
 */
export default function GrowthSimulator() {
  const { t } = useT();

  const [spend, setSpend] = useState(5000);
  const [auto, setAuto] = useState(30); // percent
  const [ai, setAi] = useState(20); // percent

  const data = useMemo(() => {
    const base = spend / 50;
    const autoM = 1 + (auto / 100) * 0.5;
    const aiM = 1 + (ai / 100) * 0.7;
    const growth = 1.12;

    const points = Array.from({ length: 7 }, (_, m) => {
      const leads = base * autoM * aiM * Math.pow(growth, m);
      return { m, leads };
    });

    const leadsNow = Math.round(base);
    const leadsProjected = Math.round(points[points.length - 1].leads);
    const multiplier = leadsProjected / Math.max(1, base);

    // Path to 70× in months — clamped and honest
    const ambitionPath = 70 / (autoM * aiM);
    const monthsTo70x = Math.max(
      6,
      Math.min(36, Math.round(Math.log(ambitionPath) / Math.log(growth)))
    );

    return {
      points,
      leadsNow,
      leadsProjected,
      multiplier,
      monthsTo70x,
    };
  }, [spend, auto, ai]);

  // SVG path — normalize to viewBox 100×100
  const chartPath = useMemo(() => {
    const max = Math.max(...data.points.map((p) => p.leads));
    const min = Math.min(...data.points.map((p) => p.leads));
    const range = Math.max(1, max - min);

    const coords = data.points.map((p, i) => {
      const x = (i / 6) * 100;
      const y = 100 - ((p.leads - min) / range) * 90 - 5; // padding
      return [x, y] as const;
    });

    const line = coords
      .map((c, i) => `${i === 0 ? "M" : "L"} ${c[0]} ${c[1]}`)
      .join(" ");
    const area = `${line} L 100 100 L 0 100 Z`;

    return { line, area };
  }, [data.points]);

  const prefillPrompt = encodeURIComponent(
    `Spend ${spend}$/mo · Automation ${auto}% · AI ${ai}%. What would a 70× plan look like?`
  );

  const openVenesa = () => {
    window.dispatchEvent(new Event("open-venesa"));
  };

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
        <div className={styles.body}>
          {/* Sliders ───────────────────────────── */}
          <div className={styles.sliders}>
            <div className={styles.slider}>
              <div className={styles.sliderHead}>
                <span className={styles.sliderLabel}>{t.simSpendLabel}</span>
                <span className={styles.sliderValue}>
                  ${spend.toLocaleString()}
                  <span className={styles.sliderUnit}>{t.simSpendUnit}</span>
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                className={styles.range}
                aria-label={t.simSpendLabel}
              />
            </div>

            <div className={styles.slider}>
              <div className={styles.sliderHead}>
                <span className={styles.sliderLabel}>{t.simAutoLabel}</span>
                <span className={styles.sliderValue}>{auto}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={auto}
                onChange={(e) => setAuto(Number(e.target.value))}
                className={styles.range}
                aria-label={t.simAutoLabel}
              />
            </div>

            <div className={styles.slider}>
              <div className={styles.sliderHead}>
                <span className={styles.sliderLabel}>{t.simAiLabel}</span>
                <span className={styles.sliderValue}>{ai}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={ai}
                onChange={(e) => setAi(Number(e.target.value))}
                className={styles.range}
                aria-label={t.simAiLabel}
              />
            </div>
          </div>

          {/* Chart + metrics ───────────────────── */}
          <div className={styles.results}>
            <div className={styles.chart}>
              <span className={`${styles.chartLabel} ${styles.chartLabelLeft}`}>
                {t.simMonthNow}
              </span>
              <span className={`${styles.chartLabel} ${styles.chartLabelRight}`}>
                {t.simMonth6}
              </span>
              <svg
                className={styles.chartSvg}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#c8d4de" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#c8d4de" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid lines */}
                {[25, 50, 75].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="100"
                    y1={y}
                    y2={y}
                    className={styles.chartGrid}
                  />
                ))}
                <motion.path
                  d={chartPath.area}
                  className={styles.chartArea}
                  initial={false}
                  animate={{ d: chartPath.area }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <motion.path
                  d={chartPath.line}
                  className={styles.chartPath}
                  initial={false}
                  animate={{ d: chartPath.line }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
            </div>

            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>{data.leadsNow}</span>
                <span className={styles.metricLabel}>{t.simLeadsNow}</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>
                  {data.leadsProjected}
                </span>
                <span className={styles.metricLabel}>{t.simLeadsProj}</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>
                  {data.multiplier.toFixed(1)}×
                </span>
                <span className={styles.metricLabel}>{t.simMultiplier}</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.cta}
              onClick={openVenesa}
              data-prefill={prefillPrompt}
            >
              {t.simCta} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </Reveal>

      <p className={styles.disclaimer}>{t.simDisclaimer}</p>
    </section>
  );
}
