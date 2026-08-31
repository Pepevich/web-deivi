import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Deivi — Costos",
  description: "Maestro de insumos y costeo de recetas de Deivi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
