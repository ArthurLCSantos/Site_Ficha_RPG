import { useState } from "react"
import { useRouter } from "next/navigation"

export function useRegister() {

  const router = useRouter()
  const [error, setError] = useState("")
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function handleRegister() {

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        email,
        senha
      })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error||"Erro no servidor!")
      return
    }
    router.push("/DashboardAdmin")
  }

  return {error, nome, setNome, email, setEmail, senha, setSenha, handleRegister}
}