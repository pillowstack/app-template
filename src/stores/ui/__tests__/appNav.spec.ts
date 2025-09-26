import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAppNavStore } from "@/stores/ui/appNav";

describe("useAppNavStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("toggles visibility correctly", () => {
    const store = useAppNavStore();
    expect(store.showAppNav).toBe(true);
    store.hide();
    expect(store.showAppNav).toBe(false);
    store.show();
    expect(store.showAppNav).toBe(true);
    store.toggle();
    expect(store.showAppNav).toBe(false);
  });
});
