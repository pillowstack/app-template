import { config } from "dotenv";
config(); // Loads .env into process.env

import { z } from "zod";

const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1, "VITE_APP_NAME is required"),
  VITE_APP_VERSION: z.string().min(1, "VITE_APP_VERSION is required"),
  VITE_APP_ENV: z.string().min(1, "VITE_APP_ENV is required"),
  VITE_API_URL: z.string().regex(/^https?:\/\/.+/, "VITE_API_URL must be a valid URL"),
  VITE_API_WS_URI: z.string().regex(/^wss?:\/\/.+/, "VITE_API_WS_URI must be a valid wss URI"),
  VITE_APPLE_TEAM_ID: z.string().min(1, "VITE_APPLE_TEAM_ID is required"),
  VITE_APPLE_BUNDLE_ID: z.string().min(1, "VITE_APPLE_BUNDLE_ID is required"),
  VITE_APPLE_SERVICE_ID: z.string().min(1, "VITE_APPLE_SERVICE_ID is required"),
  VITE_APPLE_REDIRECT_URI: z
    .string()
    .regex(/^https?:\/\/.+/, "VITE_APPLE_REDIRECT_URI must be a valid URL"),
  VITE_APPLE_SCOPE: z.string().min(3, "VITE_APPLE_SCOPE is required"),
  SERVER_ORIGIN: z.string().optional(),
  SERVER_ALLOWED_HOSTS: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  VITE_SENTRY_DSN: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
