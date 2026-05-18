export function SkeletonInputText() {
  return (
    <div className="w-full text-black">
      <div className="border-2 border-b-0 border-black w-20 h-5"></div>
      <div className="border-2 border-black h-10 w-full outline-none"></div>
    </div>
  );
}

type InputTextProps = {
  texto:    string,
  value:    string,
  onChange: ( value:string ) => void ,
  password?: boolean
}

export default function InputText({ texto, value, onChange, password=false } : InputTextProps) {
  return (
    <div className="w-full text-black">
      {texto && <p className="border-2 border-b-0 border-black w-min px-2 font-bold text-sm md:text-base">{texto}</p>}
      <input 
        className="border-2 border-black p-2 w-full outline-none"
        type={ password ? "password" : "text" } 
        value={ value } 
        onChange={ (e)=>onChange(e.target.value) } 
      />
    </div>
  );
}