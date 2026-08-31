import Link from "next/link";
import { notFound } from "next/navigation";
import RecetaForm from "@/components/RecetaForm";
import EliminarInsumoButton from "@/components/EliminarInsumoButton";
import ImprimirButton from "@/components/ImprimirButton";
import { prisma } from "@/lib/prisma";
import { calcularCostoUnitario, formatCurrency } from "@/lib/costeo";
import { calcularCostoLinea, calcularCostoTotal, calcularCostoPorPorcion } from "@/lib/costeoReceta";
import {
  actualizarReceta,
  eliminarReceta,
  agregarLinea,
  actualizarLinea,
  eliminarLinea,
} from "../actions";

export const dynamic = "force-dynamic";

export default async function RecetaDetallePage({ params }) {
  const receta = await prisma.receta.findUnique({
    where: { id: params.id },
    include: { lineas: { include: { ingrediente: true } } },
  });

  if (!receta) notFound();

  const insumos = await prisma.ingrediente.findMany({ orderBy: { nombre: "asc" } });

  const costoTotal = calcularCostoTotal(receta);
  const costoPorPorcion = calcularCostoPorPorcion(receta);

  const actualizarConId = actualizarReceta.bind(null, receta.id);
  const eliminarRecetaConId = eliminarReceta.bind(null, receta.id);
  const agregarLineaConId = agregarLinea.bind(null, receta.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/recetas" className="print:hidden text-sm text-gray-500 hover:underline">
        ← Volver
      </Link>

      <div className="mb-6 mt-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{receta.nombre}</h1>
        <div className="flex items-center gap-3">
          <ImprimirButton />
          <span className="print:hidden">
            <EliminarInsumoButton action={eliminarRecetaConId} nombre={receta.nombre} />
          </span>
        </div>
      </div>

      {/* Vista de impresión: hoja de trabajo de cocina, sin costos ni formularios */}
      <section className="hidden print:block mb-6">
        <p className="text-sm">
          {receta.moldeLabel && <>Molde / Presentación: {receta.moldeLabel}<br /></>}
          {receta.rendimientoLabel && <>Rendimiento: {receta.rendimientoLabel}</>}
        </p>
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-black text-left">
              <th className="py-1">Insumo</th>
              <th className="py-1">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {receta.lineas.map((linea) => (
              <tr key={linea.id} className="border-b border-gray-300">
                <td className="py-1">{linea.ingrediente.nombre}</td>
                <td className="py-1">
                  {linea.cantidadBase} {linea.ingrediente.unidadBase}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="print:hidden mb-10 rounded border border-gray-200 p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">
          Datos generales
        </h2>
        <RecetaForm action={actualizarConId} initial={receta} submitLabel="Guardar cambios" />
      </section>

      <section className="print:hidden mb-10 rounded border border-gray-200 p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Costo</h2>
        <p className="text-sm text-gray-600">
          Costo total: <span className="font-semibold text-gray-900">{formatCurrency(costoTotal)}</span>
        </p>
        <p className="text-sm text-gray-600">
          Costo por porción:{" "}
          <span className="font-semibold text-gray-900">
            {costoPorPorcion !== null ? formatCurrency(costoPorPorcion) : "— (definí el rendimiento numérico arriba)"}
          </span>
        </p>
      </section>

      <section className="print:hidden mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">Insumos</h2>

        {receta.lineas.length === 0 ? (
          <p className="mb-4 text-sm text-gray-500">Todavía no tiene insumos cargados.</p>
        ) : (
          <div className="mb-4 overflow-x-auto rounded border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Insumo</th>
                  <th className="px-4 py-2 font-medium">Cantidad</th>
                  <th className="px-4 py-2 font-medium">Costo</th>
                  <th className="px-4 py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {receta.lineas.map((linea) => {
                  const actualizarLineaConId = actualizarLinea.bind(null, linea.id, receta.id);
                  const eliminarLineaConId = eliminarLinea.bind(null, linea.id, receta.id);

                  return (
                    <tr key={linea.id} className="border-t border-gray-100">
                      <td className="px-4 py-2 font-medium">{linea.ingrediente.nombre}</td>
                      <td className="px-4 py-2">
                        <form action={actualizarLineaConId} className="flex items-center gap-2">
                          <input
                            type="number"
                            step="any"
                            name="cantidadBase"
                            defaultValue={linea.cantidadBase}
                            className="w-24 rounded border border-gray-300 px-2 py-1 text-sm"
                          />
                          <span className="text-gray-500">{linea.ingrediente.unidadBase}</span>
                          <button type="submit" className="text-xs text-gray-600 hover:underline">
                            Guardar
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-2 text-gray-600">
                        {formatCurrency(calcularCostoLinea(linea))}
                      </td>
                      <td className="px-4 py-2">
                        <EliminarInsumoButton
                          action={eliminarLineaConId}
                          nombre={linea.ingrediente.nombre}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <form action={agregarLineaConId} className="flex flex-wrap items-end gap-3 rounded border border-gray-200 p-4">
          <div>
            <label className="mb-1 block text-xs font-medium">Insumo</label>
            <select
              name="ingredienteId"
              required
              defaultValue=""
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Elegir...
              </option>
              {insumos.map((insumo) => (
                <option key={insumo.id} value={insumo.id}>
                  {insumo.nombre} ({formatCurrency(calcularCostoUnitario(insumo))}/{insumo.unidadBase})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Cantidad (en unidad base del insumo)</label>
            <input
              type="number"
              step="any"
              name="cantidadBase"
              required
              placeholder="Ej: 250"
              className="w-32 rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            + Agregar insumo
          </button>
        </form>
      </section>
    </main>
  );
}
