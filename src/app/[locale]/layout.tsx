import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/i18n/config";

// Statically pre-render every supported locale at build time.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // The actual <I18nProvider> lives in the root layout — it reads the
  // locale from the `x-locale` header set by middleware so the SSR'd
  // <html lang>, metadata, and rendered content all line up. This nested
  // layout exists only to validate the URL segment and to give Next.js
  // a place to attach generateStaticParams.
  if (!isLocale(params.locale)) notFound();
  return <>{children}</>;
}
