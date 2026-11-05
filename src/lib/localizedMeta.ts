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
      "AI assistant",
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
      "AI",
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
      "AI",
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

const SERVICES_PAGE: Record<Locale, LegalMeta> = {
  en: {
    title: "Services",
    description:
      "Websites and SEO, Meta and Google ads, an AI consultant and lead automation: what each module includes and how they work together.",
  },
  ru: {
    title: "Услуги",
    description:
      "Сайты и SEO, реклама в Meta и Google, AI-консультант и автоматизация заявок: что входит в каждый модуль и как они работают вместе.",
  },
  uk: {
    title: "Послуги",
    description:
      "Сайти та SEO, реклама в Meta і Google, AI-консультант та автоматизація заявок: що входить у кожен модуль і як вони працюють разом.",
  },
};

export function getServicesMeta(locale: Locale): LegalMeta {
  return SERVICES_PAGE[locale] ?? SERVICES_PAGE.en;
}

const CASES_PAGE: Record<Locale, LegalMeta> = {
  en: {
    title: "Work",
    description:
      "Seventy Times projects in e-commerce, local services, transport and tourism: where each client started, what we did and the numbers we got.",
  },
  ru: {
    title: "Кейсы",
    description:
      "Проекты Seventy Times в e-commerce, услугах, перевозках и туризме: откуда клиент стартовал, что мы сделали и какие цифры получили.",
  },
  uk: {
    title: "Кейси",
    description:
      "Проєкти Seventy Times в e-commerce, послугах, перевезеннях і туризмі: звідки клієнт стартував, що ми зробили та які цифри отримали.",
  },
};

export function getCasesMeta(locale: Locale): LegalMeta {
  return CASES_PAGE[locale] ?? CASES_PAGE.en;
}

const PROCESS_PAGE: Record<Locale, LegalMeta> = {
  en: {
    title: "How we work",
    description:
      "The stages from launch to scaling, a comparison with an agency and a freelancer, our AI consultant Vanessa and answers to common questions.",
  },
  ru: {
    title: "Как мы работаем",
    description:
      "Этапы от запуска до масштабирования, сравнение с агентством и фрилансером, AI-консультант Ванесса и ответы на частые вопросы.",
  },
  uk: {
    title: "Як ми працюємо",
    description:
      "Етапи від запуску до масштабування, порівняння з агентством і фрилансером, AI-консультантка Ванесса та відповіді на часті запитання.",
  },
};

export function getProcessMeta(locale: Locale): LegalMeta {
  return PROCESS_PAGE[locale] ?? PROCESS_PAGE.en;
}

const FAQ_PAGE: Record<Locale, LegalMeta> = {
  en: {
    title: "FAQ",
    description: "Pricing, who pays for ads, timelines, contracts and payment: what clients ask before starting.",
  },
  ru: {
    title: "Частые вопросы",
    description: "Цена, кто платит за рекламу, сроки, договор и оплата: что спрашивают перед стартом.",
  },
  uk: {
    title: "Часті запитання",
    description: "Ціна, хто платить за рекламу, строки, договір і оплата: що запитують перед стартом.",
  },
};

export function getFaqMeta(locale: Locale): LegalMeta {
  return FAQ_PAGE[locale] ?? FAQ_PAGE.en;
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
