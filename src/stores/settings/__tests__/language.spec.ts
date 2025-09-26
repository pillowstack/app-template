import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { SETTINGS_LANGUAGE_KEY } from "@/config";

vi.mock("@/router", () => ({
  updateDocumentTitle: vi.fn(),
}));
vi.mock("@/services/httpClient", () => ({
  httpClient: { put: vi.fn().mockResolvedValue({}) },
}));
vi.mock("@/stores/auth", () => ({
  useAuthStore: () => ({ isAuthenticated: false }),
}));

import { updateDocumentTitle } from "@/router";
import { httpClient } from "@/services/httpClient";
import { useLanguageStore } from "@/stores/settings/language";

describe("useLanguageStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("sets language locally and updates title without API when unauthenticated", async () => {
    const store = useLanguageStore();
    await store.setLanguage("es");
    expect(localStorage.getItem(SETTINGS_LANGUAGE_KEY)).toBe("es");
    expect(updateDocumentTitle).toHaveBeenCalledTimes(1);
    expect(httpClient.put as unknown as Mock).not.toHaveBeenCalled();
  });

  it("calls API when authenticated and isThisTruth is true", async () => {
    vi.resetModules();
    vi.doMock("@/router", () => ({ updateDocumentTitle: vi.fn() }));
    vi.doMock("@/services/httpClient", () => ({
      httpClient: { put: vi.fn().mockResolvedValue({}) },
    }));
    vi.doMock("@/stores/auth", () => ({
      useAuthStore: () => ({ isAuthenticated: true }),
    }));
    const { useLanguageStore: freshUseLanguageStore } = await import("@/stores/settings/language");
    setActivePinia(createPinia());
    const store = freshUseLanguageStore();
    await store.setLanguage("en", true);
    const { httpClient: mocked } = await import("@/services/httpClient");
    expect(localStorage.getItem(SETTINGS_LANGUAGE_KEY)).toBe("en");
    expect(mocked.put as unknown as Mock).toHaveBeenCalledWith("/me/sync/settings/language", {
      language: "en",
    });
  });
});
