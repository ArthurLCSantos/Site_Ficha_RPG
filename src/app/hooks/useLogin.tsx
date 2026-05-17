import { useState } from "react"
import { signIn } from "next-auth/react"

export function useLogin() {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function handleLogin() {
        const res = await signIn("credentials", {
        email: email,
        password: senha,

        redirect: true,
        callbackUrl: "/dashboardAdmin"
        })
    }

    return {
        error,
        email, 
        setEmail, 
        senha, 
        setSenha, 
        handleLogin}
}