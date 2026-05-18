import bcrypt from "bcrypt"
import { prisma } from "@/src/lib/prisma"

export async function POST(req : Request) {
    const {nome, email, senha} = await req.json()
    if (!(nome && email && senha)) return Response.json({error:"Campos obrigatórios estão faltando!"},{status:400})
    try {

        const emailExist = await prisma.usuario.findUnique({where:{email}})

        if (emailExist) return Response.json({error:"Já existe um usuário com esse email!"},{status:403})

        const hashedPassword = await bcrypt.hash(senha,10)

        const user = await prisma.usuario.create({
            data: {
                nome:  nome,
                email: email,
                senha: hashedPassword,
            }
        })

        return Response.json({
            id:    user.id,
            nome:  user.nome,
            email: user.email
        })

    } catch (err) {
        return Response.json({erro:`Erro no Servidor: ${err}`},{status:500})
    }
}