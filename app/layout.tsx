import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import AskGustavo from "@/components/chat/AskGustavo";
import { LocaleProvider } from "@/lib/locale-context";
import { buildPersonJsonLd } from "@/lib/json-ld";
import { hasSiteUrl, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmplex = IBM_Plex_Mono({
  variable: "--font-ibmplex",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f4ee",
};

const TITLE = "Gustavo Garozzo — Backend Engineer";
const DESCRIPTION =
  "Portfolio de Gustavo Garozzo, Backend Engineer en Node.js, TypeScript y NestJS: APIs, integraciones de sistemas, PostgreSQL/Redis y cloud (AWS / Google Cloud).";

export function generateMetadata(): Metadata {
  return {
    metadataBase: hasSiteUrl ? new URL(SITE_URL) : undefined,
    title: TITLE,
    description: DESCRIPTION,
    applicationName: "Gustavo Garozzo Portfolio",
    authors: [{ name: "Gustavo Garozzo" }],
    alternates: hasSiteUrl ? { canonical: "/" } : undefined,
    openGraph: {
      type: "website",
      locale: "es_AR",
      alternateLocale: "en_US",
      siteName: "Gustavo Garozzo Portfolio",
      title: TITLE,
      description: DESCRIPTION,
      url: hasSiteUrl ? SITE_URL : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${source.variable} ${ibmplex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink-soft">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonJsonLd()) }}
        />
        <LocaleProvider>
          <SkipLink />
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 w-full mx-auto outline-none">
            {children}
          </main>
          <Footer />
          <AskGustavo />
        </LocaleProvider>
      </body>
    </html>
  );
}
