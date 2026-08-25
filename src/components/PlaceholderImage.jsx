/**
 * PlaceholderImage.jsx
 * =============================================================================
 * Mismo criterio que HeroBackground dentro de Hero.jsx, generalizado para
 * usarse en cualquier sección con imágenes de contenido (Qué hacemos,
 * catálogo, experiencias corporativas, galería): mientras el campo `image`
 * siga siendo un placeholder entre corchetes (§28), se muestra un bloque de
 * marca en vez de romper el layout con una <Image> inválida. En desarrollo
 * se ve además el nombre del placeholder pendiente de reemplazar.
 * =============================================================================
 */

import Image from "next/image";
import { isPlaceholderValue } from "@/data/siteData";

export default function PlaceholderImage({ image, alt, className = "" }) {
  const isPlaceholder = isPlaceholderValue(image);

  if (isPlaceholder) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex items-center justify-center overflow-hidden bg-grafito bg-[radial-gradient(circle_at_25%_20%,rgba(240,148,172,0.35),transparent_55%),radial-gradient(circle_at_78%_75%,rgba(245,148,0,0.32),transparent_55%)] ${className}`}
      >
        {process.env.NODE_ENV !== "production" ? (
          <span className="rounded-full bg-black/40 px-3 py-1 text-center text-[10px] font-medium tracking-wide text-white/80">
            {image}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
