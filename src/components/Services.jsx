/**
 * Services.jsx — "Nuestros servicios" (Prompt Maestro §6)
 * =============================================================================
 * 9 ítems a partir de SERVICES en siteData.js, con su ícono de lucide-react
 * resuelto vía Icon.jsx.
 * =============================================================================
 */

import { SERVICES_INTRO, SERVICES } from "@/data/siteData";
import Icon from "./Icon";

export default function Services() {
  return (
    <section id="servicios" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rosa">
          {SERVICES_INTRO.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-grafito sm:text-3xl">
          {SERVICES_INTRO.title}
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.id} className="flex gap-4 rounded-2xl border border-grafito/10 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-naranja/10 text-naranja">
                <Icon name={service.icon} className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-grafito">{service.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-grafito/65">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
