import { Redis } from '@upstash/redis';

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

// Create a flag to check if Redis is properly configured
export const isRedisConfigured = !!(url && token);

if (!isRedisConfigured) {
    console.warn("⚠️ Upstash Redis environment variables are missing. Redis functionality is disabled.");
}

// Export the client or a dummy if not configured
export const redis = isRedisConfigured
    ? new Redis({ url: url!, token: token! })
    : null;
