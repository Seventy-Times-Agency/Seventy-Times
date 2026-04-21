import type { Metadata } from "next";
import { getPrivacyMeta, readLocaleFromCookies } from "@/lib/localizedMeta";
import PrivacyClient from "./PrivacyClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = readLocaleFromCookies();
  const meta = getPrivacyMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/privacy" },
  };
}

export default function Page() {
  return <PrivacyClient />;
}
