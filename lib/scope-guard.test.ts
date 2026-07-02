import { describe, it, expect } from "vitest";
import { checkScope } from "./scope-guard";

describe("checkScope", () => {
  describe("allows on-topic questions", () => {
    it("allows questions about experience", () => {
      expect(checkScope("¿Qué experiencia tiene Gustavo?").allowed).toBe(true);
    });

    it("allows questions about skills", () => {
      expect(checkScope("What technologies does Gustavo use?").allowed).toBe(true);
    });

    it("allows questions about projects", () => {
      expect(checkScope("Contame sobre tus proyectos").allowed).toBe(true);
    });

    it("allows greetings", () => {
      expect(checkScope("Hola").allowed).toBe(true);
      expect(checkScope("Hi there").allowed).toBe(true);
    });

    it("allows questions about the bot itself", () => {
      expect(checkScope("Who are you?").allowed).toBe(true);
      expect(checkScope("Quién sos").allowed).toBe(true);
    });

    it("allows questions about education", () => {
      expect(checkScope("Dónde estudió Gustavo?").allowed).toBe(true);
    });

    it("allows questions about certifications", () => {
      expect(checkScope("What certifications does he have?").allowed).toBe(true);
    });

    it("allows questions about personal interests", () => {
      expect(checkScope("Le gusta la F1?").allowed).toBe(true);
    });
  });

  describe("blocks off-topic questions", () => {
    it("blocks recipe requests", () => {
      const result = checkScope("Dame una receta para hacer lemon pie");
      expect(result.allowed).toBe(false);
      expect(result.reply).toContain("only answer questions about Gustavo Garozzo");
    });

    it("blocks general coding help", () => {
      const result = checkScope("Write a function to sort an array in JavaScript");
      expect(result.allowed).toBe(false);
    });

    it("blocks math/problem solving", () => {
      const result = checkScope("Resolvé esta ecuación: 2x + 5 = 15");
      expect(result.allowed).toBe(false);
    });

    it("blocks translation requests", () => {
      const result = checkScope("Traducí esto al inglés: Hola mundo");
      expect(result.allowed).toBe(false);
    });

    it("blocks story/poem requests", () => {
      const result = checkScope("Escribime un cuento corto");
      expect(result.allowed).toBe(false);
    });

    it("blocks weather questions", () => {
      const result = checkScope("Qué clima hace hoy?");
      expect(result.allowed).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("rejects empty message", () => {
      const result = checkScope("   ");
      expect(result.allowed).toBe(false);
      expect(result.reply).toContain("EMPTY_MESSAGE");
    });

    it("allows short profile-related messages", () => {
      expect(checkScope("Gustavo").allowed).toBe(true);
    });
  });
});
