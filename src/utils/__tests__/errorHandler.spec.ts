import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@sentry/vue", () => ({
  captureException: vi.fn(),
}));

import * as Sentry from "@sentry/vue";
import { AppError, handleError } from "@/utils/errorHandler";

describe("errorHandler", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("AppError extends Error and sets properties", () => {
    const err = new AppError("Boom", "E_BOMB", 500);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("AppError");
    expect(err.message).toBe("Boom");
    expect(err.code).toBe("E_BOMB");
    expect(err.statusCode).toBe(500);
  });

  it("handleError logs and reports to Sentry", () => {
    const e = new Error("oops");
    handleError(e);
    expect(console.error).toHaveBeenCalledWith(e);
    expect(Sentry.captureException).toHaveBeenCalledWith(e);
  });
});
