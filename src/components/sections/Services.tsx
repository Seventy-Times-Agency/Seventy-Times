"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import { SERVICE_ICONS } from "@/components/ui/ServiceIcons";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/Services.module.css";

export default function Services() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const { t } = useT();

  const services = [
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

  return (
    <section id="services" className={styles.section}>
      <SectionWatermark text={t.navServices.toLowerCase()} number="/ 01" position="right" />

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
        {services.map((service, i) => {
          const isOpen = openKey === service.key;
          return (
            <Reveal key={service.key} delay={i * 0.08}>
              <ServiceCard
                index={i + 1}
                service={service}
                isOpen={isOpen}
                onToggle={() =>
                  setOpenKey((prev) =>
                    prev === service.key ? null : service.key
                  )
                }
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

type ServiceData = {
  key: string;
  title: string;
  tagline: string;
  note: string | null;
  includes: readonly string[];
  addons: readonly string[];
};

function ServiceCard({
  index,
  service,
  isOpen,
  onToggle,
}: {
  index: number;
  service: ServiceData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { t } = useT();
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
      className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}
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
      aria-expanded={isOpen}
    >
      <div className={styles.number}>
        <span>/ {num}</span>
        {Icon && (
          <span className={styles.iconBox}>
            <Icon className={styles.iconSvg} />
          </span>
        )}
      </div>

      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.tagline}>{service.tagline}</p>
      {service.note && <span className={styles.note}>{service.note}</span>}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            className={styles.details}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className={styles.detailsInner}>
              <div className={styles.divider} />
              <div className={styles.listLabel}>{t.svcIncludes}</div>
              <ul className={styles.list}>
                {service.includes.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.bullet}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.divider} />
              <div className={styles.listLabel}>{t.svcAddons}</div>
              <ul className={styles.list}>
                {service.addons.map((item) => (
                  <li
                    key={item}
                    className={`${styles.listItem} ${styles.muted}`}
                  >
                    <span className={`${styles.bullet} ${styles.bulletMuted}`}>
                      +
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.toggleRow}>
        <span>{isOpen ? t.svcCollapse : t.svcExpand}</span>
        <span className={styles.toggleArrow} aria-hidden="true">
          ↓
        </span>
      </div>
    </div>
  );
}
