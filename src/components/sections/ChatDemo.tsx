"use client";

import VanessaMark from "@/components/ui/VanessaMark";
import Reveal from "@/components/ui/Reveal";
import { useT } from "@/i18n/context";
import styles from "@/components/sections/ChatDemo.module.css";

export default function ChatDemo() {
  const { t } = useT();

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat"));
  };

  return (
    <section id="chat" className={styles.section}>
      <Reveal>
        <div className={styles.band}>
          <div className={styles.avatar}>
            <VanessaMark title={t.chatAlt} />
            <span className={styles.dot} aria-hidden="true" />
          </div>

          <div className={styles.copy}>
            <span className="eyebrow">{t.venEyebrow}</span>
            <h2 className={styles.title}>
              {t.venTitle1} {t.venTitle2}{" "}
              <span className={styles.titleAccent}>{t.venTitle3}</span>
            </h2>
            <p className={styles.lead}>{t.venLead}</p>
          </div>

          <button type="button" className={styles.cta} onClick={openChat}>
            {t.venCta} <span aria-hidden="true">→</span>
          </button>
        </div>
      </Reveal>
    </section>
  );
}
