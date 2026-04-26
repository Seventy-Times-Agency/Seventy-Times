import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

export function readLocaleFromCookies(): Locale {
  const saved = cookies().get("lang")?.value;
  return (LOCALES as readonly string[]).includes(saved ?? "")
    ? (saved as Locale)
    : DEFAULT_LOCALE;
}

type LocaleMeta = {
  description: string;
  keywords: string[];
  ogLocale: string;
};

const META: Record<Locale, LocaleMeta> = {
  en: {
    description:
      "Seventy Times turns AI and performance marketing into a predictable stream of qualified clients — ads, automation, and smart bots built around your growth.",
    keywords: [
      "Seventy Times",
      "AI marketing agency",
      "performance marketing",
      "marketing automation",
      "AI chatbot",
      "digital marketing",
      "targeted advertising",
      "Meta ads",
      "Google ads",
      "Claude AI",
    ],
    ogLocale: "en_US",
  },
  ru: {
    description:
      "Seventy Times превращает AI и digital-маркетинг в предсказуемый поток квалифицированных клиентов: реклама, автоматизация и умные боты — всё работает на одну метрику: ваш рост.",
    keywords: [
      "Seventy Times",
      "AI агентство",
      "маркетинговое агентство",
      "таргетированная реклама",
      "автоматизация бизнеса",
      "AI-бот",
      "чат-бот",
      "performance маркетинг",
      "Meta реклама",
      "Google реклама",
      "Claude",
    ],
    ogLocale: "ru_RU",
  },
  de: {
    description:
      "Seventy Times verwandelt KI und Performance-Marketing in einen planbaren Strom qualifizierter Kunden — Werbung, Automatisierung und smarte Bots, ausgerichtet auf Ihr Wachstum.",
    keywords: [
      "Seventy Times",
      "KI-Marketing-Agentur",
      "Performance Marketing",
      "Marketing-Automatisierung",
      "KI-Chatbot",
      "Digital Marketing",
      "Zielgerichtete Werbung",
      "Meta Ads",
      "Google Ads",
      "Claude KI",
    ],
    ogLocale: "de_DE",
  },
};

export function getLocaleMeta(locale: Locale): LocaleMeta {
  return META[locale] ?? META.en;
}

type LegalMeta = {
  title: string;
  description: string;
};

const PRIVACY: Record<Locale, LegalMeta> = {
  en: {
    title: "Privacy Policy",
    description:
      "How Seventy Times collects, uses, and protects your data. An honest minimum for the early stage — to be revised with legal counsel as we grow.",
  },
  ru: {
    title: "Политика конфиденциальности",
    description:
      "Как Seventy Times собирает, использует и защищает ваши данные. Честный минимум для ранней стадии — будет пересмотрен с юристом по мере роста.",
  },
  de: {
    title: "Datenschutzerklärung",
    description:
      "Wie Seventy Times Ihre Daten erhebt, verwendet und schützt. Ein ehrliches Minimum für die frühe Phase — wird mit einem Anwalt überarbeitet, sobald wir wachsen.",
  },
};

const TERMS: Record<Locale, LegalMeta> = {
  en: {
    title: "Terms of Use",
    description:
      "Terms of use for seventy-times.com. An honest minimum for the early stage — to be revised with legal counsel as we grow.",
  },
  ru: {
    title: "Условия использования",
    description:
      "Условия использования сайта seventy-times.com. Честный минимум для ранней стадии — будет пересмотрен с юристом по мере роста.",
  },
  de: {
    title: "Nutzungsbedingungen",
    description:
      "Nutzungsbedingungen für seventy-times.com. Ein ehrliches Minimum für die frühe Phase — wird mit einem Anwalt überarbeitet, sobald wir wachsen.",
  },
};

export function getPrivacyMeta(locale: Locale): LegalMeta {
  return PRIVACY[locale] ?? PRIVACY.en;
}

export function getTermsMeta(locale: Locale): LegalMeta {
  return TERMS[locale] ?? TERMS.en;
}

const ABOUT: Record<Locale, LegalMeta> = {
  en: {
    title: "About — Seventy Times",
    description:
      "Who's behind Seventy Times — the team, the principles, and how we built the agency.",
  },
  ru: {
    title: "О нас — Seventy Times",
    description:
      "Кто стоит за Seventy Times — команда, принципы и как мы выстраивали агентство.",
  },
  de: {
    title: "Über uns — Seventy Times",
    description:
      "Wer hinter Seventy Times steht — das Team, die Prinzipien und wie wir die Agentur aufgebaut haben.",
  },
};

export function getAboutMeta(locale: Locale): LegalMeta {
  return ABOUT[locale] ?? ABOUT.en;
}
