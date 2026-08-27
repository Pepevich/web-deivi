/**
 * =============================================================================
 * DeIvi Pastelería & Catering — siteData.js
 * =============================================================================
 * Fuente única de contenido para la landing page comercial (Next.js +
 * Tailwind CSS), pensada para tráfico QR en eventos empresariales.
 * Basado en el "PROMPT MAESTRO — CREAR WEB COMERCIAL DEIVI" (ver
 * docs/prompt-maestro-deivi.md en el proyecto). Referencias de sección
 * ("§N") apuntan a los puntos numerados de ese documento.
 *
 * Principio rector (§20 Mantenimiento mínimo):
 *   Todo el contenido editable (empresa, contacto, redes, textos de
 *   secciones, servicios, productos, categorías, CTAs) vive en ESTE
 *   archivo. Los componentes solo deben leer de acá — nunca hardcodear
 *   textos, precios, links o números de WhatsApp.
 *
 * Restricción de datos (§28):
 *   No se inventan datos reales de contacto ni fotografías/precios reales.
 *   Todo lo que falte se deja como variable entre corchetes, ej.
 *   [WHATSAPP_DEIVI], [EMAIL_DEIVI], [INSTAGRAM_DEIVI], [IMAGEN_PRODUCTO_01].
 *
 * Nota: por pedido explícito del cliente, este archivo NO incluye ninguna
 * referencia a "Capicook".
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// 0. UTILIDAD — detectar placeholders sin datos reales (§28)
// -----------------------------------------------------------------------------
// Única implementación de "¿esto sigue siendo un placeholder entre
// corchetes?" en todo el proyecto. Los componentes (Hero, SEO, futuros
// Contacto/Footer) deben importar esto en vez de reinventar la regex, para
// no tener la misma lógica duplicada en varios archivos.
const PLACEHOLDER_PATTERN = /^\[.*\]$/;
export function isPlaceholderValue(value) {
  return !value || PLACEHOLDER_PATTERN.test(value);
}

// -----------------------------------------------------------------------------
// 1. CONFIGURACIÓN CENTRALIZADA DE LA EMPRESA (§20, §13)
// -----------------------------------------------------------------------------
export const COMPANY = {
  name: "DeIvi",
  fullName: "DeIvi Pastelería & Catering",
  founder: "Ivana",
  concept: "Soluciones gastronómicas para empresas, instituciones y eventos.",

  // Contacto — datos reales de DeIvi (§28)
  contact: {
    // Formato internacional sin signos ni espacios, ej: 5491122334455
    whatsappNumber: "5491125400076",
    // Formato para mostrar en pantalla, ej: +54 9 11 2233-4455
    whatsappDisplay: "+54 9 11 2540 0076",
    email: "somos.deivi@gmail.com",
    instagramHandle: "@somos.deivi",
    instagramUrl: "https://instagram.com/somos.deivi",
  },
};

// -----------------------------------------------------------------------------
// 2. PALETA DE COLORES (§16 — Manual de Marca DeIvi 2026)
// -----------------------------------------------------------------------------
// Base: blanco/crema + negro/grafito. Acentos cálidos para CTAs y detalles.
// Se utilizan los tonos oficiales del Manual de Marca DeIvi 2026; no se
// agregan tonos "tierra/beige" adicionales por no formar parte del sistema
// cromático real de la marca (para no inventar colores no documentados).
// Paleta centralizada acá para poder modificarse en un solo lugar (§16).
export const PALETTE = {
  base: {
    crema: "#f6f6f6", // fondo claro principal
    grafito: "#1d1d1b", // texto principal / contraste oscuro
  },
  acentosCalidos: {
    rosa: "#f094ac", // acento cálido secundario (detalles, badges)
    naranja: "#f59400", // acento cálido principal (CTAs, botón WhatsApp)
  },
};

// -----------------------------------------------------------------------------
// 3. REDES SOCIALES (§13)
// -----------------------------------------------------------------------------
// `url` queda en null mientras el dato de contacto siga siendo un
// placeholder entre corchetes (§28) — así ningún componente termina
// renderizando un <a href="[INSTAGRAM_URL_DEIVI]"> roto. Los componentes
// que consuman este array deben tratar `url: null` como "mostrar el label
// como texto plano, sin link", no como error.
export const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    icon: "instagram",
    url: isPlaceholderValue(COMPANY.contact.instagramUrl) ? null : COMPANY.contact.instagramUrl,
    handle: COMPANY.contact.instagramHandle,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: "whatsapp",
    url: null, // se completa más abajo con buildWhatsappUrl()
  },
  {
    id: "email",
    label: "Email",
    icon: "mail",
    url: isPlaceholderValue(COMPANY.contact.email) ? null : `mailto:${COMPANY.contact.email}`,
  },
];

// -----------------------------------------------------------------------------
// 4. SEO BÁSICO (§22)
// -----------------------------------------------------------------------------
export const SEO = {
  title: "DeIvi Pastelería & Catering | Eventos 360 para empresas",
  description:
    "Catering, pastelería artesanal, coffee breaks, eventos y presentes empresariales. Descubrí las propuestas de DeIvi.",
  // Dominio final del sitio, sin barra al final (ej: https://deivi.com.ar).
  // Se usa para el Open Graph `url` y `metadataBase`; mientras sea un
  // placeholder, esos campos se omiten automáticamente (ver SEO.jsx).
  siteUrl: "https://deivi.com.ar",
  ogImage: "/images/que-hacemos/momentos-deivi.jpg", // ruta o URL de la imagen para Open Graph
  // El favicon real se sirve por convención de Next.js desde
  // src/app/icon.svg (placeholder de marca ya incluido ahí). Este campo
  // queda como referencia por si se reemplaza por un archivo .ico/.png.
  favicon: "[FAVICON_DEIVI]",
  locale: "es_AR",
};

// -----------------------------------------------------------------------------
// 5. ANALÍTICA (§23) — placeholders para integrar más adelante
// -----------------------------------------------------------------------------
export const ANALYTICS = {
  // Completar y conectar en _app / layout cuando se disponga de las cuentas.
  googleAnalyticsId: "[GA_MEASUREMENT_ID]", // ej: G-XXXXXXXXXX
  googleTagManagerId: "[GTM_ID]", // ej: GTM-XXXXXXX
  metaPixelId: "[META_PIXEL_ID]",
};

// -----------------------------------------------------------------------------
// 6. HERO (primera pantalla)
// -----------------------------------------------------------------------------
export const HERO = {
  eyebrow: "DeIvi Catering ",
  title: "Eventos 360 para Empresas",
  subtitle:
    "Propuestas corporativas pensadas para empresas",
  image: "[IMAGEN_HERO_DEIVI]", // imagen gastronómica de alta calidad (WebP)
  imageAlt: "Producción gastronómica artesanal DeIvi",
  logo: "/images/logo-mark.png", // isotipo sin el texto "Pastelería" (recorte de /images/logo.png)
  ctaPrimary: {
    label: "VER PROPUESTAS",
    action: "scroll",
    target: "que-hacemos", // ancla a la sección "Qué hacemos"
  },
  ctaWhatsapp: {
    label: "HABLAR CON DEIVI",
    action: "whatsapp",
    contextKey: "hero",
  },
};

// -----------------------------------------------------------------------------
// 7. "QUÉ HACEMOS" — 4 tarjetas (§5)
// -----------------------------------------------------------------------------
export const WHAT_WE_DO_INTRO = {
  eyebrow: "Qué hacemos",
  title: "Como Crear Momentos con Deivi",
};

export const WHAT_WE_DO = [
  {
    id: "catering-corporativo",
    title: "Catering corporativo",
    description:
      "Coffee breaks, reuniones, capacitaciones, presentaciones y encuentros empresariales.",
    image: "/images/que-hacemos/catering-corporativo.jpg",
    imageAlt: "Catering corporativo DeIvi",
    ctaLabel: "VER PROPUESTA",
    contextKey: "catering-corporativo",
  },
  {
    id: "eventos",
    title: "Eventos",
    description:
      "Propuestas gastronómicas para eventos sociales, institucionales y corporativos.",
    image: "/images/que-hacemos/eventos.jpg",
    imageAlt: "Eventos DeIvi",
    ctaLabel: "VER PROPUESTA",
    contextKey: "eventos",
  },
  {
    id: "Momentos-DeIvi",
    title: "Momentos DeIvi",
    description: "Regalos que se convierten en exoeriencias.",
    image: "/images/que-hacemos/momentos-deivi.jpg",
    imageAlt: "Cajas y productos DeIvi",
    ctaLabel: "VER PROPUESTA",
    contextKey: "pasteleria",
  },
  {
    id: "presentes-empresariales",
    title: "Presentes empresariales",
    description:
      "Regalos Corporativos para Celebrar y Agradecer.",
    image: "/images/que-hacemos/presentes-empresariales.jpg",
    imageAlt: "Presentes empresariales DeIvi",
    ctaLabel: "VER PROPUESTA",
    contextKey: "presentes-empresariales",
  },
];

// -----------------------------------------------------------------------------
// 8. "NUESTROS SERVICIOS" — 9 ítems (§6)
// -----------------------------------------------------------------------------
export const SERVICES_INTRO = {
  eyebrow: "Nuestros servicios",
  title: "Todo lo que podemos armar para tu empresa",
};

export const SERVICES = [
  {
    id: "srv-coffee-breaks",
    title: "Coffee breaks",
    description: "Pausas gastronómicas cuidadas para reuniones y jornadas de trabajo.",
    icon: "coffee",
    contextKey: "catering-corporativo",
  },
  {
    id: "srv-desayunos-empresariales",
    title: "Desayunos empresariales",
    description: "Desayunos completos para recibir clientes, equipos o visitas.",
    icon: "sunrise",
    contextKey: "catering-corporativo",
  },
  {
    id: "srv-catering-reuniones",
    title: "Catering para reuniones",
    description: "Propuestas ágiles y prolijas para encuentros de trabajo.",
    icon: "users",
    contextKey: "catering-corporativo",
  },
  {
    id: "srv-catering-eventos",
    title: "Catering para eventos",
    description: "Servicio gastronómico integral para eventos institucionales y sociales.",
    icon: "utensils",
    contextKey: "eventos",
  },
  {
    id: "srv-boxes-corporativos",
    title: "Boxes corporativos",
    description: "Boxes gastronómicos listos para entregar a equipos y clientes.",
    icon: "package",
    contextKey: "presentes-empresariales",
  },
  {
    id: "srv-regalos-empresariales",
    title: "Regalos empresariales",
    description: "Propuestas dulces para agasajar en fechas especiales.",
    icon: "gift",
    contextKey: "presentes-empresariales",
  },
];

// -----------------------------------------------------------------------------
// 9. DIFERENCIALES DE DEIVI — 4 ítems (§10)
// -----------------------------------------------------------------------------
// Cada ítem tiene `icon` (nombre de lucide-react, usado como respaldo) e
// `image` (ruta a una imagen propia). Mientras `image` sea un placeholder
// entre corchetes (§28), la tarjeta sigue mostrando el ícono de `icon` — en
// cuanto se cargue una imagen real en `image`, esa pasa a usarse en su lugar
// (ver Differentiators.jsx).
export const DIFFERENTIATORS = {
  title: "¿Por qué elegir DeIvi?",
  items: [
    {
      id: "artesanal",
      title: "Artesanal",
      description: "Productos elaborados con cuidado y atención al detalle.",
      icon: "hand",
      image: "/images/diferenciales/artesanal.png",
    },
    {
      id: "personalizado",
      title: "Personalizado",
      description: "Propuestas adaptadas a cada empresa y ocasión.",
      icon: "sliders",
      image: "/images/diferenciales/personalizado.png",
    },
    {
      id: "profesional",
      title: "Profesional",
      description: "Organización y presentación pensadas para el ámbito corporativo.",
      icon: "briefcase",
      image: "/images/diferenciales/profesional.png",
    },
    {
      id: "calidad",
      title: "Calidad",
      description: "Ingredientes, elaboración y presentación cuidadosamente seleccionados.",
      icon: "award",
      image: "/images/diferenciales/calidad.png",
    },
  ],
};

// -----------------------------------------------------------------------------
// 10. LLAMADA A LA ACCIÓN FINAL (§12)
// -----------------------------------------------------------------------------
export const FINAL_CTA = {
  title: "¿Estás organizando un evento?",
  text: "Contanos qué necesitás y armamos una propuesta gastronómica para tu empresa.",
  buttonLabel: "QUIERO UNA PROPUESTA",
  contextKey: "cta-final",
};

// -----------------------------------------------------------------------------
// 11. CONTACTO (§13)
// -----------------------------------------------------------------------------
// Mismo criterio que SOCIAL_LINKS: `url: null` mientras el dato sea un
// placeholder, para que la sección de Contacto (cuando se construya) no
// pueda renderizar sin querer un enlace roto.
export const CONTACT = {
  title: COMPANY.fullName,
  buttonLabel: "CONTACTAR A DEIVI",
  contextKey: "contacto",
  channels: [
    { id: "whatsapp", label: COMPANY.contact.whatsappDisplay, contextKey: "contacto" },
    {
      id: "instagram",
      label: COMPANY.contact.instagramHandle,
      url: isPlaceholderValue(COMPANY.contact.instagramUrl) ? null : COMPANY.contact.instagramUrl,
    },
    {
      id: "email",
      label: COMPANY.contact.email,
      url: isPlaceholderValue(COMPANY.contact.email) ? null : `mailto:${COMPANY.contact.email}`,
    },
  ],
};

// -----------------------------------------------------------------------------
// 12. FRASE QR EN EL FOOTER (§19)
// -----------------------------------------------------------------------------
export const QR_FOOTER_MESSAGE = "¿Llegaste desde nuestro QR? Gracias por visitarnos.";

// -----------------------------------------------------------------------------
// 13. WHATSAPP — mensajes dinámicos por contexto (§14)
// -----------------------------------------------------------------------------
// Botones previstos: Hero, dentro de cada servicio/tarjeta, sección de
// contacto y botón flotante permanente. El número vive en una única
// variable (COMPANY.contact.whatsappNumber) para modificarse en un solo
// lugar. Cada `contextKey` de HERO / WHAT_WE_DO / SERVICES / FINAL_CTA /
// CONTACT resuelve acá su mensaje correspondiente.

const WHATSAPP_CONTEXT_MESSAGES = {
  hero: "Hola DeIvi, conocí sus propuestas y quisiera recibir información para mi empresa.",
  floating: "Hola DeIvi, quisiera hacer una consulta.",
  "cta-final": "Hola DeIvi, conocí sus propuestas y quisiera recibir información para mi empresa.",
  contacto: "Hola DeIvi, quisiera ponerme en contacto para conocer más sobre sus propuestas.",

  // Contextos de "Qué hacemos" / Servicios (§14 — ejemplos provistos)
  "catering-corporativo": "Hola DeIvi, quisiera consultar por una propuesta de catering para mi empresa.",
  eventos: "Hola DeIvi, quisiera recibir una propuesta para un evento.",
  pasteleria: "Hola DeIvi, quisiera conocer más sobre sus productos de pastelería artesanal.",
  "presentes-empresariales": "Hola DeIvi, quisiera conocer las opciones de presentes empresariales.",
  "propuestas-especiales": "Hola DeIvi, quisiera conocer sus propuestas gastronómicas personalizadas.",
};

/**
 * Codifica y arma la URL de wa.me a partir de un mensaje de texto.
 * @param {string} message
 * @returns {string}
 */
export function buildWhatsappUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${COMPANY.contact.whatsappNumber}?text=${encoded}`;
}

/**
 * Devuelve la URL de WhatsApp para un contexto fijo (hero, floating,
 * cta-final, contacto, o el contextKey de una tarjeta de servicio/qué-hacemos).
 * @param {string} contextKey
 * @returns {string}
 */
export function getWhatsappUrlByContext(contextKey) {
  const message = WHATSAPP_CONTEXT_MESSAGES[contextKey] || WHATSAPP_CONTEXT_MESSAGES.floating;
  return buildWhatsappUrl(message);
}

// Completa el link genérico de WhatsApp dentro de SOCIAL_LINKS.
SOCIAL_LINKS.find((link) => link.id === "whatsapp").url = getWhatsappUrlByContext("floating");

// -----------------------------------------------------------------------------
// 14. EXPORT POR DEFECTO (acceso agrupado opcional)
// -----------------------------------------------------------------------------
const siteData = {
  COMPANY,
  PALETTE,
  SOCIAL_LINKS,
  SEO,
  ANALYTICS,
  HERO,
  WHAT_WE_DO_INTRO,
  WHAT_WE_DO,
  SERVICES_INTRO,
  SERVICES,
  DIFFERENTIATORS,
  FINAL_CTA,
  CONTACT,
  QR_FOOTER_MESSAGE,
  isPlaceholderValue,
  buildWhatsappUrl,
  getWhatsappUrlByContext,
};

export default siteData;
