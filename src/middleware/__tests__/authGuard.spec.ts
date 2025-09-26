import { describe, it, expect, vi } from "vitest";

// Mock stores for precise control
vi.mock("@/stores/auth", () => ({
  useAuthStore: () => ({ isAuthenticated: false }),
}));
vi.mock("@/stores/settings/mode", () => ({
  useModeStore: () => ({ isLocalMode: false }),
}));

describe("authGuard", () => {
  it("redirects unauthenticated users to welcome for protected routes", async () => {
    vi.resetModules();
    const router = (await import("@/router")).default;
    await import("@/middleware/authGuard");

    await router.push("/");
    await router.isReady();
    // Guard should redirect to welcome
    expect(router.currentRoute.value.name).toBe("welcome");
  });

  it("allows navigation when authenticated", async () => {
    vi.resetModules();
    vi.doMock("@/stores/auth", () => ({
      useAuthStore: () => ({ isAuthenticated: { value: true } }),
    }));
    vi.doMock("@/stores/settings/mode", () => ({
      useModeStore: () => ({ isLocalMode: false }),
    }));

    const router = (await import("@/router")).default;
    await import("@/middleware/authGuard");
    await router.push("/");
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("home");
  });
});
