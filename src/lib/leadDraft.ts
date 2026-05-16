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

export function isLeadPackage(v: unknown): v is LeadPackage {
  return (
    typeof v === "string" &&
    ["not_sure", "standalone", "launch", "growth", "scale"].includes(v)
  );
}

export function isLeadBudget(v: unknown): v is LeadBudget {
  return (
    typeof v === "string" &&
    ["not_sure", "under_1k", "1k_3k", "3k_10k", "10k_plus"].includes(v)
  );
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
