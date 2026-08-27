import { u, type CaseItem } from "./types";

export const eliteCarMats: CaseItem = {
    id: "elitecarmats",
    status: "progress",
    region: "usa",
    url: "https://elitecarmats.us",
    study: {
      accent: "#D4A54A",
      title: u("Elite Car Mats"),
      tag: u("CUSTOM E-COMMERCE · USA"),
      summary: {
        en: "A custom-built e-commerce store for a car-mat manufacturer entering the U.S. market. A Next.js storefront with a full vehicle configurator across ~60 brands and ~700 models, Stripe checkout, and an operator dashboard. Paid ads are a separate later phase — this case is the build.",
        ru: "Кастомный интернет-магазин для производителя автоковриков, выходящего на рынок США. Витрина на Next.js с полным конфигуратором под авто — ~60 брендов и ~700 моделей, оплата через Stripe и операторская панель. Платная реклама — отдельный поздний этап, этот кейс про саму разработку.",
        uk: "Кастомний інтернет-магазин для виробника автомобільних килимків, що виходить на ринок США. Вітрина на Next.js з повним конфігуратором під авто — ~60 брендів і ~700 моделей, оплата через Stripe та операторська панель. Платна реклама — окремий пізніший етап, цей кейс про саму розробку.",
      },
      metrics: [
        {
          en: "~700 vehicle models, ~60 brands",
          ru: "~700 моделей авто, ~60 брендов",
          uk: "~700 моделей авто, ~60 брендів",
        },
        {
          en: "Full vehicle configurator + Stripe",
          ru: "Полный конфигуратор под авто + Stripe",
          uk: "Повний конфігуратор під авто + Stripe",
        },
        {
          en: "Custom Next.js build, 3 languages",
          ru: "Кастомная разработка на Next.js, 3 языка",
          uk: "Кастомна розробка на Next.js, 3 мови",
        },
      ],
      headline: {
        en: "Custom car-mat store, built end-to-end",
        ru: "Магазин автоковриков под ключ",
        uk: "Магазин автокилимків під ключ",
      },
      meta: {
        en: "Next.js · ~60 brands / ~700 models · Stripe · 3 languages",
        ru: "Next.js · ~60 брендов / ~700 моделей · Stripe · 3 языка",
        uk: "Next.js · ~60 брендів / ~700 моделей · Stripe · 3 мови",
      },
      niche: {
        en: "Auto · E-commerce · USA",
        ru: "Авто · E-commerce · США",
        uk: "Авто · E-commerce · США",
      },
      stats: [
        {
          value: "~700",
          label: {
            en: "Vehicle models",
            ru: "Моделей авто",
            uk: "Моделей авто",
          },
        },
        {
          value: "~60",
          label: {
            en: "Car brands",
            ru: "Брендов авто",
            uk: "Брендів авто",
          },
        },
        {
          value: "3",
          label: {
            en: "Languages",
            ru: "Языка",
            uk: "Мови",
          },
        },
        {
          value: "100%",
          label: {
            en: "Custom build",
            ru: "Кастомная",
            uk: "Кастомна",
          },
        },
      ],
      features: [
        {
          icon: "🚗",
          text: {
            en: "Vehicle configurator — year, set type (profile-aware), mat & edge colour, optional metal brand badge",
            ru: "Конфигуратор под авто — год, тип комплекта (по профилю кузова), цвет коврика и окантовки, опц. металлический шильдик бренда",
            uk: "Конфігуратор під авто — рік, тип комплекта (за профілем кузова), колір килимка й окантовки, опц. металевий шильдик бренда",
          },
        },
        {
          icon: "🔎",
          text: {
            en: "Catalog of ~60 brands / ~700 models — body-type filters and ⌘K search with autocomplete",
            ru: "Каталог ~60 брендов / ~700 моделей — фильтры по типу кузова и поиск ⌘K с автокомплитом",
            uk: "Каталог ~60 брендів / ~700 моделей — фільтри за типом кузова і пошук ⌘K з автокомплітом",
          },
        },
        {
          icon: "💳",
          text: {
            en: "Cart with promo codes and Stripe Checkout (with manual-confirm fallback)",
            ru: "Корзина с промокодами и оплатой через Stripe Checkout (с резервным ручным подтверждением)",
            uk: "Кошик з промокодами та оплатою через Stripe Checkout (із резервним ручним підтвердженням)",
          },
        },
        {
          icon: "📦",
          text: {
            en: "Order tracking via HMAC links, ShipStation fulfillment, and Resend transactional emails",
            ru: "Отслеживание заказа по HMAC-ссылкам, фулфилмент через ShipStation и транзакционные письма на Resend",
            uk: "Відстеження замовлення за HMAC-посиланнями, фулфілмент через ShipStation і транзакційні листи на Resend",
          },
        },
        {
          icon: "❤️",
          text: {
            en: "Wishlist and a custom-order form for vehicles outside the catalog",
            ru: "Вишлист и форма кастом-заказа для авто не из каталога",
            uk: "Список бажань і форма кастом-замовлення для авто не з каталогу",
          },
        },
        {
          icon: "🌐",
          text: {
            en: "Three languages (EN / RU / UK), a Markdown blog, and WCAG accessibility",
            ru: "Три языка (EN / RU / UK), блог на Markdown и доступность по WCAG",
            uk: "Три мови (EN / RU / UK), блог на Markdown і доступність за WCAG",
          },
        },
      ],
      sections: [
        {
          heading: {
            en: "Operator dashboard",
            ru: "Операторская панель",
            uk: "Операторська панель",
          },
          items: [
            {
              en: "Revenue dashboard — daily / weekly / monthly, AOV, top models",
              ru: "Дашборд выручки — день / неделя / месяц, средний чек, топ-модели",
              uk: "Дашборд виручки — день / тиждень / місяць, середній чек, топ-моделі",
            },
            {
              en: "Order management — status timeline, tracking numbers, email re-send",
              ru: "Управление заказами — статус-таймлайн, трек-номера, повторная отправка письма",
              uk: "Керування замовленнями — статус-таймлайн, трек-номери, повторне надсилання листа",
            },
            {
              en: "Live price editor with per-vehicle overrides + Google Shopping feed",
              ru: "Живой редактор цен с переопределениями по типам авто + фид Google Shopping",
              uk: "Живий редактор цін з перевизначеннями за типами авто + фід Google Shopping",
            },
            {
              en: "Catalog CRUD, blog editor, promo codes, review moderation, newsletter (CSV)",
              ru: "CRUD каталога, редактор блога, промокоды, модерация отзывов, рассылка (CSV)",
              uk: "CRUD каталогу, редактор блога, промокоди, модерація відгуків, розсилка (CSV)",
            },
          ],
        },
        {
          heading: {
            en: "SEO & marketing",
            ru: "SEO и маркетинг",
            uk: "SEO та маркетинг",
          },
          items: [
            {
              en: "Sitemap across brand, model, custom and blog URLs",
              ru: "Sitemap по URL брендов, моделей, кастом-страниц и блога",
              uk: "Sitemap за URL брендів, моделей, кастом-сторінок і блога",
            },
            {
              en: "Schema.org — Product (+rating), Offer, Organization, Breadcrumb, FAQ, Article",
              ru: "Schema.org — Product (+рейтинг), Offer, Organization, Breadcrumb, FAQ, Article",
              uk: "Schema.org — Product (+рейтинг), Offer, Organization, Breadcrumb, FAQ, Article",
            },
            {
              en: "OpenGraph images per page",
              ru: "OpenGraph-картинки для каждой страницы",
              uk: "OpenGraph-зображення для кожної сторінки",
            },
            {
              en: "Google Merchant Center product feed that auto-updates with admin prices",
              ru: "Продуктовый фид Google Merchant Center, авто-обновляемый по ценам из админки",
              uk: "Продуктовий фід Google Merchant Center, що авто-оновлюється за цінами з адмінки",
            },
          ],
        },
        {
          heading: {
            en: "Security & reliability",
            ru: "Безопасность и надёжность",
            uk: "Безпека та надійність",
          },
          items: [
            {
              en: "HMAC admin sessions, scrypt hashing, CSRF protection",
              ru: "HMAC-сессии админа, хеширование scrypt, защита от CSRF",
              uk: "HMAC-сесії адміна, хешування scrypt, захист від CSRF",
            },
            {
              en: "Per-IP rate limiting (Upstash Redis)",
              ru: "Лимит запросов по IP (Upstash Redis)",
              uk: "Ліміт запитів за IP (Upstash Redis)",
            },
            {
              en: "Stripe webhook idempotency ledger",
              ru: "Журнал идемпотентности Stripe-вебхуков",
              uk: "Журнал ідемпотентності Stripe-вебхуків",
            },
            {
              en: "Hardened security headers and CCPA / CPRA compliance",
              ru: "Усиленные security-заголовки и соответствие CCPA / CPRA",
              uk: "Посилені security-заголовки та відповідність CCPA / CPRA",
            },
          ],
        },
      ],
      insight: {
        en: "Scope here was the storefront — design, build, catalog, payments and the admin panel. Paid acquisition is a separate, later phase, so this case is about what we've built so far rather than campaign numbers.",
        ru: "Скоуп здесь — сама витрина: дизайн, разработка, каталог, оплата и админ-панель. Платное продвижение — отдельный, более поздний этап, поэтому кейс про то, что мы уже построили, а не про рекламные метрики.",
        uk: "Скоуп тут — сама вітрина: дизайн, розробка, каталог, оплата та адмін-панель. Платне просування — окремий, пізніший етап, тому кейс про те, що ми вже побудували, а не про рекламні метрики.",
      },
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind",
        "Prisma + Neon",
        "Stripe",
        "ShipStation",
        "Resend",
        "Vercel",
      ],
    },
  };
