import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { messages } from "./messages";

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const ROOT = process.cwd();
const SOURCE_FILES = ["components", "app"].flatMap((dir) =>
  walk(join(ROOT, dir)).filter((path) => /\.(ts|tsx)$/.test(path)),
);

describe("i18n integration", () => {
  it("every messages key has a non-empty value in both locales", () => {
    for (const [key, pair] of Object.entries(messages)) {
      expect(pair.es.trim(), `${key} (es)`).not.toBe("");
      expect(pair.en.trim(), `${key} (en)`).not.toBe("");
    }
  });

  it("every literal t(\"KEY\") referenced in source resolves to a defined message", () => {
    const refs = new Map<string, string[]>();
    for (const file of SOURCE_FILES) {
      const source = readFileSync(file, "utf8");
      const matches = source.matchAll(/\bt\(\s*["']([A-Z][A-Z0-9_]+)["']\s*\)/g);
      for (const match of matches) {
        const key = match[1];
        refs.set(key, [...(refs.get(key) ?? []), file.replace(`${ROOT}/`, "")]);
      }
    }
    expect(refs.size).toBeGreaterThan(0);
    for (const [key, files] of refs) {
      expect(messages[key], `${key} referenced in ${files.join(", ")}`).toBeDefined();
    }
  });

  it("component source has no hardcoded accented Spanish outside comments", () => {
    const spanishRegex = /[áéíóúñü¿¡ÁÉÍÓÚÑÜ]/;
    const offenders: string[] = [];
    for (const file of SOURCE_FILES) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, index) => {
        const code = line
          .replace(/\/\*.*?\*\//g, "")
          .replace(/\/\/.*$/, "")
          .trim();
        if (code && spanishRegex.test(code)) {
          offenders.push(`${file.replace(`${ROOT}/`, "")}:${index + 1} ${code}`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });
});