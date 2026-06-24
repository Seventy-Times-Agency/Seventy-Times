/**
 * Storage abstraction for rate-limiting and dedup counters.
 *
 * Why this exists: the original in-memory Map in apiGuard works fine on a
 * single long-lived server, but on Vercel's serverless runtime each
 * invocation can land on a fresh instance with its own empty Map — so
 * counters and dedup keys don't survive across requests and the limits
 * are effectively per-instance, not global. This module lets us swap in a
 * shared Redis store (Upstash / Vercel KV REST) when its env is present,
 * while keeping the exact in-memory behaviour as the zero-config default.
 *
 * Semantics note: the in-memory store kept a single bucket whose count is
 * incremented and whose window does NOT slide on each hit (it's a fixed
 * window that resets at `resetAt`). The Redis store reproduces that with
 * INCR + a TTL set on first increment — a standard fixed-window counter.
 * Both stores therefore share the same fixed-window semantics; nothing
 * about the user-visible limit behaviour changes when Redis is enabled.
 */

import { fetchWithTimeout } from "./fetchWithTimeout";

export interface RateStore {
  /**
   * Increment the counter for `key`. On the first increment within a
   * window, the key is created with a TTL of `windowMs` so it expires
   * automatically. Returns the post-increment count.
   */
  incrWithExpiry(key: string, windowMs: number): Promise<number>;
  /**
   * Atomically create `key` only if it doesn't already exist, with a TTL
   * of `windowMs`. Returns true when the key was created by this call
   * (i.e. first time seen in the window) — used for dedup.
   */
  setIfAbsent(key: string, windowMs: number): Promise<boolean>;
}

/* ---------------------------------------------------------------------- */
/* In-memory store (default) — mirrors the original apiGuard behaviour.    */
/* ---------------------------------------------------------------------- */

type Bucket = { count: number; resetAt: number };

class InMemoryRateStore implements RateStore {
  private buckets = new Map<string, Bucket>();
  private lastSweep = 0;

  /**
   * Drop expired buckets at most once a minute so the Map can't grow
   * without bound on a long-lived instance. Matches the original sweep.
   */
  private sweep(now: number): void {
    if (now - this.lastSweep < 60_000) return;
    this.lastSweep = now;
    for (const [key, b] of this.buckets) {
      if (b.resetAt <= now) this.buckets.delete(key);
    }
  }

  async incrWithExpiry(key: string, windowMs: number): Promise<number> {
    const now = Date.now();
    this.sweep(now);
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, { count: 1, resetAt: now + windowMs });
      return 1;
    }
    bucket.count += 1;
    return bucket.count;
  }

  async setIfAbsent(key: string, windowMs: number): Promise<boolean> {
    const now = Date.now();
    this.sweep(now);
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    bucket.count += 1;
    return false;
  }
}

/* ---------------------------------------------------------------------- */
/* Upstash / Vercel KV REST store.                                        */
/* ---------------------------------------------------------------------- */

type RedisConfig = { url: string; token: string };

/**
 * Read Redis REST credentials from env. Supports both Upstash's native
 * names and the Vercel KV aliases (Vercel KV is Upstash under the hood
 * and exposes a compatible REST API). Returns null when neither pair is
 * fully set, which is the signal to fall back to in-memory.
 */
function readRedisConfig(): RedisConfig | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (url && token) return { url: url.replace(/\/$/, ""), token };
  return null;
}

class UpstashRateStore implements RateStore {
  // Keep a tiny timeout: a slow Redis must never add noticeable latency
  // to a user request. On timeout we fail open via the in-memory backup.
  private static readonly TIMEOUT_MS = 1500;

  constructor(
    private readonly config: RedisConfig,
    // Backup store used to fail open when Redis is unreachable. We prefer
    // not to block legitimate users over strictly enforcing the limit, so
    // a network/Redis error degrades gracefully to per-instance counting
    // rather than rejecting the request.
    private readonly fallback: RateStore,
  ) {}

  /**
   * Run a single Upstash REST command (pipeline of one). The REST API
   * accepts the command as a path: /INCR/<key> etc. We POST the command
   * as a JSON array body to /pipeline so multiple commands share one
   * round-trip. Throws on any non-ok response so callers fall back.
   */
  private async pipeline(commands: string[][]): Promise<unknown[]> {
    const res = await fetchWithTimeout(`${this.config.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      timeoutMs: UpstashRateStore.TIMEOUT_MS,
    });
    if (!res.ok) {
      throw new Error(`Upstash pipeline failed: ${res.status}`);
    }
    // Pipeline responses are an array of { result } | { error } objects.
    const data = (await res.json()) as Array<{
      result?: unknown;
      error?: string;
    }>;
    return data.map((entry) => {
      if (entry.error) throw new Error(`Upstash command error: ${entry.error}`);
      return entry.result;
    });
  }

  async incrWithExpiry(key: string, windowMs: number): Promise<number> {
    try {
      // INCR returns the new count; on the first hit it returns 1, which
      // is exactly when we attach the TTL so the window expires cleanly.
      const [count] = await this.pipeline([["INCR", key]]);
      const n = typeof count === "number" ? count : Number(count);
      if (n === 1) {
        // PEXPIRE sets the TTL in ms. Fire-and-forget within the same
        // try: if it fails the catch falls back, which is acceptable.
        await this.pipeline([["PEXPIRE", key, String(windowMs)]]);
      }
      return n;
    } catch (err) {
      console.warn("[rateStore] Upstash incr failed, falling back", err);
      return this.fallback.incrWithExpiry(key, windowMs);
    }
  }

  async setIfAbsent(key: string, windowMs: number): Promise<boolean> {
    try {
      // SET key val NX PX <ms>: creates the key only if absent and gives
      // it a TTL atomically. Returns "OK" when created, null otherwise.
      const [result] = await this.pipeline([
        ["SET", key, "1", "NX", "PX", String(windowMs)],
      ]);
      return result === "OK";
    } catch (err) {
      console.warn("[rateStore] Upstash setIfAbsent failed, falling back", err);
      return this.fallback.setIfAbsent(key, windowMs);
    }
  }
}

/* ---------------------------------------------------------------------- */
/* Singleton selection.                                                   */
/* ---------------------------------------------------------------------- */

let store: RateStore | null = null;

/**
 * Return the process-wide RateStore, choosing the implementation once on
 * first call: Upstash/KV when its env is configured, otherwise the
 * in-memory fallback. Without the env this is byte-for-byte the original
 * in-memory behaviour.
 */
export function getRateStore(): RateStore {
  if (store) return store;
  const inMemory = new InMemoryRateStore();
  const redis = readRedisConfig();
  store = redis ? new UpstashRateStore(redis, inMemory) : inMemory;
  return store;
}
