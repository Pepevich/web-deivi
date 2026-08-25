/**
 * SEO.jsx
 * =============================================================================
 * SEO básico de DeIvi (Prompt Maestro §22) + placeholders comentados de
 * analítica (§23).
 *
 * Next.js exige que el export especial `metadata` viva literalmente en un
 * layout.js/page.js (no en un componente cualquiera), así que este archivo
 * arma el objeto `siteMetadata` y `src/app/layout.jsx` simplemente lo
 * reexporta como `metadata`. Este sigue siendo el único lugar donde se edita
 * el SEO (§20) — todo sale de `SEO`/`COMPANY`/`ANALYTICS` en siteData.js.
 * =============================================================================
 */

import { COMPANY, SEO, isPlaceholderValue } from "@/data/siteData";

const isReal = (value) => !isPlaceholderValue(value);

// -----------------------------------------------------------------------------
// METADATA — title, description, Open Graph, robots (§22)
// -----------------------------------------------------------------------------
// El favicon NO se declara acá: Next.js lo sirve automáticamente por
// convención desde src/app/icon.svg (placeholder de marca ya incluido).
export const siteMetadata = {
  title: SEO.title,
  description: SEO.description,
  applicationName: COMPANY.fullName,

  openGraph: {
    title: SEO.title,
    description: SEO.description,
    siteName: COMPANY.fullName,
    locale: SEO.locale,
    type: "website",
    // Se agregan solo si ya son datos reales (no bracket-placeholders),
    // para no romper el meta tag con "[SITE_URL_DEIVI]" o similar (§28).
    ...(isReal(SEO.siteUrl) ? { url: SEO.siteUrl } : {}),
    ...(isReal(SEO.ogImage) ? { images: [{ url: SEO.ogImage }] } : {}),
  },

  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    ...(isReal(SEO.ogImage) ? { images: [SEO.ogImage] } : {}),
  },

  robots: {
    index: true,
    follow: true,
  },

  // Habilita URLs relativas en openGraph/alternates una vez que se cargue
  // el dominio real en SEO.siteUrl (siteData.js).
  ...(isReal(SEO.siteUrl) ? { metadataBase: new URL(SEO.siteUrl) } : {}),
};

// -----------------------------------------------------------------------------
// ANALÍTICA — Google Analytics / Google Tag Manager / Meta Pixel (§23)
// -----------------------------------------------------------------------------
// No hay cuentas configuradas todavía, así que los tres bloques de abajo
// quedan COMENTADOS a propósito: `AnalyticsPlaceholders` no inyecta nada
// por ahora. Para activar uno:
//   1) Cargar el ID real en `ANALYTICS` (src/data/siteData.js).
//   2) Descomentar el bloque correspondiente (y el import de next/script
//      y de ANALYTICS que se indican arriba de cada uno).
// No hace falta tocar layout.jsx: <AnalyticsPlaceholders /> ya está
// montado ahí una sola vez.
//
// -----------------------------------------------------------------------------
// GOOGLE ANALYTICS (GA4) — usa ANALYTICS.googleAnalyticsId (ej: G-XXXXXXXXXX)
// -----------------------------------------------------------------------------
// import Script from "next/script";
// import { ANALYTICS } from "@/data/siteData";
//
// <Script
//   src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.googleAnalyticsId}`}
//   strategy="afterInteractive"
// />
// <Script id="ga4-init" strategy="afterInteractive">
//   {`
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());
//     gtag('config', '${ANALYTICS.googleAnalyticsId}');
//   `}
// </Script>
//
// -----------------------------------------------------------------------------
// GOOGLE TAG MANAGER — usa ANALYTICS.googleTagManagerId (ej: GTM-XXXXXXX)
// -----------------------------------------------------------------------------
// Este script va en <head> (se renderiza acá, dentro de AnalyticsPlaceholders,
// que se monta en <body> pero next/script con strategy="afterInteractive" no
// requiere estar en <head>). Además hay que agregar el <noscript><iframe>
// equivalente justo después de abrir <body> en layout.jsx:
//   <noscript>
//     <iframe
//       src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS.googleTagManagerId}`}
//       height="0" width="0" style={{ display: "none", visibility: "hidden" }}
//     />
//   </noscript>
//
// <Script id="gtm-init" strategy="afterInteractive">
//   {`
//     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//     })(window,document,'script','dataLayer','${ANALYTICS.googleTagManagerId}');
//   `}
// </Script>
//
// -----------------------------------------------------------------------------
// META PIXEL — usa ANALYTICS.metaPixelId
// -----------------------------------------------------------------------------
// <Script id="meta-pixel-init" strategy="afterInteractive">
//   {`
//     !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//     n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
//     n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
//     t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
//     document,'script','https://connect.facebook.net/en_US/fbevents.js');
//     fbq('init', '${ANALYTICS.metaPixelId}');
//     fbq('track', 'PageView');
//   `}
// </Script>
// <noscript>
//   <img
//     height="1" width="1" style={{ display: "none" }} alt=""
//     src={`https://www.facebook.com/tr?id=${ANALYTICS.metaPixelId}&ev=PageView&noscript=1`}
//   />
// </noscript>
export function AnalyticsPlaceholders() {
  return null;
}
