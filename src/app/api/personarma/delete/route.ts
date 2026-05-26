import { auth } from "@/src/lib/auth"
import { prisma } from "@/src/lib/prisma"

export async function DELETE(req : Request) {
    const {id} = await req.json() 
    const session = await auth()

    const personarma = await prisma.personarma.findUnique({where:{id}})

    if (!personarma) return Response.json({error:"Personarma não encontrada"},{status:404})
    if (personarma?.usuarioId !== session?.user?.id) return Response.json({error:"Não autorizado"},{status:403})

    await prisma.personarma.delete({where: {id}})
    
    return Response.json({mensagem:"Personarma apagado com sucesso!"})
}