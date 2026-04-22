import styles from "./Logo.module.css";

type LogoProps = {
  /** `compact` renders just the "70×" mark. `full` adds the
   *  "SEVENTY TIMES" subtitle and hairline underneath. */
  variant?: "compact" | "full";
  className?: string;
};

/**
 * Seventy Times brand logo. Pure HTML + CSS (no SVG) so it scales
 * with the surrounding typography and inherits the Manrope font
 * that is already loaded. The `×` is a gradient-filled italic
 * cross matching the reference artwork.
 */
export default function Logo({ variant = "compact", className }: LogoProps) {
  const classes = [styles.logo, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <span className={styles.mark} aria-hidden="true">
        70<span className={styles.cross}>×</span>
      </span>
      {variant === "full" ? (
        <span className={styles.name}>Seventy Times</span>
      ) : (
        <span className={styles.srOnly}>Seventy Times</span>
      )}
    </span>
  );
}
