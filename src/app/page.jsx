/**
 * page.jsx — página principal
 * =============================================================================
 * Ensambla todas las secciones en el orden del Prompt Maestro (§4 a §13).
 * Cada sección lee sus propios datos de src/data/siteData.js — no hay texto
 * hardcodeado acá (§20).
 * =============================================================================
 */

import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Services from "@/components/Services";
import Differentiators from "@/components/Differentiators";
import FinalCta from "@/components/FinalCta";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <Services />
      <Differentiators />
      <FinalCta />
      <Contact />
    </main>
  );
}
