import { describe, it, expect } from "vitest";
import { formatPeriod, formatYear } from "./format-date";

describe("formatPeriod", () => {
  it("returns the period string when provided", () => {
    expect(formatPeriod("2020 – 2023")).toBe("2020 – 2023");
  });

  it("returns empty string for null", () => {
    expect(formatPeriod(null)).toBe("");
  });
});

describe("formatYear", () => {
  it("converts number to string", () => {
    expect(formatYear(2026)).toBe("2026");
  });
});
