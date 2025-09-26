import { describe, it, expect, vi } from "vitest";

vi.mock("@/stores/auth", () => ({
  useAuthStore: () => ({ token: "abc123" }),
}));

vi.mock("@/utils/errorHandler", () => ({
  handleError: vi.fn(),
}));

import { httpClient } from "@/services/httpClient";
import { handleError } from "@/utils/errorHandler";

describe("httpClient", () => {
  it("adds Authorization header when token exists", async () => {
    const res = await httpClient.request({
      url: "/foo",
      method: "get",
      // Use a custom adapter to avoid network; echo back headers
      adapter: async (config) => ({
        data: {},
        status: 200,
        statusText: "OK",
        headers: config.headers,
        config,
      }),
    });
    expect(res.headers?.Authorization).toBe("Bearer abc123");
  });

  it("sets x-www-form-urlencoded for PUT sync endpoints", async () => {
    const res = await httpClient.request({
      url: "/me/sync/settings/theme",
      method: "put",
      data: { theme: "dark" },
      adapter: async (config) => ({
        data: {},
        status: 200,
        statusText: "OK",
        headers: config.headers,
        config,
      }),
    });
    expect(res.headers?.["Content-Type"]).toBe("application/x-www-form-urlencoded");
  });

  it("calls handleError and rejects on error responses", async () => {
    await expect(
      httpClient.request({
        url: "/oops",
        method: "get",
        adapter: async (config) =>
          Promise.reject({
            config,
            response: { status: 500 },
          }),
      }),
    ).rejects.toBeTruthy();
    expect(handleError).toHaveBeenCalled();
  });
});
