"use client"
import RectangleInputNumber from "../../components/inputs/RectangularInputNumber";
import InputText from "../../components/inputs/InputText";
import CircularInputNumber from "../../components/inputs/CircularInputNumber";
import ImageInput from "../../components/inputs/ImageInput";
import Button from "../../components/Button"

import { usePersonarma } from "../hooks/usePersonarma";
import { PersonarmaData } from "@/src/types/personarma";

type PersonarmaFormProps = {
  initialData?: PersonarmaData,
  personarmaId?: string,
  canEdit: boolean
}

export default function PersonarmaForm({initialData, personarmaId, canEdit} : PersonarmaFormProps) {
    
      const {
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
        setHabilidades,

        isEditing,

        deletePersonarma,
        savePersonarma
      } = usePersonarma({initialData, personarmaId})

    return <div className="bg-zinc-100 flex flex-col items-center w-full lg:w-3/4 p-10 gap-5 lg:gap-20">
        {/* Informações */}
        <div className="w-full grid grid-cols-2 gap-5">
          <ImageInput value={imagemURL} onChange={(data:string)=>setImagemURL(data)} folder="RPG_FICHA/Personarma" /> 

          <InputText texto={"Nome"}           value={nome}           onChange={(data:string)=>setNome(data)}          />
          <InputText texto={"Objeto"}         value={objeto}         onChange={(data:string)=>setObjeto(data)}        />
        </div>

        {/* Nível */}
        <CircularInputNumber texto={"Nível"} value={String(nivel)} onChange={(data)=>setNivel(Number(data))} ></CircularInputNumber>

        {/* Atributos */}
        <div className="min-w-5/6">
          <p className="text-center text-2xl lg:text-8xl text-black">Atributos</p>
          <div className="grid grid-cols-3 gap-x-5 lg:gap-x-20 gap-y-5 w-full lg:px-20">
            {atributos.map((atributo, index) => 
            <RectangleInputNumber
              key={index}
              atributo={atributo}
              modificador={false}
              onChange={(value:string) => updateAtributo(index,value)}
              ></RectangleInputNumber>)}
          </div>
        </div>

        {/* Habilidades de Anima */}
        <textarea 
        onChange={(e)=>setHabilidades(e.target.value)} 
        value={habilidades} 
        className="w-full border-4 border-zinc-400 p-5 outline-none"
        placeholder="estou com preguiça de fazer tabela, então escreve assim 'nome/dano/dado/nivel'"></textarea>

        {erro && <h1 className="text-red-500 bg-black/50 rounded-full p-2">{erro}</h1>}
        
        { canEdit &&
        <div className="flex gap-5">
          <Button className="bg-zinc-300 p-3 rounded-2xl transition-colors hover:bg-zinc-400" onClick={savePersonarma}>{isEditing ? "Salvar" : "Criar"}</Button>
          <Button className="bg-red-400 text-black p-3 rounded-2xl transition-colors hover:bg-red-800" onClick={deletePersonarma}>{isEditing ? "Apagar" : "Voltar"}</Button>
        </div>}
      </div>
}