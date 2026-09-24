import { describe, it, expect } from "vitest";
import { gateExternalAccess } from "./gate";
import { checkGuard } from "./guard";
import { extractHints } from "./intents";

function gateFor(text: string) {
  const guard = checkGuard(text);
  const hints = extractHints(text, guard.language);
  return gateExternalAccess(text, hints);
}

describe("gateExternalAccess", () => {
  it("flags clearly external requests as out", () => {
    expect(gateFor("Explicame Kubernetes")).toBe("out");
    expect(gateFor("¿El dólar sube o baja?")).toBe("out");
    expect(gateFor("Write me a Python script to scrape a website")).toBe("out");
    expect(gateFor("What is Bitcoin?")).toBe("out");
    expect(gateFor("Can you translate this sentence to French?")).toBe("out");
  });

  it("flags generic recommendations and opinions as out", () => {
    expect(gateFor("¿Cuál es el mejor proveedor de cloud para startups?")).toBe("out");
    expect(gateFor("What is the best AI tool for designers?")).toBe("out");
    expect(gateFor("¿Qué opinás de React?")).toBe("out");
    expect(gateFor("¿Qué opinás de Node comparado con Deno?")).toBe("out");
    expect(gateFor("Explain the best practices for API design in general")).toBe("out");
    expect(gateFor("Como desarrollador, ¿qué estudiarías en 2026?")).toBe("out");
    expect(gateFor("Tell me a joke")).toBe("out");
  });

  it("flags cooking and currency requests as out", () => {
    expect(gateFor("Contame una receta de milanesas")).toBe("out");
  });

  it("skips questions that reference Gustavo explicitly", () => {
    expect(gateFor("¿Qué es el proyecto Weather API?")).toBe("skip");
    expect(gateFor("¿Qué es Barking Dogs?")).toBe("skip");
    expect(gateFor("What is the Weather API?")).toBe("skip");
    expect(gateFor("What is your tech stack?")).toBe("skip");
    expect(gateFor("What are your hobbies?")).toBe("skip");
    expect(gateFor("¿Qué es structured outputs y tool calling?")).toBe("skip");
    expect(gateFor("¿Usás TypeScript en producción?")).toBe("skip");
    expect(gateFor("What are you currently learning?")).toBe("skip");
    expect(gateFor("What is your LinkedIn?")).toBe("skip");
  });

  it("skips content without external-request cues", () => {
    expect(gateFor("¿Qué sabés de AWS?")).toBe("skip");
    expect(gateFor("Contame dónde laburaste")).toBe("skip");
    expect(gateFor("Hola")).toBe("skip");
  });

  it("flags geography, forecast and news as out", () => {
    expect(gateFor("¿Cuál es la capital de Francia?")).toBe("out");
    expect(gateFor("What is the capital of France?")).toBe("out");
    expect(gateFor("¿Cómo está el tiempo en Buenos Aires?")).toBe("out");
    expect(gateFor("¿Cómo está el clima hoy?")).toBe("out");
    expect(gateFor("What is the weather today?")).toBe("out");
    expect(gateFor("¿Quién ganó la última carrera de F1?")).toBe("out");
  });

  it("keeps project and weather-data questions out of the gate", () => {
    expect(gateFor("¿Qué construiste con Gemini y el clima?")).toBe("skip");
    expect(gateFor("What did you build involving weather data and LLMs?")).toBe("skip");
    expect(gateFor("What did you do with weather?")).toBe("skip");
    expect(gateFor("Weather API")).toBe("skip");
  });
});