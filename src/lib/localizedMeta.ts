import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LANG,
  type Locale,
} from "@/i18n/config";
import { siteConfig } from "@/data/siteConfig";

/**
 * hreflang alternates for a page, keyed by ISO 639-1 language code
 * (see LOCALE_LANG), with x-default
 * pointing at the English version. `path` is the locale-less suffix,
 * e.g. "" for the landing or "/cases/convioo".
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[LOCALE_LANG[l]] = `${siteConfig.url}/${l}${path}`;
  }
  languages["x-default"] = `${siteConfig.url}/${DEFAULT_LOCALE}${path}`;
  return languages;
}

type LocaleMeta = {
  description: string;
  keywords: string[];
  ogLocale: string;
  ogImageAlt: string;
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
    ogImageAlt:
      "Seventy Times — ads, automation and AI bots assembled into one growth machine.",
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
    ogImageAlt:
      "Seventy Times — реклама, автоматизация и AI-боты, собранные в одну машину роста.",
  },
  uk: {
    description:
      "Seventy Times перетворює AI та digital-маркетинг на передбачуваний потік кваліфікованих клієнтів: реклама, автоматизація та розумні боти — все працює на одну метрику: ваше зростання.",
    keywords: [
      "Seventy Times",
      "AI агентство",
      "маркетингове агентство",
      "таргетована реклама",
      "автоматизація бізнесу",
      "AI-бот",
      "чат-бот",
      "performance маркетинг",
      "Meta реклама",
      "Google реклама",
      "Claude",
    ],
    ogLocale: "uk_UA",
    ogImageAlt:
      "Seventy Times — реклама, автоматизація та AI-боти, зібрані в одну машину росту.",
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
  uk: {
    title: "Політика конфіденційності",
    description:
      "Як Seventy Times збирає, використовує та захищає ваші дані. Чесний мінімум для ранньої стадії — буде переглянутий з юристом у міру зростання.",
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
  uk: {
    title: "Умови використання",
    description:
      "Умови використання сайту seventy-times.com. Чесний мінімум для ранньої стадії — буде переглянутий з юристом у міру зростання.",
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
    title: "About",
    description:
      "Who's behind Seventy Times: a remote-first AI + performance marketing studio that assembles ads, automation and AI bots into one growth machine for ambitious businesses.",
  },
  ru: {
    title: "О нас",
    description:
      "Кто стоит за Seventy Times: распределённая команда AI и performance-маркетинга, которая собирает рекламу, автоматизацию и AI-ботов в единую машину роста для амбициозного бизнеса.",
  },
  uk: {
    title: "Про нас",
    description:
      "Хто стоїть за Seventy Times: розподілена команда AI та performance-маркетингу, що збирає рекламу, автоматизацію та AI-ботів у єдину машину росту для амбітного бізнесу.",
  },
};

export function getAboutMeta(locale: Locale): LegalMeta {
  return ABOUT[locale] ?? ABOUT.en;
}

const TEAM: Record<Locale, LegalMeta> = {
  en: {
    title: "Team",
    description:
      "The people behind Seventy Times — full team bios coming soon.",
  },
  ru: {
    title: "Команда",
    description:
      "Люди, которые стоят за Seventy Times — полные био команды появятся скоро.",
  },
  uk: {
    title: "Команда",
    description:
      "Люди, які стоять за Seventy Times — повні біо команди з'являться скоро.",
  },
};

export function getTeamMeta(locale: Locale): LegalMeta {
  return TEAM[locale] ?? TEAM.en;
}

const IMPRINT: Record<Locale, LegalMeta> = {
  en: {
    title: "Legal Notice",
    description:
      "Provider identification and international data-transfer basis for seventy-times.com — to be finalized with legal counsel.",
  },
  ru: {
    title: "Правовая информация",
    description:
      "Идентификация поставщика услуг и основание международной передачи данных для seventy-times.com — будет доработано с юристом.",
  },
  uk: {
    title: "Правова інформація",
    description:
      "Ідентифікація постачальника послуг та підстава міжнародної передачі даних для seventy-times.com — буде доопрацьовано з юристом.",
  },
};

export function getImprintMeta(locale: Locale): LegalMeta {
  return IMPRINT[locale] ?? IMPRINT.en;
}
