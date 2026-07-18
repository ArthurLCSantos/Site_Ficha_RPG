"use client"
import { PersonagemData } from "@/src/types/personagem"
import { Dashboard } from "../components/Dashboard"
import { SkeletonDashboard } from "../components/Dashboard"
import SignOutButton from "./components/SignOutButton"
import { useDashboardUsuario } from "./hooks/useDashboardUsuario"
import { useRouter } from "next/navigation"
import { PersonarmaData } from "@/src/types/personarma"
import PersonagemCard from "../components/PersonagemCard"
import DashboardPersonagem from "../components/DashboardPersonagem"

function SkeletonDashboardUsuario() {
    return <main className="min-h-screen w-full flex flex-col justify-center items-center">
            <div className="flex flex-col gap-10 lg:w-1/2 p-20 bg-zinc-100 text-black">
                <SkeletonDashboard />
                <SkeletonDashboard />
                <SignOutButton className={"w-20 px-5 py-2 bg-red-500 rounded-full text-zinc-100 cursor-pointer"}></SignOutButton>
            </div>
        </main>
}

export default function DashboardUsuarioClient() {
    const router = useRouter()
    const { error,loading,personagens, personarmas } = useDashboardUsuario()

    if (loading) return <SkeletonDashboardUsuario/>

    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center">
            <div className="w-full lg:w-1/2 flex flex-col gap-10 px-10 py-20 bg-zinc-100 text-black">
            
                {error && <h1 className="text-red-500 bg-black rounded-full p-2">Ocorreu um erro: {error}</h1>}

                <DashboardPersonagem
                personagens={personagens}
                titulo="Personagens"
                tamanho={150}
                onCreate={()=>{router.push("/ficha_personagem")}}
                elementOnClick={(value:String)=>{router.push(`/ficha_personagem/${value}`)}}
                />

                <Dashboard<PersonarmaData>
                    titulo={"Personarmas"}
                    columns={[
                        {key:"nome",label:"Nome"},
                        {key:"objeto",label:"Objeto"},
                        {key:"nivel",label:"Nivel"}
                    ]}
                    lista={personarmas}
                    onCreate={()=>{router.push("/ficha_personarma")}}
                    elementOnClick={(id:String)=>{router.push(`/ficha_personarma/${id}`)}}
                ></Dashboard>

                <SignOutButton className={"w-20 px-5 py-2 bg-red-500 rounded-full text-zinc-100 cursor-pointer"}></SignOutButton>
            </div>
        </main>
    )
}