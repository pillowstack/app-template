<template>
  <TheAppleLoginButton @click="login" />
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { httpClient } from "@/services/httpClient.ts";
import { useSyncUser } from "@/composables/useSyncUser.ts";
import { handleError } from "@/utils/errorHandler.ts";
import TheAppleLoginButton from "@/components/auth/TheAppleLoginButton.vue";

const login = async () => {
  const { SignInWithApple } = await import("@capacitor-community/apple-sign-in");
  try {
    const result = await SignInWithApple.authorize({
      scopes: import.meta.env.VITE_APPLE_SCOPE!,
      redirectURI: "",
      clientId: import.meta.env.VITE_APPLE_BUNDLE_ID!,
    });

    try {
      const identityToken = result?.response.identityToken;
      if (!identityToken) {
        handleError("identityToken was not received");
        return;
      }

      const response = await httpClient.put("/auth/apple/token", {
        identityToken,
      });

      if (!response || !response.data) {
        handleError("No response received from the server");
        return;
      }

      console.log("Server response:", response.data);

      const { token, user } = response.data;

      console.log(token ? "Token received" : "Token was not received");
      console.log(user ? "User received" : "User was not received");

      if (token) {
        const { setToken } = useAuthStore();
        await setToken(token);
      }

      const { syncUserData } = useSyncUser();
      await syncUserData();
    } catch (error) {
      handleError(`Error obtaining identityToken ${error}`);
      return;
    }
  } catch (err) {
    handleError(`Error in native Apple login: ${err}`);
  }
};
</script>
