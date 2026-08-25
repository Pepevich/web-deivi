import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { QR_FOOTER_MESSAGE } from "@/data/siteData";
import { siteMetadata, AnalyticsPlaceholders } from "@/components/SEO";
import { WhatsAppFloatingButton } from "@/components/WhatsAppButton";

// Máximo dos familias tipográficas, vía Google Fonts (§17): una elegante
// para títulos (Playfair Display) y una muy legible para textos (Inter).
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// SEO básico (§22): title, description, Open Graph, robots. Se arma en
// src/components/SEO.jsx a partir de siteData.js — acá solo se reexporta,
// porque Next.js exige que `metadata` viva en un layout/page.
export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="bg-crema font-body text-grafito antialiased">
        {/*
          Placeholders comentados de Google Analytics / Tag Manager / Meta
          Pixel (§23). No inyectan nada hasta que se cargue un ID real en
          ANALYTICS (siteData.js) y se descomente el bloque correspondiente
          en src/components/SEO.jsx.
        */}
        <AnalyticsPlaceholders />

        {children}

        {/* Frase de cierre pensada para tráfico QR (§19) */}
        <p className="bg-grafito px-5 py-6 text-center text-xs text-crema/60">
          {QR_FOOTER_MESSAGE}
        </p>

        {/* Botón flotante de WhatsApp, visible en todo el recorrido (§14) */}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
