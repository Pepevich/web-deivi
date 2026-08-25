/**
 * Contact.jsx — Contacto (Prompt Maestro §13)
 * =============================================================================
 * Mismo criterio documentado en siteData.js para CONTACT.channels: el canal
 * "whatsapp" arma su link vía getWhatsappUrlByContext (no trae `url` propio);
 * instagram/email traen `url: null` mientras sigan siendo placeholders — en
 * ese caso el label se muestra como texto plano, sin <a>, para no renderizar
 * un enlace roto (§28).
 * =============================================================================
 */

import { CONTACT, getWhatsappUrlByContext } from "@/data/siteData";
import Icon from "./Icon";

export default function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
      <h2 className="font-display text-2xl font-semibold text-grafito sm:text-3xl">{CONTACT.title}</h2>

      <ul className="mt-10 space-y-4">
        {CONTACT.channels.map((channel) => {
          const href =
            channel.id === "whatsapp" ? getWhatsappUrlByContext(channel.contextKey || "contacto") : channel.url;
          const iconName = channel.id === "email" ? "mail" : channel.id;

          const content = (
            <span className="inline-flex items-center gap-3 text-base text-grafito">
              <Icon name={iconName} className="h-5 w-5 text-naranja" />
              {channel.label}
            </span>
          );

          return (
            <li key={channel.id} className="flex justify-center">
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
