import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const usuario = await prisma.usuario.findUnique({
          where: { email: credentials.email },
        });
        if (!usuario) return null;

        const valido = await bcrypt.compare(credentials.password, usuario.password);
        if (!valido) return null;

        return { id: usuario.id, email: usuario.email };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub;
      return session;
    },
  },
};
