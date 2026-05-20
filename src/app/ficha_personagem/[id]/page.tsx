import CharacterForm from "../components/CharacterForm";
import { prisma } from "@/src/lib/prisma"
import { auth } from "@/src/lib/auth"
import { Atributo, PersonagemData } from "@/src/types/personagem";
import { SkillsState } from "@/src/types/skill";

export default async function EditFicha({params} : {params:{id:string}}) {
  const { id } = await params
  const session = await auth()
  const personagemDB = await prisma.personagem.findUnique({where:{id}})
  const canEdit = personagemDB?.usuarioId === session?.user?.id

  if (!personagemDB) {
    return <div className="min-h-screen w-full flex justify-center items-center">
      <p>Personagem não encontrado!</p>
    </div>
  }

  const personagem: PersonagemData = {
    ...personagemDB,
    atributos: personagemDB?.atributos as Atributo[],
    pericias: personagemDB?.pericias as SkillsState,
    imagem_url: personagemDB.imagem_url ?? undefined
  }

  return (
    <main className="min-h-screen bg-gray-900 flex justify-center items-start md:p-8 text-black">
      <CharacterForm initialData={personagem} characterId={id} canEdit={canEdit} />
    </main>
  );
}