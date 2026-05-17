import { prisma } from "@/src/lib/prisma"
import { auth } from "@/src/lib/auth"

export async function DELETE(req) {
    const {id} = await req.json()
    const session = await auth()

    const personagem = await prisma.personagem.findUnique({where: {id}})

    if (!personagem) return Response.json({error:"Personagem não encontrado"},{status:404})
    if (personagem?.usuarioId !== session?.user?.id) return Response.json({error:"Não autorizado"},{status:403})

    await prisma.personagem.delete({where: {id}})
    
    return Response.json({mensagem:"Personagem apagado com sucesso!"})
}