import styles from "./ViewportFrame.module.css";

/**
 * Fixed editorial frame around the viewport:
 * - Four corner L-brackets
 * - A rotated side label on the left edge
 * - A live-status chip in the bottom-left corner
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

      <span className={styles.sideLabel}>IAA agency · Est. 2026</span>

      <span className={`${styles.chip} ${styles.chipLeft}`}>
        <span className={styles.chipDot} />
        Live
      </span>
    </div>
  );
}
