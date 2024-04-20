import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),

    EVENT_REDIS_URI: z.string().url().optional(),
    EVENT_REDIS_MODE: z.enum(["single", "cluster"]).default("single"),

    REDIS_URI: z.string().url().optional(),
    REDIS_MODE: z.enum(["single", "cluster"]).default("single"),

    PERSISTENT_REDIS_URI: z.string().url().optional(),
    PERSISTENT_REDIS_MODE: z.enum(["single", "cluster"]).default("single"),

    S3_STORAGE_BUCKET: z.string().optional(),
    S3_STORAGE_REGION: z.string().optional(),
    S3_STORAGE_ACCESS_KEY: z.string().optional(),
    S3_STORAGE_SECRET_KEY: z.string().optional(),
    S3_STORAGE_ENDPOINT: z.string().optional(),
    S3_STORAGE_PORT: z.number().optional(),
    S3_STORAGE_SECURE: z.boolean().optional(),

    NEXT_PUBLIC_RESOURCES_URL: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    EVENT_REDIS_URI: process.env.EVENT_REDIS_URI,
    EVENT_REDIS_MODE: process.env.EVENT_REDIS_MODE,
    REDIS_URI: process.env.REDIS_URI,
    REDIS_MODE: process.env.REDIS_MODE,
    PERSISTENT_REDIS_URI: process.env.PERSISTENT_REDIS_URI,
    PERSISTENT_REDIS_MODE: process.env.PERSISTENT_REDIS_MODE,
    S3_STORAGE_BUCKET: process.env.S3_STORAGE_BUCKET,
    S3_STORAGE_REGION: process.env.S3_STORAGE_REGION,
    S3_STORAGE_ACCESS_KEY: process.env.S3_STORAGE_ACCESS_KEY,
    S3_STORAGE_SECRET_KEY: process.env.S3_STORAGE_SECRET_KEY,
    S3_STORAGE_ENDPOINT: process.env.S3_STORAGE_ENDPOINT,
    S3_STORAGE_PORT: process.env.S3_STORAGE_PORT,
    S3_STORAGE_SECURE: process.env.S3_STORAGE_SECURE,
    NEXT_PUBLIC_RESOURCES_URL: process.env.NEXT_PUBLIC_RESOURCES_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
