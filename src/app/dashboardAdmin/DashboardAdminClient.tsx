"use client"
import useDashboardAdmin from "./hooks/useDashboardAdmin"
import { Dashboard } from "../components/Dashboard"

import { useRouter } from "next/navigation"
import SignOutButton from "../dashboardUsuario/components/SignOutButton"

export default function DashboardAdminClient({adminId}) {
    const router = useRouter()
    const { usuarios } = useDashboardAdmin()
    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center">
            <div className="flex flex-col gap-10 lg:w-1/2 p-5 lg:p-20 bg-zinc-100 text-black">
            {usuarios.map((usuario)=> (
                <div key={usuario.id} className="w-full">

                    <h1 className="text-4xl font-bold">{usuario.nome}</h1>

                    <div className="w-full flex flex-col">
                        <Dashboard
                            titulo={"Personagens"}
                            columns={[
                                {key:"nome",label:"Nome"},
                                {key:"origem",label:"Origem"},
                                {key:"nivel",label:"Nivel"}
                            ]}
                            lista={usuario.personagens}
                            onCreate={adminId===usuario.id ? ()=>{router.push(`/ficha_personagem`)} : undefined}
                            elementOnClick={(id)=>{router.push(`/ficha_personagem/${id}`)}}
                        ></Dashboard>
        
                        <Dashboard
                            titulo={"Personarmas"}
                            columns={[
                                {key:"nome",label:"Nome"},
                                {key:"objeto",label:"Objeto"},
                                {key:"nivel",label:"Nivel"}
                            ]}
                            lista={usuario.personarmas}
                            onCreate={adminId===usuario.id ? ()=>{router.push(`/ficha_personarma`)} : undefined}
                            elementOnClick={(id)=>{router.push(`/ficha_personarma/${id}`)}}
                        ></Dashboard>
                    </div>
                </div>
            ))}

            <SignOutButton className={"w-20 px-5 py-2 bg-red-500 rounded-full text-zinc-100 cursor-pointer"}></SignOutButton>

            </div>
        </main>
    )
}