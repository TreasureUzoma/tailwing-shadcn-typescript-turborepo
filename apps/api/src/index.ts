import { Elysia, t } from "elysia";
import { bannedUsernames } from "@workspace/validations";
import { rateLimit } from "./middlewares/rate-limit";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { env } from "./env";

// Ensure DB connection (top-level await in Bun)
// console.log("Database URL:", env.DATABASE_URL); // Debug if needed

const app = new Elysia()
  .use(rateLimit) // Global rate limit (or apply per route)
  .get("/", () => "Hello Elysia")
  .get("/health", () => ({ status: "ok" }))
  .get(
    "/check-username",
    async ({ query }) => {
      const username = query.username?.toLowerCase();

      if (!username || username.length < 2) {
        return { available: false, error: "Username too short" };
      }

      // 1. Check Banned List
      if (bannedUsernames.includes(username)) {
        return { available: false, reason: "Username is reserved" };
      }

      // 2. Check Database
      try {
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1);

        if (existingUser.length > 0) {
          return { available: false, reason: "Username is taken" };
        }

        return { available: true };
      } catch (error) {
        console.error("DB Error:", error);
        return { available: false, error: "Internal server error" };
      }
    },
    {
      query: t.Object({
        username: t.String(),
      }),
    }
  )
  .listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
