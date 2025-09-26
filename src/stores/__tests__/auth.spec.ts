import { describe, it, expect, beforeEach } from "vitest";
import { nextTick } from "vue";
import { setActivePinia, createPinia } from "pinia";
import { AUTH_TOKEN_KEY } from "@/config";
import { useAuthStore } from "@/stores/auth";

describe("useAuthStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("initializes from localStorage and updates isAuthenticated", async () => {
    localStorage.setItem(AUTH_TOKEN_KEY, "abc");
    const store = useAuthStore();
    expect(store.isAuthenticated).toBe(true);
    expect(store.token).toBeDefined();
  });

  it("setToken persists and clearToken removes token", async () => {
    const store = useAuthStore();
    await store.setToken("xyz");
    expect(store.isAuthenticated).toBe(true);
    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe("xyz");

    store.clearToken();
    await nextTick();
    expect(store.isAuthenticated).toBe(false);
    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
  });
});
