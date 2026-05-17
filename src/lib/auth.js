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

                const user = 
                    await prisma.usuario.findUnique({
                        where: {
                            email:credentials.email
                        }
                    })

                if (!user) return Response.json({error:"Email não encontrado!"},{status:404})

                const passwordMatch =
                    await bcrypt.compare(
                        credentials.password,
                        user.senha
                    )
                
                if (!passwordMatch) return Response.json({error:"Senha incorreta!"},{status:402})

                return Response.json({
                    id: user.id,
                    name: user.nome,
                    email: user.email,
                    role: user.role,
                })

            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id   = user.id
            }

            return token
        },

        async session({ session, token }) {
            session.user.id   = token.id
            session.user.role = token.role
        
            return session
        }
    },

    secret: process.env.AUTH_SECRET,
})