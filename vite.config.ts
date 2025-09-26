import "dotenv/config";

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

if (process.env.VITE_APP_ENV === "development") {
  // This file is used to check environment variables at build time.
  await import(join(dirname(fileURLToPath(import.meta.url)), "src/config/env.ts"));
  console.log("Environment validated");
}

import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vueJsx(), // vueDevTools(),
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN!,
      org: process.env.SENTRY_ORG!,
      project: process.env.SENTRY_PROJECT!,
      telemetry: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@types": fileURLToPath(new URL("./types", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    host: true,
    origin: process.env.SERVER_ORIGIN!,
    allowedHosts: (process.env.SERVER_ALLOWED_HOSTS || "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean),
  },
});
