// Portfolio cases. Add new entries here — each item references
// i18n keys so the UI copy lives in src/i18n/locales/*. `url` is
// optional: when set, the card's CTA becomes an external link
// (typically a public Notion page); when absent, the card shows
// a "more coming" hint instead.

export type CaseStatus = "live" | "progress" | "soon";

export type CaseItem = {
  id: string;
  titleKey: "case1Title" | "case2Title";
  tagKey: "case1Tag" | "case2Tag";
  summaryKey: "case1Summary" | "case2Summary";
  metricsKey?: "case1Metrics" | "case2Metrics";
  status: CaseStatus;
  url?: string;
};

export const CASES: readonly CaseItem[] = [
  {
    id: "convioo",
    titleKey: "case1Title",
    tagKey: "case1Tag",
    summaryKey: "case1Summary",
    metricsKey: "case1Metrics",
    status: "progress",
  },
  {
    id: "elitecarmats",
    titleKey: "case2Title",
    tagKey: "case2Tag",
    summaryKey: "case2Summary",
    metricsKey: "case2Metrics",
    status: "progress",
  },
] as const;
