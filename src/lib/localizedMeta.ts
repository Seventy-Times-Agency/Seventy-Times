import type { Locale } from "@/i18n/config";

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
    ogImageAlt:
      "Seventy Times — Werbung, Automatisierung und KI-Bots als eine Wachstumsmaschine.",
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
  de: {
    title: "Datenschutzerklärung",
    description:
      "Wie Seventy Times Ihre Daten erhebt, verwendet und schützt. Ein ehrliches Minimum für die frühe Phase — wird mit einem Anwalt überarbeitet, sobald wir wachsen.",
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
  de: {
    title: "Nutzungsbedingungen",
    description:
      "Nutzungsbedingungen für seventy-times.com. Ein ehrliches Minimum für die frühe Phase — wird mit einem Anwalt überarbeitet, sobald wir wachsen.",
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
    title: "About — Seventy Times",
    description:
      "Who's behind Seventy Times: a remote-first AI + performance marketing studio that assembles ads, automation and AI bots into one growth machine for ambitious businesses.",
  },
  ru: {
    title: "О нас — Seventy Times",
    description:
      "Кто стоит за Seventy Times: распределённая команда AI и performance-маркетинга, которая собирает рекламу, автоматизацию и AI-ботов в единую машину роста для амбициозного бизнеса.",
  },
  de: {
    title: "Über uns — Seventy Times",
    description:
      "Wer hinter Seventy Times steht: ein verteiltes KI- und Performance-Marketing-Studio, das Werbung, Automatisierung und KI-Bots zu einer Wachstumsmaschine für ambitionierte Unternehmen verbindet.",
  },
  uk: {
    title: "Про нас — Seventy Times",
    description:
      "Хто стоїть за Seventy Times: розподілена команда AI та performance-маркетингу, що збирає рекламу, автоматизацію та AI-ботів у єдину машину росту для амбітного бізнесу.",
  },
};

export function getAboutMeta(locale: Locale): LegalMeta {
  return ABOUT[locale] ?? ABOUT.en;
}

const TEAM: Record<Locale, LegalMeta> = {
  en: {
    title: "Team — Seventy Times",
    description:
      "The people behind Seventy Times — full team bios coming soon.",
  },
  ru: {
    title: "Команда — Seventy Times",
    description:
      "Люди, которые стоят за Seventy Times — полные био команды появятся скоро.",
  },
  de: {
    title: "Team — Seventy Times",
    description:
      "Die Menschen hinter Seventy Times — vollständige Team-Profile folgen in Kürze.",
  },
  uk: {
    title: "Команда — Seventy Times",
    description:
      "Люди, які стоять за Seventy Times — повні біо команди з'являться скоро.",
  },
};

export function getTeamMeta(locale: Locale): LegalMeta {
  return TEAM[locale] ?? TEAM.en;
}
