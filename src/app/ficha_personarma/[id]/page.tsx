import PersonarmaForm from "../components/PersonarmaForm"
import { prisma } from "@/src/lib/prisma"
import { auth } from "@/src/lib/auth"

export default async function EditPersonarma({params}) {
    const {id} = await params
    const session = await auth()
    const personarma = await prisma.personarma.findUnique({where:{id}})
    const canEdit = personarma?.usuarioId === session?.user?.id

    return (
        <main className="min-h-screen bg-gray-900 flex justify-center items-center text-black">
            <PersonarmaForm initialData={personarma} personarmaId={id} canEdit={canEdit} />
        </main>)
}