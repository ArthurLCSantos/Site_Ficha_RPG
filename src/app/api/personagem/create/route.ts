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
        origem, 
        especializacao, 
        imagem_url,
        nivel, 
        atributos, 
        pericias,
        habilidades} = await req.json()

    const personagem = 
        await prisma.personagem.create({
            data: {
                nome,
                origem,
                especializacao,
                imagem_url,
                nivel,
                atributos,
                pericias,
                habilidades,
                usuarioId:session.user.id
            }
        })
    
    return Response.json(personagem)
}