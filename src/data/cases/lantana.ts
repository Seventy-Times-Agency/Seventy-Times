import { u, type CaseItem } from "./types";

// Website + local SEO for an upholstery shop in Lantana, FL. Numbers
// come from Search Console and the Google Business Profile for
// 12.09–15.10.2026 (first month after launch); before launch every
// value was zero. It's a young site, so volumes are small — the case
// is about going from invisible to found, not about sales.
export const lantana: CaseItem = {
    id: "lantana",
    status: "live",
    region: "usa",
    url: "https://lantanaupholstery.com",
    study: {
      accent: "#ef4a23",
      title: u("Lantana Upholstery"),
      tag: u("WEBSITE · SEO · GOOGLE PROFILE · USA · 2026"),
      summary: {
        en: "An upholstery shop with 20 years of experience that lived on referrals alone: an empty Google profile and a website Google didn't know about. We built the site, wrote the service pages and blog, and set up the profile. In the first month: #1 in Google Maps, #2 in search for the main query, and 226 impressions instead of zero.",
        ru: "Мастерская перетяжки с 20 годами опыта жила только на сарафане: пустая карточка Google и сайт, о котором Google не знал. Мы сделали сайт, страницы услуг и блог, настроили карточку. За первый месяц: №1 в Google Картах, №2 в поиске по главному запросу и 226 показов вместо нуля.",
        uk: "Майстерня перетяжки з 20 роками досвіду жила лише на сарафанному радіо: порожня картка Google і сайт, про який Google не знав. Ми зробили сайт, сторінки послуг і блог, налаштували картку. За перший місяць: №1 у Google Картах, №2 у пошуку за головним запитом і 226 показів замість нуля.",
      },
      metrics: [
        {
          en: "#1 in Google Maps for the main query, Lantana, FL, as of October 2026",
          ru: "№1 в Google Картах по главному запросу, Lantana, FL, на октябрь 2026",
          uk: "№1 у Google Картах за головним запитом, Lantana, FL, станом на жовтень 2026",
        },
        {
          en: "0 → 226 Google impressions in the first month",
          ru: "0 → 226 показов в Google за первый месяц",
          uk: "0 → 226 показів у Google за перший місяць",
        },
      ],
      headline: {
        en: "From invisible to #1 in Google Maps",
        ru: "Из невидимки в №1 в Google Картах",
        uk: "З невидимки в №1 у Google Картах",
      },
      meta: {
        en: "Florida · 2026 · website, SEO and Google profile",
        ru: "Флорида · 2026 · сайт, SEO и карточка Google",
        uk: "Флорида · 2026 · сайт, SEO і картка Google",
      },
      niche: {
        en: "Upholstery · Local services",
        ru: "Перетяжка · Локальные услуги",
        uk: "Перетяжка · Локальні послуги",
      },
      showcase: {
        chip: {
          en: "Case · Website & SEO · Florida",
          ru: "Кейс · Сайт и SEO · Флорида",
          uk: "Кейс · Сайт і SEO · Флорида",
        },
        name: ["Lantana", "Upholstery"],
        start: {
          en: "20 years of craft. Referrals only, an empty profile, a site Google couldn't find.",
          ru: "20 лет опыта. Сарафан, пустая карточка, сайта нет в Google.",
          uk: "20 років досвіду. Сарафан, порожня картка, сайту немає в Google.",
        },
        finish: {
          en: "#1 in Google Maps and #2 in search for the main query, Lantana, FL, as of October 2026.",
          ru: "№1 в Google Картах и №2 в поиске по главному запросу, Lantana, FL, на октябрь 2026.",
          uk: "№1 у Google Картах і №2 у пошуку за головним запитом, Lantana, FL, станом на жовтень 2026.",
        },
        revenueLabel: {
          en: "Google impressions in the first month",
          ru: "Показов в Google за первый месяц",
          uk: "Показів у Google за перший місяць",
        },
        revenue: u("0 → 226"),
        spendNote: {
          en: "before us the site wasn't in search {spend}",
          ru: "до нас сайта в поиске не было {spend}",
          uk: "до нас сайту в пошуку не було {spend}",
        },
        spend: { en: "at all", ru: "совсем", uk: "зовсім" },
        shots: {
          site: {
            src: "/cases/lantana/site-hero.webp",
            width: 1492,
            height: 804,
            host: "lantanaupholstery.com",
            alt: {
              en: "Lantana Upholstery website home page",
              ru: "Главная страница сайта Lantana Upholstery",
              uk: "Головна сторінка сайту Lantana Upholstery",
            },
          },
          ads: {
            src: "/cases/lantana/gsc.webp",
            width: 1400,
            height: 580,
            label: "Search Console",
            alt: {
              en: "Google Search Console: 18 clicks, 226 impressions",
              ru: "Google Search Console: 18 кликов, 226 показов",
              uk: "Google Search Console: 18 кліків, 226 показів",
            },
          },
        },
        stickers: {
          top: {
            value: u("0 → 18"),
            label: {
              en: "clicks from the profile",
              ru: "переходов с карточки",
              uk: "переходів з картки",
            },
          },
          bottom: {
            value: u("№1"),
            label: {
              en: "in Google Maps · Oct 2026",
              ru: "в Google Картах · окт. 2026",
              uk: "у Google Картах · жовт. 2026",
            },
          },
        },
        details: [
          {
            value: u("0 → 18"),
            label: {
              en: "clicks from Google search",
              ru: "кликов из поиска Google",
              uk: "кліків з пошуку Google",
            },
          },
          {
            value: u("0 → 226"),
            label: {
              en: "search impressions",
              ru: "показов в поиске",
              uk: "показів у пошуку",
            },
          },
          {
            value: u("1 → 18"),
            label: {
              en: "pages on the site",
              ru: "страниц на сайте",
              uk: "сторінок на сайті",
            },
          },
          {
            value: u("87 → 99"),
            label: {
              en: "speed, Lighthouse",
              ru: "скорость, Lighthouse",
              uk: "швидкість, Lighthouse",
            },
          },
        ],
        source: {
          en: "Search Console and Google Business Profile, 12.09–15.10.2026. Before launch every value was zero.",
          ru: "Search Console и профиль компании Google, 12.09–15.10.2026. До запуска все значения нулевые.",
          uk: "Search Console і профіль компанії Google, 12.09–15.10.2026. До запуску всі значення нульові.",
        },
        story: {
          heading: { en: "How it went", ru: "Как это было", uk: "Як це було" },
          paragraphs: [
            {
              en: "Dmitrii has been re-upholstering boats, yachts and aircraft for 20 years; his Lantana shop is about five years old. Customers came by referral only. There was a Google profile, but nobody had set it up, and that was all there was of the shop online.",
              ru: "Дмитрий 20 лет перетягивает лодки, яхты и самолёты, его мастерской в Лантане около пяти лет. Клиенты приходили только по рекомендациям. Была карточка Google, но её никто не настраивал. Больше в интернете о мастерской не было ничего.",
              uk: "Дмитро 20 років перетягує човни, яхти й літаки, його майстерні в Лантані близько п'яти років. Клієнти приходили лише за рекомендаціями. Була картка Google, але її ніхто не налаштовував. Більше в інтернеті про майстерню не було нічого.",
            },
            {
              en: "He asked us to come up with something on a minimal budget. The team is small, and two or three large boat jobs a month at $3–5k is enough. So we held off on ads and first made sure people could find the shop on their own.",
              ru: "Он попросил придумать что-то с минимальным бюджетом. Команда маленькая, ей хватает двух-трёх крупных лодочных заказов в месяц по $3–5 тысяч. Поэтому рекламу мы отложили и решили сначала сделать так, чтобы мастерскую находили сами.",
              uk: "Він попросив вигадати щось із мінімальним бюджетом. Команда маленька, їй вистачає двох-трьох великих човнових замовлень на місяць по $3–5 тисяч. Тому рекламу ми відклали й вирішили спершу зробити так, щоб майстерню знаходили самі.",
            },
            {
              en: "We built the site, connected the domain and got it to 99 on speed. Every service and city got its own page, and we wrote 8 articles in Dmitrii's name answering what people ask Google. We linked the profile to the site, widened the service area from one city to 15 and described all 12 services.",
              ru: "Мы сделали сайт, подключили домен и ускорили его до 99 баллов. Под каждую услугу и город сделали отдельную страницу и написали 8 статей от имени Дмитрия на вопросы, которые люди задают в Google. Карточку привязали к сайту, расширили зону с одного города до 15 и описали все 12 услуг.",
              uk: "Ми зробили сайт, підключили домен і прискорили його до 99 балів. Під кожну послугу й місто зробили окрему сторінку та написали 8 статей від імені Дмитра на питання, які люди ставлять Google. Картку прив'язали до сайту, розширили зону з одного міста до 15 і описали всі 12 послуг.",
            },
            {
              en: "A month later the profile is first in Google Maps for the main query, and the site is second in search after Yelp and first in Bing. Google impressions went from zero to 226, and the first order from search came in by September 18.",
              ru: "Через месяц карточка первая в Google Картах по главному запросу, сайт второй в поиске после Yelp и первый в Bing. Показов в Google стало 226 вместо нуля, первый заказ из поиска пришёл уже к 18 сентября.",
              uk: "За місяць картка перша в Google Картах за головним запитом, сайт другий у пошуку після Yelp і перший у Bing. Показів у Google стало 226 замість нуля, перше замовлення з пошуку прийшло вже до 18 вересня.",
            },
            {
              en: "This is a young site's first month, so the volume is still small. Next we grow organic traffic, then add ads.",
              ru: "Это первый месяц молодого сайта, объём пока небольшой. Дальше растим органику, а потом подключим рекламу.",
              uk: "Це перший місяць молодого сайту, обсяг поки невеликий. Далі ростимо органіку, а потім підключимо рекламу.",
            },
          ],
        },
      },
    },
};
