/**
 * Hero.jsx
 * =============================================================================
 * Primera pantalla de la landing DeIvi (Prompt Maestro §Hero / §4 / §18).
 *
 * - Propuesta de valor principal (eyebrow + título + subtítulo) tomada de
 *   `HERO` en siteData.js — cero texto hardcodeado acá (§20).
 * - Dos CTAs: "VER PROPUESTAS" (scroll suave a #productos) y
 *   "HABLAR CON DEIVI" (abre WhatsApp con el mensaje contextual del Hero,
 *   vía WhatsAppButton).
 * - Mobile-first estricto (§18): min-h-dvh (altura de viewport dinámica,
 *   evita saltos por la barra del navegador en mobile), botones grandes de
 *   ≥48px de alto, sin nada que dependa de :hover para entenderse, texto
 *   siempre legible sobre la imagen gracias al scrim.
 * - Si la imagen del Hero todavía es un placeholder (`[IMAGEN_HERO_DEIVI]`,
 *   §28), se muestra un fondo de marca en vez de romper el layout con una
 *   imagen inválida.
 * =============================================================================
 */

import Image from "next/image";
import { HERO, isPlaceholderValue } from "@/data/siteData";
import WhatsAppButton from "./WhatsAppButton";

function HeroBackground({ image, alt }) {
  const isPlaceholder = isPlaceholderValue(image);

  if (isPlaceholder) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 bg-grafito bg-[radial-gradient(circle_at_25%_20%,rgba(240,148,172,0.18),transparent_55%),radial-gradient(circle_at_78%_75%,rgba(245,148,0,0.16),transparent_55%)]"
      />
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh w-full items-end overflow-hidden bg-grafito text-crema sm:items-center"
    >
      <HeroBackground image={HERO.image} alt={HERO.imageAlt} />

      {/* Scrim: garantiza contraste y legibilidad del texto sobre la foto (§27) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-grafito via-grafito/75 to-grafito/20 sm:bg-gradient-to-r sm:from-grafito/95 sm:via-grafito/65 sm:to-transparent"
      />

      {/*
        Isotipo grande decorativo, a la derecha, en desktop y mobile.
        En mobile el texto queda anclado abajo (items-end), así que el logo
        se ubica arriba a la derecha, en el espacio libre, en vez de
        centrado en toda la altura (eso lo haría chocar con el título).
      */}
      {!isPlaceholderValue(HERO.logo) ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-6 z-[5] flex sm:inset-y-0 sm:right-0 sm:w-[45%] sm:items-center sm:justify-center"
        >
          <Image
            src={HERO.logo}
            alt=""
            width={1728}
            height={2115}
            priority
            className="h-64 w-auto opacity-90 sm:h-[65%]"
          />
        </div>
      ) : null}

      {/*
        pb-28 en mobile deja espacio libre para que el botón flotante de
        WhatsApp (fixed, esquina inferior derecha) nunca tape ni se solape
        con el CTA "HABLAR CON DEIVI" del Hero.
      */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-16 md:pb-0">
        <div className="max-w-xl animate-fadeInUp">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rosa">
            {HERO.eyebrow}
          </p>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {HERO.title}
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-crema/85 sm:text-lg">
            {HERO.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`#${HERO.ctaPrimary.target}`}
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-white/25 px-7 text-base font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-grafito"
            >
              {HERO.ctaPrimary.label}
            </a>

            <WhatsAppButton
              contextKey={HERO.ctaWhatsapp.contextKey}
              label={HERO.ctaWhatsapp.label}
              variant="solid"
              size="lg"
              fullWidthOnMobile
            />
          </div>
        </div>
      </div>
    </section>
  );
}
