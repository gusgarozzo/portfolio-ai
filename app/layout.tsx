import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import SystemStatusBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AskGustavo from "@/components/chat/AskGustavo";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Gustavo Garozzo — Backend Developer",
  description:
    "Portfolio personal de Gustavo Garozzo, Desarrollador Backend Ssr. especializado en Node.js, NestJS y AWS.",
  openGraph: {
    title: "Gustavo Garozzo — Backend Developer",
    description:
      "Portfolio personal de Gustavo Garozzo, Desarrollador Backend Ssr. especializado en Node.js, NestJS y AWS.",
    locale: "es_AR",
    type: "website",
    siteName: "Gustavo Garozzo Portfolio",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas">
        <LocaleProvider>
          <SystemStatusBar />
          <main className="flex-1 w-full max-w-[1440px] mx-auto border-x border-border px-6 max-md:px-5">
            {children}
          </main>
          <Footer />
          <AskGustavo />
        </LocaleProvider>
      </body>
    </html>
  );
}
