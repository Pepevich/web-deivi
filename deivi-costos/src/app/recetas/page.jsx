import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/costeo";
import { calcularCostoTotal, calcularCostoPorPorcion } from "@/lib/costeoReceta";

export const dynamic = "force-dynamic";

export default async function RecetasPage() {
  const recetas = await prisma.receta.findMany({
    orderBy: { nombre: "asc" },
    include: { lineas: { include: { ingrediente: true } } },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recetas</h1>
        <Link
          href="/recetas/nueva"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          + Nueva receta
        </Link>
      </div>

      {recetas.length === 0 ? (
        <p className="text-sm text-gray-500">Todavía no hay recetas cargadas.</p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Receta</th>
                <th className="px-4 py-2 font-medium">Rendimiento</th>
                <th className="px-4 py-2 font-medium">Costo total</th>
                <th className="px-4 py-2 font-medium">Costo por porción</th>
                <th className="px-4 py-2 font-medium">Precio de venta</th>
              </tr>
            </thead>
            <tbody>
              {recetas.map((receta) => {
                const costoTotal = calcularCostoTotal(receta);
                const costoPorPorcion = calcularCostoPorPorcion(receta);

                return (
                  <tr key={receta.id} className="border-t border-gray-100">
                    <td className="px-4 py-2 font-medium">
                      <Link href={`/recetas/${receta.id}`} className="hover:underline">
                        {receta.nombre}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {receta.rendimientoLabel ?? "—"}
                    </td>
                    <td className="px-4 py-2 font-medium">
                      {formatCurrency(costoTotal)}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {costoPorPorcion !== null ? formatCurrency(costoPorPorcion) : "—"}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {receta.precioVenta ? formatCurrency(receta.precioVenta) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
