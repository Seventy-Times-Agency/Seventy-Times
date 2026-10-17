"use client";

import type { ServiceKey } from "@/data/services";
import type { useT } from "@/i18n/context";
import styles from "./ServiceVisual.module.css";

type T = ReturnType<typeof useT>["t"];

type Props = { kind: ServiceKey; t: T; size?: "sm" | "lg" };

/** A small live "screen" showing what each module does. */
export default function ServiceVisual({ kind, t, size = "sm" }: Props) {
  const sz = size === "lg" ? ` ${styles.lg}` : "";
  if (kind === "sites") {
    return (
      <div className={`${styles.vis} ${styles.visSite}${sz}`}>
        <div className={styles.browserBar}>
          <i />
          <i />
          <i />
          <span>yourbrand.com</span>
        </div>
        <p className={styles.siteHead}>{t.svcVisSite}</p>
        <span className={styles.ln} />
        <span className={`${styles.ln} ${styles.lnShort}`} />
        <span className={styles.siteBtn} />
        <span className={styles.pin} aria-hidden="true">
          ⌖
        </span>
      </div>
    );
  }
  if (kind === "targeting") {
    return (
      <div className={`${styles.vis} ${styles.visAds}${sz}`}>
        <div className={styles.adsHead}>
          <span>Meta</span>
          <span>Google</span>
          <em>{t.svcVisLeads}</em>
        </div>
        <svg className={styles.chart} viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true">
          <path className={styles.chartArea} d="M0 62 L28 58 L56 60 L84 46 L112 48 L140 32 L168 24 L200 8 L200 70 L0 70 Z" />
          <path className={styles.chartLine} d="M0 62 L28 58 L56 60 L84 46 L112 48 L140 32 L168 24 L200 8" />
        </svg>
        <div className={styles.bars} aria-hidden="true">
          {[30, 38, 34, 52, 50, 66, 74, 92].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "aibot") {
    return (
      <div className={`${styles.vis} ${styles.visChat}${sz}`}>
        <p className={`${styles.bubble} ${styles.bubbleIn}`}>{t.svcVisQ}</p>
        <p className={`${styles.bubble} ${styles.bubbleOut}`}>{t.svcVisA}</p>
        <span className={styles.typing} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    );
  }
  return (
    <div className={`${styles.vis} ${styles.visFlow}${sz}`}>
      <span className={styles.node}>{t.svcVisLead}</span>
      <span className={styles.wire} aria-hidden="true">
        <i />
      </span>
      <span className={styles.node}>CRM</span>
      <span className={styles.wire} aria-hidden="true">
        <i />
      </span>
      <span className={`${styles.node} ${styles.nodeHot}`}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {t.svcVisAlert}
      </span>
    </div>
  );
}
