/**
 * fetch() with an enforced timeout. If the upstream doesn't respond
 * within `timeoutMs` (default 5s) the request is aborted and the
 * underlying promise rejects with AbortError. Caller-supplied
 * AbortSignal still works — the request aborts when either fires.
 *
 * Used by telegram / notion / email helpers so a slow upstream can't
 * pin a route handler for the full platform timeout.
 */

type Init = RequestInit & { timeoutMs?: number };

export function fetchWithTimeout(url: string, init: Init = {}): Promise<Response> {
  const { timeoutMs = 5000, signal, ...rest } = init;

  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const merged = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  return fetch(url, { ...rest, signal: merged });
}
