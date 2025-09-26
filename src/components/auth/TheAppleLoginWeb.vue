<template>
  <TheAppleLoginButton @click="login" />
</template>

<script setup lang="ts">
import TheAppleLoginButton from "@/components/auth/TheAppleLoginButton.vue";

const login = async () => {
  const params = new URLSearchParams({
    response_type: "code",
    response_mode: "form_post",
    client_id: import.meta.env.VITE_APPLE_SERVICE_ID,
    redirect_uri: import.meta.env.VITE_APPLE_REDIRECT_URI,
    scope: import.meta.env.VITE_APPLE_SCOPE,
  });

  window.location.href = `https://appleid.apple.com/auth/authorize?${params.toString()}`;
};
</script>
