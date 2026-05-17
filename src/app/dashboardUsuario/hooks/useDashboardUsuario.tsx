"use client"
import { useEffect, useState } from "react"

export function useDashboardUsuario() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [personagens, setPersonagens] = useState([])
    const [personarmas, setPersonarmas ] = useState([])

    useEffect(()=>{
        async function carregarPersonagem() {
            const res = await fetch("/api/personagem")
            const data = await res.json()

            if (!res.ok) {
                setError(data.erro || "Erro no servidor")
                return
            }

            setPersonagens(data)
        }

        async function carregarPersonarma() {
            const res = await fetch("/api/personarma")
            const data = await res.json()
            
            if (!res.ok) {
                setError(data.erro || "Erro no servidor")
                return
            }

            setPersonarmas(data)
        }

        carregarPersonagem()
        carregarPersonarma()
        setLoading(false)
    },[])

    return {
        error,
        loading,
        personagens,
        personarmas
    }
}