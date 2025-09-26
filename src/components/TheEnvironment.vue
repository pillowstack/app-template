<template>
  <ul class="env-info">
    <li>
      MODE: <strong>{{ envVars.mode }}</strong>
    </li>
    <li>
      VITE_APPLE_TEAM_ID: <strong>{{ envVars.viteAppleTeamId }}</strong>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

const envVars = computed(() => ({
  mode: import.meta.env.MODE,
  viteAppleTeamId: import.meta.env.VITE_APPLE_TEAM_ID,
}));

onMounted(() => {
  console.info("Print button clicked");
  console.info(`[ThePrintButton.vue] MODE: ${envVars.value.mode}`);
  console.info(`[ThePrintButton.vue] VITE_APPLE_TEAM_ID: ${envVars.value.viteAppleTeamId}`);
});
</script>

<style lang="scss" scoped>
@use "@/styles/type";
@use "@/styles/variables";

li {
  @extend %type-body;

  margin-bottom: variables.$grid * 0.5;
}
</style>
