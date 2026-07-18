import InputText from "../inputs/InputText"
import { useLogin } from "../../hooks/useLogin"
import { SetStateAction } from "react"

export default function LoginForm() {
    const { erro, email, setEmail, senha, setSenha, handleLogin } = useLogin()
    return <div className="bg-zinc-100 flex flex-col items-center p-10 gap-20">
            <InputText texto={"Email"} value={email} onChange={(data:SetStateAction<string>)=>setEmail(data)} />
            <InputText texto={"Senha"} value={senha} password={true} onChange={(data:SetStateAction<string>)=>setSenha(data)} />
            {erro && <h1 className="text-red-500 bg-black/50 rounded-full">{erro}</h1>}
            <button type="button" onClick={handleLogin} className="p-2 bg-zinc-400 hover:bg-zinc-500 transition-colors">Entrar</button>
          </div>
}