"use client";

export default function ImprimirButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      Imprimir
    </button>
  );
}
