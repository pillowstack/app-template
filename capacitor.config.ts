import "dotenv/config";
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: process.env.VITE_APPLE_BUNDLE_ID!,
  appName: process.env.VITE_APP_NAME!,
  webDir: "dist",
  loggingBehavior: "debug",
};

export default config;
