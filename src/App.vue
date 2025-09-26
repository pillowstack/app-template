<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { RouterView } from "vue-router";
import { useThemeStore } from "@/stores/settings/theme.ts";

const handleOnline = () => console.log("You are online!");
const handleOffline = () => console.log("You are offline!");

onMounted(() => {
  const { currentTheme, setupSystemThemeListener } = useThemeStore();
  if (currentTheme === "system") {
    setupSystemThemeListener();
  }
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);
});

onUnmounted(() => {
  window.removeEventListener("online", handleOnline);
  window.removeEventListener("offline", handleOffline);
});
</script>

<template>
  <main id="app" class="safe-area">
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
@use "@/styles/variables";

main {
  background:
    radial-gradient(circle at 50% 10%, var(--rgba-background) 0%, transparent 100%),
    radial-gradient(circle at 80% 20%, var(--rgb-gray-4) 0%, transparent 100%),
    radial-gradient(circle at 50% 80%, var(--rgb-gray-5) 1%, transparent 100%),
    linear-gradient(180deg, var(--rgba-background) 0%, var(--rgb-gray-6) 100%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: left;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  white-space: nowrap;
  width: 100vw;
}
</style>
