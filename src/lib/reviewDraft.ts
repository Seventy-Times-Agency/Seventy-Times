/**
 * Same as leadDraft.ts but for the review form (post-project
 * testimonials). Persisted under a separate key so the two drafts
 * don't fight, and wiped on successful submit.
 */

export const REVIEW_DRAFT_KEY = "st-review-draft-v1";

export type ReviewDraft = {
  code: string;
  name: string;
  role: string;
  location: string;
  content: string;
};

export function readReviewDraft(): ReviewDraft | null {
  try {
    const raw = window.localStorage.getItem(REVIEW_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ReviewDraft>;
    if (typeof parsed !== "object" || parsed === null) return null;
    return {
      code: typeof parsed.code === "string" ? parsed.code : "",
      name: typeof parsed.name === "string" ? parsed.name : "",
      role: typeof parsed.role === "string" ? parsed.role : "",
      location: typeof parsed.location === "string" ? parsed.location : "",
      content: typeof parsed.content === "string" ? parsed.content : "",
    };
  } catch {
    return null;
  }
}

export function writeReviewDraft(draft: ReviewDraft): void {
  try {
    const empty = Object.values(draft).every((v) => !v);
    if (empty) {
      window.localStorage.removeItem(REVIEW_DRAFT_KEY);
    } else {
      window.localStorage.setItem(REVIEW_DRAFT_KEY, JSON.stringify(draft));
    }
  } catch {
    // ignore
  }
}

export function clearReviewDraft(): void {
  try {
    window.localStorage.removeItem(REVIEW_DRAFT_KEY);
  } catch {
    // ignore
  }
}
