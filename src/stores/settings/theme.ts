import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import { handleError } from "@/utils/errorHandler";
import { useAuthStore } from "@/stores/auth";
import { httpClient } from "@/services/httpClient";
import { AVAILABLE_THEMES, DEFAULT_THEME, SETTINGS_THEME_KEY } from "@/config";
import type { Theme } from "@pillowstack/shared-template";

export const useThemeStore = defineStore(SETTINGS_THEME_KEY, () => {
  const savedTheme = localStorage.getItem(SETTINGS_THEME_KEY);
  const initialTheme: Theme =
    savedTheme && AVAILABLE_THEMES.includes(savedTheme as Theme)
      ? (savedTheme as Theme)
      : DEFAULT_THEME;
  const currentTheme = ref<Theme>(initialTheme);

  let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

  const theme = computed(() => currentTheme.value);

  const setTheme = async (theme: Theme, isThisTruth?: boolean) => {
    const { isAuthenticated } = useAuthStore();
    try {
      if (isAuthenticated && isThisTruth) {
        await httpClient.put("/me/sync/settings/theme", { theme });
      }
    } catch (error) {
      handleError(error);
    } finally {
      currentTheme.value = theme;
      localStorage.setItem(SETTINGS_THEME_KEY, theme);
      applyTheme(theme);
    }
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    AVAILABLE_THEMES.forEach((t) => root.classList.remove(t));
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(isDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  };

  const setupSystemThemeListener = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQueryListener) {
      mediaQuery.removeEventListener("change", mediaQueryListener);
    }
    mediaQueryListener = () => {
      if (currentTheme.value === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", mediaQueryListener);
  };

  watch(currentTheme, (theme) => {
    if (theme === "system") {
      setupSystemThemeListener();
    } else {
      if (mediaQueryListener) {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.removeEventListener("change", mediaQueryListener);
        mediaQueryListener = null;
      }
    }
  });

  applyTheme(currentTheme.value);

  return {
    theme,
    setTheme,
    currentTheme,
    setupSystemThemeListener,
  };
});
