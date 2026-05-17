import { calculateModifier } from "../../ficha_personagem/utils/modifier"

export default function RectangleInputNumber({ atributo, onChange, modificador=true }) {
  return (
    <div className="border-2 border-black">
      <p className=" font-bold lg:text-xl w-full text-center border-b-2 border-black">{atributo.nome}</p>

      <input className="text-center border-0 w-full  font-black text-4xl outline-none" value={atributo.valor} onChange={(e)=>onChange(e.target.value)} min={0} max={20} maxLength={3} />
      {modificador && <p className="font-bold text-2xl  text-center">{`${calculateModifier(atributo.valor) > 0 ? "+" : "" }${calculateModifier(atributo.valor)}`}</p>}
    </div>
  )
}

