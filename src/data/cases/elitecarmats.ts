import { u, type CaseItem } from "./types";

// FLAGSHIP case — a live project, still in progress. Every number below
// has a source and a period (19.07–15.10.2026): orders and revenue from
// the store admin + the client's CRM (paid orders only, cancellations
// excluded), spend and conversations from Meta Ads Manager. Revenue is
// gross order value, not profit. Buyer names are never published.
export const eliteCarMats: CaseItem = {
    id: "elitecarmats",
    status: "progress",
    region: "usa",
    url: "https://elitecarmats.us",
    study: {
      accent: "#D4A54A",
      title: u("Elite Car Mats"),
      tag: u("E-COMMERCE · META ADS · USA · 2026"),
      summary: {
        en: "A first business that started with nothing — no website, no ads, no social accounts, not a single sale. We built the store, the brand presence and the ads, and set up sales in two channels. In the first three months of advertising: 86 paid orders and $16,188 in revenue on $2,267 of ad spend.",
        ru: "Первый бизнес владельца, старт с полного нуля: ни сайта, ни рекламы, ни соцсетей, ни одной продажи. Мы собрали магазин, упаковку бренда и рекламу и выстроили продажи в двух каналах. За первые три месяца рекламы — 86 оплаченных заказов и $16 188 выручки при рекламном бюджете $2 267.",
        uk: "Перший бізнес власника, старт з повного нуля: ні сайту, ні реклами, ні соцмереж, жодного продажу. Ми зібрали магазин, упаковку бренду та рекламу й вибудували продажі у двох каналах. За перші три місяці реклами — 86 оплачених замовлень і $16 188 виручки при рекламному бюджеті $2 267.",
      },
      metrics: [
        {
          en: "86 paid orders in 3 months of ads",
          ru: "86 оплаченных заказов за 3 месяца рекламы",
          uk: "86 оплачених замовлень за 3 місяці реклами",
        },
        {
          en: "$16,188 revenue on $2,267 ad spend (client data)",
          ru: "$16 188 выручки при бюджете $2 267 (данные клиента)",
          uk: "$16 188 виручки при бюджеті $2 267 (дані клієнта)",
        },
        {
          en: "1,360 vehicle models in the configurator",
          ru: "1 360 моделей авто в конфигураторе",
          uk: "1 360 моделей авто в конфігураторі",
        },
      ],
      headline: {
        en: "From zero to 86 orders and $16,188 in revenue",
        ru: "С нуля до 86 заказов и $16 188 выручки",
        uk: "З нуля до 86 замовлень і $16 188 виручки",
      },
      meta: {
        en: "USA · Apr–Oct 2026 · store, brand, ads, sales script · in progress",
        ru: "США · апр–окт 2026 · магазин, бренд, реклама, скрипт продаж · в работе",
        uk: "США · квіт–жовт 2026 · магазин, бренд, реклама, скрипт продажів · у роботі",
      },
      niche: {
        en: "Auto · E-commerce · USA",
        ru: "Авто · E-commerce · США",
        uk: "Авто · E-commerce · США",
      },
      stats: [
        {
          value: "86",
          label: { en: "Paid orders", ru: "Оплаченных заказов", uk: "Оплачених замовлень" },
        },
        {
          value: "$16.2K",
          label: { en: "Revenue", ru: "Выручка", uk: "Виручка" },
        },
        {
          value: "$2,267",
          label: { en: "Ad spend", ru: "Рекламный бюджет", uk: "Рекламний бюджет" },
        },
        {
          value: "~$190",
          label: { en: "Average order", ru: "Средний чек", uk: "Середній чек" },
        },
      ],
      revenue: {
        heading: {
          en: "Where the sales came from",
          ru: "Откуда пришли продажи",
          uk: "Звідки прийшли продажі",
        },
        rows: [
          {
            label: { en: "Website checkout", ru: "Заказы через сайт", uk: "Замовлення через сайт" },
            value: {
              en: "21 orders · $3,998",
              ru: "21 заказ · $3 998",
              uk: "21 замовлення · $3 998",
            },
          },
          {
            label: {
              en: "Direct messages (Instagram / Facebook)",
              ru: "Переписка (Instagram / Facebook)",
              uk: "Листування (Instagram / Facebook)",
            },
            value: {
              en: "65 orders · $12,190",
              ru: "65 заказов · $12 190",
              uk: "65 замовлень · $12 190",
            },
          },
          {
            label: { en: "Total", ru: "Всего", uk: "Усього" },
            value: {
              en: "86 orders · $16,188",
              ru: "86 заказов · $16 188",
              uk: "86 замовлень · $16 188",
            },
          },
          {
            label: { en: "Meta ad spend", ru: "Расход на рекламу Meta", uk: "Витрати на рекламу Meta" },
            value: u("$2,267"),
          },
        ],
        roasLabel: {
          en: "Revenue / ad spend",
          ru: "Выручка / рекламный бюджет",
          uk: "Виручка / рекламний бюджет",
        },
        roas: "7.1×",
        roasNote: {
          en: "Jul 19 – Oct 15, 2026 · gross revenue, not profit · paid orders only · sources: store admin, client CRM, Meta Ads Manager",
          ru: "19 июля – 15 октября 2026 · выручка, не прибыль · только оплаченные заказы · источники: админка магазина, CRM клиента, Meta Ads Manager",
          uk: "19 липня – 15 жовтня 2026 · виручка, не прибуток · лише оплачені замовлення · джерела: адмінка магазину, CRM клієнта, Meta Ads Manager",
        },
      },
      breakdown: {
        heading: {
          en: "Ad campaigns · Meta",
          ru: "Рекламные кампании · Meta",
          uk: "Рекламні кампанії · Meta",
        },
        rows: [
          {
            label: { en: "Period", ru: "Период", uk: "Період" },
            value: {
              en: "Jul 19 – Oct 15, 2026",
              ru: "19.07 – 15.10.2026",
              uk: "19.07 – 15.10.2026",
            },
          },
          {
            label: { en: "Impressions", ru: "Показы", uk: "Покази" },
            value: { en: "~276K", ru: "~276 тыс.", uk: "~276 тис." },
          },
          {
            label: {
              en: "Conversations started",
              ru: "Начатых диалогов",
              uk: "Розпочатих діалогів",
            },
            value: {
              en: "675 · ~$3.09 each",
              ru: "675 · ~$3.09 за диалог",
              uk: "675 · ~$3.09 за діалог",
            },
          },
          {
            label: {
              en: "Store visits from ads",
              ru: "Переходов на сайт",
              uk: "Переходів на сайт",
            },
            value: {
              en: "1,539 · ~$0.11 each",
              ru: "1 539 · ~$0.11 за переход",
              uk: "1 539 · ~$0.11 за перехід",
            },
          },
          {
            label: { en: "First order", ru: "Первый заказ", uk: "Перше замовлення" },
            value: {
              en: "6 days after launch",
              ru: "через 6 дней после запуска",
              uk: "через 6 днів після запуску",
            },
          },
        ],
      },
      deliverables: {
        heading: {
          en: "How it went, step by step",
          ru: "Как шли, шаг за шагом",
          uk: "Як ішли, крок за кроком",
        },
        items: [
          {
            en: "Start: the owner came through a referral with nothing in place and asked for a landing page. We explained why a niche where every product is cut for a specific car needs a real store, not a landing page.",
            ru: "Старт: владелец пришёл по рекомендации, без сайта, рекламы и соцсетей, и просил лендинг. Мы объяснили, почему в нише, где каждый товар режется под конкретную машину, нужен полноценный магазин, а не лендинг.",
            uk: "Старт: власник прийшов за рекомендацією, без сайту, реклами та соцмереж, і просив лендинг. Ми пояснили, чому в ніші, де кожен товар ріжеться під конкретне авто, потрібен повноцінний магазин, а не лендинг.",
          },
          {
            en: "Brand: the honeycomb pattern of the mats themselves became the visual system — logo, site and social in black and gold, approved by the owner on the first pass.",
            ru: "Бренд: узор сот с самих ковриков стал визуальной системой — логотип, сайт и соцсети в чёрном и золотом. Владелец утвердил с первого показа.",
            uk: "Бренд: візерунок сот із самих килимків став візуальною системою — логотип, сайт і соцмережі в чорному та золотому. Власник затвердив з першого показу.",
          },
          {
            en: "Store in about a month (launched May 2026): a product page for every car, from sedans to semi trucks, with a configurator, checkout and an owner dashboard.",
            ru: "Магазин примерно за месяц (запуск в мае 2026): карточка под каждую машину, от седанов до фур, конфигуратор, оплата и панель владельца.",
            uk: "Магазин приблизно за місяць (запуск у травні 2026): картка під кожне авто, від седанів до фур, конфігуратор, оплата та панель власника.",
          },
          {
            en: "Instagram and Facebook from scratch: profile concept, first posts, business setup and an Instagram shop — so ads had somewhere to land.",
            ru: "Instagram и Facebook с нуля: концепция профиля, первые публикации, бизнес-настройки и магазин в Instagram — чтобы рекламе было куда вести.",
            uk: "Instagram і Facebook з нуля: концепція профілю, перші публікації, бізнес-налаштування та магазин в Instagram — щоб рекламі було куди вести.",
          },
          {
            en: "Ads tested across audiences, languages and destinations. U.S. buyers convert on the website; the Ukrainian- and Russian-speaking audience buys in direct messages. Campaigns were split to match.",
            ru: "Реклама: тесты аудиторий, языков и точек назначения. Американцы покупают на сайте, украино- и русскоязычная аудитория — в переписке. Кампании разделили под каждый сценарий.",
            uk: "Реклама: тести аудиторій, мов і точок призначення. Американці купують на сайті, україно- та російськомовна аудиторія — у листуванні. Кампанії розділили під кожен сценарій.",
          },
          {
            en: "Sales script for the owner's two sales managers, plus regular reviews of their conversations to find where deals stall.",
            ru: "Скрипт продаж для двух менеджеров владельца и регулярный разбор их диалогов — ищем, где сделки застревают.",
            uk: "Скрипт продажів для двох менеджерів власника та регулярний розбір їхніх діалогів — шукаємо, де угоди застрягають.",
          },
          {
            en: "Demand outgrew what we had planned for, and the store briefly stopped taking orders. We rebuilt it for large traffic spikes: the same audience now puts 2.5× less load on it.",
            ru: "Поток покупателей вырос больше, чем мы закладывали, и сайт на время перестал принимать заказы. Мы перестроили его под крупные наплывы: теперь та же аудитория нагружает его в 2,5 раза меньше.",
            uk: "Потік покупців виріс більше, ніж ми закладали, і сайт на деякий час перестав приймати замовлення. Ми перебудували його під великі напливи: тепер та сама аудиторія навантажує його у 2,5 раза менше.",
          },
          {
            en: "A second product at the owner's request: a honeycomb trunk organizer, live on the store since late September.",
            ru: "Второй продукт по запросу владельца: органайзер в багажник в стиле сот, в продаже с конца сентября.",
            uk: "Другий продукт на запит власника: органайзер у багажник у стилі сот, у продажу з кінця вересня.",
          },
        ],
      },
      sections: [
        {
          heading: {
            en: "Every way to find and buy",
            ru: "Все пути найти и купить",
            uk: "Усі шляхи знайти й купити",
          },
          items: [
            {
              en: "Google Shopping via Merchant Center — the feed updates with prices from the admin",
              ru: "Google Shopping через Merchant Center — фид обновляется по ценам из админки",
              uk: "Google Shopping через Merchant Center — фід оновлюється за цінами з адмінки",
            },
            {
              en: "Meta product catalog and an Instagram shop",
              ru: "Каталог товаров Meta и магазин в Instagram",
              uk: "Каталог товарів Meta та магазин в Instagram",
            },
            {
              en: "Search Console and basic SEO so Google indexes the store",
              ru: "Search Console и базовое SEO, чтобы Google индексировал магазин",
              uk: "Search Console та базове SEO, щоб Google індексував магазин",
            },
            {
              en: "Etsy storefront set up with the product range (just launched)",
              ru: "Магазин на Etsy с загруженным ассортиментом (только запущен)",
              uk: "Магазин на Etsy із завантаженим асортиментом (щойно запущений)",
            },
          ],
        },
        {
          heading: {
            en: "Owner dashboard",
            ru: "Панель владельца",
            uk: "Панель власника",
          },
          items: [
            {
              en: "Revenue by day / week / month, average order, top models",
              ru: "Выручка по дням, неделям и месяцам, средний чек, топ-модели",
              uk: "Виручка по днях, тижнях і місяцях, середній чек, топ-моделі",
            },
            {
              en: "Orders with status, tracking numbers and the channel each one came from",
              ru: "Заказы со статусами, трек-номерами и каналом, откуда пришёл каждый",
              uk: "Замовлення зі статусами, трек-номерами та каналом, звідки прийшло кожне",
            },
            {
              en: "Live price editor, promo codes, custom orders with invoices",
              ru: "Живой редактор цен, промокоды, индивидуальные заказы со счетами",
              uk: "Живий редактор цін, промокоди, індивідуальні замовлення з рахунками",
            },
            {
              en: "Sales funnel, verified-buyer reviews, blog and newsletter",
              ru: "Воронка продаж, отзывы проверенных покупателей, блог и рассылка",
              uk: "Воронка продажів, відгуки перевірених покупців, блог і розсилка",
            },
          ],
        },
      ],
      features: [
        {
          icon: "🚗",
          text: {
            en: "Configurator: year, set type by body profile, mat and edge colour, optional metal badge",
            ru: "Конфигуратор: год, комплект по профилю кузова, цвет коврика и канта, металлический шильдик",
            uk: "Конфігуратор: рік, комплект за профілем кузова, колір килимка й канту, металевий шильдик",
          },
        },
        {
          icon: "🔎",
          text: {
            en: "1,360 models across 68 brands — cars, SUVs, pickups, vans and semi trucks — with search",
            ru: "1 360 моделей 68 брендов — легковые, кроссоверы, пикапы, фургоны и тягачи — с поиском",
            uk: "1 360 моделей 68 брендів — легкові, кросовери, пікапи, фургони та тягачі — з пошуком",
          },
        },
        {
          icon: "✂️",
          text: {
            en: "Custom-order form for cars that aren't in the catalog",
            ru: "Форма индивидуального заказа для машин, которых нет в каталоге",
            uk: "Форма індивідуального замовлення для авто, яких немає в каталозі",
          },
        },
        {
          icon: "💳",
          text: {
            en: "Cart, promo codes and Stripe checkout",
            ru: "Корзина, промокоды и оплата через Stripe",
            uk: "Кошик, промокоди та оплата через Stripe",
          },
        },
        {
          icon: "📦",
          text: {
            en: "Order tracking and transactional emails",
            ru: "Отслеживание заказа и письма покупателю",
            uk: "Відстеження замовлення та листи покупцю",
          },
        },
        {
          icon: "🌐",
          text: {
            en: "Three languages (EN / RU / UK), detected from the browser",
            ru: "Три языка (EN / RU / UK), определяются по браузеру",
            uk: "Три мови (EN / RU / UK), визначаються за браузером",
          },
        },
      ],
      insight: {
        en: "The project is three months into advertising and still in progress — we're not at the ideal result yet. Paid ads drive most of the sales; Google Shopping, the Meta catalog and search add orders on top and are the base for steadier growth. Revenue figures are gross order value from the store admin and the client's CRM, not profit.",
        ru: "Проекту три месяца рекламы, и он продолжается — до идеального результата мы ещё не дошли. Основной объём продаж даёт реклама; Google Shopping, каталог Meta и поиск добавляют заказы сверху и закладывают основу для более стабильного роста. Выручка — сумма заказов по админке магазина и CRM клиента, а не прибыль.",
        uk: "Проєкту три місяці реклами, і він триває — до ідеального результату ми ще не дійшли. Основний обсяг продажів дає реклама; Google Shopping, каталог Meta та пошук додають замовлення зверху й закладають основу для стабільнішого зростання. Виручка — сума замовлень за адмінкою магазину та CRM клієнта, а не прибуток.",
      },
      showcase: {
        chip: {
          en: "Case · E-commerce · USA",
          ru: "Кейс · E-commerce · США",
          uk: "Кейс · E-commerce · США",
        },
        name: ["Elite Car", "Mats"],
        start: {
          en: "Mats and a warehouse. No website, no brand, no sales.",
          ru: "Коврики и склад. Без сайта, бренда и продаж.",
          uk: "Килимки й склад. Без сайту, бренду та продажів.",
        },
        finish: {
          en: "A store, a brand, ads and 86 orders.",
          ru: "Магазин, бренд, реклама и 86 заказов.",
          uk: "Магазин, бренд, реклама і 86 замовлень.",
        },
        revenueLabel: {
          en: "Brought the client in 3 months",
          ru: "Принесли клиенту за 3 месяца",
          uk: "Принесли клієнту за 3 місяці",
        },
        revenue: { en: "$16,188", ru: "$16 188", uk: "$16 188" },
        spendNote: {
          en: "on {spend} of ad spend · client data",
          ru: "при {spend} на рекламу · данные клиента",
          uk: "при {spend} на рекламу · дані клієнта",
        },
        spend: { en: "$2,267", ru: "$2 267", uk: "$2 267" },
        shots: {
          site: {
            src: "/cases/elitecarmats/site-hero.webp",
            width: 1800,
            height: 1117,
            host: "elitecarmats.us",
            alt: {
              en: "Elite Car Mats store home page",
              ru: "Главная страница магазина Elite Car Mats",
              uk: "Головна сторінка магазину Elite Car Mats",
            },
          },
          ads: {
            src: "/cases/elitecarmats/meta-ads.webp",
            width: 1200,
            height: 484,
            label: "Meta Ads",
            alt: {
              en: "Campaigns in Meta Ads Manager",
              ru: "Кампании в Meta Ads Manager",
              uk: "Кампанії в Meta Ads Manager",
            },
          },
        },
        stickers: {
          top: {
            value: u("86"),
            label: { en: "orders", ru: "заказов", uk: "замовлень" },
          },
          bottom: {
            value: { en: "7.1×", ru: "7,1×", uk: "7,1×" },
            label: {
              en: "from every $1 of ads",
              ru: "с каждого $1 рекламы",
              uk: "з кожного $1 реклами",
            },
          },
        },
        details: [
          {
            value: { en: "65 · $12,190", ru: "65 · $12 190", uk: "65 · $12 190" },
            label: {
              en: "orders from DMs",
              ru: "заказов из директа",
              uk: "замовлень з директу",
            },
          },
          {
            value: { en: "21 · $3,998", ru: "21 · $3 998", uk: "21 · $3 998" },
            label: {
              en: "orders on the website",
              ru: "заказов с сайта",
              uk: "замовлень із сайту",
            },
          },
          {
            value: { en: "$3.09", ru: "$3,09", uk: "$3,09" },
            label: {
              en: "per DM conversation",
              ru: "за диалог в директе",
              uk: "за діалог у директі",
            },
          },
          {
            value: { en: "6 days", ru: "6 дней", uk: "6 днів" },
            label: {
              en: "to the first order",
              ru: "до первого заказа",
              uk: "до першого замовлення",
            },
          },
        ],
        story: {
          heading: { en: "How it went", ru: "Как это было", uk: "Як це було" },
          paragraphs: [
            {
              en: "Vitalii came to us through a referral. He had great EVA mats of his own production and a warehouse in Rochester. Nothing else: no website, no ads, no social accounts, not a single online order. It was his first business.",
              ru: "Виталий пришёл к нам по рекомендации. У него были отличные EVA-коврики собственного производства и склад в Рочестере. Больше не было ничего: ни сайта, ни рекламы, ни соцсетей, ни одного онлайн-заказа. Это был его первый бизнес.",
              uk: "Віталій прийшов до нас за рекомендацією. У нього були чудові EVA-килимки власного виробництва та склад у Рочестері. Більше не було нічого: ні сайту, ні реклами, ні соцмереж, жодного онлайн-замовлення. Це був його перший бізнес.",
            },
            {
              en: "First we talked for a long time. We worked out who his buyer is, where to find them and how much he could invest at the start. Vitalii wanted a simple landing page, but hundreds of car models need a real store. That became the concept: a store that fits mats to your car, a brand built on his signature honeycomb and gold, and Meta ads sized to a budget he could afford.",
              ru: "Сначала мы долго разговаривали. Разбирались, кто его покупатель, где его искать и сколько можно вложить на старте. Виталий хотел простой лендинг, но под сотни моделей авто нужен был полноценный магазин. Так появилась концепция: магазин с подбором под машину, бренд в стиле его фирменных сот с золотом и реклама в Meta под бюджет, который он мог себе позволить.",
              uk: "Спочатку ми довго розмовляли. Розбиралися, хто його покупець, де його шукати і скільки можна вкласти на старті. Віталій хотів простий лендинг, але під сотні моделей авто потрібен був повноцінний магазин. Так з'явилася концепція: магазин із підбором під машину, бренд у стилі його фірмових сот із золотом і реклама в Meta під бюджет, який він міг собі дозволити.",
            },
            {
              en: "In a month we built the website and set up Instagram and Facebook. Then we launched ads. It quickly became clear that Americans buy on the website, while Russian- and Ukrainian-speaking customers write in DMs. We grew both channels.",
              ru: "За месяц мы собрали сайт и оформили Instagram и Facebook. Потом запустили рекламу. Быстро стало видно, что американцы покупают на сайте, а русско- и украиноязычные клиенты пишут в директ. Мы стали развивать оба направления.",
              uk: "За місяць ми зібрали сайт і оформили Instagram та Facebook. Потім запустили рекламу. Швидко стало видно, що американці купують на сайті, а російсько- та україномовні клієнти пишуть у директ. Ми почали розвивати обидва напрями.",
            },
            {
              en: "To turn DMs into orders, we wrote a sales script, trained Vitalii's managers and still review their conversations. We've run the project the whole time: when the website couldn't handle the rush of buyers, we rebuilt it so the load dropped 2.5×. We connected Google Shopping, the Meta catalog and Etsy, and launched a second product.",
              ru: "Чтобы заявки из директа превращались в заказы, мы написали скрипт продаж, обучили менеджеров Виталия и до сих пор разбираем их диалоги. Всё это время ведём проект: когда сайт не выдержал наплыва покупателей, переделали его так, что нагрузка стала в 2,5 раза ниже. Подключили Google Shopping, каталог Meta и Etsy, запустили второй товар.",
              uk: "Щоб заявки з директу перетворювалися на замовлення, ми написали скрипт продажів, навчили менеджерів Віталія і досі розбираємо їхні діалоги. Весь цей час ведемо проєкт: коли сайт не витримав напливу покупців, переробили його так, що навантаження стало у 2,5 раза нижчим. Підключили Google Shopping, каталог Meta та Etsy, запустили другий товар.",
            },
            {
              en: "Now we're locking in the result and preparing to scale. We're in it for the long run.",
              ru: "Сейчас мы закрепляем результат и готовим масштабирование. Работаем дальше вдолгую.",
              uk: "Зараз ми закріплюємо результат і готуємо масштабування. Працюємо далі вдовгу.",
            },
          ],
        },
      },
      services: [
        { en: "E-commerce store", ru: "Интернет-магазин", uk: "Інтернет-магазин" },
        { en: "Branding & logo", ru: "Брендинг и логотип", uk: "Брендинг і логотип" },
        { en: "Social media setup", ru: "Оформление соцсетей", uk: "Оформлення соцмереж" },
        { en: "Meta Ads", ru: "Реклама Meta", uk: "Реклама Meta" },
        { en: "Google Shopping & SEO basics", ru: "Google Shopping и базовое SEO", uk: "Google Shopping і базове SEO" },
        { en: "Sales script & training", ru: "Скрипт продаж и обучение", uk: "Скрипт продажів і навчання" },
      ],
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind",
        "Prisma + Neon",
        "Stripe",
        "Resend",
        "Upstash Redis",
        "Vercel",
      ],
    },
  };
