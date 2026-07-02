import { describe, it, expect } from "vitest";
import { buildCvContext } from "./build-cv-context";

const output = buildCvContext();

describe("buildCvContext", () => {
  it("includes both locale sections", () => {
    expect(output).toContain("--- ES ---");
    expect(output).toContain("--- EN ---");
  });

  it("includes personal data fields", () => {
    expect(output).toContain("Name:");
    expect(output).toContain("Title:");
    expect(output).toContain("Location:");
  });

  it("includes section headers", () => {
    expect(output).toContain("Summary:");
    expect(output).toContain("Experience:");
    expect(output).toContain("Skills:");
    expect(output).toContain("Certifications:");
    expect(output).toContain("Education:");
  });

  it("contains actual data values (not empty)", () => {
    expect(output.length).toBeGreaterThan(500);
  });

  it("includes About section", () => {
    expect(output).toContain("About:");
  });
});
