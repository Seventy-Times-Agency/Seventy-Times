import styles from "./AnimatedBackground.module.css";

/**
 * Layered background — kept intentionally lightweight:
 * - static gradient + grid (zero per-frame work)
 * - two blurred glows that drift via cheap CSS keyframes
 * - one thin top highlight line
 *
 * No JS scroll listeners, no parallax transforms, no noise overlay,
 * no mix-blend modes — everything stays on the compositor so the
 * page never repaints because of the background.
 */
export default function AnimatedBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.topLight} />
      <div className={styles.grid} />
      <div className={styles.bigNumeral}>70×</div>
      <div className={`${styles.glow} ${styles.glowA}`} />
      <div className={`${styles.glow} ${styles.glowB}`} />
    </div>
  );
}
