"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { SERVICES } from "@/data/services";
import ServiceVisual from "@/components/sections/services/ServiceVisual";
import { FLOW, FLOW_COPY } from "@/components/sections/services/flow";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Services.module.css";

type Props = {
  /** Landing version: cards without the checklists, then a link to /services. */
  teaser?: boolean;
  /** /services opens with this section, so its title is the page's h1. */
  titleAs?: "h1" | "h2";
};

export default function Services({ teaser = false, titleAs: Title = "h2" }: Props) {
  const { t, localePath } = useT();

  const modules = FLOW.map((key) => {
    const s = SERVICES.find((x) => x.key === key)!;
    return {
      key,
      href: localePath(`/services/${s.slug}`),
      title: t[s.i18n.title],
      role: t[FLOW_COPY[key].role],
      pitch: t[FLOW_COPY[key].pitch],
      points: t[FLOW_COPY[key].points],
    };
  });

  return (
    <section id="services" className={styles.section}>
      <SectionWatermark text={t.navServices.toLowerCase()} number="/ 02" position="right" />

      <div className={styles.header}>
        <div>
          <Reveal>
            <span className="eyebrow">{t.svcEyebrow}</span>
          </Reveal>
          <Title className={styles.title}>
            <AnimatedText
              words={[t.svcMTitle1, { text: t.svcMTitle2, className: "neonOutline" }]}
            />
          </Title>
        </div>
        <Reveal delay={0.15}>
          <p className={styles.lead}>{t.svcMLead}</p>
        </Reveal>
      </div>

      <div className={`${styles.modules}${teaser ? ` ${styles.modulesTeaser}` : ""}`}>
        {modules.map((m, i) => (
          <Reveal key={m.key} delay={i * 0.08} className={styles.slot}>
            <article className={styles.module}>
              {/* The picture unfolds over the text on hover; its slot in the
                  layout keeps its size, so the row around it never moves. */}
              <div className={styles.visSlot}>
                <div className={styles.visWrap}>
                  <span className={styles.role}>
                    <b>{String(i + 1).padStart(2, "0")}</b> · {m.role}
                  </span>
                  <ServiceVisual kind={m.key} t={t} />
                </div>
              </div>

              <div className={styles.bodyClip}>
                <div className={styles.body}>
                  <h3 className={styles.moduleTitle}>{m.title}</h3>
                  <p className={styles.pitch}>{m.pitch}</p>
                  {!teaser && (
                    <ul className={styles.points}>
                      {m.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <Link href={m.href} className={styles.more}>
                {t.svcExpand}
                <i aria-hidden="true">→</i>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      {teaser ? (
        <Reveal delay={0.1}>
          <Link href={localePath("/services")} className={styles.all}>
            {t.svcAll}
            <i aria-hidden="true">→</i>
          </Link>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <div className={styles.extras}>
            <span className={styles.extrasLabel}>{t.svcReqLabel}</span>
            <ul className={styles.extrasList}>
              {t.svcReqItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </section>
  );
}
