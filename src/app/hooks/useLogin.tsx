import { useState } from "react"
import { signIn } from "next-auth/react"

export function useLogin() {
    const [erro, setErro] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function handleLogin() {
        await signIn("credentials", {
        email: email,
        password: senha,

        redirect: true,
        callbackUrl: "/dashboardAdmin"
        })
    }

    return {
        erro,
        email, 
        setEmail, 
        senha, 
        setSenha, 
        handleLogin}
}