import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { handleError } from "@/utils/errorHandler";
import { useAuthStore } from "@/stores/auth";
import { httpClient } from "@/services/httpClient";
import { PROFILE_NAME_KEY } from "@/config";
import type { Name } from "@pillowstack/shared-template";

export const useNameStore = defineStore(PROFILE_NAME_KEY, () => {
  const savedName = localStorage.getItem(PROFILE_NAME_KEY);
  const initialName: Name | undefined = savedName ? (savedName as Name) : undefined;
  const currentName = ref<Name | undefined>(initialName);

  const name = computed(() => currentName.value);

  const setProfileName = async (name: Name, isThisTruth?: boolean) => {
    const { isAuthenticated } = useAuthStore();
    try {
      if (isAuthenticated && isThisTruth) {
        await httpClient.put("/me/sync/name", { name });
      }
    } catch (error) {
      handleError(error);
    } finally {
      if (!name || name.trim().length === 0) {
        try {
          await clearName();
        } catch (error) {
          handleError(error);
        }
      } else {
        currentName.value = name;
        localStorage.setItem(PROFILE_NAME_KEY, name);
      }
    }
  };

  const clearName = async () => {
    try {
      await httpClient.delete("/me/sync/name");
    } catch (error) {
      handleError(error);
    } finally {
      currentName.value = undefined;
      localStorage.removeItem(PROFILE_NAME_KEY);
    }
  };

  return {
    name,
    setProfileName,
    clearName,
  };
});
