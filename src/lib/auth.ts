import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { PrismaAdapter } from "@auth/prisma-adapter"

import bcrypt from "bcrypt"

import { prisma } from "./prisma"

export const {
    handlers,
    signIn,
    signOut,
    auth
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },

    providers: [

        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {

                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = 
                    await prisma.usuario.findUnique({
                        where: {
                            email: String(credentials.email)
                        }
                    })

                if (!user) return null

                const passwordMatch =
                    await bcrypt.compare(
                        String(credentials.password),
                        user.senha
                    )
                
                if (!passwordMatch) return null

                return {
                    id: user.id,
                    name: user.nome,
                    email: user.email,
                    role: user.role,
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id   = user.id
                token.role = user.role
            }

            return token
        },

        async session({ session, token }) {

            if ( session.user ) {
                session.user.id   = token.id as string
                session.user.role = token.role as string
            }
            return session
        }
    },

    secret: process.env.AUTH_SECRET,
})