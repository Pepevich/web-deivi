/**
 * Differentiators.jsx — "¿Por qué elegir DeIvi?" (Prompt Maestro §10)
 * =============================================================================
 */

import Image from "next/image";
import { DIFFERENTIATORS, isPlaceholderValue } from "@/data/siteData";
import Icon from "./Icon";

export default function Differentiators() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <h2 className="font-display text-2xl font-semibold text-grafito sm:text-3xl">
        {DIFFERENTIATORS.title}
      </h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {DIFFERENTIATORS.items.map((item) => (
          <div key={item.id} className="text-center sm:text-left">
            <div className="mx-auto flex h-12 w-12 items-center justify-center text-grafito sm:mx-0">
              {!isPlaceholderValue(item.image) ? (
                <Image src={item.image} alt="" width={48} height={48} className="h-11 w-11 object-contain" />
              ) : (
                <Icon name={item.icon} className="h-8 w-8" />
              )}
            </div>
            <h3 className="mt-4 font-medium text-grafito">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-grafito/65">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
