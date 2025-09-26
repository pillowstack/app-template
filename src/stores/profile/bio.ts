import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { handleError } from "@/utils/errorHandler";
import { useAuthStore } from "@/stores/auth";
import { httpClient } from "@/services/httpClient";
import { PROFILE_BIO_KEY } from "@/config";
import type { Bio } from "@pillowstack/shared-template";

export const useBioStore = defineStore(PROFILE_BIO_KEY, () => {
  const savedBio = localStorage.getItem(PROFILE_BIO_KEY);
  const initialBio: Bio | undefined = savedBio ? JSON.parse(savedBio) : undefined;
  const currentBio = ref<Bio | undefined>(initialBio);

  const bio = computed(() => currentBio.value);

  const setProfileBio = async (bio: Bio, isThisTruth?: boolean) => {
    const { isAuthenticated } = useAuthStore();
    try {
      if (isAuthenticated && isThisTruth) {
        await httpClient.put("/me/sync/profile/bio", { bio });
      }
    } catch (error) {
      handleError(error);
    } finally {
      currentBio.value = bio;
      localStorage.setItem(PROFILE_BIO_KEY, JSON.stringify(bio));
    }
  };

  const clearBio = async () => {
    try {
      await httpClient.delete("/me/sync/bio");
    } catch (error) {
      handleError(error);
    } finally {
      currentBio.value = undefined;
      localStorage.removeItem(PROFILE_BIO_KEY);
    }
  };

  return {
    bio,
    setProfileBio,
    clearBio,
  };
});
