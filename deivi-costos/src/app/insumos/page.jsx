import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { calcularCostoUnitario, formatCurrency } from "@/lib/costeo";
import { eliminarInsumo } from "./actions";
import EliminarInsumoButton from "@/components/EliminarInsumoButton";

export const dynamic = "force-dynamic";

export default async function InsumosPage() {
  const insumos = await prisma.ingrediente.findMany({
    orderBy: { nombre: "asc" },
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Maestro de insumos</h1>
        <Link
          href="/insumos/nuevo"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          + Nuevo insumo
        </Link>
      </div>

      {insumos.length === 0 ? (
        <p className="text-sm text-gray-500">
          Todavía no cargaste ningún insumo.
        </p>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-2 font-medium">Nombre</th>
                <th className="px-4 py-2 font-medium">Compra</th>
                <th className="px-4 py-2 font-medium">Precio compra</th>
                <th className="px-4 py-2 font-medium">Merma</th>
                <th className="px-4 py-2 font-medium">Costo por unidad base</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {insumos.map((insumo) => {
                const costoUnitario = calcularCostoUnitario(insumo);
                const eliminarConId = eliminarInsumo.bind(null, insumo.id);

                return (
                  <tr key={insumo.id} className="border-t border-gray-100">
                    <td className="px-4 py-2 font-medium">{insumo.nombre}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {insumo.unidadCompraLabel} ({insumo.cantidadPorCompra}{" "}
                      {insumo.unidadBase})
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {formatCurrency(insumo.precioCompra)}
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {insumo.mermaPct}%
                    </td>
                    <td className="px-4 py-2 font-medium">
                      {formatCurrency(costoUnitario)} / {insumo.unidadBase}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/insumos/${insumo.id}`}
                          className="text-sm text-gray-600 hover:underline"
                        >
                          Editar
                        </Link>
                        <EliminarInsumoButton
                          action={eliminarConId}
                          nombre={insumo.nombre}
                        />
                      </div>
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
