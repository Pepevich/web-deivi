/**
 * FinalCta.jsx — Llamada a la acción final (Prompt Maestro §12)
 * =============================================================================
 */

import { FINAL_CTA } from "@/data/siteData";
import WhatsAppButton from "./WhatsAppButton";

export default function FinalCta() {
  return (
    <section className="bg-grafito text-crema">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{FINAL_CTA.title}</h2>
        <p className="mt-4 text-crema/80">{FINAL_CTA.text}</p>
        <div className="mt-8 flex justify-center">
          <WhatsAppButton contextKey={FINAL_CTA.contextKey} label={FINAL_CTA.buttonLabel} variant="solid" size="lg" />
        </div>
      </div>
    </section>
  );
}
