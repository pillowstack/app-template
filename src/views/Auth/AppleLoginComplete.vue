<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useSyncUser } from "@/composables/useSyncUser.ts";

const router = useRouter();
const { t } = useI18n();

onMounted(async () => {
  try {
    const url = new URL(window.location.href);
    const jwt = url.searchParams.get("jwt");

    if (jwt) {
      const { setToken } = useAuthStore();
      const { syncUserData } = useSyncUser();
      await setToken(jwt);
      await syncUserData();
      await router.replace({ path: "/" });
    } else {
      await router.replace({ path: "/settings" });
    }
  } catch (error) {
    console.error("Error during Apple login completion", error);
    await router.replace({ path: "/settings" });
  }
});
</script>

<template>
  <Suspense>
    <template #default>
      <div>{{ t("Redirecting") }}</div>
    </template>
    <template #fallback>
      <div>
        <div>{{ t("If you are not redirected automatically") }},</div>
        <div>{{ t("Please click the button below") }}</div>
        <button @click="router.replace({ path: '/' })">{{ t("Go to Home") }}</button>
      </div>
    </template>
  </Suspense>
</template>
