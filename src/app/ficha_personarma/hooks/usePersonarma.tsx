"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { HabilidadeData, PersonarmaData } from "@/src/types/personarma";

type UsePersonarmaProps = {
  initialData?: PersonarmaData,
  personarmaId?: String
}

export function usePersonarma({initialData, personarmaId} : UsePersonarmaProps) {
    const isEditing = !!personarmaId
    const router = useRouter()
    const [erro, setErro] = useState("")
    const [nome,setNome] = useState(initialData?.nome || "")
    const [imagemURL, setImagemURL] = useState(initialData?.imagem_url || "")
    const [objeto,setObjeto] = useState(initialData?.objeto || "")
    const [nivel,setNivel] = useState(initialData?.nivel || 0)

    const [atributos, setAtributos] = useState(initialData?.atributos || [
        {nome:"acerto",valor:0},
        {nome:"dano",valor:0},
        {nome:"critico",valor:0},
    ])

    const [habilidades, setHabilidades] = useState(initialData?.habilidades || [])
    
        function addHabilidade(habilidade : HabilidadeData) {
            setHabilidades((prev)=> 
                ([
                    ...prev,
                    habilidade
                ])
            )
        }
    
        function removeHabilidade(habilidade : HabilidadeData) {
            setHabilidades((prev) => 
                prev.filter((e) => e !== habilidade)
            )
        }

    const [editado,setEditado] = useState(false) 
      useEffect(()=>{
        if (!personarmaId) return
        
        if (
            nome!==initialData?.nome || 
            imagemURL!==initialData.imagem_url || 
            objeto!==initialData.objeto || 
            atributos!==initialData.atributos || 
            habilidades!==initialData.habilidades ) 
            {setEditado(true)}
      },
      [nome,objeto,nivel,atributos,habilidades,imagemURL])

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
        if (!isEditing) {router.back();return}
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

        router.back()
    }

    async function savePersonarma() {

        if (isEditing && !editado) {router.back();return}

        const url =  isEditing ? `/api/personarma/update` : `/api/personarma/create`

        const method = isEditing ? "PUT" : "POST"

        const body = isEditing ? {
              id: personarmaId,
              nome,
              imagem_url: imagemURL,
              objeto,
              nivel,
              atributos,
              habilidades,
            } :
            {
              nome,
              imagem_url: imagemURL,
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

        router.back()
    }

    return {
        erro,

        nome,
        setNome,

        imagemURL,
        setImagemURL,

        objeto,
        setObjeto,

        nivel,
        setNivel,

        atributos,
        updateAtributo,

        habilidades,
        addHabilidade,
        removeHabilidade,

        isEditing,

        editado,

        deletePersonarma,
        savePersonarma
    }
}