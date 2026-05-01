"use client";

import { type MouseEvent } from "react";
import { SERVICE_ICONS } from "@/components/ui/ServiceIcons";
import styles from "@/components/sections/Services.module.css";

export type ServiceCardData = {
  key: string;
  slug: string;
  title: string;
  tagline: string;
  note: string | null;
};

type Props = {
  index: number;
  service: ServiceCardData;
  isActive: boolean;
  onToggle: () => void;
  expandLabel: string;
  collapseLabel: string;
};

/**
 * Single service tile on the landing grid. The card itself is a
 * keyboard-accessible toggle that opens the expanded details panel
 * below the grid; a fake "spotlight" follows the cursor via two
 * CSS custom properties for a subtle hover sheen.
 */
export default function ServiceCard({
  index,
  service,
  isActive,
  onToggle,
  expandLabel,
  collapseLabel,
}: Props) {
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
