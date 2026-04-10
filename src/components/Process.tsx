import { PROCESS_STEPS } from "@/data/process";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import styles from "./Process.module.css";

export default function Process() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">— How we work / Process</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                "Как",
                "мы",
                { text: "работаем", className: styles.titleItalic },
              ]}
            />
          </h2>
        </div>
        <div className={styles.headerRight}>
          <Reveal delay={0.15}>
            <p className={styles.lead}>
              Простой и прозрачный процесс. От первого звонка до первых лидов —
              обычно 2–3 недели. Без бюрократии, с понятными KPI.
            </p>
          </Reveal>
        </div>
      </div>

      <div className={styles.grid}>
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.1}>
            <div className={styles.step}>
              <div className={styles.numberWrap}>{step.num}</div>
              <span className={styles.duration}>{step.duration}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
