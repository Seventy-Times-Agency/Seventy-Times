import styles from "./ViewportFrame.module.css";

/**
 * Fixed editorial frame around the viewport:
 * - Four corner L-brackets
 * - A rotated side label on the left edge
 * - Live-status chip in the bottom-left corner
 * - Scattered number-coordinate accents (editorial metric markers)
 *
 * Purely decorative, pointer-events: none so it never blocks clicks.
 * Hidden on mobile where the viewport is tight.
 */
export default function ViewportFrame() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <span className={`${styles.corner} ${styles.tl}`} />
      <span className={`${styles.corner} ${styles.tr}`} />
      <span className={`${styles.corner} ${styles.bl}`} />
      <span className={`${styles.corner} ${styles.br}`} />

      <span className={styles.sideLabel}>Seventy Times · Est. 2026</span>

      <span className={`${styles.chip} ${styles.chipLeft}`}>
        <span className={styles.chipDot} />
        Live
      </span>

      {/* Editorial number accents — scattered metrics/coordinates */}
      <span className={`${styles.numAccent} ${styles.numTopRight}`}>
        /70× · 2026·Q2
      </span>
      <span className={`${styles.numAccent} ${styles.numMidLeft}`}>
        +50 / 24·7 / ×3
      </span>
      <span className={`${styles.numAccent} ${styles.numMidRight}`}>
        v.2.1 · growth
      </span>
    </div>
  );
}
