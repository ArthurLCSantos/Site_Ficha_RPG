import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useLogin() {
    
    const router = useRouter()
    const [erro, setErro] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function handleLogin() {
        const res = await signIn("credentials", {
        email: email,
        password: senha,

        redirect: false
        })

        if (res?.error) {
            setErro("Senha ou Email Inválidos.");
            return;
        }

        router.push('/dashboardAdmin')
    }

    return {
        erro,
        email, 
        setEmail, 
        senha, 
        setSenha, 
        handleLogin}
}