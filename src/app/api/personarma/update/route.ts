import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function PUT(req) {
    const {
        id, 
        nome,
        objeto,
        nivel,
        atributos,
        habilidades,
        imagem_url} = await req.json()

    const session = await auth()
        
    const personarma = await prisma.personarma.findUnique({where: {id}})

    if (!personarma) return Response.json({erro:"Personagem não encontrado"},{status:404})

    if (personarma?.usuarioId !== session?.user?.id) {
        return Response.json({erro:"Não autorizado"},{status:403})
    }

    const updated = 
        await prisma.personarma.update({
            where: {id},
            data: {
                nome,
                objeto,
                nivel,
                atributos,
                habilidades,
                imagem_url
            }
        })
    
    return Response.json(updated)
}