"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { allSkills } from "../data/skills"
import { HabilidadeData, PersonagemData } from "@/src/types/personagem"
import { SkillsState } from "@/src/types/skill"
import { ItemData } from "@/src/types/item"

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
    const [historia,setHistoria] = useState(initialData?.historia || "")
    const [ideais,setIdeais] = useState(initialData?.ideais || "")
    const [defeitos,setDefeitos] = useState(initialData?.defeitos || "")

    const [experiencia, setExperiencia] = useState(initialData?.experiencia || 0)

    const [ca, setCA] = useState(initialData?.ca || 1)
    const [vida, setVida] = useState(initialData?.vida || {atual:10,maximo:10})
    const [estamina, setEstamina] = useState(initialData?.estamina || {atual:10,maximo:10})

    function updateVida({campo, data}:{campo:string, data:number}) {
        setVida(prev=> ({
            ...prev,
            [campo]: data
        }))
    }

    function updateEstamina({campo, data}:{campo:string, data:number}) {
        setEstamina(prev=> ({
            ...prev,
            [campo]: data
        }))
    }

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

    const [inventario, setInventario] = useState(initialData?.inventario || [])

    function addItem(item : ItemData) {
        setInventario((prev)=> 
            ([
                ...prev,
                item
            ])
        )
    }

    function removeItem(item : ItemData) {
        setInventario((prev) => 
            prev.filter((e) => e !== item)
        )
    }

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

    const [editado,setEditado] = useState(false) 
    useEffect(()=>{
    if (!characterId) return
    
    const mudou = (
        nome!==initialData?.nome                                              ||
        origem!==initialData.origem                                           ||
        especializacao!==initialData.especializacao                           ||
        experiencia!==initialData.experiencia                                 ||
        imagemURL!==initialData.imagem_url                                    ||
        historia !==initialData.historia                                      ||
        ideais   !== initialData.ideais                                       ||
        defeitos !== initialData.defeitos                                     ||
        JSON.stringify(ca)   !== JSON.stringify(initialData.ca)               ||
        JSON.stringify(vida) !== JSON.stringify(initialData.vida)             ||
        JSON.stringify(estamina) !== JSON.stringify(initialData.estamina)     ||
        JSON.stringify(atributos)  !==JSON.stringify(initialData.atributos)   ||
        JSON.stringify(habilidades)!==JSON.stringify(initialData.habilidades) ||
        JSON.stringify(skillsState)!==JSON.stringify(initialData.pericias)    ||
        JSON.stringify(inventario)!==JSON.stringify(initialData.inventario)
    )
    setEditado(mudou)
    },
    [nome,origem,especializacao,experiencia,ca,vida,estamina,imagemURL,atributos,habilidades,skillsState,historia,ideais,defeitos,inventario])


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
                experiencia,
                ca,
                vida,
                estamina,
                atributos,
                pericias: skillsState,
                habilidades,
                
                imagem_url:imagemURL,
                historia,
                ideais,
                defeitos,
                inventario
            } :
            {
                nome,
                origem,
                especializacao,
                experiencia,
                ca,
                vida,
                estamina,
                atributos,
                pericias: skillsState,
                habilidades,
                
                imagem_url:imagemURL,
                historia,
                ideais,
                defeitos,
                inventario
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

        experiencia,
        setExperiencia,

        ca,
        setCA,

        vida,
        updateVida,

        estamina,
        updateEstamina,

        atributos,
        updateAtributo,

        habilidades,
        addHabilidade,
        removeHabilidade,

        skillsState,
        updateSkillAttribute,
        updateSkillTraining,

        imagemURL,
        setImagemURL,

        historia,
        setHistoria,

        ideais,
        setIdeais,

        defeitos,
        setDefeitos,

        inventario,
        addItem,
        removeItem,

        isEditing,
        editado,

        deletePersonagem,
        salvarPersonagem
    }
}