"use client"
import Button from "../../components/Button"
import Header from "@/src/app/components/Header"

import { PersonagemData } from "@/src/types/personagem";

import { useCharacterForm } from "../hooks/useCharacterForm";
import { useState } from "react";

import FichaTecnicaForm from "./FichaTecnicaForm";
import FichaPessoalForm from "./FichaPessoalForm";
import { CharacterContext } from "../characterContext";

type CharacterFormProps = {initialData?:PersonagemData, characterId?: string, role?: string, isOwner: boolean}

export default function CharacterForm({initialData, characterId, role, isOwner} : CharacterFormProps) {
  const character = useCharacterForm({initialData, characterId})

  const {
      isEditing,
      editado,

      deletePersonagem,
      salvarPersonagem
  } = character

  const [modo,setModo] = useState("ficha_tecnica")

  return (
    <div className="bg-zinc-100 flex flex-col items-center w-full lg:w-3/4 p-5 lg:p-20 gap-5">
      <Header
        opcao_atual={modo}
        opcoes={[{key:"ficha_pessoal",label:"Ficha Pessoal"},{key:"ficha_tecnica",label:"Ficha Técnica"}]}
        onClick={(data:string)=>setModo(data)}
        classContainer="flex w-full bg-zinc-200"
        classChildren="w-full text-center text-3xl p-5 hover:bg-zinc-400 cursor-pointer"
      />

      <CharacterContext.Provider value={character}>
        {modo === "ficha_tecnica" ? <FichaTecnicaForm role={role} isOwner={isOwner} /> : <FichaPessoalForm role={role} isOwner={isOwner} />}
      </CharacterContext.Provider>

      <div className="flex gap-5">
        <Button className="bg-zinc-300 p-3 rounded-2xl transition-colors hover:bg-zinc-400" onClick={salvarPersonagem}>{  isEditing ? (editado ? "Salvar" : "Voltar") : "Criar"}</Button>
        {isOwner && <Button className="bg-red-400 text-black p-3 rounded-2xl transition-colors hover:bg-red-800" onClick={deletePersonagem}>{ isEditing ? "Apagar" : "Descartar"}</Button>}
      </div>
    </div>
    )
}