"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseForm(formData) {
  const nombre = String(formData.get("nombre") || "").trim();
  const unidadCompraLabel = String(formData.get("unidadCompraLabel") || "").trim();
  const cantidadPorCompra = Number(formData.get("cantidadPorCompra"));
  const unidadBase = String(formData.get("unidadBase") || "");
  const precioCompra = Number(formData.get("precioCompra"));
  const mermaPct = Number(formData.get("mermaPct") || 0);

  if (!nombre) throw new Error("El nombre es obligatorio.");
  if (!unidadCompraLabel) throw new Error("La unidad de compra es obligatoria.");
  if (!["g", "ml", "unidad"].includes(unidadBase)) {
    throw new Error("Unidad base inválida.");
  }
  if (!(cantidadPorCompra > 0)) {
    throw new Error("La cantidad por compra debe ser mayor a 0.");
  }
  if (!(precioCompra > 0)) {
    throw new Error("El precio de compra debe ser mayor a 0.");
  }
  if (mermaPct < 0 || mermaPct > 100) {
    throw new Error("La merma debe estar entre 0 y 100.");
  }

  return { nombre, unidadCompraLabel, cantidadPorCompra, unidadBase, precioCompra, mermaPct };
}

export async function crearInsumo(formData) {
  const data = parseForm(formData);
  await prisma.ingrediente.create({ data });
  revalidatePath("/insumos");
  redirect("/insumos");
}

export async function actualizarInsumo(id, formData) {
  const data = parseForm(formData);
  await prisma.ingrediente.update({ where: { id }, data });
  revalidatePath("/insumos");
  redirect("/insumos");
}

export async function eliminarInsumo(id) {
  await prisma.ingrediente.delete({ where: { id } });
  revalidatePath("/insumos");
}
