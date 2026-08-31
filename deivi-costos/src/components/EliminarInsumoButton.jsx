"use client";

export default function EliminarInsumoButton({ action, nombre }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`¿Eliminar el insumo "${nombre}"?`)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-sm text-red-600 hover:underline">
        Eliminar
      </button>
    </form>
  );
}
