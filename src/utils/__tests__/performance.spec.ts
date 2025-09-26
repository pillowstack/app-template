import { describe, it, expect, beforeEach } from "vitest";
import { performanceMonitor } from "@/utils/performance";

describe("performanceMonitor", () => {
  beforeEach(() => {
    performanceMonitor.clearMetrics();
  });

  it("records metrics for sync functions", () => {
    const result = performanceMonitor.measure("syncTask", () => 42);
    expect(result).toBe(42);
    const metrics = performanceMonitor.getMetrics();
    expect(metrics.length).toBe(1);
    expect(metrics[0]!.name).toBe("syncTask");
    expect(typeof metrics[0]!.duration).toBe("number");
  });

  it("records metrics for async functions", async () => {
    const result = await performanceMonitor.measureAsync("asyncTask", async () => {
      return Promise.resolve("done");
    });
    expect(result).toBe("done");
    const metrics = performanceMonitor.getMetrics();
    expect(metrics.length).toBe(1);
    expect(metrics[0]!.name).toBe("asyncTask");
  });
});
