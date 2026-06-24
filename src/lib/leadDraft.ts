/**
 * localStorage-backed draft persistence for the lead form. Saves
 * everything except the honeypot on every keystroke so a visitor
 * who closes the modal — or the tab — comes back to a partly-filled
 * form. Draft is wiped on a successful submit.
 */

export const LEAD_DRAFT_KEY = "st-lead-draft-v1";
export const LEAD_MODE_KEY = "st-lead-mode-v1";

export type LeadPackage =
  | "not_sure"
  | "standalone"
  | "launch"
  | "growth"
  | "scale";

export type LeadBudget =
  | "not_sure"
  | "under_1k"
  | "1k_3k"
  | "3k_10k"
  | "10k_plus";

export type LeadDraft = {
  name: string;
  contact: string;
  business: string;
  request: string;
  package: LeadPackage;
  budget: LeadBudget;
};

/**
 * Single source of truth for how each package / budget enum renders in
 * the two downstream surfaces:
 *   - `ru` — the Russian-labelled Telegram/email notification the team reads
 *   - `notion` — the English `select` option name in the Notion CRM
 *
 * Keeping both maps here (next to the types) means `leadDelivery.ts` and
 * `notion.ts` import one definition instead of drifting copies, and the
 * type-guard key lists are derived from these same objects.
 */
export const PACKAGE_LABELS: Record<
  LeadPackage,
  { ru: string; notion: string }
> = {
  not_sure: { ru: "Пока не уверен", notion: "Not sure" },
  standalone: { ru: "Одна услуга (standalone)", notion: "Standalone" },
  launch: { ru: "LAUNCH", notion: "Launch" },
  growth: { ru: "GROWTH ⭐", notion: "Growth" },
  scale: { ru: "SCALE", notion: "Scale" },
};

export const BUDGET_LABELS: Record<
  LeadBudget,
  { ru: string; notion: string }
> = {
  not_sure: { ru: "Не уверен", notion: "Not sure" },
  under_1k: { ru: "до $1 000 / мес", notion: "<$1k/mo" },
  "1k_3k": { ru: "$1 000–3 000 / мес", notion: "$1k–3k/mo" },
  "3k_10k": { ru: "$3 000–10 000 / мес", notion: "$3k–10k/mo" },
  "10k_plus": { ru: "$10 000+ / мес", notion: "$10k+/mo" },
};

export function isLeadPackage(v: unknown): v is LeadPackage {
  return typeof v === "string" && v in PACKAGE_LABELS;
}

export function isLeadBudget(v: unknown): v is LeadBudget {
  return typeof v === "string" && v in BUDGET_LABELS;
}

export function readLeadDraft(): LeadDraft | null {
  try {
    const raw = window.localStorage.getItem(LEAD_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LeadDraft>;
    if (typeof parsed !== "object" || parsed === null) return null;
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      contact: typeof parsed.contact === "string" ? parsed.contact : "",
      business: typeof parsed.business === "string" ? parsed.business : "",
      request: typeof parsed.request === "string" ? parsed.request : "",
      package: isLeadPackage(parsed.package) ? parsed.package : "not_sure",
      budget: isLeadBudget(parsed.budget) ? parsed.budget : "not_sure",
    };
  } catch {
    return null;
  }
}

export function writeLeadDraft(draft: LeadDraft): void {
  try {
    const empty =
      !draft.name &&
      !draft.contact &&
      !draft.business &&
      !draft.request &&
      draft.package === "not_sure" &&
      draft.budget === "not_sure";
    if (empty) {
      window.localStorage.removeItem(LEAD_DRAFT_KEY);
    } else {
      window.localStorage.setItem(LEAD_DRAFT_KEY, JSON.stringify(draft));
    }
  } catch {
    // localStorage may be blocked / full — ignore.
  }
}

export function clearLeadDraft(): void {
  try {
    window.localStorage.removeItem(LEAD_DRAFT_KEY);
  } catch {
    // ignore
  }
}
