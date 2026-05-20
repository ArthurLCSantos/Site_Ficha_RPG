import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function PUT(req : Request) {
    const {
    id, 
    nome, 
    origem, 
    especializacao, 
    nivel, 
    atributos, 
    pericias,
    habilidades} = await req.json()

    const session = await auth()
    
    const personagem = await prisma.personagem.findUnique({where: {id}})
    
    if (!personagem) return Response.json({error:"Personagem não encontrado"},{status:404})
    if (personagem?.usuarioId !== session?.user?.id) return Response.json({error:"Não autorizado"},{status:403})

    const updated = await prisma.personagem.update({
            where: {id},
            data: {
                nome,
                origem,
                especializacao,
                nivel,
                atributos,
                pericias,
                habilidades,
            }
        })
    
    return Response.json(updated)
}