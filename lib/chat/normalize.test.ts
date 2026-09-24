import { describe, it, expect } from "vitest";
import { normalize, expandSlang, detectLanguage } from "./normalize";

describe("normalize", () => {
  it("removes diacritics, question marks and collapses whitespace", () => {
    expect(normalize("  ¿Qué hacés   en Aiotek??  ")).toBe("que haces en aiotek");
  });

  it("lowercases and trims", () => {
    expect(normalize("Weather API y Gemini")).toBe("weather api y gemini");
  });
});

describe("expandSlang", () => {
  it("expands informal Spanish tokens at boundaries", () => {
    expect(expandSlang("q haces xq?")).toBe("que haces porque");
    expect(expandSlang("contame d tu exp")).toBe("contame de tu exp");
    expect(expandSlang("sabes pa programar?")).toBe("sabes para programar");
  });

  it("leaves normal words untouched", () => {
    expect(expandSlang("que proyectos hiciste")).toBe("que proyectos hiciste");
  });
});

describe("detectLanguage", () => {
  it("detects Spanish", () => {
    expect(detectLanguage("¿Qué proyectos hiciste?")).toBe("es");
    expect(detectLanguage("Contame dónde laburaste")).toBe("es");
    expect(detectLanguage("¿Tenés experiencia con Node?")).toBe("es");
  });

  it("detects English", () => {
    expect(detectLanguage("What projects did you build?")).toBe("en");
    expect(detectLanguage("Tell me about your experience")).toBe("en");
    expect(detectLanguage("Which companies did you work at?")).toBe("en");
  });

  it("uses accents as a Spanish signal", () => {
    expect(detectLanguage("Experiencia con que stack")).toBe("es");
  });
});