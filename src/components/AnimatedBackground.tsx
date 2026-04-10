import styles from "./AnimatedBackground.module.css";

export default function AnimatedBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.topLight} />
      <div className={styles.grid} />
      <div className={`${styles.glow} ${styles.glowA}`} />
      <div className={`${styles.glow} ${styles.glowB}`} />
      <div className={styles.noise} />
    </div>
  );
}
