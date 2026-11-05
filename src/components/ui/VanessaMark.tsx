import styles from "@/components/ui/VanessaMark.module.css";

type Props = {
  className?: string;
  /** Spoken name; omit where the mark sits inside a labelled button. */
  title?: string;
};

/**
 * Vanessa's mark: a speech bubble with a face. Drawn, not a portrait,
 * because she is an AI and shouldn't pass for a person. The eyes blink.
 */
export default function VanessaMark({ className, title }: Props) {
  return (
    <svg
      className={`${styles.mark}${className ? ` ${className}` : ""}`}
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        className={styles.bubble}
        d="M32 12c-12.2 0-21 7.9-21 18.4 0 5.7 2.6 10.6 6.9 14 .5.4.7 1 .5 1.6l-1.6 5.6c-.3 1 .8 1.9 1.7 1.3l6.7-4c.4-.2.8-.3 1.2-.2 1.8.4 3.6.6 5.6.6 12.2 0 21-7.9 21-18.3S44.2 12 32 12Z"
      />
      <g className={styles.eyes}>
        <circle cx="25" cy="28" r="2.7" />
        <circle cx="39" cy="28" r="2.7" />
      </g>
      <path className={styles.smile} d="M25.5 36.2c1.7 2 3.9 3 6.5 3s4.8-1 6.5-3" />
    </svg>
  );
}
