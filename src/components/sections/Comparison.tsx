"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/components/sections/Comparison.module.css";

type RowKeys = {
  label: keyof Dictionary;
  us: keyof Dictionary;
  agency: keyof Dictionary;
  freelancer: keyof Dictionary;
};

const ROWS: readonly RowKeys[] = [
  {
    label: "compRowSpeedLabel",
    us: "compRowSpeedUs",
    agency: "compRowSpeedAgency",
    freelancer: "compRowSpeedFreelancer",
  },
  {
    label: "compRowAiLabel",
    us: "compRowAiUs",
    agency: "compRowAiAgency",
    freelancer: "compRowAiFreelancer",
  },
  {
    label: "compRowScopeLabel",
    us: "compRowScopeUs",
    agency: "compRowScopeAgency",
    freelancer: "compRowScopeFreelancer",
  },
  {
    label: "compRowReplyLabel",
    us: "compRowReplyUs",
    agency: "compRowReplyAgency",
    freelancer: "compRowReplyFreelancer",
  },
  {
    label: "compRowReportLabel",
    us: "compRowReportUs",
    agency: "compRowReportAgency",
    freelancer: "compRowReportFreelancer",
  },
  {
    label: "compRowContractLabel",
    us: "compRowContractUs",
    agency: "compRowContractAgency",
    freelancer: "compRowContractFreelancer",
  },
  {
    label: "compRowRiskLabel",
    us: "compRowRiskUs",
    agency: "compRowRiskAgency",
    freelancer: "compRowRiskFreelancer",
  },
];

export default function Comparison() {
  const { t } = useT();

  return (
    <section id="comparison" className={styles.section}>
      <SectionWatermark text="vs" number="/ 03" position="left" />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">{t.compEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                t.compTitle1,
                { text: t.compTitle2, className: styles.titleItalic },
                t.compTitle3,
              ]}
            />
          </h2>
        </div>
        <Reveal delay={0.15}>
          <p className={styles.lead}>{t.compLead}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className={styles.tableWrap}>
          <div className={styles.colHeaders}>
            <div className={styles.headCell} />
            <div className={`${styles.headCell} ${styles.headCellUs}`}>
              <span className={styles.headBadge}>{t.compBadgeUs}</span>
              <span className={styles.headName}>{siteConfig.name}</span>
            </div>
            <div className={styles.headCell}>
              <span className={styles.headLabel}>{t.compHeadAgency}</span>
            </div>
            <div className={styles.headCell}>
              <span className={styles.headLabel}>{t.compHeadFreelancer}</span>
            </div>
          </div>

          <div className={styles.rows}>
            {ROWS.map((row) => (
              <div key={row.label} className={styles.row}>
                <div className={styles.rowLabel}>{t[row.label] as string}</div>
                <div className={`${styles.cell} ${styles.cellUs}`}>
                  <span className={styles.checkUs} aria-hidden="true">
                    ✓
                  </span>
                  <span>{t[row.us] as string}</span>
                </div>
                <div className={styles.cell}>
                  <span>{t[row.agency] as string}</span>
                </div>
                <div className={styles.cell}>
                  <span>{t[row.freelancer] as string}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <p className={styles.disclaimer}>{t.compDisclaimer}</p>
      </Reveal>
    </section>
  );
}
