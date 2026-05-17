"use client"
import { useState } from "react"
import Header from "./components/Header"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

export default function Home() {
    const [mode, setMode] = useState("login")
    return (
    <main className="min-h-screen bg-gray-900 flex flex-col justify-center items-center md:p-8 text-black"> 
        <div>
            <Header mode={mode} setMode={setMode} />
            { mode == "login"
            ? <LoginForm />
            : <RegisterForm /> }
        </div>
    </main>)
}