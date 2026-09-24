import { describe, it, expect } from "vitest";
import { extractHints } from "./intents";

describe("extractHints", () => {
  it("detects the identity entity", () => {
    const hints = extractHints("¿Quién es Gustavo Garozzo?", "es");
    expect(hints.hadEntity).toBe(true);
    expect(hints.entities).toContain("identity");
    expect(hints.intentHints).toContain("identity");
  });

  it("detects aiotek from experience", () => {
    const hints = extractHints("Contame qué hizo en Aiotek", "es");
    expect(hints.entities).toContain("aiotek");
    expect(hints.intentHints).toContain("aiotek");
  });

  it("maps qwavee ids from both experience rows", () => {
    const hints = extractHints("Tell me about Qwavee IT", "en");
    expect(hints.entities).toContain("qwavee");
    expect(hints.intentHints).toContain("qwavee");
  });

  it("detects project entities by name (es/en)", () => {
    const es = extractHints("¿Qué es Barking Dogs?", "es");
    expect(es.entities).toContain("barking-dogs");
    const en = extractHints("What is the Weather API?", "en");
    expect(en.entities).toContain("weather-api");
    expect(en.hadEntity).toBe(true);
  });

  it("expands slang before entity matching", () => {
    const hints = extractHints("q haces con el weather api?", "es");
    expect(hints.entities).toContain("weather-api");
  });

  it("maps learning-tier skills to the learning intent", () => {
    const kubernetes = extractHints("¿Qué experiencia tenés con Kubernetes?", "es");
    expect(kubernetes.intentHints).toContain("learning");

    const terraform = extractHints("¿Sabés Terraform?", "es");
    expect(terraform.intentHints).toContain("learning");
  });

  it("maps core skills to their intents", () => {
    const node = extractHints("¿Qué sabés de Node.js?", "es");
    expect(node.intentHints).toContain("node");

    const aws = extractHints("How much AWS do you know?", "en");
    expect(aws.intentHints).toContain("aws");

    const gcp = extractHints("¿Qué usaste de Google Cloud?", "es");
    expect(gcp.intentHints).toContain("gcp");
  });

  it("keeps weather reference primed for the weather-api intent", () => {
    const hints = extractHints("¿Qué construiste con Gemini y el clima?", "es");
    expect(hints.intentHints).toContain("weather-api");
  });
});