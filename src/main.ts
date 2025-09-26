import "@/styles/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import "@/middleware/authGuard";
import i18n, { setupI18nLanguageSync } from "@/i18n";
import ws from "@/plugins/ws";
import * as Sentry from "@sentry/vue";
import { useAuthStore } from "@/stores/auth.ts";
import { useSyncUser } from "@/composables/useSyncUser.ts";

const app = createApp(App);

if (import.meta.env.MODE === "production" && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
  });
}

app.use(createPinia());

app.use(i18n);
setupI18nLanguageSync();

app.use(router);
app.use(ws);

const { isAuthenticated } = useAuthStore();
if (isAuthenticated) {
  // Automatically sync user data if authenticated
  // This is useful for initial data load, e.g., when the app starts
  // and the user is already logged in.
  const { syncUserData } = useSyncUser();
  syncUserData().then(console.log);
}

app.mount("#app");
