import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";
import {
  DEFAULT_REELS,
  DEFAULT_PROJECTS,
  DEFAULT_CATEGORIES,
  DEFAULT_PRICING,
} from "../data/cms/defaultCmsData.js";

// Upstash Redis Client initialization
let redis = null;
if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN &&
  !process.env.UPSTASH_REDIS_REST_URL.includes("your-database")
) {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (e) {
    console.error("Upstash Redis initialization failed for CMS:", e.message);
  }
}

// In-memory cache for ultra-fast server rendering
const memoryCache = new Map();

export const DEFAULTS = {
  reels: DEFAULT_REELS,
  projects: DEFAULT_PROJECTS,
  categories: DEFAULT_CATEGORIES,
  pricing: DEFAULT_PRICING,
};

/**
 * Get CMS data for a given collection with Redis -> Local JSON -> Default fallback
 */
export async function getCmsData(collection) {
  if (!DEFAULTS[collection]) {
    throw new Error(`Invalid CMS collection: ${collection}`);
  }

  // 1. Check in-memory cache
  if (memoryCache.has(collection)) {
    return memoryCache.get(collection);
  }

  // 2. Check Upstash Redis
  if (redis) {
    try {
      const data = await redis.get(`growowl:cms:${collection}`);
      if (data !== null && data !== undefined) {
        memoryCache.set(collection, data);
        return data;
      }
    } catch (err) {
      console.warn(`Upstash Redis read failed for ${collection}, trying local fallback:`, err.message);
    }
  }

  // 3. Check local JSON file if exists
  try {
    const filePath = path.join(process.cwd(), "src", "data", "cms", `${collection}.json`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileContent);
      memoryCache.set(collection, parsed);
      return parsed;
    }
  } catch {
    // Ignore local read errors on Vercel or ephemeral filesystems
  }

  // 4. Fallback to default seed data
  const defaultData = DEFAULTS[collection];
  memoryCache.set(collection, defaultData);
  return defaultData;
}

/**
 * Save CMS data to Upstash Redis and local JSON file
 */
export async function saveCmsData(collection, data) {
  if (!DEFAULTS[collection]) {
    throw new Error(`Invalid CMS collection: ${collection}`);
  }

  // 1. Update in-memory cache
  memoryCache.set(collection, data);

  // 2. Save to Upstash Redis
  if (redis) {
    try {
      await redis.set(`growowl:cms:${collection}`, data);
    } catch (err) {
      console.error(`Upstash Redis write failed for ${collection}:`, err.message);
    }
  }

  // 3. Save to local JSON file (works in local dev, gracefully skips on read-only environments)
  try {
    const dir = path.join(process.cwd(), "src", "data", "cms");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `${collection}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Graceful skip on read-only hosting environments
  }

  return data;
}

/**
 * Reset CMS data back to original defaults
 */
export async function resetCmsData(collection) {
  if (!DEFAULTS[collection]) {
    throw new Error(`Invalid CMS collection: ${collection}`);
  }

  const defaultData = DEFAULTS[collection];
  memoryCache.set(collection, defaultData);

  if (redis) {
    try {
      await redis.del(`growowl:cms:${collection}`);
    } catch (err) {
      console.error(`Upstash Redis delete failed for ${collection}:`, err.message);
    }
  }

  try {
    const filePath = path.join(process.cwd(), "src", "data", "cms", `${collection}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch {
    // Graceful skip
  }

  return defaultData;
}
