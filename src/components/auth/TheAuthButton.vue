<template>
  <div>
    <template v-if="isAuthenticated">
      <button @click="logout" class="logout-button">{{ t("Logout") }}</button>
    </template>

    <template v-else>
      <TheAppleLoginNative v-if="isNativeApp" />
      <TheAppleLoginWeb v-else />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Capacitor } from "@capacitor/core";
import { useAuthStore } from "@/stores/auth";
import TheAppleLoginWeb from "@/components/auth/TheAppleLoginWeb.vue";
import TheAppleLoginNative from "@/components/auth/TheAppleLoginNative.vue";
import { LOGOUT_URL } from "@/config";

const { t } = useI18n();
const { clearToken, isAuthenticated } = useAuthStore();
const isNativeApp = Capacitor.isNativePlatform();

const logout = () => {
  clearToken();
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = LOGOUT_URL;
};
</script>

<style lang="scss" scoped>
.logout-button {
  background-color: transparent;
  border: none;
  color: var(--rgba-text);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
