import { calcularCostoUnitario } from "./costeo";

export function calcularCostoLinea(linea) {
  return linea.cantidadBase * calcularCostoUnitario(linea.ingrediente);
}

export function calcularCostoTotal(receta) {
  return receta.lineas.reduce((acc, linea) => acc + calcularCostoLinea(linea), 0);
}

export function calcularCostoPorPorcion(receta) {
  if (!receta.rendimientoNumero) return null;
  return calcularCostoTotal(receta) / receta.rendimientoNumero;
}
