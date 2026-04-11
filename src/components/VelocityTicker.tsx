import styles from "./VelocityTicker.module.css";

const ITEMS = [
  "Реклама",
  "Автоматизация",
  "AI",
  "Telegram",
  "Meta",
  "Google",
  "Воронки",
  "Аналитика",
  "CRM",
  "Лендинги",
];

/**
 * Single-row CSS-only ticker. No JS scroll listeners, no requestAnimationFrame
 * loops — the animation runs entirely on the compositor via translate3d, so it
 * never causes layout work or repaints. Pauses on hover.
 */
export default function VelocityTicker() {
  // Render twice for a seamless loop (the second copy fills the gap as the
  // first slides out, then the keyframe wraps back to 0).
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
