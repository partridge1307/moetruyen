import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@utils/jwt";

export const authOptions = {
  providers: [
    Credentials({
      name: "Moetruyen",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          include: {
            badge: true,
            owner: true,
            guild: {
              include: {
                guild: true,
              },
            },
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials?.password, user.password))
        ) {
          return null;
        }

        const { password, email, ...usr } = user;
        const accessToken = signToken(usr, "5m");

        const result = {
          user: usr,
          accessToken,
        };
        return JSON.stringify(result) ?? null;
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = JSON.parse(user)?.accessToken;
      }
      return { user, ...token };
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = { ...JSON.parse(token.user)?.user };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
