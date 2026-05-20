import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function PUT(req : Request) {
    const {
        id, 
        nome,
        objeto,
        nivel,
        atributos,
        habilidades
    } = await req.json()

    const session = await auth()
        
    const personarma = await prisma.personarma.findUnique({where: {id}})

    if (!personarma) return Response.json({error:"Personagem não encontrado"},{status:404})

    if (personarma?.usuarioId !== session?.user?.id) {
        return Response.json({error:"Não autorizado"},{status:403})
    }

    const updated = 
        await prisma.personarma.update({
            where: {id},
            data: {
                nome,
                objeto,
                nivel,
                atributos,
                habilidades
            }
        })
    
    return Response.json(updated)
}