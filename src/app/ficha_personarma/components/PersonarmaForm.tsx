"use client"
import RectangleInputNumber from "../../components/inputs/RectangularInputNumber";
import InputText from "../../components/inputs/InputText";
import CircularInputNumber from "../../components/inputs/CircularInputNumber";
import MyTable from "../../components/MyTable";
import ImageInput from "../../components/inputs/ImageInput";
import Button from "../../components/Button"

import { usePersonarma } from "../hooks/usePersonarma";
import { HabilidadeData, PersonarmaData } from "@/src/types/personarma";

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
        addHabilidade,
        removeHabilidade,

        isEditing,
        editado,

        deletePersonarma,
        savePersonarma
      } = usePersonarma({initialData, personarmaId})

    return <div className="bg-zinc-100 flex flex-col justify-center items-center w-full lg:w-1/2 p-10 gap-5 lg:gap-20">
        {/* Informações */}

        <div className="w-full flex flex-col sm:flex-row justify-center gap-10">
          <ImageInput value={imagemURL} onChange={(data:string)=>setImagemURL(data)} folder="RPG_FICHA/Personarma" /> 
          
          <div className="w-full sm:w-1/2 flex flex-col gap-5">
            <InputText texto={"Nome"}   value={nome}   onChange={(data:string)=>setNome(data)}          />
            <InputText texto={"Objeto"} value={objeto} onChange={(data:string)=>setObjeto(data)}        />
          </div>
        </div>

        {/* Nível */}
        <CircularInputNumber texto={"Nível"} value={String(nivel)} onChange={(data)=>setNivel(Number(data))} ></CircularInputNumber>

        {/* Atributos */}
        <div className="">
          <p className="text-center text-4xl lg:text-7xl text-black">Atributos</p>
          <div className="grid grid-cols-3 sm:gap-x-5 lg:gap-x-10 w-full lg:px-20">
            {atributos.map((atributo, index) => 
            <div key={index} className="sm:w-40 xl:w-50 aspect-square border-2 border-black">
            <RectangleInputNumber
              nome={atributo.nome}
              valor={atributo.valor}
              modificador={false}
              onChange={(value:string) => updateAtributo(index,value)}
              ></RectangleInputNumber>
            </div>
            )}
          </div>
        </div>

        <p className="text-center text-4xl lg:text-7xl text-black">Habilidades de Anima</p>
        
        <MyTable<HabilidadeData>
        columns={[
          {key:"nome",label:"Nome"},
          {key:"dano",label:"Dano"},
          {key:"dado",label:"Dado"},
          {key:"nivel",label:"Nível"},
        ]}
        lista={habilidades}
        onCreate={(data:HabilidadeData)=>addHabilidade(data)}
        onErase={(data:HabilidadeData)=>removeHabilidade(data)}
        />

        {erro && <h1 className="text-red-500 bg-black/50 rounded-full p-2">{erro}</h1>}

        { canEdit &&
        <div className="flex gap-5">
          <Button className="bg-zinc-300 p-3 rounded-2xl transition-colors hover:bg-zinc-400" onClick={savePersonarma}>{  isEditing ? (editado ? "Salvar" : "Voltar") : "Criar"}</Button>
          <Button className="bg-red-400 text-black p-3 rounded-2xl transition-colors hover:bg-red-800" onClick={deletePersonarma}>{isEditing ? "Apagar" : "Descartar"}</Button>
        </div>}
      </div>
}