import { describe, it, expect } from "vitest";
import { rateLimit, normalizeContactKey } from "./apiGuard";

describe("rateLimit", () => {
  it("allows up to the limit, then blocks", () => {
    // Unique key per test so the shared in-memory bucket store doesn't
    // leak state between cases.
    const key = `test:allow-then-block:${Math.random()}`;
    const limit = 3;
    const windowMs = 60_000;

    for (let i = 0; i < limit; i++) {
      expect(rateLimit(key, limit, windowMs).ok).toBe(true);
    }

    const blocked = rateLimit(key, limit, windowMs);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfter).toBeGreaterThan(0);
    }
  });

  it("tracks each key independently", () => {
    const a = `test:key-a:${Math.random()}`;
    const b = `test:key-b:${Math.random()}`;

    expect(rateLimit(a, 1, 60_000).ok).toBe(true);
    expect(rateLimit(a, 1, 60_000).ok).toBe(false); // a exhausted
    expect(rateLimit(b, 1, 60_000).ok).toBe(true); // b untouched
  });

  it("resets once the window has elapsed", async () => {
    const key = `test:reset:${Math.random()}`;
    // 1ms window: the first call consumes it, the second (after the
    // window expires) starts a fresh bucket.
    expect(rateLimit(key, 1, 1).ok).toBe(true);
    await new Promise((r) => setTimeout(r, 5));
    expect(rateLimit(key, 1, 1).ok).toBe(true);
  });
});

describe("normalizeContactKey", () => {
  it("lowercases and strips spaces / dashes / @-prefix", () => {
    expect(normalizeContactKey("  @User_Name ")).toBe("user_name");
    expect(normalizeContactKey("+1 202-555-0199")).toBe("+12025550199");
  });

  it("strips dots from a non-email contact entirely", () => {
    expect(normalizeContactKey("@john.doe")).toBe("johndoe");
  });

  it("strips dots only from an email local part, not the domain", () => {
    expect(normalizeContactKey("j.doe@host.com")).toBe("jdoe@host.com");
    expect(normalizeContactKey("J.Doe@Host.COM")).toBe("jdoe@host.com");
  });

  it("collapses gmail-style dotted aliases to the same key", () => {
    expect(normalizeContactKey("j.doe@host.com")).toBe(
      normalizeContactKey("jdoe@host.com"),
    );
  });
});
