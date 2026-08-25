/**
 * Icon.jsx
 * =============================================================================
 * Traduce los nombres de ícono en texto que ya usa siteData.js (ej: "coffee",
 * "sliders", "instagram") a los componentes reales de lucide-react, más el
 * ícono propio de WhatsApp (lucide no trae íconos de marca). Un solo mapa acá
 * evita repetir el switch/import en cada sección (§20).
 * =============================================================================
 */

import {
  Coffee,
  Sunrise,
  Users,
  Utensils,
  Package,
  Gift,
  Cake,
  Building,
  Sparkles,
  Hand,
  Sliders,
  Briefcase,
  Award,
  Instagram,
  Mail,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppButton";

const ICONS = {
  coffee: Coffee,
  sunrise: Sunrise,
  users: Users,
  utensils: Utensils,
  package: Package,
  gift: Gift,
  cake: Cake,
  building: Building,
  sparkles: Sparkles,
  hand: Hand,
  sliders: Sliders,
  briefcase: Briefcase,
  award: Award,
  instagram: Instagram,
  mail: Mail,
  whatsapp: WhatsAppIcon,
};

export default function Icon({ name, className }) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component className={className} aria-hidden="true" />;
}
