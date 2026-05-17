"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function useCharacterForm(initialData?,characterId?) {
    const router = useRouter()
    const isEditing = !!characterId
    const [nome,setNome] = useState(initialData?.nome || "")
    const [origem,setOrigem] = useState(initialData?.origem || "")
    const [especializacao,setEspecializacao] = useState(initialData?.especializacao || "")

    const [nivel, setNivel] = useState(initialData?.nivel || 0)

    const [atributos, setAtributos] = useState(initialData?.atributos || [
    {nome:"força" ,valor:1},
    {nome:"destreza" ,valor:1},
    {nome:"constituicao" ,valor:1},
    {nome:"inteligencia" ,valor:1},
    {nome:"sabedoria" ,valor:1},
    {nome:"carisma" ,valor:1},
    ])

    const [habilidades, setHabilidades] = useState(initialData?.habilidades || "")

    function updateAtributo(index, value) {
        setAtributos(( prev ) =>
            prev.map(( item, i ) =>
            i === index
                ? { ...item, valor:Number(value) }
                : item
            )
        )
    }

      async function deletePersonagem() {
        const res = await fetch("/api/personagem/delete", {
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({id:characterId})
        })

        router.back()
    }

    async function salvarPersonagem() {

        const url =  isEditing ? `/api/personagem/update` : "/api/personagem/create"

        const method = isEditing ? "PUT" : "POST"

        const body = isEditing ? {
                id: characterId,
                nome,
                origem,
                especializacao,
                nivel,
                atributos,
                pericias: skillsState
            } :
            {
                nome,
                origem,
                especializacao,
                nivel,
                atributos,
                pericias: skillsState
            }

        const res = await fetch(url, {
            method,
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        })

        router.back()
    }

    return {
        nome,
        setNome,

        origem,
        setOrigem,

        especializacao,
        setEspecializacao,

        nivel,
        setNivel,

        atributos,
        updateAtributo,

        habilidades,
        setHabilidades,

        isEditing,

        deletePersonagem,
        salvarPersonagem
    }
}