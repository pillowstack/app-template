import { ref, computed, watch, nextTick } from "vue";
import { defineStore } from "pinia";
import { AUTH_TOKEN_KEY } from "@/config";

export const useAuthStore = defineStore(AUTH_TOKEN_KEY, () => {
  const token = ref<string | null>(localStorage.getItem(AUTH_TOKEN_KEY));
  const isAuthenticated = computed(() => !!token.value);

  watch(token, (newToken) => {
    if (newToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  });

  const setToken = async (newToken: string) => {
    token.value = newToken;
    await nextTick();
  };

  function clearToken() {
    token.value = null;
  }

  return { token, isAuthenticated, setToken, clearToken };
});
