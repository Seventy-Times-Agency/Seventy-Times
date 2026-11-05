"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";
import type { Dictionary } from "@/i18n/dictionary";
import styles from "@/components/sections/Comparison.module.css";

type RowKeys = {
  label: keyof Dictionary;
  us: keyof Dictionary;
  them: keyof Dictionary;
};

const ROWS: readonly RowKeys[] = [
  { label: "compRowSpeedLabel", us: "compRowSpeedUs", them: "compRowSpeedAgency" },
  { label: "compRowScopeLabel", us: "compRowScopeUs", them: "compRowScopeAgency" },
  { label: "compRowReplyLabel", us: "compRowReplyUs", them: "compRowReplyAgency" },
  { label: "compRowReportLabel", us: "compRowReportUs", them: "compRowReportAgency" },
  { label: "compRowContractLabel", us: "compRowContractUs", them: "compRowContractAgency" },
];

export default function Comparison() {
  const { t } = useT();

  return (
    <section id="comparison" className={styles.section}>
      <div className={styles.header}>
        <div>
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
        <div className={styles.head} aria-hidden="true">
          <span />
          <span className={styles.headUs}>{siteConfig.name}</span>
          <span>{t.compHeadAgency}</span>
        </div>
        <dl className={styles.rows}>
          {ROWS.map((row) => (
            <div key={row.label} className={styles.row}>
              <dt className={styles.label}>{t[row.label] as string}</dt>
              <dd className={styles.us}>
                <span className={styles.who}>{siteConfig.name}</span>
                {t[row.us] as string}
              </dd>
              <dd className={styles.them}>
                <span className={styles.who}>{t.compHeadAgency}</span>
                {t[row.them] as string}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
