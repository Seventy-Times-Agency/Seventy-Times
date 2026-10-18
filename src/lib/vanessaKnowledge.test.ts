import { describe, expect, it } from "vitest";
import { getSystemPrompt } from "./systemPrompt";

const LOCALES = ["en", "ru", "uk"] as const;

describe("Vanessa system prompt + knowledge base", () => {
  for (const locale of LOCALES) {
    const prompt = getSystemPrompt(locale);

    it(`${locale}: carries the live site facts`, () => {
      expect(prompt).toContain("# Knowledge base");
      expect(prompt).toContain("Seventy Times LLC");
      expect(prompt).toContain("@SeventyTimesAgencyBot");
      expect(prompt).toMatch(/Elite Car/);
      expect(prompt).toMatch(/Lantana/);
      expect(prompt).toContain("upholstery Lantana FL");
    });

    it(`${locale}: no retired offers or unconfirmed claims`, () => {
      expect(prompt).not.toMatch(/30\s?% (management|fee|за управление|за управління)|наценк|націнк/i);
      expect(prompt).not.toMatch(/\$100\b/);
      expect(prompt).not.toMatch(/2–4 (hours|часа|години)/);
      expect(prompt).not.toMatch(/30[- ]day notice|30 days' notice|уведомлением за 30/);
      expect(prompt).not.toContain("t.me/seventytimes\"");
    });
  }

  it("legacy ua tag maps to Ukrainian", () => {
    expect(getSystemPrompt("ua")).toContain("українській");
  });
});
