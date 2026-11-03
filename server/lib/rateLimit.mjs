/**
 * Fixed-window, in-memory rate limiter keyed by client IP (IKAS-403).
 * Good enough for a single Node process; use a shared store if you scale out.
 */
export function createRateLimiter({ limit, windowMs }) {
  const hits = new Map();

  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
  }, windowMs);
  sweep.unref();

  return {
    /** Returns { allowed, retryAfterSeconds }. */
    check(key) {
      const now = Date.now();
      let entry = hits.get(key);
      if (!entry || entry.resetAt <= now) {
        entry = { count: 0, resetAt: now + windowMs };
        hits.set(key, entry);
      }
      entry.count += 1;
      return {
        allowed: entry.count <= limit,
        retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
      };
    },
  };
}

/**
 * Resolves the caller's IP. X-Forwarded-For is only honoured when TRUST_PROXY=true,
 * otherwise any client could spoof it to dodge the limiter.
 */
export function clientIp(request, trustProxy) {
  if (trustProxy) {
    const forwarded = request.headers['x-forwarded-for'];
    const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.socket.remoteAddress || 'unknown';
}
