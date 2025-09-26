import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { AVAILABLE_MODES, DEFAULT_MODE, LOGIN_URL, LOGOUT_URL, SETTINGS_MODE_KEY } from "@/config";
import type { Mode } from "@pillowstack/shared-template";
import { useAuthStore } from "@/stores/auth.ts";

export const useModeStore = defineStore(SETTINGS_MODE_KEY, () => {
  const savedMode = localStorage.getItem(SETTINGS_MODE_KEY);
  const initialMode: Mode =
    savedMode && AVAILABLE_MODES.includes(savedMode as Mode) ? (savedMode as Mode) : DEFAULT_MODE;
  const currentMode = ref<Mode>(initialMode);
  const isLocalMode = computed(() => currentMode.value === "local");

  const { clearToken } = useAuthStore();

  const setMode = async (mode: Mode) => {
    clearToken();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = LOGIN_URL!;
    currentMode.value = mode;
    localStorage.setItem(SETTINGS_MODE_KEY, mode);
  };

  const removeMode = async () => {
    clearToken();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = LOGOUT_URL!;
  };

  return {
    setMode,
    removeMode,
    isLocalMode,
  };
});
