import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

export default {
  install() {
    const { isAuthenticated, token } = useAuthStore();
    const isLoading = ref(false);
    let ws: WebSocket | null = null;

    const initWebSocket = () => {
      if (!isAuthenticated || ws) return;

      ws = new WebSocket(`${import.meta.env.VITE_API_WS_URI}?token=${token}`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "profile_updated") {
        }
      };

      ws.onclose = () => {
        setTimeout(initWebSocket, 5000);
      };
    };

    const cleanup = () => {
      if (ws) {
        ws.close();
        ws = null;
      }
    };

    watch(
      () => isAuthenticated,
      (newState) => {
        if (newState) {
          initWebSocket();
        } else {
          cleanup();
        }
      },
      { immediate: true },
    );

    return {
      isLoading,
      initWebSocket,
      cleanup,
    };
  },
};
