import Link from "next/link";
import RecetaForm from "@/components/RecetaForm";
import { crearReceta } from "../actions";

export default function NuevaRecetaPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/recetas" className="text-sm text-gray-500 hover:underline">
        ← Volver
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-semibold">Nueva receta</h1>
      <RecetaForm action={crearReceta} submitLabel="Crear receta" />
      <p className="mt-4 text-xs text-gray-500">
        Después de crearla vas a poder agregarle los insumos desde su página de detalle.
      </p>
    </main>
  );
}
