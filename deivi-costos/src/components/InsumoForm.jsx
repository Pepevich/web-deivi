import { UNIDADES_BASE } from "@/lib/costeo";

export default function InsumoForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nombre</label>
        <input
          name="nombre"
          required
          defaultValue={initial?.nombre}
          placeholder="Ej: Harina 0000"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Unidad de compra (como la comprás)
        </label>
        <input
          name="unidadCompraLabel"
          required
          defaultValue={initial?.unidadCompraLabel}
          placeholder="Ej: Bolsa 25kg, Docena, Lata 800g"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Cantidad por compra
          </label>
          <input
            type="number"
            step="any"
            name="cantidadPorCompra"
            required
            defaultValue={initial?.cantidadPorCompra}
            placeholder="Ej: 25000"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Unidad base</label>
          <select
            name="unidadBase"
            required
            defaultValue={initial?.unidadBase ?? ""}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Elegir...
            </option>
            {UNIDADES_BASE.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Ingresá la cantidad en la unidad base elegida. Ej: si comprás una bolsa
        de 25kg y la unidad base es gramo, poné 25000.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Precio de compra
          </label>
          <input
            type="number"
            step="any"
            name="precioCompra"
            required
            defaultValue={initial?.precioCompra}
            placeholder="Ej: 18000"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Merma (%)</label>
          <input
            type="number"
            step="any"
            name="mermaPct"
            defaultValue={initial?.mermaPct ?? 0}
            placeholder="0"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
