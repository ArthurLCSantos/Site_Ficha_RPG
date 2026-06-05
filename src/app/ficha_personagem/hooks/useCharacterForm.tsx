"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { allSkills } from "../data/skills"
import { HabilidadeData, PersonagemData } from "@/src/types/personagem"
import { SkillsState } from "@/src/types/skill"

type useCharacterFormProps = {
    initialData?: PersonagemData,
    characterId?: string
}

export function useCharacterForm({initialData,characterId}: useCharacterFormProps) {
    const router = useRouter()
    const isEditing = !!characterId
    const [nome,setNome] = useState(initialData?.nome || "")
    const [origem,setOrigem] = useState(initialData?.origem || "")
    const [especializacao,setEspecializacao] = useState(initialData?.especializacao || "")
    const [imagemURL, setImagemURL] = useState(initialData?.imagem_url || "")

    const [nivel, setNivel] = useState(initialData?.nivel || 0)

    const [atributos, setAtributos] = useState(initialData?.atributos || [
    {nome:"força" ,valor:1},
    {nome:"destreza" ,valor:1},
    {nome:"constituicao" ,valor:1},
    {nome:"inteligencia" ,valor:1},
    {nome:"sabedoria" ,valor:1},
    {nome:"carisma" ,valor:1},
    ])

    function updateAtributo(index:number, value:string) {
        setAtributos(( prev ) =>
            prev.map(( item, i ) =>
            i === index
                ? { ...item, valor:Number(value) }
                : item
            )
        )
    }

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
            if (!characterId) return
            
            if (
                nome!==initialData?.nome || 
                origem!==initialData.origem ||
                especializacao!==initialData.especializacao ||
                nivel!==initialData.nivel ||
                imagemURL!==initialData.imagem_url ||  
                atributos!==initialData.atributos || 
                habilidades!==initialData.habilidades ) 
                {setEditado(true)}
          },
          [nome,origem,especializacao,nivel,imagemURL,atributos,habilidades])

    const initialSkillsState = allSkills.reduce<SkillsState>((acc, skill) => {
        acc[skill.nome] = {
        atributo: skill.select ? skill.select[0] : skill.atributo ?? "",
        treinada: false
        };

        return acc;
    }, {});
    
    const [skillsState, setSkillsState] = useState<SkillsState>(initialData ? initialData.pericias : initialSkillsState);

    function updateSkillAttribute(skillName: string, value: string) {
        setSkillsState(prev => ({
            ...prev,

            [skillName]: {
            ...prev[skillName],
            atributo: value
            }
        }))
    }

    function updateSkillTraining(skillName: string, value: boolean) {
        setSkillsState(prev => ({
            ...prev,

            [skillName]: {
            ...prev[skillName],
            treinada: value
            }
        }))
    }

    async function deletePersonagem() {
        if (!isEditing) {router.back();return}
        const res = await fetch("/api/personagem/delete", {
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({id:characterId})
        })

        router.back()
    }

    async function salvarPersonagem() {

        if (isEditing && !editado) {router.back();return}

        const url =  isEditing ? `/api/personagem/update` : "/api/personagem/create"

        const method = isEditing ? "PUT" : "POST"

        const body = isEditing ? {
                id: characterId,
                nome,
                origem,
                especializacao,
                imagem_url:imagemURL,
                nivel,
                atributos,
                pericias: skillsState,
                habilidades
            } :
            {
                nome,
                origem,
                especializacao,
                imagem_url:imagemURL,
                nivel,
                atributos,
                pericias: skillsState,
                habilidades
            }

        await fetch(url, {
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

        imagemURL,
        setImagemURL,

        nivel,
        setNivel,

        atributos,
        updateAtributo,

        habilidades,
        addHabilidade,
        removeHabilidade,

        skillsState,
        updateSkillAttribute,
        updateSkillTraining,

        isEditing,
        editado,

        deletePersonagem,
        salvarPersonagem
    }
}