"use client"
import { useEffect, useState } from "react"

export function useDashboardUsuario() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [personagens, setPersonagens] = useState([])
    const [personarmas, setPersonarmas ] = useState([])

    useEffect(()=>{

        async function carregarDados() {
            try {
                const [personagemRes, personarmaRes] = await Promise.all([fetch("/api/personagem"),fetch("/api/personarma")])

                if (!personagemRes.ok) {
                    setError("Erro ao carregar personagens")
                }
                if (!personarmaRes.ok) {
                    setError("Erro ao carregar personarma")
                }

                const personagemData = await personagemRes.json()
                const personarmaData = await personarmaRes.json()

                setPersonagens(personagemData)
                setPersonarmas(personarmaData)
            } catch (err) {
                console.error(err)

                setError("Erro ao conectar com o servidor")
            } finally {
                setLoading(false)
            }
        }

        carregarDados()
    },[])

    return {
        error,
        loading,
        personagens,
        personarmas
    }
}