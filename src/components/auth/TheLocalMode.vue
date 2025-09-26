<template>
  <div class="the-local-mode">
    <button @click="setMode('local')">
      {{ t("continue without account") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useModeStore } from "@/stores/settings/mode";

const { t } = useI18n();
const { setMode } = useModeStore();
</script>

<style lang="scss" scoped>
@use "@/styles/type";
@use "@/styles/variables";

.the-local-mode {
  text-align: center;

  button {
    @extend %type-sub-headline;

    color: var(--rgba-text-secondary);
    display: inline-block;
    padding: variables.$grid 0;
    text-shadow: 0 0 2px rgb(0 0 0 / 50%);
  }
}
</style>
