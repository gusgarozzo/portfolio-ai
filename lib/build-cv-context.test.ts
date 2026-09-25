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

  it("includes contact fields", () => {
    expect(output).toContain("Contact:");
    expect(output).toContain("Email:");
    expect(output).toContain("LinkedIn:");
    expect(output).toContain("GitHub:");
  });

  it("includes section headers", () => {
    expect(output).toContain("Summary:");
    expect(output).toContain("Experience:");
    expect(output).toContain("Skills:");
    expect(output).toContain("Certifications:");
    expect(output).toContain("Education:");
    expect(output).toContain("Recommendations:");
  });

  it("includes skill tiers and project categories", () => {
    expect(output).toContain("Core:");
    expect(output).toContain("Supporting:");
    expect(output).toContain("Learning / conceptual:");
    expect(output).toContain("AI Engineering (in development):");
    expect(output).toContain("Category:");
  });

  it("contains actual data values (not empty)", () => {
    expect(output.length).toBeGreaterThan(500);
  });

  it("includes About section", () => {
    expect(output).toContain("About:");
  });
});
