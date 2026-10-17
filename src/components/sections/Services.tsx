"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import { SERVICES } from "@/data/services";
import ServiceVisual from "@/components/sections/services/ServiceVisual";
import { SERVICE_ICONS } from "@/components/ui/ServiceIcons";
import { FLOW, FLOW_COPY } from "@/components/sections/services/flow";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Services.module.css";

export default function Services() {
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
      <div className={styles.header}>
        <div>
          <Reveal>
            <span className="eyebrow">{t.svcEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText words={[t.svcMTitle1]} />
            <span className={styles.titleLine}>
              <AnimatedText words={[{ text: t.svcMTitle2, className: "neonOutline" }]} />
            </span>
          </h2>
        </div>
        <Reveal delay={0.15}>
          <p className={styles.lead}>{t.svcMLead}</p>
        </Reveal>
      </div>

      {/* Phones: four short rows, each straight to its service page. */}
      <ol className={styles.mobileList}>
        {modules.map((m, i) => {
          const Icon = SERVICE_ICONS[m.key];
          return (
            <li key={m.key}>
              <Link href={m.href} className={styles.mobileRow}>
                <span className={styles.mobileIcon}>
                  <Icon />
                </span>
                <span className={styles.mobileText}>
                  <span className={styles.mobileRole}>
                    {String(i + 1).padStart(2, "0")} · {m.role}
                  </span>
                  <b>{m.title}</b>
                  <span className={styles.mobilePitch}>{m.pitch}</span>
                </span>
                <i aria-hidden="true">→</i>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className={styles.conveyor}>
        {/* The pipe and the lead travelling through it. */}
        <div className={styles.pipe} aria-hidden="true">
          <span className={styles.pulse} />
        </div>

        <div className={styles.modules}>
          {modules.map((m, i) => (
            <Reveal key={m.key} delay={i * 0.08}>
              <article className={styles.module} style={{ ["--i" as string]: i }}>
                {m.key === "targeting" && (
                  <span className={styles.sticker}>{t.svcAdsSticker}</span>
                )}
                <div className={styles.visWrap}>
                  <span className={styles.role}>
                    <b>{String(i + 1).padStart(2, "0")}</b> · {m.role}
                  </span>
                  <ServiceVisual kind={m.key} t={t} />
                </div>

                <div className={styles.body}>
                  <h3 className={styles.moduleTitle}>{m.title}</h3>
                  <p className={styles.pitch}>{m.pitch}</p>
                  <ul className={styles.points}>
                    {m.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>

                <Link href={m.href} className={styles.more}>
                  {t.svcExpand}
                  <i aria-hidden="true">→</i>
                </Link>
                <span className={styles.bigNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className={styles.output}>
            <span className={styles.outputArrow} aria-hidden="true">
              ↓
            </span>
            <div>
              <p className={styles.outputTitle}>{t.svcOutTitle}</p>
              <p className={styles.outputBody}>{t.svcOutBody}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className={styles.extras}>
          <span className={styles.extrasLabel}>{t.svcReqLabel}</span>
          <ul className={styles.extrasList}>
            {t.svcReqItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className={styles.footnote}>{t.svcFootnote}</p>
      </Reveal>
    </section>
  );
}
