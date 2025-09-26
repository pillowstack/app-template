import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { useModeStore } from "@/stores/settings/mode";

router.beforeEach((to, _from, next) => {
  const { isAuthenticated } = useAuthStore();
  const { isLocalMode } = useModeStore();

  console.info(`Checking access for route: ${String(to.name)}`);
  console.info(`User authenticated: ${isAuthenticated}`);
  console.info(`Local mode: ${isLocalMode}`);

  if (to.meta.requiresAuth && !(isAuthenticated || isLocalMode)) {
    console.log(`Access denied to ${String(to.name)} - User not authenticated`);
    next({ name: "welcome" });
  } else {
    next();
  }
});
