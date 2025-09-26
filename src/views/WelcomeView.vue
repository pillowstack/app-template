<template>
  <article>
    <button @click="setLocalMode" class="top-right-cta"><X /></button>

    <h1>Pillowstack</h1>
    <p>Foundations for hybrid apps</p>

    <footer>
      <TheAuthButton />
      <TheLocalMode v-if="!(isAuthenticated || isLocalMode)" />
    </footer>
  </article>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TheAuthButton from "@/components/auth/TheAuthButton.vue";
import TheLocalMode from "@/components/auth/TheLocalMode.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { useModeStore } from "@/stores/settings/mode";
import { X } from "lucide-vue-next";

const { isAuthenticated } = useAuthStore();
const { isLocalMode, setMode } = useModeStore();

const setLocalMode = () => {
  if (!isLocalMode) {
    setMode("local");
  }
  router.replace({ path: "/" });
};

onMounted(() => {
  console.info(`User authenticated: ${isAuthenticated}`);
  console.info(`Local mode: ${isLocalMode}`);
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables";
@use "@/styles/type";

article {
  align-items: center;
  color: var(--rgba-text);
  display: flex;
  flex-direction: column;
  font-family: variables.$font-family;
  height: 100vh;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  white-space: nowrap;
  width: 100vw;
}

.light {
  article {
    background:
      radial-gradient(circle at 30% 20%, var(--rgb-pink) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, var(--rgb-cyan) 0%, transparent 50%),
      linear-gradient(135deg, var(--rgb-purple), var(--rgb-blue));
  }
}

.dark {
  article {
    background:
      linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 70%)),
      radial-gradient(circle at 30% 20%, var(--rgb-pink) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, var(--rgb-cyan) 0%, transparent 50%),
      linear-gradient(135deg, var(--rgb-purple), var(--rgb-blue));
  }
}

h1 {
  @extend %type-large-title;

  color: var(--rgba-text);
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: variables.$grid;
  text-shadow: 0 0 2px rgb(0 0 0 / 30%);
}

p {
  @extend %type-body;

  color: var(--rgba-text-secondary);
  text-shadow: 0 0 2px rgb(0 0 0 / 30%);
}

footer {
  position: absolute;
  bottom: variables.$grid * 6;
}
</style>
