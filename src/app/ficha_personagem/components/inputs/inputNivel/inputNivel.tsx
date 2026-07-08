import Button from "@/src/app/components/Button"
import {CircularNumber} from "@/src/app/components/inputs/CircularInputNumber"
import { useState } from "react"
import { pegarExperiencia, pegarNivel } from "../../../utils/nivel_tabela"

type NivelInputProps = {
    value: number,
    onChange?: (data:number)=>void,
}

type BarraProgressProps = {
    valor_atual: number,
    valor_maximo: number,
    label?: string,
    onChange?: ({campo,data}:{campo:string,data:number})=>void
    style: {
        color_progress: string,
        color_background: string,
        border_weight?: number,
        border_color?: string,
        text_center_horizontal?: true,
        text_center_vertical?: true,
        rounded?: string
    }
}

export function BarraProgress({valor_atual,valor_maximo,label,onChange,style}:BarraProgressProps) {
    const porcentagem = Math.max(0,
        Math.min(
            (valor_atual/valor_maximo)*100,
            100
        )
        )

    return (
        <div className="relative w-full h-full flex flex-col">
            {label && <p className="text-2xl">{label}</p>}
            <div className="relative w-full h-full">

                {   onChange ?
                <div className={`flex absolute text-white w-full h-full justify-center items-center z-7 gap-5
                ${style.text_center_horizontal && "left-1/2 -translate-x-1/2"} 
                ${style.text_center_vertical && "top-1/2 -translate-y-1/2"}`}>
                    <input type="number" max={valor_maximo} min={0} value={valor_atual} onChange={(e)=>onChange({campo:"atual",data:Number(e.target.value)})} className="w-[3ch] h-full outline-none text-2xl" />
                    <p className=" text-2xl">/</p>
                    <input type="number" max={999} min={0} value={valor_maximo} onChange={(e)=>onChange({campo:"maximo",data:Number(e.target.value)})} className="w-[3ch] h-full outline-none text-2xl" />
                </div>
                :<p className={`absolute text-white w-full z-7 px-5
                ${style.text_center_horizontal && "left-1/2 -translate-x-1/2"}
                ${style.text_center_vertical && "top-1/2 -translate-y-1/2"}`}>
                    {valor_atual}/{valor_maximo}
                </p>}
            <div className={`z-0 absolute w-full h-full overflow-hidden
                ${style.color_background}
                ${style.rounded && `${style.rounded}`}`}>
                    <div className={`z-5 w-full h-full
                    ${style.color_progress}
                    ${style.rounded && `${style.rounded}`}
                    ${style.border_weight && `border-${style.border_weight}`}
                    ${style.border_color && `border-${style.border_color}`}
                    `} style={{width: `${porcentagem}%`}}></div>
                </div>
            </div>
        </div>
    )
}

export function ExperienciaInput({onChange}:{onChange:(data:number)=>void}) {
    const [value, setValue] = useState(0)

    return (
        <div className="flex absolute left-0 top-0">
            <Button onClick={()=>{onChange(-value);setValue(0)}} className="flex items-center justify-center size-5 border-2 border-black rounded-full">-</Button>
            <input type="number" className="w-20 text-center" value={value} onChange={(e)=>setValue(Number(e.target.value))}></input>
            <Button onClick={()=>{onChange(value);setValue(0)}} className="flex items-center justify-center size-5 border-2 border-black rounded-full">+</Button>
        </div>
    )
}

export default function NivelInput({value, onChange} : NivelInputProps) {
    const nivel = pegarNivel(value)
    const proximoNivel = nivel != 20 ? nivel+1 : nivel

    return (
    <div className="relative flex items-center justify-center">
        {onChange && <ExperienciaInput onChange={onChange} />}
        <div className="absolute w-full h-5 top-1/2 -translate-y-1/2">
            <BarraProgress 
            valor_atual={(value-pegarExperiencia(nivel))} 
            valor_maximo={(pegarExperiencia(proximoNivel)-pegarExperiencia(nivel))}
            onChange={undefined}
            style={{
                    color_background:"bg-zinc-400",
                    color_progress:"bg-zinc-800",
                    rounded:"rounded-full",
                }}
            />
        </div>
        <div className="relative z-10">
            <CircularNumber texto="Nível" value={String(pegarNivel(value))} />
        </div>
    </div>
    )
}