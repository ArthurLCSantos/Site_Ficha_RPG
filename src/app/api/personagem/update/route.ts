import { prisma } from "@/src/lib/prisma"

export async function PUT(req : Request) {
    const {
    id, 
    nome, 
    origem, 
    especializacao, 
    experiencia,
    ca,
    vida,
    estamina,
    atributos, 
    pericias,
    habilidades,
    
    imagem_url,
    historia,
    ideais,
    defeitos,
    inventario } = await req.json()
    
    const personagem = await prisma.personagem.findUnique({where: {id}})
    
    if (!personagem) return Response.json({error:"Personagem não encontrado"},{status:404})
    
    const updated = await prisma.personagem.update({
            where: {id},
            data: {
                nome,
                origem,
                especializacao,
                experiencia,
                ca,
                vida,
                estamina,
                atributos,
                pericias,
                habilidades,

                imagem_url,
                historia,
                ideais,
                defeitos,
                inventario
            }
        })
    
    return Response.json(updated)
}