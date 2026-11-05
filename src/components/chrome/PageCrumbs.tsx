import LegalCrumbs from "@/components/legal/LegalCrumbs";
import styles from "@/components/chrome/PageCrumbs.module.css";

/** Breadcrumb bar above a section page's first block, on the section grid. */
export default function PageCrumbs({ current }: { current: string }) {
  return (
    <div className={styles.wrap}>
      <LegalCrumbs current={current} />
    </div>
  );
}
