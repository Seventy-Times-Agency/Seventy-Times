export type Testimonial = {
  name: string;
  role: string;
  location: string;
  content: string;
};

/**
 * Базовые отзывы — заглушки для демонстрации блока. Замени на
 * реальные когда появятся. Имена и города подобраны под целевой
 * рынок (US + EU); цитаты переведены на русский.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Daniel Becker",
    role: "Founder, Becker Studio",
    location: "Berlin, DE",
    content:
      "Пришли к ребятам ожидая очередное агентство — получили партнёра, который реально разобрался в нашей воронке. За три месяца стоимость лида упала почти вдвое.",
  },
  {
    name: "Sofia Martinez",
    role: "Marketing Lead, Lumon",
    location: "Madrid, ES",
    content:
      "AI-ассистент, которого они нам поставили на сайт, обрабатывает почти все входящие вопросы сам. Времени у команды освободилось столько, что мы наняли на одного человека меньше.",
  },
  {
    name: "Eric Thompson",
    role: "CEO, Northwave",
    location: "Austin, US",
    content:
      "Тихо, спокойно, без воды. Они построили нам систему, а не разовую кампанию. Количество квалифицированных лидов удвоилось при том же бюджете.",
  },
  {
    name: "Klara Nowak",
    role: "Growth, Polaris Labs",
    location: "Warsaw, PL",
    content:
      "Самое ценное — что они не пытались продать всё сразу. Начали с одного процесса, посмотрели результат, потом расширились. Такое отношение редкое.",
  },
];
