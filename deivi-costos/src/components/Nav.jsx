import Link from "next/link";

export default function Nav() {
  return (
    <nav className="print:hidden border-b border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto flex max-w-5xl items-center gap-6 text-sm font-medium">
        <span className="text-gray-400">Deivi — Costos</span>
        <Link href="/insumos" className="hover:underline">
          Insumos
        </Link>
        <Link href="/recetas" className="hover:underline">
          Recetas
        </Link>
      </div>
    </nav>
  );
}
