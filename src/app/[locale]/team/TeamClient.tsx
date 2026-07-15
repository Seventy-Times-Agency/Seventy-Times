"use client";

import Link from "next/link";
import Image from "next/image";
import { useT } from "@/i18n/context";
import { TEAM } from "@/data/team";
import legal from "@/components/legal/LegalPage.module.css";
import styles from "./TeamClient.module.css";

export default function TeamClient() {
  const { t, locale, localePath } = useT();
  const home = localePath("/");

  return (
    <main className={legal.main}>
      <div className={legal.inner}>
        <Link href={home} className={legal.back}>
          {t.legalBack}
        </Link>

        <h1 className={legal.title}>{t.teamTitle}</h1>
        <p className={legal.updated}>{t.teamLead}</p>

        {TEAM.length === 0 ? (
          <p className={legal.updated} style={{ marginTop: 12 }}>
            {t.teamPlaceholder}
          </p>
        ) : (
          <ul className={styles.grid}>
            {TEAM.map((member) => (
              <li key={member.id} className={styles.card}>
                {member.photo && (
                  <span className={styles.avatar}>
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="88px"
                      className={styles.avatarImg}
                    />
                  </span>
                )}
                <h2 className={styles.name}>{member.name}</h2>
                <p className={styles.role}>{member.role[locale]}</p>
                <p className={styles.bio}>{member.bio[locale]}</p>
                {member.linkedin && (
                  <a
                    className={styles.link}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn <span aria-hidden="true">→</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}

        <Link href={home} className={legal.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
