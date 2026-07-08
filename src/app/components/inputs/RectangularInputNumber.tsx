import { calculateModifier } from "../../ficha_personagem/utils/modifier"

type RectangleInputNumberProps = {
  nome: string,
  valor: number,
  onChange?: (value: string) => void,
  modificador?: boolean
}

export default function RectangleInputNumber({ nome, valor, onChange, modificador=true } : RectangleInputNumberProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <p className="text-2xl text-center border-b-2 border-black">{nome}</p>
      <div className="flex-1 flex flex-col items-center justify-center">
        {onChange ? <input className="text-center text-4xl outline-none" type="number" value={valor} onChange={(e)=>onChange(e.target.value)} min={0} max={20} maxLength={3} /> 
        : <p className="text-center text-4xl">{valor}</p>}
        {modificador && <p className="text-2xl">{`${calculateModifier(valor) > 0 ? "+" : "" }${calculateModifier(valor)}`}</p>}
      </div>
    </div>
  )
}

