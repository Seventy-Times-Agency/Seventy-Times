/**
 * Lightweight client-side contact-field validation. Mirrored on the
 * server inside `/api/lead`; the client check just gives faster
 * feedback before the network round-trip.
 *
 * Accepts the three formats real visitors actually leave:
 *   - email                      "user@example.com"
 *   - Telegram / Instagram handle "@username"
 *   - phone (anything with 5+ digits, including dashes/spaces/+)
 */
export function isPlausibleContact(value: string): boolean {
  const v = value.trim();
  if (v.length < 3) return false;
  const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const handleLike = /^@[\w.]{2,}$/.test(v);
  const phoneLike = /\d{5,}/.test(v);
  return emailLike || handleLike || phoneLike;
}
