import styles from "@/components/decor/SectionWatermark.module.css";

type Props = {
  text: string;
  number?: string;
  position?: "left" | "right" | "center";
  drift?: boolean;
};

/**
 * Huge outlined watermark that sits behind a section's content.
 *
 * Place as the first child of a section with `position: relative`
 * and `isolation: isolate`. The watermark renders at `z-index: -1`
 * inside the isolated context, so regular content stacks over it
 * without needing any explicit z-index.
 */
export default function SectionWatermark({
  text,
  number,
  position = "right",
  drift = true,
}: Props) {
  return (
    <div
      className={`${styles.wrap} ${styles[position]} ${drift ? styles.drift : ""}`}
      aria-hidden="true"
    >
      <span className={styles.text}>
        {number && <span className={styles.num}>{number}</span>}
        <span>{text}</span>
      </span>
    </div>
  );
}
