import { describe, it, expect } from "vitest";
import { isPlausibleContact } from "./contactValidation";

describe("isPlausibleContact", () => {
  it("accepts plain emails", () => {
    expect(isPlausibleContact("user@example.com")).toBe(true);
    expect(isPlausibleContact("jane.doe@sub.example.co.uk")).toBe(true);
  });

  it("accepts @-handles (Telegram / Instagram)", () => {
    expect(isPlausibleContact("@username")).toBe(true);
    expect(isPlausibleContact("@john.doe")).toBe(true);
  });

  it("accepts phone numbers with 5+ digits", () => {
    expect(isPlausibleContact("+1 202 555 0199")).toBe(true);
    expect(isPlausibleContact("12345")).toBe(true);
    expect(isPlausibleContact("(555) 010-2030")).toBe(true);
  });

  it("trims surrounding whitespace before validating", () => {
    expect(isPlausibleContact("  user@example.com  ")).toBe(true);
  });

  it("rejects junk and too-short input", () => {
    expect(isPlausibleContact("")).toBe(false);
    expect(isPlausibleContact("ab")).toBe(false); // under the 3-char floor
    expect(isPlausibleContact("hello there")).toBe(false);
    expect(isPlausibleContact("not-an-email")).toBe(false);
    expect(isPlausibleContact("@a")).toBe(false); // handle too short
    expect(isPlausibleContact("123")).toBe(false); // only 3 digits
  });
});
