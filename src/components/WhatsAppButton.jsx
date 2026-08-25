/**
 * WhatsAppButton.jsx
 * =============================================================================
 * Botón de WhatsApp reutilizable (Prompt Maestro §14).
 *
 * Este archivo NO estaba en ninguna de las exportaciones encontradas en
 * "web deivi" (ni en deivi-audit-fixes ni en deivi-seo), pero tanto
 * Hero.jsx como layout.jsx lo importan — sin él, `npm run dev` falla con
 * "Module not found: Can't resolve './WhatsAppButton'". Se reconstruyó acá
 * a partir de cómo lo usan esos dos archivos y de las capturas de pantalla
 * (hero-desktop.png, hero-mobile-2.png, full-mobile.png) que muestran el
 * botón sólido naranja del Hero y el botón circular flotante.
 *
 * - `WhatsAppButton` (export por defecto): botón de línea/CTA, usado en el
 *   Hero y pensado para reutilizarse en tarjetas de "Qué hacemos",
 *   servicios, CTA final y contacto cuando esos componentes se construyan.
 *   Arma el link con `getWhatsappUrlByContext` de siteData.js según el
 *   `contextKey` recibido — nunca hardcodea el número ni el mensaje (§20).
 * - `WhatsAppFloatingButton` (export nombrado): botón circular fijo en la
 *   esquina inferior derecha, montado una sola vez en layout.jsx. Usa el
 *   contexto "floating".
 *
 * lucide-react no incluye íconos de marca (WhatsApp no está disponible ahí),
 * así que el glifo se define acá como un SVG propio en `currentColor`.
 * =============================================================================
 */

import { getWhatsappUrlByContext } from "@/data/siteData";

export function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 3C9.377 3 4 8.377 4 15.004c0 2.386.664 4.615 1.816 6.516L4 29l7.65-1.775a11.94 11.94 0 0 0 4.354.82h.005C22.636 28.045 28 22.668 28 16.041 28 9.414 22.636 4.037 16.004 3Zm0 22.86h-.004a9.86 9.86 0 0 1-5.023-1.375l-.36-.214-4.54 1.054 1.08-4.428-.235-.373a9.84 9.84 0 0 1-1.512-5.24C5.41 9.51 10.15 4.77 16.004 4.77c2.83 0 5.49 1.104 7.492 3.107a10.5 10.5 0 0 1 3.104 7.483c0 5.854-4.74 10.5-10.596 10.5Zm5.79-7.86c-.317-.159-1.874-.925-2.165-1.03-.29-.106-.502-.159-.714.159-.211.317-.818 1.03-1.003 1.241-.185.212-.37.238-.687.08-.317-.16-1.336-.492-2.545-1.57-.941-.839-1.577-1.876-1.762-2.193-.185-.318-.02-.49.14-.648.143-.142.318-.37.476-.556.159-.185.212-.318.317-.53.106-.212.053-.397-.026-.556-.08-.159-.714-1.72-.978-2.356-.257-.618-.518-.534-.714-.544l-.608-.011c-.212 0-.556.08-.847.397-.29.318-1.11 1.084-1.11 2.645 0 1.56 1.137 3.068 1.296 3.28.159.212 2.238 3.418 5.423 4.792.758.327 1.35.522 1.811.668.761.242 1.454.208 2.002.126.611-.091 1.874-.766 2.138-1.507.264-.741.264-1.375.185-1.507-.079-.132-.29-.212-.607-.37Z" />
    </svg>
  );
}

const SIZE_CLASSES = {
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-base",
};

export default function WhatsAppButton({
  contextKey,
  label,
  variant = "solid",
  size = "md",
  fullWidthOnMobile = false,
}) {
  const href = getWhatsappUrlByContext(contextKey);

  const variantClasses =
    variant === "solid"
      ? "bg-naranja text-white hover:bg-naranja/90"
      : "border-2 border-naranja text-naranja hover:bg-naranja/10";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naranja focus-visible:ring-offset-2 ${
        SIZE_CLASSES[size] ?? SIZE_CLASSES.md
      } ${variantClasses} ${fullWidthOnMobile ? "w-full sm:w-auto" : ""}`}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      {label}
    </a>
  );
}

export function WhatsAppFloatingButton() {
  const href = getWhatsappUrlByContext("floating");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-naranja text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naranja focus-visible:ring-offset-2"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
