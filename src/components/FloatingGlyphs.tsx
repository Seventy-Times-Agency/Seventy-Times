import styles from "./FloatingGlyphs.module.css";

/**
 * Subtle decorative SVG glyphs that drift across the viewport.
 * Very low opacity so they act as texture, not distraction.
 * Hidden on mobile to keep things clean and save rendering.
 */
export default function FloatingGlyphs() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {/* Cross + */}
      <svg className={`${styles.glyph} ${styles.g1}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>

      {/* Circle ○ */}
      <svg className={`${styles.glyph} ${styles.g2}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="16" cy="16" r="14" />
      </svg>

      {/* Diagonal / */}
      <svg className={`${styles.glyph} ${styles.g3}`} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="4" y1="24" x2="24" y2="4" />
      </svg>

      {/* Triangle △ */}
      <svg className={`${styles.glyph} ${styles.g4}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
        <polygon points="10,2 19,18 1,18" />
      </svg>

      {/* Dot ● */}
      <svg className={`${styles.glyph} ${styles.g5}`} viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="4" fill="currentColor" />
      </svg>

      {/* Chevron > */}
      <svg className={`${styles.glyph} ${styles.g6}`} viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8,4 16,11 8,18" />
      </svg>
    </div>
  );
}
