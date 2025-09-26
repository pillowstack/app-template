import { describe, it, expect } from "vitest";
import router, { updateDocumentTitle } from "@/router";

describe("updateDocumentTitle", () => {
  it("sets document.title from route meta + i18n", async () => {
    await router.push("/");
    await router.isReady();
    updateDocumentTitle();
    expect(document.title).toBe("Home | App Template");

    await router.push("/settings");
    updateDocumentTitle();
    expect(document.title).toBe("Settings | App Template");
  });
});
