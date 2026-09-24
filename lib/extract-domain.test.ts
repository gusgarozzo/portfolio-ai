import { describe, it, expect } from "vitest";
import { extractDomain } from "./extract-domain";

describe("extractDomain", () => {
  it("extracts domain from full URL", () => {
    expect(extractDomain("https://www.linkedin.com/in/gusgarozzo/")).toBe(
      "linkedin.com"
    );
  });

  it("strips www prefix", () => {
    expect(extractDomain("https://www.example.com/path")).toBe("example.com");
  });

  it("returns the input string on invalid URL", () => {
    expect(extractDomain("not-a-url")).toBe("not-a-url");
  });
});
