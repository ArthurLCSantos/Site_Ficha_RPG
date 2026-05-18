"use client"
import { PersonagemData } from "@/src/types/personagem"
import { Dashboard } from "../components/Dashboard"
import { SkeletonDashboard } from "../components/Dashboard"
import SignOutButton from "./components/SignOutButton"
import { useDashboardUsuario } from "./hooks/useDashboardUsuario"
import { useRouter } from "next/navigation"
import { PersonarmaData } from "@/src/types/personarma"

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
            <div className="flex flex-col gap-10 lg:w-1/2 p-20 bg-zinc-100 text-black">
                {error && <h1 className="text-red-500 bg-black rounded-full p-2">Ocorreu um erro: error</h1>}
                <Dashboard<PersonagemData>
                    titulo={"Meus Personagens"}
                    columns={[
                        {key:"nome",label:"Nome"},
                        {key:"origem",label:"Origem"},
                        {key:"nivel",label:"Nivel"}
                    ]}
                    lista={personagens}
                    onCreate={()=>{router.push("/ficha_personagem")}}
                    elementOnClick={(id:String)=>{router.push(`/ficha_personagem/${id}`)}}
                ></Dashboard>

                <Dashboard<PersonarmaData>
                    titulo={"Minhas Personarmas"}
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