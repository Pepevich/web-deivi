export default function RecetaForm({ action, initial, submitLabel }) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nombre</label>
        <input
          name="nombre"
          required
          defaultValue={initial?.nombre}
          placeholder="Ej: Torta Oreo"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Molde / Presentación</label>
        <input
          name="moldeLabel"
          defaultValue={initial?.moldeLabel ?? ""}
          placeholder="Ej: Molde estándar"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Rendimiento (texto)
          </label>
          <input
            name="rendimientoLabel"
            defaultValue={initial?.rendimientoLabel ?? ""}
            placeholder="Ej: 16 porciones"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Rendimiento (número, para costo x porción)
          </label>
          <input
            type="number"
            name="rendimientoNumero"
            defaultValue={initial?.rendimientoNumero ?? ""}
            placeholder="Ej: 16"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Precio de venta</label>
        <input
          type="number"
          step="any"
          name="precioVenta"
          defaultValue={initial?.precioVenta ?? ""}
          placeholder="Ej: 15000"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
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
