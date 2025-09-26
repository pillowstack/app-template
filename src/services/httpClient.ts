import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { handleError } from "@/utils/errorHandler";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
// Axios configuration to handle PUT requests with x-www-form-urlencoded
// This is necessary so that the backend can correctly process form data
instance.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === "put" && config.url?.startsWith("/me/sync/")) {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  return config;
});

// Add token automatically
instance.interceptors.request.use((config) => {
  const { token } = useAuthStore();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Error handling and token refresh
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;
      // const auth = useAuthStore();
      // await auth.refreshToken();
      // const newToken = auth.token();
      // originalRequest.headers.Authorization = `Bearer ${newToken}`;
      // return instance(originalRequest); // Retry
    }

    handleError(error);
    return Promise.reject(error);
  },
);

export const httpClient = instance;
