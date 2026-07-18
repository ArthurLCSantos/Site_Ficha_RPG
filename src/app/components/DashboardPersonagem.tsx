import { PersonagemData } from "@/src/types/personagem"
import Button from "./Button"
import PersonagemCard from "./PersonagemCard"

type DashboardPersonagemProps = {
    personagens: PersonagemData[],
    titulo: string,
    tamanho: number
    onCreate?: () => void,
    elementOnClick?: (value:string) => void,
}

export default function DashboardPersonagem({personagens,titulo,tamanho,onCreate,elementOnClick}: DashboardPersonagemProps) {
    return <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-between items-center pt-5">
            {titulo && <h1 className="text-2xl font-bold">{titulo}</h1>}
            {onCreate && <Button className="px-2 py-1 text-zinc-100  bg-zinc-900 rounded-full font-bold tracking-widest cursor-pointer" onClick={onCreate}>Criar</Button>}
        </div>

        <div className="w-full grid gap-5" style={{gridTemplateColumns: `repeat(auto-fill, minmax(${tamanho}px,1fr))`}}>
            {personagens.map((personagem, index) =>  
            <div key={index} className="w-full h-full">
                <PersonagemCard
                onClick={elementOnClick ? ()=>elementOnClick(personagem.id) : ()=>{} }
                personagem={personagem}
                />
            </div> 
            )}
        </div>
    </div>
}