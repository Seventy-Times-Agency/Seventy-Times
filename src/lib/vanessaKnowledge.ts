import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { SERVICES } from "@/data/services";
import { CASES } from "@/data/cases";
import { TEAM } from "@/data/team";
import { legalEntity } from "@/data/legalEntity";
import { siteConfig } from "@/data/siteConfig";

/**
 * Vanessa's knowledge base, assembled from the same content the site
 * renders (dictionary, services, cases, team, legal entity, contacts).
 * Editing the site updates what she knows — there is no second copy to
 * keep in sync. Behaviour rules stay in systemPrompt.ts.
 */

const clean = (s: string) => s.replace(/\s+/g, " ").trim();
const lines = (items: readonly string[]) => items.map((i) => `  - ${clean(i)}`).join("\n");

export function buildKnowledge(locale: Locale): string {
  const t = getDictionary(locale);
  const out: string[] = [];

  out.push(
    "# Knowledge base (generated from the live site — this is the source of truth)",
    `Content below is in the visitor's site language (${locale}). Use it for facts; never contradict it.`,
  );

  out.push(
    "\n## Company",
    `- ${legalEntity.name}, ${legalEntity.form}. ${legalEntity.address}.`,
    `- Brand: ${siteConfig.name} (${siteConfig.shortName}) — ${siteConfig.tagline}. Site: ${siteConfig.url}.`,
    `- Represented by: ${legalEntity.represented}.`,
    `- Public positioning (hero): ${clean(t.hxPain)} ${clean(t.hxPlain)}`,
    `- Trust line used on the site: ${clean(t.hxTrust)}`,
  );

  out.push("\n## Services");
  for (const s of SERVICES) {
    out.push(
      `### ${clean(t[s.i18n.title])} — ${clean(t[s.i18n.tag])} (${siteConfig.url}/${locale}/services/${s.slug})`,
      `- Included:\n${lines(t[s.i18n.inc])}`,
      `- Add-ons:\n${lines(t[s.i18n.add])}`,
      ...(t[s.i18n.note] ? [`- Note: ${clean(t[s.i18n.note] as string)}`] : []),
      `- Timeline: ${clean(t[s.i18n.timeline])}`,
      `- Ideal for: ${clean(t[s.i18n.ideal])}`,
    );
  }
  out.push(`- ${clean(t.svcReqLabel)}:\n${lines(t.svcReqItems)}`);

  out.push(
    "\n## How we start",
    `- ${clean(t.hsLead)}`,
    `- 1. ${clean(t.hs1)} (${clean(t.hs1t)}): ${clean(t.hs1d)}`,
    `- 2. ${clean(t.hs2)} (${clean(t.hs2t)}): ${clean(t.hs2d)}`,
    `- 3. ${clean(t.hs3)} (${clean(t.hs3t)}): ${clean(t.hs3d)}`,
  );

  out.push("\n## FAQ (exact site answers)");
  const faq = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
  for (const n of faq) {
    const q = t[`faq${n}q` as keyof typeof t] as string;
    const a = t[`faq${n}a` as keyof typeof t] as string;
    out.push(`- Q: ${clean(q)}\n  A: ${clean(a)}`);
  }

  out.push(
    "\n## Cases (the ONLY results you may cite — quote figures exactly as written, with their date/source)",
  );
  for (const c of CASES) {
    const st = c.study;
    const era = c.era === "early" ? " · early experience 2020–2021" : "";
    const parts = [
      `### ${clean(st.title[locale])} — ${clean(st.tag[locale])} · status: ${c.status}${era}${c.url ? ` · ${c.url}` : ""}`,
      `- ${clean(st.summary[locale])}`,
    ];
    if (st.metrics?.length) parts.push(`- Results: ${st.metrics.map((m) => clean(m[locale])).join("; ")}`);
    if (st.showcase) {
      parts.push(
        `- Start: ${clean(st.showcase.start[locale])}`,
        `- Finish: ${clean(st.showcase.finish[locale])}`,
      );
    }
    parts.push(`- Case page: ${siteConfig.url}/${locale}/cases/${c.id}`);
    out.push(...parts);
  }

  if (TEAM.length) {
    out.push("\n## Team");
    for (const m of TEAM) out.push(`- ${m.name} — ${m.role[locale]}. ${clean(m.bio[locale])}`);
  }

  const c = siteConfig.contacts;
  out.push(
    "\n## Contacts",
    `- Telegram (our support bot): ${c.telegram.handle} — ${c.telegram.url}`,
    `- WhatsApp / phone: ${c.phone.label}`,
    `- Email: ${c.email.address}; legal / privacy requests: ${legalEntity.email}`,
    `- Instagram ${c.instagram.url} · Facebook ${c.facebook.url} · LinkedIn ${c.linkedin.url}`,
    `- Legal pages: ${siteConfig.url}/${locale}/privacy · ${siteConfig.url}/${locale}/terms · ${siteConfig.url}/${locale}/imprint`,
  );

  return out.join("\n");
}
