"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import ServiceCard from "@/components/sections/services/ServiceCard";
import { SERVICES } from "@/data/services";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Services.module.css";

type ServiceData = {
  key: string;
  slug: string;
  title: string;
  tagline: string;
  note: string | null;
  includes: readonly string[];
  addons: readonly string[];
};

export default function Services() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { t, localePath } = useT();

  const services: ServiceData[] = SERVICES.map((s) => ({
    key: s.key,
    slug: s.slug,
    title: t[s.i18n.title],
    tagline: t[s.i18n.tag],
    note: t[s.i18n.note],
    includes: t[s.i18n.inc],
    addons: t[s.i18n.add],
  }));

  const activeService = services.find((s) => s.key === activeKey) ?? null;

  return (
    <section id="services" className={styles.section}>
      <SectionWatermark
        text={t.navServices.toLowerCase()}
        number="/ 01"
        position="right"
      />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">{t.svcEyebrow}</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                t.svcTitle1,
                t.svcTitle2,
                { text: t.svcTitle3, className: styles.titleItalic },
              ]}
            />
          </h2>
        </div>
        <div className={styles.headerRight}>
          <Reveal delay={0.15}>
            <p className={styles.lead}>{t.svcLead}</p>
          </Reveal>
        </div>
      </div>

      <div className={styles.grid}>
        {services.map((service, i) => (
          <Reveal key={service.key} delay={i * 0.06}>
            <ServiceCard
              index={i + 1}
              service={service}
              isActive={activeKey === service.key}
              onToggle={() =>
                setActiveKey((prev) =>
                  prev === service.key ? null : service.key,
                )
              }
              expandLabel={t.svcExpand}
              collapseLabel={t.svcCollapse}
            />
          </Reveal>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {activeService && (
          <motion.div
            key={activeService.key}
            className={styles.detailsPanel}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className={styles.detailsInner}>
              <header className={styles.detailsHeader}>
                <div className={styles.detailsLabel}>
                  <span className={styles.detailsKicker}>
                    / 0
                    {services.findIndex((s) => s.key === activeService.key) + 1}
                  </span>
                  <h3 className={styles.detailsTitle}>{activeService.title}</h3>
                </div>
                <button
                  className={styles.detailsClose}
                  onClick={() => setActiveKey(null)}
                  type="button"
                  aria-label={t.svcCollapse}
                >
                  {t.svcCollapse} <span aria-hidden="true">×</span>
                </button>
              </header>

              <div className={styles.detailsCols}>
                <div className={styles.detailsCol}>
                  <span className={styles.detailsColLabel}>
                    {t.svcIncludes}
                  </span>
                  <ul className={styles.detailsList}>
                    {activeService.includes.map((item) => (
                      <li key={item} className={styles.detailsItem}>
                        <span className={styles.detailsBullet} aria-hidden="true">
                          →
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.detailsCol}>
                  <span className={styles.detailsColLabel}>
                    {t.svcAddons}
                  </span>
                  <ul className={styles.detailsList}>
                    {activeService.addons.map((item) => (
                      <li
                        key={item}
                        className={`${styles.detailsItem} ${styles.detailsItemMuted}`}
                      >
                        <span
                          className={`${styles.detailsBullet} ${styles.detailsBulletMuted}`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={localePath(`/services/${activeService.slug}`)}
                className={styles.detailsCta}
              >
                {t.svcReadMore} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
