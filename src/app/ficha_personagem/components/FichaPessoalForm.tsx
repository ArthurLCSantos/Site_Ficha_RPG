import { usePersonagem } from "../characterContext";
import ImageInput from "../../components/inputs/ImageInput";
import MyTable from "../../components/MyTable";
import { ItemData } from "@/src/types/item";

type FichaPessoalFormProps = {
    role?: string,
    isOwner: boolean
}


export default function FichaPessoalForm({role,isOwner} : FichaPessoalFormProps) {

    const {
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
        } = usePersonagem()
    console.log("FICHAPESSOALFORM")
    return <div className="w-full flex flex-col items-center justify-center">
        {/* Imagem */}
        <ImageInput value={imagemURL} onChange={isOwner ? (data:string)=>setImagemURL(data) : undefined} folder="RPG_FICHA/Personagem" />

        {/* Historia, Ideiais e Defeitos */}
        <div className="w-full grid grid-rows-3 grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-10">

            <div className="sm:col-span-2">
                <h2 className="w-full text-left">História</h2>
                <textarea value={historia} onChange={(e)=>setHistoria(e.target.value)} className="w-full p-2 border-black border-2 h-50 resize-none"></textarea>
            </div>

            <div>
                <h2 className="w-full text-left">Defeitos</h2>
                <textarea value={defeitos} onChange={(e)=>setDefeitos(e.target.value)} className="w-full p-2 border-black border-2 h-50 resize-none"></textarea>
            </div>

            <div>
                <h2 className="w-full text-left">Ideais</h2>
                <textarea value={ideais} onChange={(e)=>setIdeais(e.target.value)} className="w-full p-2 border-black border-2 h-50 resize-none"></textarea>
            </div>

        </div> 

        {/* Inventario */}
        <p className="text-center text-4xl lg:text-8xl text-black">Inventário</p>
        <MyTable<ItemData>
        columns={[{key:"nome",label:"Nome"},{key:"descricao",label:"Descrição"}]}
        lista={inventario}
        onCreate={(data:ItemData)=>addItem(data)}
        onErase={(data:ItemData)=>removeItem(data)}
        />
    </div>
}