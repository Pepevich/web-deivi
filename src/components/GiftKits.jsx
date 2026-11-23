"use client";

/**
 * GiftKits.jsx — detalle de "Regalos empresariales"
 * =============================================================================
 * Vive dentro de la tarjeta "Regalos empresariales" de Qué hacemos: el título
 * de la tarjeta abre un panel con los 3 kits,
 * el descuento y las condiciones. Todo el contenido sale de GIFT_KITS en
 * siteData.js.
 *
 * - Usa <dialog> nativo: Esc cierra, el foco queda dentro del panel.
 * - El panel tiene link propio (deivi.com.ar/#regalos-empresariales): al
 *   abrirlo se agrega el hash, y el botón "atrás" del celular lo cierra.
 * =============================================================================
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronDown, ArrowRight, Check, Download } from "lucide-react";
import { GIFT_KITS } from "@/data/siteData";
import PlaceholderImage from "./PlaceholderImage";
import WhatsAppButton from "./WhatsAppButton";

const HASH = GIFT_KITS.hash;

function isSeasonalActive(until) {
  if (!until) return false;
  // Vigente hasta el final del día indicado (hora local).
  return new Date() <= new Date(`${until}T23:59:59`);
}

export default function GiftKits({ title, description }) {
  const [open, setOpen] = useState(false);
  const [showSeasonal, setShowSeasonal] = useState(false);
  const dialogRef = useRef(null);

  const openPanel = useCallback(() => {
    setOpen(true);
    if (window.location.hash !== HASH) {
      window.history.pushState({ giftKits: true }, "", HASH);
    }
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    if (window.location.hash === HASH) {
      if (window.history.state?.giftKits) {
        window.history.back();
      } else {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  }, []);

  // Abrir si se entra con el link directo, y sincronizar con atrás/adelante.
  useEffect(() => {
    setShowSeasonal(isSeasonalActive(GIFT_KITS.seasonalNotice?.until));
    const sync = () => setOpen(window.location.hash === HASH);
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  return (
    <>
      <h3 className="font-display text-lg font-semibold text-grafito">
        <button
          type="button"
          onClick={openPanel}
          aria-haspopup="dialog"
          className="group inline-flex items-center gap-2 text-left underline decoration-naranja/50 decoration-2 underline-offset-4 transition-colors hover:text-naranja focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naranja focus-visible:ring-offset-2"
        >
          {title}
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </h3>
      {description ? <p className="mt-2 text-sm leading-relaxed text-grafito/70">{description}</p> : null}

      <dialog
        ref={dialogRef}
        aria-labelledby="gift-kits-title"
        onClose={() => open && closePanel()}
        onClick={(e) => {
          // Click en el fondo oscuro (fuera del contenido) cierra.
          if (e.target === dialogRef.current) closePanel();
        }}
        className="m-0 h-full max-h-none w-full max-w-none overflow-y-auto overscroll-contain bg-transparent p-0 backdrop:bg-black/60 sm:p-6"
      >
        <div className="relative mx-auto min-h-full max-w-6xl bg-crema sm:min-h-0 sm:rounded-3xl sm:shadow-2xl">
          {/* Barra superior fija con cerrar */}
          <div className="sticky top-0 z-10 sm:-top-6 flex items-center justify-between gap-4 border-b border-black/5 bg-crema/95 px-5 py-3 backdrop-blur sm:rounded-t-3xl sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rosa">{GIFT_KITS.eyebrow}</p>
            <button
              type="button"
              onClick={closePanel}
              autoFocus
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-grafito/70 transition-colors hover:bg-black/5 hover:text-grafito focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naranja"
            >
              <X className="h-5 w-5" aria-hidden="true" />
              {GIFT_KITS.closeLabel}
            </button>
          </div>

          <div className="px-5 pb-12 pt-8 sm:px-8 sm:pb-14">
            {/* Intro */}
            <h2 id="gift-kits-title" className="max-w-2xl font-display text-2xl font-semibold text-grafito sm:text-3xl">
              {GIFT_KITS.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-grafito/70 sm:text-base">{GIFT_KITS.intro}</p>

            {showSeasonal ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-naranja/10 px-4 py-2 text-sm font-medium text-grafito">
                <span className="h-2 w-2 shrink-0 rounded-full bg-naranja" aria-hidden="true" />
                {GIFT_KITS.seasonalNotice.text}
              </p>
            ) : null}

            {/* Beneficios */}
            <ul className="mt-8 grid border-y border-black/10 sm:grid-cols-3">
              {GIFT_KITS.benefits.map((b, i) => (
                <li
                  key={b.id}
                  className={`py-4 sm:px-5 sm:py-5 ${i > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0" : "sm:pl-0"}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-grafito">{b.title}</p>
                  <p className="mt-1 text-sm text-grafito/70">{b.text}</p>
                </li>
              ))}
            </ul>

            {/* Kits */}
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {GIFT_KITS.kits.map((kit) => (
                <article
                  key={kit.id}
                  id={`kit-${kit.id}`}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                >
                  <div className="h-1.5" style={{ backgroundColor: kit.accent }} aria-hidden="true" />
                  <PlaceholderImage
                    image={kit.image}
                    alt={kit.imageAlt}
                    className="aspect-[4/5]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold tracking-[0.2em]" style={{ color: kit.accent }}>
                      {kit.number}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-grafito">{kit.name}</h3>
                    <p className="mt-1 text-sm text-grafito/70">{kit.tagline}</p>

                    <div className="mt-4 rounded-xl bg-crema px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-grafito">Ideal para</p>
                      <p className="mt-1 text-sm leading-relaxed text-grafito/80">{kit.idealFor}</p>
                    </div>

                    <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
                      {kit.items.map((item) => (
                        <li key={item} className="flex gap-2.5 py-2.5 text-sm text-grafito">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: kit.accent }} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {kit.legalNote ? (
                      <p className="mt-3 text-[11px] uppercase tracking-wide text-grafito/50">{kit.legalNote}</p>
                    ) : null}

                    <div className="mt-auto pt-6">
                      <WhatsAppButton
                        contextKey={kit.contextKey}
                        label={GIFT_KITS.kitCtaLabel}
                        variant="outline"
                        size="md"
                        fullWidthOnMobile
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-grafito/60">{GIFT_KITS.priceNote}</p>

            {/* Descuento */}
            <div className="mt-10 flex flex-col gap-2 rounded-2xl bg-grafito px-6 py-6 text-white sm:flex-row sm:items-center sm:gap-8 sm:px-8">
              <p className="shrink-0 font-display text-2xl font-semibold">{GIFT_KITS.discount.title}</p>
              <div>
                <p className="font-medium">{GIFT_KITS.discount.text}</p>
                <p className="mt-1 text-xs text-white/70">{GIFT_KITS.discount.note}</p>
              </div>
            </div>

            {/* Condiciones y personalización (desplegable) */}
            <details className="group mt-6 rounded-2xl bg-white ring-1 ring-black/5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-grafito [&::-webkit-details-marker]:hidden">
                {GIFT_KITS.detailsToggleLabel}
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="grid gap-8 border-t border-black/10 px-6 py-6 md:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-grafito">
                    {GIFT_KITS.personalization.title}
                  </p>
                  <ul className="mt-3 divide-y divide-black/10 border-y border-black/10">
                    {GIFT_KITS.personalization.rows.map((row) => (
                      <li key={row.option} className="py-3 text-sm">
                        <p className="text-grafito">{row.option}</p>
                        <p className="mt-0.5 text-xs text-grafito/60">
                          {GIFT_KITS.personalization.columns.from} {row.from} · {row.cost}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-grafito/60">{GIFT_KITS.personalization.note}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-grafito">
                    {GIFT_KITS.conditions.title}
                  </p>
                  <ul className="mt-3 divide-y divide-black/10 border-y border-black/10">
                    {GIFT_KITS.conditions.items.map((c) => (
                      <li key={c} className="py-3 text-sm text-grafito">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>

            {/* Cierre */}
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <p className="max-w-md text-sm text-grafito/70">{GIFT_KITS.finalCta.text}</p>
              <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                <WhatsAppButton
                  contextKey={GIFT_KITS.finalCta.contextKey}
                  label={GIFT_KITS.finalCta.label}
                  size="lg"
                  fullWidthOnMobile
                />
                {GIFT_KITS.pdf?.url ? (
                  <a
                    href={GIFT_KITS.pdf.url}
                    download={GIFT_KITS.pdf.fileName}
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-grafito px-7 text-base font-medium text-grafito transition-colors duration-200 hover:bg-grafito hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grafito focus-visible:ring-offset-2 sm:w-auto"
                  >
                    <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {GIFT_KITS.pdf.label}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
