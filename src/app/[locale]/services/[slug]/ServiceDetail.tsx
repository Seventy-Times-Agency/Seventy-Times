"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import { siteConfig } from "@/data/siteConfig";
import { SERVICES, type ServiceItem } from "@/data/services";
import Reveal from "@/components/ui/Reveal";
import ServiceVisual from "@/components/sections/services/ServiceVisual";
import { FLOW, FLOW_COPY, flowNumber } from "@/components/sections/services/flow";
import styles from "./ServiceDetail.module.css";

type Props = {
  item: ServiceItem;
};

export default function ServiceDetail({ item }: Props) {
  const { t, localePath } = useT();
  const home = localePath("/");

  const title = t[item.i18n.title];
  const note = t[item.i18n.note];
  const includes = t[item.i18n.inc];
  const addons = t[item.i18n.add];
  const timeline = t[item.i18n.timeline];
  const ideal = t[item.i18n.ideal];
  const copy = FLOW_COPY[item.key];

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumbs} aria-label={t.casesBreadcrumbs}>
          <Link href={home}>{siteConfig.shortName}</Link>
          <span aria-hidden="true">›</span>
          <Link href={`${home}#services`}>{t.navServices}</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{title}</span>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.role}>
              <b>{flowNumber(item.key)}</b> · {t[copy.role]}
            </span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.pitch}>{t[copy.pitch]}</p>
            {note && <span className={styles.note}>{note}</span>}
            <div className={styles.ctas}>
              <Link href={`${home}#lead`} className={styles.primary}>
                {t.hxCtaBrief}
                <i aria-hidden="true">↗</i>
              </Link>
              <Link href={`${home}#cases`} className={styles.secondary}>
                {t.svcDetailSecondaryCta}
              </Link>
            </div>
          </div>

          <div className={styles.stage}>
            <span className={`${styles.cross} ${styles.crossTL}`} />
            <span className={`${styles.cross} ${styles.crossTR}`} />
            <span className={`${styles.cross} ${styles.crossBL}`} />
            <span className={`${styles.cross} ${styles.crossBR}`} />
            <div className={styles.stageInner}>
              <ServiceVisual kind={item.key} t={t} size="lg" />
            </div>
            {item.key === "targeting" && (
              <span className={styles.sticker}>{t.svcAdsSticker}</span>
            )}
          </div>
        </section>

        {/* ── Timing + fit ── */}
        <Reveal>
          <dl className={styles.facts}>
            <div className={styles.factPressed}>
              <dt>{t.svcTimelineLabel}</dt>
              <dd>{timeline}</dd>
            </div>
            <div className={styles.factRaised}>
              <dt>{t.svcIdealLabel}</dt>
              <dd>{ideal}</dd>
            </div>
          </dl>
        </Reveal>

        {/* ── What's included ── */}
        <section className={styles.block}>
          <h2 className={styles.label}>{t.svcIncludes}</h2>
          <div className={styles.includes}>
            {includes.map((entry, i) => (
              <Reveal key={entry} delay={i * 0.05}>
                <div className={styles.include}>
                  <span className={styles.includeNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{entry}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Add-ons ── */}
        <section className={styles.block}>
          <h2 className={styles.label}>{t.svcAddons}</h2>
          <ul className={styles.addons}>
            {addons.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </section>

        {/* ── Position in the machine ── */}
        <section className={styles.block}>
          <h2 className={styles.label}>{t.svcDetailMachine}</h2>
          <div className={styles.machine}>
            {FLOW.map((key) => {
              const s = SERVICES.find((x) => x.key === key)!;
              const current = key === item.key;
              const inner = (
                <>
                  <span className={styles.machineNum}>{flowNumber(key)}</span>
                  <span className={styles.machineTitle}>{t[s.i18n.title]}</span>
                  <span className={styles.machineRole}>
                    {current ? t.svcDetailHere : t[FLOW_COPY[key].role]}
                  </span>
                </>
              );
              return current ? (
                <div key={key} className={`${styles.machineStep} ${styles.machineCurrent}`} aria-current="page">
                  {inner}
                </div>
              ) : (
                <Link key={key} href={localePath(`/services/${s.slug}`)} className={styles.machineStep}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <Reveal>
          <div className={styles.cta}>
            <div>
              <p className={styles.ctaTitle}>{t.svcDetailCtaTitle}</p>
              <p className={styles.ctaBody}>{t.svcDetailCtaBody}</p>
            </div>
            <Link href={`${home}#lead`} className={styles.ctaBtn}>
              {t.hxCtaBrief} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
