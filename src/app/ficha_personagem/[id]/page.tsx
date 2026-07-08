import CharacterForm from "../components/CharacterForm";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import {
  Atributo,
  HabilidadeData,
  PersonagemData,
  StatusData,
} from "@/src/types/personagem";
import { SkillsState } from "@/src/types/skill";
import { ItemData } from "@/src/types/item";


export default async function Home({  params, }: {params: { id: string };}) {

  const { id } = await params;
  console.log(`CHEGOU NA EDIÇÃO DE FICHA_PERSONAGEM, ID = ${id}`)
  const session = await auth();
  const personagemDB = await prisma.personagem.findUnique({ where: { id } });
  const canEdit = personagemDB?.usuarioId === session?.user?.id;

  if (!personagemDB) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <p>Personagem não encontrado!</p>
      </div>
    );
  }

  const personagem: PersonagemData = {
    ...personagemDB,
    habilidades: personagemDB?.habilidades as HabilidadeData[],
    atributos: personagemDB?.atributos as Atributo[],
    pericias: personagemDB?.pericias as SkillsState,
    inventario: personagemDB?.inventario as ItemData[],
    vida: personagemDB?.vida as StatusData,
    estamina: personagemDB?.estamina as StatusData,
    imagem_url: personagemDB.imagem_url ?? undefined,
  };

  return (
    <main className="w-full bg-gray-900 flex justify-center items-start text-black">
      <CharacterForm
        initialData={personagem}
        characterId={id}
        role={session?.user.role}
        isOwner={session?.user.id===personagemDB.usuarioId}
      />
    </main>
  );
}
