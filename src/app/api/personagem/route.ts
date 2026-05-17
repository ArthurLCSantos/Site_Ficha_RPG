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

    const personagens = 
        await prisma.personagem.findMany({
            where: {usuarioId:session.user.id}
        })
    
    return Response.json(personagens)
}