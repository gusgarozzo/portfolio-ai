import { describe, it, expect } from "vitest";
import { scoreLevel, scoreColor } from "./score-color";

describe("scoreLevel", () => {
  it("returns high for score >= 90", () => {
    expect(scoreLevel(95)).toBe("high");
    expect(scoreLevel(100)).toBe("high");
    expect(scoreLevel(90)).toBe("high");
  });

  it("returns medium for score >= 70 and < 90", () => {
    expect(scoreLevel(85)).toBe("medium");
    expect(scoreLevel(70)).toBe("medium");
  });

  it("returns low for score < 70", () => {
    expect(scoreLevel(50)).toBe("low");
    expect(scoreLevel(0)).toBe("low");
    expect(scoreLevel(69)).toBe("low");
  });
});

describe("scoreColor", () => {
  it("returns green classes for high scores", () => {
    expect(scoreColor(95)).toContain("green");
    expect(scoreColor(100)).toContain("green");
  });

  it("returns yellow classes for medium scores", () => {
    expect(scoreColor(85)).toContain("yellow");
    expect(scoreColor(70)).toContain("yellow");
  });

  it("returns red classes for low scores", () => {
    expect(scoreColor(50)).toContain("red");
    expect(scoreColor(0)).toContain("red");
  });
});
