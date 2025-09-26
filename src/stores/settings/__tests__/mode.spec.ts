import { describe, it, expect, beforeEach, afterAll, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { SETTINGS_MODE_KEY } from "@/config";

vi.mock("@/stores/auth", () => ({
  useAuthStore: () => ({ clearToken: vi.fn() }),
}));

import { useModeStore } from "@/stores/settings/mode";

describe("useModeStore", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    sessionStorage.clear();
    // Stub window.location to allow assigning href
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = { href: "about:blank" } as any;
  });

  it("setMode clears storage, navigates and persists mode", async () => {
    const store = useModeStore();
    await store.setMode("local");
    expect(localStorage.getItem(SETTINGS_MODE_KEY)).toBe("local");
    expect(window.location.href).toBe("/");
    expect(store.isLocalMode).toBe(true);
  });

  it("removeMode clears and navigates to logout url", async () => {
    const store = useModeStore();
    await store.removeMode();
    expect(window.location.href).toBe("/");
  });

  // Restore original location after all tests to avoid leaking state
  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = originalLocation;
  });
});
