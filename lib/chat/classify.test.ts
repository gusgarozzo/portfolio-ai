import { describe, it, expect } from "vitest";
import { parseClassification, validIntentToken } from "./classify";

describe("parseClassification", () => {
  it("parses a valid JSON classification", () => {
    const parsed = parseClassification(
      '{"scope":"in","intent":"weather-api","intents":["weather-api"],"language":"es","reason":"proyecto propio"}',
    );
    expect(parsed?.scope).toBe("in");
    expect(parsed?.intent).toBe("weather-api");
    expect(parsed?.intents).toContain("weather-api");
    expect(parsed?.language).toBe("es");
    expect(parsed?.reason).toBe("proyecto propio");
  });

  it("accepts 'out' scope", () => {
    const parsed = parseClassification(
      '{"scope":"out","intent":"weather-forecast","intents":[],"language":"es"}',
    );
    expect(parsed?.scope).toBe("out");
  });

  it("cleans up prose-wrapped JSON", () => {
    const parsed = parseClassification(
      'Here you go: {"scope":"in","intent":"x","intents":["x"],"language":"en"} end',
    );
    expect(parsed?.scope).toBe("in");
    expect(parsed?.language).toBe("en");
  });

  it("returns null for malformed output", () => {
    expect(parseClassification("just words")).toBeNull();
    expect(parseClassification("{}")).toBeNull();
    expect(parseClassification('{"scope":"maybe"}')).toBeNull();
    expect(parseClassification("")).toBeNull();
  });

  it("caps intents and filters non-strings", () => {
    const parsed = parseClassification(
      '{"scope":"in","intent":"a","intents":["a","b","c","d","e","f","g",42],"language":"es"}',
    );
    expect(parsed?.intents.length).toBeLessThanOrEqual(6);
    expect(parsed?.intents.some((i) => typeof i !== "string")).toBe(false);
  });
});

describe("validIntentToken", () => {
  it("recognizes known intents", () => {
    expect(validIntentToken("aiotek")).toBe(true);
    expect(validIntentToken("weather-api")).toBe(true);
    expect(validIntentToken("out-of-scope")).toBe(true);
  });

  it("rejects unknown utterances", () => {
    expect(validIntentToken("weather forecast today")).toBe(false);
    expect(validIntentToken("")).toBe(false);
  });
});