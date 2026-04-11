import styles from "./Marquee.module.css";

const KEYWORDS = [
  "Ads",
  "Automation",
  "AI",
  "Meta",
  "Google",
  "TikTok",
  "Telegram Bots",
  "Instagram",
  "CRM",
  "Analytics",
];

export default function Marquee() {
  // Render twice so the loop seams are seamless
  const doubled = [...KEYWORDS, ...KEYWORDS];

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {doubled.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={`${styles.item} ${i % 2 === 1 ? styles.itemMuted : ""}`}
          >
            {word}
            <span className={styles.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
