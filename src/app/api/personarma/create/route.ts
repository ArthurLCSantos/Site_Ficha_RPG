import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function POST(req) {
    const session = await auth();

    if (!session?.user?.id) {
        return Response.json(
            {error:"Não autorizado"},
            {status:401}
        )
    }

    const {
        nome,
        objeto,
        nivel,
        atributos,
        habilidades,
        imagem_url
    } = await req.json()

    const personarma = 
        await prisma.personarma.create({
            data: {
                nome,
                objeto,
                nivel,
                atributos,
                habilidades,
                imagem_url,
                usuarioId:session.user.id
            }
        })
    
    return Response.json(personarma)
}