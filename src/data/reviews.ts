// Published client reviews — the single source for the "Testimonials"
// section on the landing page. The section (and its divider) only render
// when this list is non-empty.
//
// How a review gets here (the whole chain):
//   1. A client opens the review form: footer link "Leave a review" or
//      the button in the Testimonials section (both open `#review`).
//   2. /api/review sends it to the team's Telegram chat and to
//      LEAD_NOTIFY_EMAIL. Nothing is published automatically.
//   3. The team reads it. If it's real and the client agrees to publish
//      it, paste the ready-made snippet from the notification email
//      below, commit, deploy. To take a review down, delete its entry.
//
// Rules: real clients only, their own words. Fix typos at most — never
// change the meaning. Never invent or "polish up" reviews.

/** A published client review. */
export type ApprovedReview = {
  /** Stable id — React key. e.g. "2026-11-vitalii". */
  id: string;
  /** How the client signs the review. */
  name: string;
  /** Role and company, as the client wrote it. */
  role?: string;
  /** City / country, as the client wrote it. */
  location?: string;
  /** The review text, in the language the client wrote it in. */
  content: string;
};

export const REVIEWS: ApprovedReview[] = [];
