const path = require("node:path");
const XLSX = require("xlsx");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const HOJAS_IGNORADAS = new Set(["Precios", "Resumen"]);

// Ingredientes que se compran/usan por unidad contable (no por peso/volumen).
// Confirmado mirando el uso real en las 36 recetas: son los únicos que
// aparecen consistentemente etiquetados "Unidades"/"unidad".
const INSUMOS_POR_UNIDAD = new Set(["Huevos", "Pionono"]);

// Normaliza nombres con typos/mayúsculas de las hojas de receta hacia el
// nombre exacto usado en la hoja "Precios" (el maestro).
const NORMALIZACION_NOMBRES = {
  manterina: "Manterina",
  "azucar rubio": "Azúcar rubio",
  canela: "Canela",
  vainilla: "Vainilla",
  "mananas verdes": "manzanas verdes",
  " limón": "limon",
  limón: "limon",
  miel: "Miel",
};

function normalizarNombre(nombre) {
  const limpio = String(nombre).trim();
  const clave = limpio.toLowerCase();
  for (const [k, v] of Object.entries(NORMALIZACION_NOMBRES)) {
    if (k.toLowerCase() === clave) return v;
  }
  return limpio;
}

function extraerPrimerNumero(texto) {
  if (!texto) return null;
  const match = String(texto).match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

async function importarIngredientes(wb) {
  const ws = wb.Sheets["Precios"];
  const filas = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });

  const mapaIdPorNombre = new Map();

  // Fila 0 = título, fila 1 = encabezados, datos desde fila 2.
  for (const fila of filas.slice(2)) {
    const [nombre, precioKg] = fila;
    if (!nombre || precioKg === null) continue;

    const nombreNormalizado = String(nombre).trim();
    const porUnidad = INSUMOS_POR_UNIDAD.has(nombreNormalizado);

    const insumo = await prisma.ingrediente.upsert({
      where: { nombre: nombreNormalizado },
      update: {
        precioCompra: precioKg,
        cantidadPorCompra: porUnidad ? 1 : 1000,
        unidadBase: porUnidad ? "unidad" : "g",
      },
      create: {
        nombre: nombreNormalizado,
        unidadCompraLabel: porUnidad ? "Unidad" : "Kilogramo",
        cantidadPorCompra: porUnidad ? 1 : 1000,
        unidadBase: porUnidad ? "unidad" : "g",
        precioCompra: precioKg,
        mermaPct: 0,
      },
    });
    mapaIdPorNombre.set(nombreNormalizado, insumo.id);
  }

  // Miel: no existía en el maestro original, se agrega con el valor que
  // ya estaba hardcodeado (sin vincular) en la receta "Crumble".
  if (!mapaIdPorNombre.has("Miel")) {
    const miel = await prisma.ingrediente.upsert({
      where: { nombre: "Miel" },
      update: {},
      create: {
        nombre: "Miel",
        unidadCompraLabel: "Kilogramo",
        cantidadPorCompra: 1000,
        unidadBase: "g",
        precioCompra: 12000,
        mermaPct: 0,
      },
    });
    mapaIdPorNombre.set("Miel", miel.id);
  }

  return mapaIdPorNombre;
}

async function importarRecetas(wb, mapaIdPorNombre) {
  const nombresHojasReceta = wb.SheetNames.filter((n) => !HOJAS_IGNORADAS.has(n));

  const sinResolver = [];
  let recetasCreadas = 0;
  let lineasCreadas = 0;

  for (const nombreHoja of nombresHojasReceta) {
    const ws = wb.Sheets[nombreHoja];
    const filas = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });

    const filaMolde = filas[1] || [];
    const moldeLabel = filaMolde[0]
      ? String(filaMolde[0]).replace(/^Molde \/ Presentación:\s*/i, "").trim()
      : null;
    const rendimientoTexto = filaMolde[3]
      ? String(filaMolde[3]).replace(/^Rendimiento:\s*/i, "").trim()
      : null;

    let precioVenta = null;
    const lineas = [];

    for (const fila of filas.slice(3)) {
      const [colA, cantidad, unidad, precioUnitario] = fila;
      if (!colA) continue;
      const texto = String(colA);

      if (texto.startsWith("🏷️")) {
        const valor = fila[4];
        precioVenta = typeof valor === "number" && valor > 0 ? valor : null;
        continue;
      }
      if (
        texto.startsWith("💰") ||
        texto.startsWith("📈") ||
        texto.startsWith("📊")
      ) {
        continue;
      }
      if (cantidad === null) continue;

      const nombreNormalizado = normalizarNombre(colA);
      const ingredienteId = mapaIdPorNombre.get(nombreNormalizado);

      if (!ingredienteId) {
        sinResolver.push({ receta: nombreHoja, ingrediente: colA });
        continue;
      }

      const porUnidad = INSUMOS_POR_UNIDAD.has(nombreNormalizado);
      const cantidadBase = porUnidad ? cantidad : cantidad * 1000;

      lineas.push({ ingredienteId, cantidadBase });
    }

    const receta = await prisma.receta.create({
      data: {
        nombre: nombreHoja,
        moldeLabel,
        rendimientoLabel: rendimientoTexto,
        rendimientoNumero: extraerPrimerNumero(rendimientoTexto),
        precioVenta,
        lineas: { create: lineas },
      },
    });

    recetasCreadas += 1;
    lineasCreadas += lineas.length;
    void receta;
  }

  return { recetasCreadas, lineasCreadas, sinResolver };
}

async function main() {
  const rutaArchivo = process.argv[2];
  if (!rutaArchivo) {
    throw new Error(
      "Uso: node prisma/importRecetas.js \"<ruta al archivo .xlsx>\""
    );
  }

  const wb = XLSX.readFile(path.resolve(rutaArchivo));

  const mapaIdPorNombre = await importarIngredientes(wb);
  console.log(`Insumos en el maestro: ${mapaIdPorNombre.size}`);

  // Es idempotente a nivel insumos (upsert), pero las recetas se recrean
  // desde cero en cada corrida para evitar líneas duplicadas.
  await prisma.recetaLinea.deleteMany({});
  await prisma.receta.deleteMany({});

  const { recetasCreadas, lineasCreadas, sinResolver } = await importarRecetas(
    wb,
    mapaIdPorNombre
  );

  console.log(`Recetas creadas: ${recetasCreadas}`);
  console.log(`Líneas de receta creadas: ${lineasCreadas}`);

  if (sinResolver.length > 0) {
    console.log("\nLíneas que no se pudieron resolver a un insumo del maestro:");
    for (const s of sinResolver) {
      console.log(`  - [${s.receta}] "${s.ingrediente}"`);
    }
  } else {
    console.log("\nTodas las líneas se resolvieron correctamente contra el maestro.");
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
