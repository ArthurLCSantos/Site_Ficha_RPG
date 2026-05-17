import InputText from "./inputs/InputText"
import { useRegister } from "./../hooks/useRegister"

export default function LoginForm() {
    const { erro, nome, setNome, email, setEmail, senha, setSenha, handleRegister } = useRegister()
    return <div className="bg-zinc-100 flex flex-col items-center p-10 gap-7">
        <InputText texto={"Nome"} value={nome} onChange={(data)=>setNome(data)} />
        <InputText texto={"Email"} value={email} onChange={(data)=>setEmail(data)} />
        <InputText texto={"Senha"} value={senha} password={true} onChange={(data)=>setSenha(data)} />
        {erro && <h1 className="text-red-500 bg-black/50 rounded-full">{erro}</h1>}
        <button type="button" onClick={handleRegister} className="p-2 bg-zinc-400 hover:bg-zinc-500 transition-colors">Cadastrar</button>
      </div>
}