import Link from "next/link";
import InsumoForm from "@/components/InsumoForm";
import { crearInsumo } from "../actions";

export default function NuevoInsumoPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/insumos" className="text-sm text-gray-500 hover:underline">
        ← Volver
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-semibold">Nuevo insumo</h1>
      <InsumoForm action={crearInsumo} submitLabel="Crear insumo" />
    </main>
  );
}
