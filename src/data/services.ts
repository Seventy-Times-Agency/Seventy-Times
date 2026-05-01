// Service catalogue. Each entry maps to the four cards rendered by
// `Services.tsx` and gets its own `/services/<slug>` detail page.
//
// `key` matches the cardʼs i18n key family (svc1*, svc2*, …) and
// the icon registry in `ServiceIcons`. `slug` is the public URL.

export type ServiceKey = "targeting" | "automation" | "aibot" | "sites";

export type ServiceItem = {
  key: ServiceKey;
  /** Public URL slug (`/services/<slug>`). Stable, English, dash-cased. */
  slug: string;
  /** Numeric index used for the card kicker (01, 02, …). */
  index: number;
  /** Family of i18n keys for this service: title / tag / note / inc / add. */
  i18n: {
    title:
      | "svc1Title"
      | "svc2Title"
      | "svc3Title"
      | "svc4Title";
    tag:
      | "svc1Tag"
      | "svc2Tag"
      | "svc3Tag"
      | "svc4Tag";
    note:
      | "svc1Note"
      | "svc2Note"
      | "svc3Note"
      | "svc4Note";
    inc:
      | "svc1Inc"
      | "svc2Inc"
      | "svc3Inc"
      | "svc4Inc";
    add:
      | "svc1Add"
      | "svc2Add"
      | "svc3Add"
      | "svc4Add";
  };
};

export const SERVICES: readonly ServiceItem[] = [
  {
    key: "targeting",
    slug: "ads",
    index: 1,
    i18n: {
      title: "svc1Title",
      tag: "svc1Tag",
      note: "svc1Note",
      inc: "svc1Inc",
      add: "svc1Add",
    },
  },
  {
    key: "automation",
    slug: "automation",
    index: 2,
    i18n: {
      title: "svc2Title",
      tag: "svc2Tag",
      note: "svc2Note",
      inc: "svc2Inc",
      add: "svc2Add",
    },
  },
  {
    key: "aibot",
    slug: "ai-chatbots",
    index: 3,
    i18n: {
      title: "svc3Title",
      tag: "svc3Tag",
      note: "svc3Note",
      inc: "svc3Inc",
      add: "svc3Add",
    },
  },
  {
    key: "sites",
    slug: "websites",
    index: 4,
    i18n: {
      title: "svc4Title",
      tag: "svc4Tag",
      note: "svc4Note",
      inc: "svc4Inc",
      add: "svc4Add",
    },
  },
] as const;
