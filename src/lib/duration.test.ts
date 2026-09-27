import { afterEach, describe, expect, it, vi } from "vitest";
import { formatDuration, monthsSince } from "./duration";

describe("formatDuration", () => {
  it("renders a whole number of years with no remainder as 'X yr'", () => {
    expect(formatDuration(24)).toBe("2 yr");
  });

  it("renders a partial year as 'X yr Y mo'", () => {
    expect(formatDuration(30)).toBe("2 yr 6 mo");
  });

  it("renders under a year as 'X mo'", () => {
    expect(formatDuration(6)).toBe("6 mo");
  });
});

describe("monthsSince", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("counts inclusively from the start month through the current month", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-15T00:00:00"));
    // March 2023 through September 2026 inclusive = 43 months.
    expect(monthsSince("2023-03")).toBe(43);
  });

  it("returns 1 when the start month is the current month", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-03-20T00:00:00"));
    expect(monthsSince("2023-03")).toBe(1);
  });
});
