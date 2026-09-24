import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gustavo Garozzo — Backend Engineer";

const PAPER = "#F7F4EE";
const INK = "#1C1913";
const INK_SOFT = "#4A463C";
const SIGNAL = "#1C6B3F";
const LINE = "#DDD6C8";

async function loadFont(
  family: string,
  weights: string,
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@${weights}&display=swap`;
    const css = await fetch(cssUrl).then((r) => r.text());
    const url = css.match(/url\((https:\/\/[^)]+\.(?:woff2|woff|ttf))\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.arrayBuffer()) as ArrayBuffer;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const p = personal.es;

  const [archivo, mono] = await Promise.all([
    loadFont("Archivo", "800"),
    loadFont("IBM+Plex+Mono", "500"),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 800 }[] = [];
  if (archivo) fonts.push({ name: "Archivo", data: archivo, weight: 800 });
  if (mono) fonts.push({ name: "IBM Plex Mono", data: mono, weight: 500 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          color: INK,
          position: "relative",
          padding: "72px 80px 56px",
          fontFamily: archivo ? "Archivo" : "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "repeating-linear-gradient(to right, transparent 0 119px, " +
              LINE +
              " 119px 120px)",
            opacity: 0.4,
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: SIGNAL,
                fontFamily: mono ? "IBM Plex Mono" : "monospace",
                fontWeight: 500,
              }}
            >
              {p.name} &mdash; {p.title}
            </div>
            <div
              style={{
                width: 44,
                height: 6,
                backgroundColor: SIGNAL,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${LINE}`,
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 20,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: INK_SOFT,
              fontFamily: mono ? "IBM Plex Mono" : "monospace",
              fontWeight: 500,
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 118,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: INK,
              fontWeight: 800,
            }}
          >
            {p.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              letterSpacing: "0.02em",
              color: INK_SOFT,
              fontWeight: 500,
            }}
          >
            {p.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontFamily: mono ? "IBM Plex Mono" : "monospace",
              fontWeight: 500,
            }}
          >
            <span style={{ fontSize: 24, letterSpacing: "0.08em", textTransform: "uppercase", color: INK_SOFT }}>
              {p.location}
            </span>
            <span style={{ fontSize: 24, letterSpacing: "0.08em", textTransform: "uppercase", color: SIGNAL }}>
              {p.heroStats.experience} &middot; {p.heroStats.seniority}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              backgroundColor: SIGNAL,
            }}
          >
            <div style={{ display: "flex", width: 26, height: 26, backgroundColor: PAPER }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}