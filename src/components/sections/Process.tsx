"use client";

import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Process.module.css";

export default function Process() {
  const { t } = useT();

  const steps = [
    { num: "01", title: t.proc1, desc: t.proc1d, dur: t.proc1t },
    { num: "02", title: t.proc2, desc: t.proc2d, dur: t.proc2t },
    { num: "03", title: t.proc3, desc: t.proc3d, dur: t.proc3t },
    { num: "04", title: t.proc4, desc: t.proc4d, dur: t.proc4t },
  ];

  return (
    <section id="process" className={styles.section}>
      <SectionWatermark text={t.navProcess.toLowerCase()} number="/ 02" position="left" />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">{t.procEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                t.procTitle1,
                t.procTitle2,
                { text: t.procTitle3, className: styles.titleItalic },
              ]}
            />
          </h2>
        </div>
        <div className={styles.headerRight}>
          <Reveal delay={0.15}>
            <p className={styles.lead}>{t.procLead}</p>
          </Reveal>
        </div>
      </div>

      <div className={styles.grid}>
        {steps.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.1}>
            <div className={styles.step}>
              <div className={styles.numberWrap}>{step.num}</div>
              <span className={styles.duration}>{step.dur}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
