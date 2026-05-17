import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        return Response.json(
            {error:"Não autorizado"},
            {status:401}
        )
    }

    const personarmas = 
        await prisma.personarma.findMany({
            where: {usuarioId:session.user.id}
        })
    
    return Response.json(personarmas)
}