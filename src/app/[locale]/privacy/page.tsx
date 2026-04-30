import type { Metadata } from "next";
import { getPrivacyMeta } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import PrivacyClient from "./PrivacyClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getPrivacyMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default function Page() {
  return <PrivacyClient />;
}
