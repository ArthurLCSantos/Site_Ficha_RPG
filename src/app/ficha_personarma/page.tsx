import PersonarmaForm from "./components/PersonarmaForm";

export default function CreatePersonarma() {
    return (
    <main className="min-h-screen bg-gray-900 flex justify-center items-center md:p-8 text-black">
        <PersonarmaForm canEdit={true} />
    </main>
    )
}