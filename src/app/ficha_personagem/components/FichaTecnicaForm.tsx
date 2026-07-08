import { usePersonagem } from "../characterContext";
import RectangleInputNumber from "../../components/inputs/RectangularInputNumber";
import InputText from "../../components/inputs/InputText";
import NivelInput, { BarraProgress } from "./inputs/inputNivel/inputNivel";
import MyTable from "../../components/MyTable";
import SkillTable from "./tables/SkillTable";

import { Atributo, HabilidadeData } from "@/src/types/personagem";
import { skills1, skills2, skills3 } from "../data/skills";

type FichaTecnicaFormProps = {
    role?: string,
    isOwner: boolean
}

export default function FichaTecnicaForm({role, isOwner}: FichaTecnicaFormProps) {
    const {
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
        } = usePersonagem()

    return <div >
        {/* Informações */}
        <div className="w-full flex flex-col gap-8">
            <InputText texto={"Nome"} value={nome} onChange={isOwner ? (data:string)=>setNome(data) : undefined}/>
            <InputText texto={"Origem"} value={origem} onChange={isOwner ? (data:string)=>setOrigem(data) : undefined}/>
            <InputText texto={"Especialização"} value={especializacao} onChange={isOwner ? (data:string)=>setEspecializacao(data) : undefined}/>
        </div>

        {/* Nível */}
        <NivelInput value={experiencia} onChange={role==="ADMIN"?(data:number)=>setExperiencia(experiencia+data):undefined} />

        {/* VIDA,ESTAMINA,CLASSE DE ARMADURA (TODO) - Fazer mudanças na Responsividade para fazer a vida e estamina ficar embaixo da classe de armadura quando em dispositivos pequenos */}
        <div className="w-full flex justify-center mt-10">
            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-10">
                <div className="h-30 lg:h-40 aspect-square border-2 border-black">
                    <RectangleInputNumber nome={"Classe de Armadura"} valor={ca} onChange={(value:string)=>setCA(Number(value))} modificador={false} />
                </div>

                <div className="w-1/2 h-full flex flex-col justify-evenly">
                    <div className="w-full h-20">
                        <BarraProgress label="Vida" valor_atual={vida.atual} valor_maximo={vida.maximo}
                        onChange={({campo,data}:{campo:string,data:number})=>updateVida({campo:campo,data:data})}
                        style={{
                            color_background:"bg-zinc-500",
                            color_progress:`bg-red-500`,
                            text_center_horizontal: true,
                            text_center_vertical: true,
                        }} />
                    </div>
                    <div className="w-full h-20">
                        <BarraProgress label={"Estamina"} valor_atual={estamina.atual} valor_maximo={estamina.maximo} 
                        onChange={({campo,data}:{campo:string,data:number})=>updateEstamina({campo:campo,data:data})}
                        style={{
                            color_background:"bg-zinc-500",
                            color_progress:`bg-blue-700`,
                            text_center_horizontal: true,
                            text_center_vertical: true,
                            }} />
                    </div>
                </div>
            </div>
        </div>

        {/* Atributos */}
        <div>
            <p className="text-center text-4xl lg:text-8xl text-black">Atributos</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-x-5 xl:gap-x-15 gap-y-5 w-full">
                {atributos.map((atributo : Atributo, index:number) => 
                <div className="sm:w-40 xl:w-50 aspect-square border-2 border-black" key={index}>
                <RectangleInputNumber
                nome={atributo.nome}
                valor={atributo.valor}
                onChange={isOwner ? (value:string) => updateAtributo(index,value) : undefined}
                ></RectangleInputNumber>
                </div>
                )}
            </div>
        </div>

        {/* Perícias */}
        <div className="w-full">
            <p className="text-center text-4xl lg:text-8xl text-black">Perícias</p>
            <div className=" xl:flex justify-center items-start gap-10 px-5">
                <SkillTable 
                skills={skills1}
                skillsState={skillsState}
                updateSkillAttribute={isOwner ? updateSkillAttribute : undefined}
                updateSkillTraining={isOwner ? updateSkillTraining : undefined}></SkillTable>
                <SkillTable 
                skills={skills2}
                skillsState={skillsState}
                updateSkillAttribute={isOwner ? updateSkillAttribute : undefined}
                updateSkillTraining={isOwner ? updateSkillTraining : undefined}></SkillTable>
                <SkillTable 
                skills={skills3}
                skillsState={skillsState}
                updateSkillAttribute={isOwner ? updateSkillAttribute : undefined}
                updateSkillTraining={isOwner ? updateSkillTraining : undefined}></SkillTable>
            </div>
        </div>

        <p className="text-center text-4xl lg:text-7xl text-black">Habilidades de Especialização</p>
        <MyTable<HabilidadeData>
        columns={[
            {key:"nome",label:"Nome"},
            {key:"descricao", label:"Descrição"}
        ]}
        lista={habilidades}
        onCreate={isOwner ? (data: HabilidadeData)=>addHabilidade(data) : undefined}
        onErase={isOwner ? (data: HabilidadeData) => removeHabilidade(data) : undefined}
        />
    </div>
}