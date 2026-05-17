import CharacterForm from "../components/CharacterForm";
import { prisma } from "@/src/lib/prisma"
import { auth } from "@/src/lib/auth"

export default async function EditFicha({params}) {
  const { id } = await params
  const session = await auth()
  const personagem = await prisma.personagem.findUnique({where:{id}})
  const canEdit = personagem?.usuarioId === session?.user?.id
  return (
    <main className="min-h-screen bg-gray-900 flex justify-center items-start md:p-8 text-black">
      <CharacterForm initialData={personagem} characterId={id} canEdit={canEdit} />
    </main>
  );
}