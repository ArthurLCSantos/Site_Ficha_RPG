import CharacterForm from "./components/CharacterForm";
import { auth } from "@/src/lib/auth"

export default async function Home() {
  const session = await auth();
  console.log("CHEGOU NA CRIAÇÃO DE FICHA_PERSONAGEM")
  return (
    <main className="min-h-screen bg-gray-900 flex justify-center items-start text-black">
      <CharacterForm isOwner={true} role={session?.user.role} />
    </main>
  );
}