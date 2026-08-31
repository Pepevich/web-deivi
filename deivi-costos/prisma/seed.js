const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_USER_EMAIL;
  const password = process.env.SEED_USER_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Definí SEED_USER_EMAIL y SEED_USER_PASSWORD en .env antes de correr el seed."
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.usuario.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed },
  });

  console.log(`Usuario listo: ${email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
