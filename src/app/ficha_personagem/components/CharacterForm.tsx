"use client"
import RectangleInputNumber from "../../components/inputs/RectangularInputNumber";
import InputText from "../../components/inputs/InputText";
import CircularInputNumber from "../../components/inputs/CircularInputNumber";
import ImageInput from "../../components/inputs/ImageInput";
import SkillTable from "../components/tables/SkillTable";
import Button from "../../components/Button"

import { Atributo, PersonagemData } from "@/src/types/personagem";
import { skills1, skills2, skills3 } from "../data/skills";

import { useCharacterForm } from "../hooks/useCharacterForm";

type CharacterFormProps = {initialData?:PersonagemData, characterId?: string, canEdit?: boolean}

export default function CharacterForm({initialData, characterId, canEdit} : CharacterFormProps) {

    const {
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

        skillsState,
        updateSkillAttribute,
        updateSkillTraining,

        isEditing,

        deletePersonagem,
        salvarPersonagem
    } = useCharacterForm({initialData, characterId})

  return <div className="bg-zinc-100 flex flex-col items-center w-full lg:w-3/4 p-5 lg:p-20 gap-5">
    {/* Informações */}
    <div className="w-full grid grid-cols-2 gap-5">
      <ImageInput></ImageInput> 

      <InputText texto={"Nome"}           value={nome}           onChange={(data:string)=>setNome(data)}          />
      <InputText texto={"Origem"}         value={origem}         onChange={(data:string)=>setOrigem(data)}        />
      <InputText texto={"Especialização"} value={especializacao} onChange={(data:string)=>setEspecializacao(data)}/>
    </div>

    {/* Nível */}
    <CircularInputNumber texto={"Nível"} value={String(nivel)} onChange={(data:string)=>setNivel(Number(data))} ></CircularInputNumber>

    {/* Atributos */}
    <div>
      <p className="text-center text-4xl lg:text-8xl text-black">Atributos</p>
      <div className="grid grid-cols-3 lg:gap-x-20 gap-y-5 w-full">
        {atributos.map((atributo : Atributo, index:number) => 
        <RectangleInputNumber
          key={index}
          atributo={atributo}
          onChange={(value:string) => updateAtributo(index,value)}
          ></RectangleInputNumber>)}
      </div>
    </div>

    {/* Perícias */}
    <div className="w-full">
      <p className="text-center text-4xl lg:text-8xl text-black">Perícias</p>
      <div className=" xl:flex justify-center items-start gap-10 px-5">
        <SkillTable 
        skills={skills1}
        skillsState={skillsState}
        updateSkillAttribute={updateSkillAttribute}
        updateSkillTraining={updateSkillTraining}></SkillTable>
        <SkillTable 
        skills={skills2}
        skillsState={skillsState}
        updateSkillAttribute={updateSkillAttribute}
        updateSkillTraining={updateSkillTraining}></SkillTable>
        <SkillTable 
        skills={skills3}
        skillsState={skillsState}
        updateSkillAttribute={updateSkillAttribute}
        updateSkillTraining={updateSkillTraining}></SkillTable>
      </div>
    </div>

    {/* Habilidades de Anima */}
      <textarea
      onChange={(e)=>setHabilidades(e.target.value)}
      value={habilidades}
      className="w-full border-4 border-zinc-400 p-5 outline-none"
      placeholder="estou com preguiça de fazer tabela, então escreve assim 'nome/dano/dado/nivel'"></textarea>
      
    {canEdit && 
    <div className="flex gap-5">
      <Button className="bg-zinc-300 p-3 rounded-2xl transition-colors hover:bg-zinc-400" onClick={salvarPersonagem}>{isEditing ? "Salvar" : "Criar"}</Button>
      <Button className="bg-red-400 text-black p-3 rounded-2xl transition-colors hover:bg-red-800" onClick={deletePersonagem}>{isEditing ? "Apagar" : "Voltar"}</Button>
    </div>}
  </div>
}