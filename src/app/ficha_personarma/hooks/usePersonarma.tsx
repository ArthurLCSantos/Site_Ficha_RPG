"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { PersonarmaData } from "@/src/types/personarma";

type UsePersonarmaProps = {
  initialData?: PersonarmaData,
  personarmaId?: String
}

export function usePersonarma({initialData, personarmaId} : UsePersonarmaProps) {
    const isEditing = !!personarmaId
    const router = useRouter()
    const [erro, setErro] = useState("")
    const [nome,setNome] = useState(initialData?.nome || "")
    const [objeto,setObjeto] = useState(initialData?.objeto || "")
    const [nivel,setNivel] = useState(initialData?.nivel || 0)

    const [atributos, setAtributos] = useState(initialData?.atributos || [
        {nome:"acerto",valor:0},
        {nome:"dano",valor:0},
        {nome:"critico",valor:0},
    ])

    const [habilidades, setHabilidades] = useState(initialData?.habilidades || "")

    function updateAtributo(index:number, value: string) {
        setAtributos(( prev ) =>
            prev.map(( item, i : number ) =>
            i === index
                ? { ...item, valor:Number(value) }
                : item
            )
        )
    }

    async function deletePersonarma() {
      const res = await fetch("/api/personarma/delete", {
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({id:personarmaId})
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error||"Erro no servidor")
        return
      }

      router.push("/dashboardUsuario")
    }

    async function savePersonarma() {

        const url =  isEditing ? `/api/personarma/update` : "/api/personarma/create"

        const method = isEditing ? "PUT" : "POST"

        const body = isEditing ? {
              id: personarmaId,
              nome,
              objeto,
              nivel,
              atributos,
              habilidades,
            } :
            {
              nome,
              objeto,
              nivel,
              atributos,
              habilidades,
            }

        const res = await fetch(url, {
            method,
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        })

        const data = await res.json()

        if (!res.ok) {
            setErro(data.error||"Erro no servidor!")
            return
        }

        router.push("/dashboardUsuario")
    }

    return {
        erro,

        nome,
        setNome,

        objeto,
        setObjeto,

        nivel,
        setNivel,

        atributos,
        updateAtributo,

        habilidades,
        setHabilidades,

        isEditing,

        deletePersonarma,
        savePersonarma
    }
}