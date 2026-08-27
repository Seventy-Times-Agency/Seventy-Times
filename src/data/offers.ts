// A/B entry-offer landing pages (/go/audit and /go/brief).
//
// SINGLE SOURCE OF TRUTH for both offers: headlines, bullets, prices
// and CTA copy live here — changing the offer means editing this file,
// never digging through components. The pages themselves are thin
// shells around this config.
//
// Rules these pages live by (knowledge-base doc 12 §4.1):
//   - They sit OUTSIDE the navigation and OUTSIDE the sitemap, and are
//     noindexed — traffic arrives only from ads and from the sales team.
//   - The audit price ($100) exists ONLY here. The main site carries no
//     prices at all.
//   - Every lead from these pages is tagged (landing=audit|brief) so the
//     source reaches Telegram / Notion with the lead.

import type { Locale } from "@/i18n/config";

type Loc = Record<Locale, string>;

export type OfferVariant = "audit" | "brief";

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
  audit: {
    id: "audit",
    eyebrow: {
      en: "— Marketing audit",
      ru: "— Аудит маркетинга",
      uk: "— Аудит маркетингу",
    },
    title: {
      en: "Find out where your marketing leaks money",
      ru: "Узнайте, где ваш маркетинг теряет деньги",
      uk: "Дізнайтеся, де ваш маркетинг втрачає гроші",
    },
    sub: {
      en: "A specialist goes through your ads, funnel and analytics by hand and walks you through the findings on a call — what works, what leaks, and what to do first.",
      ru: "Специалист вручную разбирает вашу рекламу, воронку и аналитику и проходит по выводам с вами на созвоне: что работает, где утечки и что делать в первую очередь.",
      uk: "Спеціаліст вручну розбирає вашу рекламу, воронку й аналітику та проходить по висновках із вами на дзвінку: що працює, де витоки й що робити насамперед.",
    },
    price: "$100",
    priceNote: {
      en: "one-off, credited toward work if we continue",
      ru: "разово; зачитывается в работу, если продолжаем",
      uk: "разово; зараховується в роботу, якщо продовжуємо",
    },
    bullets: [
      {
        en: "A written breakdown of your ad accounts, funnel and analytics",
        ru: "Письменный разбор рекламных кабинетов, воронки и аналитики",
        uk: "Письмовий розбір рекламних кабінетів, воронки й аналітики",
      },
      {
        en: "The specific places where budget is being wasted right now",
        ru: "Конкретные места, где бюджет сливается прямо сейчас",
        uk: "Конкретні місця, де бюджет зливається просто зараз",
      },
      {
        en: "A prioritised list of fixes — what to change first and why",
        ru: "Приоритезированный список правок: что менять первым и почему",
        uk: "Пріоритезований список правок: що змінювати першим і чому",
      },
      {
        en: "A call where we walk through everything together — yours to keep either way",
        ru: "Созвон, где проходим всё вместе — выводы остаются у вас в любом случае",
        uk: "Дзвінок, де проходимо все разом — висновки залишаються у вас у будь-якому разі",
      },
    ],
    cta: {
      en: "Book my audit",
      ru: "Заказать аудит",
      uk: "Замовити аудит",
    },
    ctaHint: {
      en: "We reply within an hour on weekdays",
      ru: "Отвечаем в течение часа по будням",
      uk: "Відповідаємо протягом години в будні",
    },
    faq: [
      {
        q: {
          en: "What exactly do I get?",
          ru: "Что именно я получу?",
          uk: "Що саме я отримаю?",
        },
        a: {
          en: "A written audit of your ads, funnel and analytics plus a call where a specialist walks you through it. The findings are yours to keep whether or not we work together afterwards.",
          ru: "Письменный аудит рекламы, воронки и аналитики плюс созвон, где специалист проходит по нему с вами. Выводы остаются у вас независимо от того, продолжим ли мы работать вместе.",
          uk: "Письмовий аудит реклами, воронки й аналітики плюс дзвінок, де спеціаліст проходить по ньому з вами. Висновки залишаються у вас незалежно від того, чи продовжимо ми працювати разом.",
        },
      },
      {
        q: {
          en: "Why is it paid?",
          ru: "Почему он платный?",
          uk: "Чому він платний?",
        },
        a: {
          en: "Because it's real work — hours of a specialist's time on your accounts, not an automated report. The fee filters for serious requests and is credited toward the work if we continue.",
          ru: "Потому что это настоящая работа: часы специалиста в ваших кабинетах, а не автоматический отчёт. Оплата отсекает несерьёзные запросы и зачитывается в работу, если продолжаем.",
          uk: "Бо це справжня робота: години спеціаліста у ваших кабінетах, а не автоматичний звіт. Оплата відсікає несерйозні запити й зараховується в роботу, якщо продовжуємо.",
        },
      },
      {
        q: {
          en: "What do you need from me?",
          ru: "Что нужно от меня?",
          uk: "Що потрібно від мене?",
        },
        a: {
          en: "Access to the ad accounts and analytics (viewer is enough) and 20 minutes for a short intro call. We handle the rest.",
          ru: "Доступ к рекламным кабинетам и аналитике (достаточно просмотра) и 20 минут на короткий вводный созвон. Остальное берём на себя.",
          uk: "Доступ до рекламних кабінетів і аналітики (достатньо перегляду) та 20 хвилин на короткий вступний дзвінок. Решту беремо на себе.",
        },
      },
    ],
  },
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
