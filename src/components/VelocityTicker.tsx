import styles from "./VelocityTicker.module.css";

const ITEMS = [
  "Реклама",
  "Автоматизация",
  "AI",
  "Meta",
  "Google",
  "Воронки",
  "Telegram",
  "CRM",
];

/**
 * CSS-only ticker. No JavaScript per frame — animation runs on the
 * GPU compositor via translate3d, and the wrap uses `contain` to
 * isolate layout/paint so the rest of the page never repaints when
 * the ticker moves. Pauses on hover via CSS.
 */
export default function VelocityTicker() {
  // Render twice for a seamless loop — keyframe wraps to 0 when the
  // first copy slides fully off-screen.
  const doubled = [...ITEMS, ...ITEMS];

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
