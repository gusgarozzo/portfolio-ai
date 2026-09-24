import { describe, it, expect } from "vitest";
import { t } from "./messages";

describe("t", () => {
  it("returns the ES string for a known key with locale 'es'", () => {
    expect(t("CHAT_TITLE", "es")).toBe("Asistente del portfolio");
    expect(t("CHAT_INPUT_PLACEHOLDER", "es")).toBe("Escribí tu pregunta…");
    expect(t("CHAT_CLOSE", "es")).toBe("Cerrar");
    expect(t("CHAT_PROCESSING", "es")).toBe("Pensando…");
  });

  it("returns the EN string for a known key with locale 'en'", () => {
    expect(t("CHAT_TITLE", "en")).toBe("Portfolio assistant");
    expect(t("CHAT_INPUT_PLACEHOLDER", "en")).toBe("Type your question…");
    expect(t("CHAT_CLOSE", "en")).toBe("Close");
    expect(t("CHAT_PROCESSING", "en")).toBe("Thinking…");
  });

  it("returns the key itself for unknown keys", () => {
    expect(t("NONEXISTENT_KEY", "es")).toBe("NONEXISTENT_KEY");
    expect(t("NONEXISTENT_KEY", "en")).toBe("NONEXISTENT_KEY");
  });

  it("supports all standard message keys", () => {
    const keys = [
      "ASK_GUSTAVO",
      "SKIP_TO_CONTENT",
      "CHAT_TITLE",
      "CHAT_SUBTITLE",
      "CHAT_INPUT_PLACEHOLDER",
      "CHAT_PROCESSING",
      "CHAT_RATE_LIMITED",
      "CHAT_ERROR",
      "CHAT_EMPTY",
      "CHAT_OUT_OF_SCOPE",
      "CHAT_BLOCKED",
      "CHAT_UNCONFIGURED",
      "CHAT_CLOSE",
      "CHAT_OPEN",
      "CHAT_SEND",
      "CHAT_LOG_LABEL",
      "CHAT_INTRO",
      "SUGGESTED_PROMPTS_LABEL",
      "SUGGESTION_EXPERIENCE",
      "SUGGESTION_SKILLS",
      "SUGGESTION_AI",
      "SUGGESTION_WEATHER",
      "MENU",
      "CLOSE",
      "NAV_MENU_LABEL",
      "NAV_LANGUAGE",
      "NAV_ABOUT",
      "NAV_EXPERIENCE",
      "NAV_PROJECTS",
      "NAV_SKILLS",
      "NAV_FORMACION",
      "NAV_CONTACT",
      "NAV_CONTACT_CTA",
      "HERO_KICKER",
      "HERO_SUMMARY_LEAD",
      "DOWNLOAD_CV",
      "SEE_PROJECTS",
      "HERO_CONTACT_CTA",
      "FIGURE_CAPTION",
      "FIGURE_ARIA",
      "FIG_COL_AIOTEK",
      "FIG_COL_QWAVEE",
      "FIG_BOX_CLIENTS",
      "FIG_BOX_CLIENTS_SUB",
      "FIG_BOX_APIS",
      "FIG_BOX_APIS_SUB",
      "FIG_BOX_FTP",
      "FIG_BOX_FTP_SUB",
      "FIG_BOX_POSTGRES",
      "FIG_BOX_POSTGRES_SUB",
      "FIG_BOX_REDIS",
      "FIG_BOX_REDIS_SUB",
      "FIG_BOX_GATEWAY",
      "FIG_BOX_LAMBDA",
      "FIG_BOX_LAMBDA_SUB",
      "FIG_BOX_S3",
      "FIG_BOX_S3_SUB",
      "FIG_BAND_SUPPORT",
      "FIG_BAND_SUPPORT_SUB",
      "FACT_EXPERIENCE",
      "FACT_SENIORITY",
      "FACT_LOCATION",
      "ABOUT_EYEBROW",
      "ABOUT_TITLE",
      "PORTRAIT_ALT",
      "EXP_EYEBROW",
      "EXP_TITLE",
      "EXP_INTRO",
      "PROJECTS_EYEBROW",
      "PROJECTS_TITLE",
      "PROJECTS_INTRO",
      "VISIT_SITE",
      "OPEN_APP",
      "VIEW_CODE",
      "PROJECT_CAT_STUDIO",
      "PROJECT_CAT_COFOUNDED",
      "PROJECT_CAT_PERSONAL",
      "PROJECT_CAT_AI",
      "SKILLS_EYEBROW",
      "SKILLS_TITLE",
      "SKILLS_INTRO",
      "SKILLS_TIER_CORE",
      "SKILLS_TIER_SUPPORTING",
      "SKILLS_TIER_LEARNING",
      "SKILLS_AI_LINE",
      "SKILLS_AI_NOTE",
      "SKILLS_AI_CTA",
      "SKILLS_GCP_NOTE",
      "FORMATION_EYEBROW",
      "FORMATION_TITLE",
      "EDUCATION_TITLE",
      "CERT_TITLE",
      "CERT_SUB",
      "CERT_SHOW_MORE",
      "CONTACT_EYEBROW",
      "CONTACT_TITLE",
      "CONTACT_INTRO",
      "CONTACT_AVAILABILITY",
      "LINK_EMAIL",
      "LINK_PHONE",
      "LINK_LINKEDIN",
      "LINK_GITHUB",
      "LINK_CV",
      "FOOTER_ROLE",
      "FOOTER_MADE",
    ];
    for (const key of keys) {
      expect(t(key, "es")).not.toBe("");
      expect(t(key, "en")).not.toBe("");
    }
  });
});