/**
 * WhatWeDo.jsx — "Qué hacemos" (Prompt Maestro §5)
 * =============================================================================
 * 4 tarjetas a partir de WHAT_WE_DO en siteData.js. Cada una abre WhatsApp
 * con el mensaje contextual de su `contextKey` (§14), vía WhatsAppButton.
 * =============================================================================
 */

import { WHAT_WE_DO_INTRO, WHAT_WE_DO } from "@/data/siteData";
import PlaceholderImage from "./PlaceholderImage";
import WhatsAppButton from "./WhatsAppButton";

export default function WhatWeDo() {
  return (
    <section id="que-hacemos" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rosa">
        {WHAT_WE_DO_INTRO.eyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-grafito sm:text-3xl">
        {WHAT_WE_DO_INTRO.title}
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {WHAT_WE_DO.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
          >
            <PlaceholderImage image={item.image} alt={item.imageAlt} className="aspect-[4/3]" />
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold text-grafito">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-grafito/70">{item.description}</p>
              <div className="mt-5">
                <WhatsAppButton contextKey={item.contextKey} label={item.ctaLabel} variant="outline" size="md" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
