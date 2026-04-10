"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, type Service } from "@/data/services";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import styles from "./Services.module.css";

export default function Services() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section id="services" className={styles.section}>
      <SectionWatermark text="services" number="/ 01" position="right" />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Reveal>
            <span className="eyebrow">— Services / 2026</span>
          </Reveal>
          <h2 className={styles.title}>
            <AnimatedText
              words={[
                "Что",
                "мы",
                { text: "делаем", className: styles.titleItalic },
              ]}
            />
          </h2>
        </div>
        <div className={styles.headerRight}>
          <Reveal delay={0.15}>
            <p className={styles.lead}>
              Три направления, которые вместе работают как одна машина роста.
              Нажмите на карточку, чтобы увидеть детали.
            </p>
          </Reveal>
        </div>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((service, i) => (
          <Reveal key={service.key} delay={i * 0.08}>
            <ServiceCard
              index={i + 1}
              service={service}
              isOpen={openKey === service.key}
              onToggle={() =>
                setOpenKey((prev) => (prev === service.key ? null : service.key))
              }
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  index,
  service,
  isOpen,
  onToggle,
}: {
  index: number;
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  };

  const num = String(index).padStart(2, "0");

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
        <span className={styles.icon}>{service.icon}</span>
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
              <div className={styles.listLabel}>Что входит</div>
              <ul className={styles.list}>
                {service.includes.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.bullet}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.divider} />
              <div className={styles.listLabel}>+ Можно добавить</div>
              <ul className={styles.list}>
                {service.addons.map((item) => (
                  <li key={item} className={`${styles.listItem} ${styles.muted}`}>
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
        <span>{isOpen ? "Свернуть" : "Подробнее"}</span>
        <span className={styles.toggleArrow} aria-hidden="true">
          ↓
        </span>
      </div>
    </div>
  );
}
