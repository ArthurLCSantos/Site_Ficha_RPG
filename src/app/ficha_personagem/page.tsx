import CharacterForm from "./components/CharacterForm";

export default function CriarFichaPage() {
  return (
    <main className="min-h-screen bg-gray-900 flex justify-center items-start md:p-8 text-black">
      <CharacterForm canEdit={true} />
    </main>
  );
}