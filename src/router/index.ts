import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import settingsRoutes from "@/router/settings.ts";
import authRoutes from "@/router/auth";
import i18n from "@/i18n";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
        title: "Home",
      },
    },
    {
      path: "/welcome",
      name: "welcome",
      component: WelcomeView,
      meta: {
        requiresAuth: false,
        title: "Welcome",
      },
    },
    settingsRoutes,
    authRoutes,
  ],
});

export function updateDocumentTitle() {
  const nearestWithTitle = router.currentRoute.value.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  if (nearestWithTitle) {
    const rawTitle = nearestWithTitle.meta.title as string;
    document.title = `${i18n.global.t(rawTitle)} | App Template`;
  }
}

router.afterEach(updateDocumentTitle);

export default router;
