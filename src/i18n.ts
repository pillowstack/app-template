import { createI18n } from "vue-i18n";
import { watch } from "vue";
import { useLanguageStore } from "@/stores/settings/language";
import type { Language } from "@pillowstack/shared-template";
import en from "@/languages/en";
import es from "@/languages/es";
import sr from "@/languages/sr";
import { DEFAULT_LANGUAGE } from "@/config";

const messages = {
  en,
  es,
  sr,
};

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: DEFAULT_LANGUAGE,
  messages,
});

export function setupI18nLanguageSync() {
  const languageStore = useLanguageStore();

  watch(
    () => languageStore.language,
    (language) => {
      i18n.global.locale.value = language as Language;
    },
    { immediate: true },
  );
}

export default i18n;
