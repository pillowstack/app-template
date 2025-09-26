<template>
  <button @click="router.replace({ path: '/settings' })" class="top-right-cta"><Settings /></button>
  <h1 class="view-title">{{ t("Home") }}</h1>
  <TheEnvironment />
</template>

<script setup lang="ts">
import router from "@/router";
import { Settings } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import TheEnvironment from "@/components/TheEnvironment.vue";

const { t } = useI18n();
</script>
