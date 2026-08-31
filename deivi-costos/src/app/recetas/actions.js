"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function parseRecetaForm(formData) {
  const nombre = String(formData.get("nombre") || "").trim();
  const moldeLabel = String(formData.get("moldeLabel") || "").trim() || null;
  const rendimientoLabel = String(formData.get("rendimientoLabel") || "").trim() || null;
  const rendimientoNumeroRaw = formData.get("rendimientoNumero");
  const rendimientoNumero =
    rendimientoNumeroRaw && String(rendimientoNumeroRaw).trim() !== ""
      ? parseInt(rendimientoNumeroRaw, 10)
      : null;
  const precioVentaRaw = formData.get("precioVenta");
  const precioVenta =
    precioVentaRaw && String(precioVentaRaw).trim() !== ""
      ? Number(precioVentaRaw)
      : null;

  if (!nombre) throw new Error("El nombre es obligatorio.");

  return { nombre, moldeLabel, rendimientoLabel, rendimientoNumero, precioVenta };
}

export async function crearReceta(formData) {
  const data = parseRecetaForm(formData);
  const receta = await prisma.receta.create({ data });
  revalidatePath("/recetas");
  redirect(`/recetas/${receta.id}`);
}

export async function actualizarReceta(id, formData) {
  const data = parseRecetaForm(formData);
  await prisma.receta.update({ where: { id }, data });
  revalidatePath("/recetas");
  revalidatePath(`/recetas/${id}`);
  redirect(`/recetas/${id}`);
}

export async function eliminarReceta(id) {
  await prisma.receta.delete({ where: { id } });
  revalidatePath("/recetas");
  redirect("/recetas");
}

export async function agregarLinea(recetaId, formData) {
  const ingredienteId = String(formData.get("ingredienteId") || "");
  const cantidadBase = Number(formData.get("cantidadBase"));
  const observaciones = String(formData.get("observaciones") || "").trim() || null;

  if (!ingredienteId) throw new Error("Elegí un insumo.");
  if (!(cantidadBase > 0)) throw new Error("La cantidad debe ser mayor a 0.");

  await prisma.recetaLinea.create({
    data: { recetaId, ingredienteId, cantidadBase, observaciones },
  });
  revalidatePath(`/recetas/${recetaId}`);
}

export async function actualizarLinea(lineaId, recetaId, formData) {
  const cantidadBase = Number(formData.get("cantidadBase"));
  if (!(cantidadBase > 0)) throw new Error("La cantidad debe ser mayor a 0.");

  await prisma.recetaLinea.update({
    where: { id: lineaId },
    data: { cantidadBase },
  });
  revalidatePath(`/recetas/${recetaId}`);
}

export async function eliminarLinea(lineaId, recetaId) {
  await prisma.recetaLinea.delete({ where: { id: lineaId } });
  revalidatePath(`/recetas/${recetaId}`);
}
