type HeaderProps = {
    opcao_atual: string,
    opcoes: {key:string, label:string}[],
    onClick: (value:string) => void,
    classContainer: string,
    classChildren: string
}

export default function Header({opcao_atual, opcoes, onClick, classContainer="bg-zinc-50 flex w-full",classChildren="w-full text-center text-3xl p-5 hover:bg-zinc-400 cursor-pointer"} : HeaderProps) {
    return <div className={classContainer}>
        {opcoes.map((opcao,index)=> 
            <div 
            key={index}
            style={opcao_atual==opcao.key?{backgroundColor:"bg-zinc-400"}:{}}
            className={classChildren}
            onClick={()=>onClick(opcao.key)}>{opcao.label}</div>
        )}
    </div>
}