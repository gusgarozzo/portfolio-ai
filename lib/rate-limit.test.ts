import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { checkRateLimit } from "./rate-limit";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("checkRateLimit", () => {
  it("allows the first request from an IP", () => {
    const result = checkRateLimit("192.168.1.1");
    expect(result.allowed).toBe(true);
  });

  it("allows up to 20 requests within the window", () => {
    for (let i = 0; i < 20; i++) {
      expect(checkRateLimit("10.0.0.1").allowed).toBe(true);
    }
  });

  it("blocks the 21st request within the window", () => {
    for (let i = 0; i < 20; i++) {
      checkRateLimit("10.0.0.2");
    }
    const result = checkRateLimit("10.0.0.2");
    expect(result.allowed).toBe(false);
  });

  it("resets the window after 10 minutes", () => {
    for (let i = 0; i < 21; i++) {
      checkRateLimit("10.0.0.3");
    }
    expect(checkRateLimit("10.0.0.3").allowed).toBe(false);

    vi.advanceTimersByTime(10 * 60 * 1000 + 1);

    expect(checkRateLimit("10.0.0.3").allowed).toBe(true);
  });

  it("treats different IPs independently", () => {
    for (let i = 0; i < 25; i++) {
      checkRateLimit("10.0.0.4");
    }
    expect(checkRateLimit("10.0.0.4").allowed).toBe(false);
    expect(checkRateLimit("10.0.0.5").allowed).toBe(true);
  });
});
