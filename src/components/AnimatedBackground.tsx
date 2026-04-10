import styles from "./AnimatedBackground.module.css";

export default function AnimatedBackground() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.orb} ${styles.orbA}`} />
      <div className={`${styles.orb} ${styles.orbB}`} />
      <div className={`${styles.orb} ${styles.orbC}`} />
      <div className={styles.noise} />
    </div>
  );
}
