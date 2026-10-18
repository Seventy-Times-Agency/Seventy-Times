// Entry-offer landing page for ad traffic (/go/brief). The paid audit
// offer (/go/audit) was retired in Oct 2026 — that URL now redirects here.
//
// SINGLE SOURCE OF TRUTH for both offers: headlines, bullets, prices
// and CTA copy live here — changing the offer means editing this file,
// never digging through components. The pages themselves are thin
// shells around this config.
//
// Rules these pages live by (knowledge-base doc 12 §4.1):
//   - They sit OUTSIDE the navigation and OUTSIDE the sitemap, and are
//     noindexed — traffic arrives only from ads and from the sales team.
//   - No prices anywhere on the site.
//   - Every lead from these pages is tagged (landing=audit|brief) so the
//     source reaches Telegram with the lead.

import type { Locale } from "@/i18n/config";

type Loc = Record<Locale, string>;

export type OfferVariant = "brief";

export type Offer = {
  /** Tag stored with the lead (utm-style `landing` key). */
  id: OfferVariant;
  /** Small eyebrow above the headline. */
  eyebrow: Loc;
  /** Landing hero headline. */
  title: Loc;
  /** Hero sub-line — what this offer is in one sentence. */
  sub: Loc;
  /**
   * Price chip next to the CTA. `null` = free (the brief variant).
   * NOTE: this is the only place on the whole site where a price for
   * our work may appear.
   */
  price: string | null;
  /** Label rendered with the price chip ("one-off" / "free"). */
  priceNote: Loc;
  /** "What you get" bullets. */
  bullets: Loc[];
  /** Primary CTA button text (opens the lead form). */
  cta: Loc;
  /** Line under the CTA button. */
  ctaHint: Loc;
  /** Short landing-local FAQ. */
  faq: { q: Loc; a: Loc }[];
};

export const OFFERS: Record<OfferVariant, Offer> = {
  brief: {
    id: "brief",
    eyebrow: {
      en: "— Free briefing call",
      ru: "— Бесплатный разбор",
      uk: "— Безплатний розбір",
    },
    title: {
      en: "A free 20-minute call about your growth",
      ru: "Бесплатный 20-минутный разбор вашего роста",
      uk: "Безплатний 20-хвилинний розбір вашого зростання",
    },
    sub: {
      en: "Tell us about your business — we'll tell you honestly what we'd do with your marketing, in what order, and whether we're the right fit at all.",
      ru: "Расскажите о своём бизнесе — мы честно скажем, что бы делали с вашим маркетингом, в каком порядке и подходим ли мы вам вообще.",
      uk: "Розкажіть про свій бізнес — ми чесно скажемо, що б робили з вашим маркетингом, у якому порядку й чи підходимо ми вам узагалі.",
    },
    price: null,
    priceNote: {
      en: "free · 20 minutes · no obligations",
      ru: "бесплатно · 20 минут · без обязательств",
      uk: "безплатно · 20 хвилин · без зобов'язань",
    },
    bullets: [
      {
        en: "A straight answer on where your quickest growth lever is",
        ru: "Прямой ответ, где ваш самый быстрый рычаг роста",
        uk: "Пряма відповідь, де ваш найшвидший важіль зростання",
      },
      {
        en: "What we would launch first in your case — and what we wouldn't",
        ru: "Что мы запускали бы первым в вашем случае — и что не стали бы",
        uk: "Що ми запускали б першим у вашому випадку — і чого не стали б",
      },
      {
        en: "A clear next step: a plan with numbers if the fit is right",
        ru: "Понятный следующий шаг: план с цифрами, если совпадаем",
        uk: "Зрозумілий наступний крок: план із цифрами, якщо збігаємося",
      },
      {
        en: "Zero pressure — if we're not the right fit, we say so",
        ru: "Ноль давления: если мы не подходим — так и скажем",
        uk: "Нуль тиску: якщо ми не підходимо — так і скажемо",
      },
    ],
    cta: {
      en: "Book a free call",
      ru: "Записаться на разбор",
      uk: "Записатися на розбір",
    },
    ctaHint: {
      en: "We reply within an hour on weekdays",
      ru: "Отвечаем в течение часа по будням",
      uk: "Відповідаємо протягом години в будні",
    },
    faq: [
      {
        q: {
          en: "Is it really free?",
          ru: "Это правда бесплатно?",
          uk: "Це справді безплатно?",
        },
        a: {
          en: "Yes. It's 20 minutes of conversation, not a sales webinar. If there's a fit, the next step is a concrete plan; if not, you still leave with an honest outside view.",
          ru: "Да. Это 20 минут разговора, а не продающий вебинар. Если совпадаем — следующий шаг конкретный план; если нет, у вас всё равно остаётся честный взгляд со стороны.",
          uk: "Так. Це 20 хвилин розмови, а не продажний вебінар. Якщо збігаємося — наступний крок конкретний план; якщо ні, у вас усе одно залишається чесний погляд збоку.",
        },
      },
      {
        q: {
          en: "Who runs the call?",
          ru: "Кто проводит разбор?",
          uk: "Хто проводить розбір?",
        },
        a: {
          en: "A specialist from the team — a human, not a bot. Vanessa (our AI assistant) may take your request, but the call itself is with a person.",
          ru: "Специалист команды — человек, не бот. Ванесса (наш AI-ассистент) может принять заявку, но сам разбор проводит человек.",
          uk: "Спеціаліст команди — людина, не бот. Ванесса (наш AI-асистент) може прийняти заявку, але сам розбір проводить людина.",
        },
      },
      {
        q: {
          en: "What happens after the call?",
          ru: "Что будет после разбора?",
          uk: "Що буде після розбору?",
        },
        a: {
          en: "If it makes sense to go deeper, the team prepares a plan with scope, timeline and budget for your case. No packages, no pressure — you decide with the numbers in front of you.",
          ru: "Если есть смысл идти глубже, команда готовит план с составом работ, сроками и бюджетом под ваш случай. Без пакетов и давления — вы решаете, глядя на цифры.",
          uk: "Якщо є сенс іти глибше, команда готує план зі складом робіт, термінами й бюджетом під ваш випадок. Без пакетів і тиску — ви вирішуєте, дивлячись на цифри.",
        },
      },
    ],
  },
};
