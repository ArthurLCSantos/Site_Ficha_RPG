import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
    const session = await auth()

    if (!session) return Response.json({error:"Não autorizado"},{status:401})

    if (session?.user?.role !== "ADMIN") return Response.json({error:"Não autorizado"},{status:403})

    const usuarios = await prisma.usuario.findMany({
        orderBy: {
            role: "desc",
        },
        select: {
            id:true,
            nome:true,
            email:true,
            personagens:true,
            personarmas:true
        }
    })

    return Response.json(usuarios)
}