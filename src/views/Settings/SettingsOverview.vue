<template>
  <button @click="router.replace({ path: '/' })" class="top-right-cta"><X /></button>
  <h1 class="view-title">{{ t("Settings") }}</h1>
  <SettingsItem link="/settings/language">
    <template #icon>
      <Languages />
    </template>
    <template #heading>{{ t("Language") }}</template>
    <ChevronRight />
  </SettingsItem>

  <SettingsItem link="/settings/theme">
    <template #icon>
      <Palette />
    </template>
    <template #heading>{{ t("Theme") }}</template>
    <ChevronRight />
  </SettingsItem>

  <div>
    <TheAuthButton />
  </div>

  <router-view />
</template>

<script setup lang="ts">
import SettingsItem from "@/components/SettingsItem.vue";
import { ChevronRight, Languages, Palette, X } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import TheAuthButton from "@/components/auth/TheAuthButton.vue";
import router from "@/router";

const { t } = useI18n();
</script>
