"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import { siteConfig } from "@/data/siteConfig";
import styles from "@/components/legal/LegalPage.module.css";

export default function LegalCrumbs({ current }: { current: string }) {
  const { t, localePath } = useT();
  return (
    <nav className={styles.breadcrumbs} aria-label={t.casesBreadcrumbs}>
      <Link href={localePath("/")}>{siteConfig.shortName}</Link>
      <span aria-hidden="true">›</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
