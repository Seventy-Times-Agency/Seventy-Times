import { describe, it, expect } from "vitest";
import { rateLimit, isFirstSeen, normalizeContactKey } from "./apiGuard";

// These run against the in-memory store (no Upstash / KV env set), which
// preserves the original behaviour. rateLimit is async now because the
// backing store may be remote.
describe("rateLimit", () => {
  it("allows up to the limit, then blocks", async () => {
    // Unique key per test so the shared in-memory bucket store doesn't
    // leak state between cases.
    const key = `test:allow-then-block:${Math.random()}`;
    const limit = 3;
    const windowMs = 60_000;

    for (let i = 0; i < limit; i++) {
      expect((await rateLimit(key, limit, windowMs)).ok).toBe(true);
    }

    const blocked = await rateLimit(key, limit, windowMs);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.retryAfter).toBeGreaterThan(0);
    }
  });

  it("tracks each key independently", async () => {
    const a = `test:key-a:${Math.random()}`;
    const b = `test:key-b:${Math.random()}`;

    expect((await rateLimit(a, 1, 60_000)).ok).toBe(true);
    expect((await rateLimit(a, 1, 60_000)).ok).toBe(false); // a exhausted
    expect((await rateLimit(b, 1, 60_000)).ok).toBe(true); // b untouched
  });

  it("resets once the window has elapsed", async () => {
    const key = `test:reset:${Math.random()}`;
    // 1ms window: the first call consumes it, the second (after the
    // window expires) starts a fresh bucket.
    expect((await rateLimit(key, 1, 1)).ok).toBe(true);
    await new Promise((r) => setTimeout(r, 5));
    expect((await rateLimit(key, 1, 1)).ok).toBe(true);
  });
});

describe("isFirstSeen", () => {
  it("returns true the first time, false thereafter within the window", async () => {
    const key = `test:dedup:${Math.random()}`;
    expect(await isFirstSeen(key, 60_000)).toBe(true);
    expect(await isFirstSeen(key, 60_000)).toBe(false);
    expect(await isFirstSeen(key, 60_000)).toBe(false);
  });

  it("treats each key independently", async () => {
    const a = `test:dedup-a:${Math.random()}`;
    const b = `test:dedup-b:${Math.random()}`;
    expect(await isFirstSeen(a, 60_000)).toBe(true);
    expect(await isFirstSeen(b, 60_000)).toBe(true);
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
