<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/stores/settings/language";
import { AVAILABLE_LANGUAGES } from "@/config";
import type { Language } from "@pillowstack/shared-template";

const languageStore = useLanguageStore();

const { t } = useI18n();

// Define the options languages
// computed is used to create a reactive object
// that maps language codes to their labels
const languagesLabels = computed(() => ({
  en: t("English"),
  es: t("Spanish"),
  sr: t("Serbian"),
}));

const changeLanguage = (language: Language) => {
  languageStore.setLanguage(language);
};
</script>

<template>
  <div class="language-settings">
    <h3 class="type-large-title">{{ t("Select Language") }}</h3>
    <div class="language-options">
      <button
        v-for="language in AVAILABLE_LANGUAGES"
        :key="language"
        :class="{ active: languageStore.language === language }"
        @click="changeLanguage(language)"
      >
        {{ languagesLabels[language as Language] }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.language-settings {
  padding: 1rem;
}

.language-options {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &.active {
    background-color: #007bff;
    color: white;
  }
}
</style>
