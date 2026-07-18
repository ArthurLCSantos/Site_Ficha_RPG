import { PersonagemData } from "@/src/types/personagem"
import { BarraProgress } from "../ficha_personagem/components/inputs/inputNivel/inputNivel"

type PersonagemCardProps = {
    personagem: PersonagemData,
    onClick?: () => void
}

export default function PersonagemCard({personagem,onClick}:PersonagemCardProps) {
    return <div onClick={onClick} className="w-full h-full flex flex-col justify-end items-center bg-black rounded-lg overflow-hidden">
        {/* IMAGEM */}
        <div className="w-full aspect-square relative overflow-hidden">
            { personagem.imagem_url && <img src={personagem.imagem_url} alt="Imagem Personagem" className="w-full aspect-square object-cover bg-center" />}
        </div>
        {/* STATUS */}
        <div className="w-full h-1/2 flex flex-col gap-2 px-3 py-5">
            <p className="h-20 text-2xl text-start text-white font-bold line-clamp-1">{personagem.nome}</p>
            <div className="w-full h-full">
                <BarraProgress
                valor_atual={personagem.vida.atual}
                valor_maximo={personagem.vida.maximo}
                style={{
                    color_background:"bg-zinc-800",
                    color_progress:"bg-red-600",
                    text_center_horizontal:true,
                    text_center_vertical:true,
                    rounded:"rounded-lg"
                    }} />
            </div>
            <div className="w-full h-full">
                <BarraProgress 
                valor_atual={personagem.estamina.atual}
                valor_maximo={personagem.estamina.maximo}
                style={{
                    color_background:"bg-zinc-800",
                    color_progress:"bg-blue-600",
                    text_center_horizontal:true,
                    text_center_vertical:true,
                    rounded:"rounded-lg"
                    }}/>
            </div>
        </div>
    </div>
}