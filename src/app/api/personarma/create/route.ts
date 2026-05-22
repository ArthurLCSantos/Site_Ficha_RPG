import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function POST(req : Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return Response.json(
            {error:"Não autorizado"},
            {status:401}
        )
    }

    const {
        nome,
        imagem_url,
        objeto,
        nivel,
        atributos,
        habilidades
    } = await req.json()

    const personarma = 
        await prisma.personarma.create({
            data: {
                nome,
                imagem_url,
                objeto,
                nivel,
                atributos,
                habilidades,
                usuarioId:session.user.id
            }
        })
    
    return Response.json(personarma)
}