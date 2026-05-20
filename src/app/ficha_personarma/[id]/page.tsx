import PersonarmaForm from "../components/PersonarmaForm"
import { prisma } from "@/src/lib/prisma"
import { auth } from "@/src/lib/auth"
import { PersonarmaData } from "@/src/types/personarma"
import { Atributo } from "@/src/types/personagem"

export default async function EditPersonarma({params}:{params:{id:string}}) {
    const {id} = await params
    const session = await auth()
    const personarmaDB = await prisma.personarma.findUnique({where:{id}})
    const canEdit = personarmaDB?.usuarioId === session?.user?.id

    if (!personarmaDB) {
        return (
            <div className="min-h-screen w-full flex justify-center items-center">
                <p>Personarma não encontrada!</p>
            </div>
        )
    }

    const personarma: PersonarmaData = {
        ...personarmaDB,
        atributos: personarmaDB.atributos as Atributo[],
        imagem_url: personarmaDB.imagem_url ?? undefined
    }

    return (
        <main className="min-h-screen bg-gray-900 flex justify-center items-center text-black">
            <PersonarmaForm initialData={personarma} personarmaId={id} canEdit={canEdit} />
        </main>)
}