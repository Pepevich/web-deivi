import Link from "next/link";
import { notFound } from "next/navigation";
import InsumoForm from "@/components/InsumoForm";
import { prisma } from "@/lib/prisma";
import { actualizarInsumo } from "../actions";

export default async function EditarInsumoPage({ params }) {
  const insumo = await prisma.ingrediente.findUnique({
    where: { id: params.id },
  });

  if (!insumo) notFound();

  const actualizarConId = actualizarInsumo.bind(null, insumo.id);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/insumos" className="text-sm text-gray-500 hover:underline">
        ← Volver
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-semibold">Editar insumo</h1>
      <InsumoForm
        action={actualizarConId}
        initial={insumo}
        submitLabel="Guardar cambios"
      />
    </main>
  );
}
