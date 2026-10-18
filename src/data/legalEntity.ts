// Legal entity details for the Impressum / legal notice (/<locale>/imprint).
//
// Single source of truth — fill these once and they render on the imprint
// page (labels are localized in the dictionary; the values here are NOT
// translated). Leave a field empty to hide that row. While `name` is empty
// the page shows the localized placeholder note instead of the details.
//
// The email/phone default to the public contacts so the page is never
// contactless even before incorporation.

import { siteConfig } from "@/data/siteConfig";

export const legalEntity = {
  /** Registered company name, or the full name of the sole proprietor. */
  name: "Seventy Times LLC",
  /** Legal form, e.g. "LLC", "Einzelunternehmen", "ФОП". */
  form: "A limited liability company organized under the laws of the State of Connecticut, USA",
  /** Full postal address (street, city, postal code, country). */
  address: "95 Morgan St, Apt 1P, Stamford, CT 06905, USA",
  /** Who legally represents the company (DE: "Vertreten durch"). */
  represented: "Maksym Ilash, Member",
  /** Person responsible for content (DE § 18 Abs. 2 MStV / DDG). */
  responsible: "Maksym Ilash, address as above",
  /** Commercial register + number, if any. */
  registration: "Connecticut Secretary of the State, Business ID (ALEI) US-CT.BER:3535206",
  /** VAT / tax id, if any. */
  vatId: "",
  /** Contact email — defaults to the public inbox. */
  email: "legal@seventy-times.com",
  /** Contact phone — defaults to the public number. */
  phone: siteConfig.contacts.phone.label,
} as const;
