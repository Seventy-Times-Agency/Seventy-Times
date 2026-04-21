"use client";

import { useT } from "@/i18n/context";
import styles from "@/components/sections/VelocityTicker.module.css";

/**
 * CSS-only ticker. No JavaScript per frame — animation runs on the
 * GPU compositor via translate3d, and the wrap uses `contain` to
 * isolate layout/paint so the rest of the page never repaints when
 * the ticker moves. Pauses on hover via CSS.
 */
const BRAND_ITEMS = ["Meta", "Google", "Telegram", "CRM"];

export default function VelocityTicker() {
  const { t } = useT();
  const localized = [t.svc1Title, t.svc2Title, t.svc3Title, ...BRAND_ITEMS];
  const doubled = [...localized, ...localized];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.row}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.item}>
            {item}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
