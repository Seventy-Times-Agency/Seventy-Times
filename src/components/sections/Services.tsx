"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { SERVICE_ICONS } from "@/components/ui/ServiceIcons";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Services.module.css";

type ServiceData = {
  key: string;
  title: string;
  tagline: string;
  note: string | null;
  includes: readonly string[];
  addons: readonly string[];
};

export default function Services() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { t } = useT();

  const services: ServiceData[] = [
    {
      key: "targeting",
      title: t.svc1Title,
      tagline: t.svc1Tag,
      note: t.svc1Note,
      includes: t.svc1Inc,
      addons: t.svc1Add,
    },
    {
      key: "automation",
      title: t.svc2Title,
      tagline: t.svc2Tag,
      note: t.svc2Note,
      includes: t.svc2Inc,
      addons: t.svc2Add,
    },
    {
      key: "aibot",
      title: t.svc3Title,
      tagline: t.svc3Tag,
      note: t.svc3Note,
      includes: t.svc3Inc,
      addons: t.svc3Add,
    },
    {
      key: "sites",
      title: t.svc4Title,
      tagline: t.svc4Tag,
      note: t.svc4Note,
      includes: t.svc4Inc,
      addons: t.svc4Add,
    },
  ];

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ServiceCard({
  index,
  service,
  isActive,
  onToggle,
  expandLabel,
  collapseLabel,
}: {
  index: number;
  service: ServiceData;
  isActive: boolean;
  onToggle: () => void;
  expandLabel: string;
  collapseLabel: string;
}) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  };

  const num = String(index).padStart(2, "0");
  const Icon = SERVICE_ICONS[service.key];

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
      onClick={onToggle}
      onMouseMove={handleMove}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={isActive}
    >
      <span className={styles.cornerTL} aria-hidden="true" />
      <span className={styles.cornerBR} aria-hidden="true" />

      <div className={styles.cardHead}>
        <span className={styles.cardNum}>/ {num}</span>
        {Icon && (
          <span className={styles.iconBox}>
            <Icon className={styles.iconSvg} />
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.tagline}>{service.tagline}</p>
        {service.note && <span className={styles.note}>{service.note}</span>}
      </div>

      <div className={styles.toggleRow}>
        <span>{isActive ? collapseLabel : expandLabel}</span>
        <span className={styles.toggleArrow} aria-hidden="true">
          ↓
        </span>
      </div>
    </div>
  );
}
