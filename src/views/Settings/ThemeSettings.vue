<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/settings/theme";
import { AVAILABLE_THEMES } from "@/config";
import type { Theme } from "@pillowstack/shared-template";

const themeStore = useThemeStore();

const { t } = useI18n();

// Define the options themes
// computed is used to create a reactive object
// that maps language codes to their labels
const themeLabels = computed(() => ({
  system: t("System Default"),
  light: t("Light Mode"),
  dark: t("Dark Mode"),
  "increased-contrast-light": t("High Contrast Light"),
  "increased-contrast-dark": t("High Contrast Dark"),
}));

const changeTheme = (theme: Theme) => {
  themeStore.setTheme(theme);
};
</script>

<template>
  <div class="theme-settings">
    <h3 class="type-large-title">{{ t("Select Theme") }}</h3>
    <div class="theme-options">
      <button
        v-for="theme in AVAILABLE_THEMES"
        :key="theme"
        :class="{ active: themeStore.theme === theme }"
        @click="changeTheme(theme)"
      >
        {{ themeLabels[theme as Theme] }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-settings {
  padding: 1rem;
}

.theme-options {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
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
