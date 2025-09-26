import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { httpClient } from "@/services/httpClient";
import { handleError } from "@/utils/errorHandler";
import { useSetUser } from "@/composables/useSetUser.ts";

export function useSyncUser() {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  const isLoading = ref(false);

  const syncUserData = async () => {
    if (!isAuthenticated) return;
    isLoading.value = true;
    try {
      const { data } = await httpClient.get("/me/sync");
      if (data.token) {
        const { setToken } = useAuthStore();
        await setToken(data.token);
      }

      if (data.user) {
        const { setUser } = useSetUser();
        await setUser(data.user);
      }
    } catch (error) {
      handleError(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    syncUserData,
  };
}
