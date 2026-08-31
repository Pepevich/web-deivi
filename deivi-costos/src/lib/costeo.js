export const UNIDADES_BASE = [
  { value: "g", label: "gramo (g)" },
  { value: "ml", label: "mililitro (ml)" },
  { value: "unidad", label: "unidad (u)" },
];

/**
 * Costo por unidad base, contemplando la merma.
 * No se persiste: se recalcula siempre a partir del precio/cantidad/merma vigentes.
 */
export function calcularCostoUnitario({ precioCompra, cantidadPorCompra, mermaPct }) {
  const cantidadNeta = cantidadPorCompra * (1 - mermaPct / 100);
  if (cantidadNeta <= 0) return 0;
  return precioCompra / cantidadNeta;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);
}
