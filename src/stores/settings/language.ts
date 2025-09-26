import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { updateDocumentTitle } from "@/router";
import { handleError } from "@/utils/errorHandler";
import { useAuthStore } from "@/stores/auth";
import { httpClient } from "@/services/httpClient";
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE, SETTINGS_LANGUAGE_KEY } from "@/config";
import type { Language } from "@pillowstack/shared-template";

export const useLanguageStore = defineStore(SETTINGS_LANGUAGE_KEY, () => {
  const savedLanguage = localStorage.getItem(SETTINGS_LANGUAGE_KEY);
  const initialLanguage: Language =
    savedLanguage && AVAILABLE_LANGUAGES.includes(savedLanguage as Language)
      ? (savedLanguage as Language)
      : DEFAULT_LANGUAGE;
  const currentLanguage = ref<Language>(initialLanguage);

  const language = computed(() => currentLanguage.value);

  const setLanguage = async (language: Language, isThisTruth?: boolean) => {
    const { isAuthenticated } = useAuthStore();
    try {
      if (isAuthenticated && isThisTruth) {
        await httpClient.put("/me/sync/settings/language", { language });
      }
    } catch (error) {
      handleError(error);
    } finally {
      currentLanguage.value = language;
      localStorage.setItem(SETTINGS_LANGUAGE_KEY, language);
      updateDocumentTitle();
    }
  };

  return {
    language,
    setLanguage,
  };
});
