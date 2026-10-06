import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// In-memory fallback for local development or if Upstash is not configured
const memoryStore = new Map();

function memoryRateLimit(ip, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const userRecord = memoryStore.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > userRecord.resetTime) {
    userRecord.count = 0;
    userRecord.resetTime = now + windowMs;
  }

  userRecord.count += 1;
  memoryStore.set(ip, userRecord);

  // Cleanup old records periodically
  if (memoryStore.size > 10000) {
    for (const [key, record] of memoryStore.entries()) {
      if (now > record.resetTime) {
        memoryStore.delete(key);
      }
    }
  }

  return {
    success: userRecord.count <= limit,
    limit,
    remaining: Math.max(0, limit - userRecord.count),
    reset: userRecord.resetTime,
  };
}

let upstashRatelimit = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  !process.env.UPSTASH_REDIS_REST_URL.includes("your-upstash")
) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    upstashRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
      prefix: "growowl:contact_ratelimit",
    });
  } catch (err) {
    console.warn("Failed to initialize Upstash Redis rate limiter, using fallback:", err);
  }
}

/**
 * Check rate limit for a client identifier (IP address)
 * @param {string} identifier - Client IP address
 * @returns {Promise<{success: boolean, limit: number, remaining: number, reset: number}>}
 */
export async function checkRateLimit(identifier) {
  if (upstashRatelimit) {
    try {
      const result = await upstashRatelimit.limit(identifier);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    } catch (err) {
      console.error("Upstash ratelimit error, falling back to in-memory:", err);
    }
  }

  // Fallback to in-memory rate limiter (5 requests per 15 mins)
  return memoryRateLimit(identifier, 5, 15 * 60 * 1000);
}
