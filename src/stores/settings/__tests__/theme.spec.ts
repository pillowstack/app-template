import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { setActivePinia, createPinia } from "pinia";

// Unauthenticated by default to avoid API calls
vi.mock("@/stores/auth", () => ({
  useAuthStore: () => ({ isAuthenticated: false }),
}));

// Provide a mock httpClient to observe calls when needed
vi.mock("@/services/httpClient", () => ({
  httpClient: { put: vi.fn().mockResolvedValue({}) },
}));

import { useThemeStore } from "@/stores/settings/theme";
import { SETTINGS_THEME_KEY } from "@/config";

describe("useThemeStore", () => {
  let listeners: Array<(e: MediaQueryListEvent) => void> = [];
  let isDarkMode = true;

  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.className = "";
    listeners = [];
    isDarkMode = true;
    // Mock matchMedia with listener capturing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).matchMedia = vi.fn().mockImplementation((query: string) => {
      return {
        matches: query.includes("dark") ? isDarkMode : !isDarkMode,
        media: query,
        onchange: null,
        addEventListener: vi.fn((_: string, cb: (e: MediaQueryListEvent) => void) => {
          listeners.push(cb);
        }),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      } as unknown as MediaQueryList;
    });
    vi.clearAllMocks();
  });

  it("applies light theme and persists", async () => {
    const store = useThemeStore();
    await store.setTheme("light");
    expect(localStorage.getItem(SETTINGS_THEME_KEY)).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("applies system theme and reacts to system change", async () => {
    const store = useThemeStore();
    await store.setTheme("system");
    store.setupSystemThemeListener();
    // initial mock has matches true for dark query -> dark class expected
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Simulate system theme change by calling the stored listener
    isDarkMode = false;
    listeners.forEach((cb) => cb({ matches: false } as MediaQueryListEvent));
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("syncs to API when authenticated and flag is true", async () => {
    vi.resetModules();
    vi.doMock("@/stores/auth", () => ({
      useAuthStore: () => ({ isAuthenticated: true }),
    }));
    vi.doMock("@/services/httpClient", () => ({
      httpClient: { put: vi.fn().mockResolvedValue({}) },
    }));
    const { useThemeStore: freshUseThemeStore } = await import("@/stores/settings/theme");
    setActivePinia(createPinia());
    const s = freshUseThemeStore();
    await s.setTheme("dark", true);
    const { httpClient: mocked } = await import("@/services/httpClient");
    expect(mocked.put as unknown as Mock).toHaveBeenCalledWith("/me/sync/settings/theme", {
      theme: "dark",
    });
  });
});
