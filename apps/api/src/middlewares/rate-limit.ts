import { redis } from "../redis";
import { Elysia } from "elysia";

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 20;

export const rateLimit = new Elysia().derive(async ({ request, set }) => {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const key = `rate-limit:${ip}`;

  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, WINDOW_SIZE_IN_SECONDS);
  }

  if (requests > MAX_REQUESTS) {
    set.status = 429;
    throw new Error("Too many requests");
  }

  return { ip };
});
