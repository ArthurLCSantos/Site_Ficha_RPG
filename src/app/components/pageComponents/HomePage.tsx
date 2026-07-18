"use client"
import { useState } from "react"
import Header from "../Header"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

export default function HomePage() {
    const [mode, setMode] = useState("login")
    return (
    <main className="min-h-screen bg-gray-900 flex flex-col justify-center items-center md:p-8 text-black"> 
        <div>
            <Header 
            opcao_atual={mode} 
            opcoes={[{key:"register",label:"Cadastrar"},{key:"login",label:"Entrar"}]} 
            onClick={(data:string)=>setMode(data)}
            classChildren={"w-full text-center text-3xl p-5 hover:bg-zinc-400 cursor-pointer"}
            classContainer={"flex w-full bg-zinc-200"}
            />
            { mode == "login"
            ? <LoginForm />
            : <RegisterForm /> }
        </div>
    </main>)
    }