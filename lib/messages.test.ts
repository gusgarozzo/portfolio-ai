import { describe, it, expect } from "vitest";
import { t } from "./messages";

describe("t", () => {
  it("returns the ES string for a known key with locale 'es'", () => {
    expect(t("CHAT_TITLE", "es")).toBe("SYS.QUERY v1.0");
    expect(t("CHAT_INPUT_PLACEHOLDER", "es")).toBe("Escribí tu consulta...");
    expect(t("CHAT_CLOSE", "es")).toBe("CERRAR");
    expect(t("CHAT_PROCESSING", "es")).toBe("PROCESSING...");
  });

  it("returns the EN string for a known key with locale 'en'", () => {
    expect(t("CHAT_TITLE", "en")).toBe("SYS.QUERY v1.0");
    expect(t("CHAT_INPUT_PLACEHOLDER", "en")).toBe("Ask about my profile...");
    expect(t("CHAT_CLOSE", "en")).toBe("CLOSE");
    expect(t("CHAT_PROCESSING", "en")).toBe("PROCESSING...");
  });

  it("returns the key itself for unknown keys", () => {
    expect(t("NONEXISTENT_KEY", "es")).toBe("NONEXISTENT_KEY");
    expect(t("NONEXISTENT_KEY", "en")).toBe("NONEXISTENT_KEY");
  });

  it("supports all standard message keys", () => {
    const keys = [
      "ASK_GUSTAVO",
      "CHAT_TITLE",
      "CHAT_INPUT_PLACEHOLDER",
      "CHAT_PROCESSING",
      "CHAT_RATE_LIMITED",
      "CHAT_ERROR",
      "CHAT_CLOSE",
      "CHAT_OPEN",
      "SYS_AUTH",
      "STATUS",
      "MENU",
      "CLOSE",
      "NAV_MENU_LABEL",
      "NAV_EXPERIENCE",
      "NAV_PROJECTS",
      "NAV_SKILLS",
      "NAV_CERTIFICATIONS",
      "NAV_CONTACT",
      "LIVE_TELEMETRY",
      "TELEM_NODE",
      "TELEM_UPTIME",
      "TELEM_LATENCY",
      "TELEM_THROUGHPUT",
      "TELEM_MEMORY",
      "STAT_EXPERIENCE",
      "STAT_STACK",
      "STAT_SENIORITY",
      "TENURE_MANIFEST",
      "ARCHITECTURE_TOPOLOGY",
      "BACKEND_CORE",
      "TOPOLOGY_LANGUAGES",
      "TOPOLOGY_INFRASTRUCTURE",
      "TOPOLOGY_MINDSET",
      "AUDIT_LOG",
      "LAST_PARSED",
      "CERT_TITLE",
      "CONTACT_REACH_OUT",
      "LINK_EMAIL",
      "LINK_PHONE",
      "LINK_LINKEDIN",
      "LINK_GITHUB",
      "VISIT_SITE",
      "OPEN_APP",
      "HYBRID_EDITION",
      "VER",
    ];
    for (const key of keys) {
      expect(t(key, "es")).not.toBe("");
      expect(t(key, "en")).not.toBe("");
    }
  });
});
