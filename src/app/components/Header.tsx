export default function Header({mode, setMode}) {
    return <div className="bg-zinc-50 flex">
        <div 
        style={mode=="register"?{backgroundColor:"bg-zinc-400"}:{}}
        className="w-full text-center text-3xl p-5 hover:bg-zinc-400 cursor-pointer"
        onClick={()=>setMode("register")}>Cadastrar</div>
        <div
        style={mode=="login"?{backgroundColor:"bg-zinc-400"}:{}}
        className="w-full text-center text-3xl p-5 hover:bg-zinc-400 cursor-pointer"
        onClick={()=>setMode("login")}>Entrar</div>
    </div>
}