<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAppNavStore } from "@/stores/ui/appNav.js";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const appNavStore = useAppNavStore();
</script>

<template>
  <transition name="slide-up">
    <nav v-show="appNavStore.showAppNav" class="type-footnote">
      <RouterLink to="/">{{ t("Home") }}</RouterLink>
      <RouterLink to="/about">{{ t("About") }}</RouterLink>
      <RouterLink to="/settings">{{ t("Settings") }}</RouterLink>
    </nav>
  </transition>
</template>

<style lang="scss" scoped>
@use "@/styles/variables";

nav {
  display: grid;
  gap: variables.$grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  padding: variables.$grid;
  text-align: center;

  a {
    background: blue;
    display: block;
    padding: variables.$grid;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.slide-up-enter-active {
  transform: translateY(100%);
  transition: transform variables.$transition-slide-up;
}

.slide-up-enter-to {
  transform: translateY(0%);
}

.slide-up-leave-active {
  transform: translateY(0%);
  transition: transform variables.$transition-slide-up;
}

.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
