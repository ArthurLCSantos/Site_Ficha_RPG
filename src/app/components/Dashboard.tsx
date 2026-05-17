"use client"
import Button from "@/src/app/components/Button"

export function SkeletonDashboard() {
    return (
        <div className="w-full">
            <div className="w-full flex justify-between py-5">
                <div className="bg-zinc-300 w-1/4 h-8"></div>
                <div className="px-2 py-1 text-zinc-100 bg-zinc-400 rounded-full font-bold tracking-widest cursor-pointer">Criar</div>
            </div>

            <div className="w-full bg-zinc-300 h-10"></div>
        </div>
        )
}

export function Dashboard({
    titulo,
    columns,
    lista,
    onCreate,
    elementOnClick
}) {
    return (
        <div className="w-full">

            <div className="w-full flex justify-between pt-5">
                {titulo && <h1 className="text-xl">{titulo}</h1>}
                {onCreate && <Button className="px-2 py-1 text-zinc-100 bg-zinc-900 rounded-full font-bold tracking-widest cursor-pointer" onClick={onCreate}>Criar</Button>}
            </div>

            <table className="w-full text-sm text-left">
                <thead className="bg-zinc-300">
                    <tr>
                        {columns.map((column,index)=>(
                            <th key={index} className="p-0.5 lg:p-2">
                                <p className="lg:text-xl line-clamp-1">{column.label}</p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {lista.length==0 && <tr><td colSpan={columns.length} className="text-center lg:text-xl">Está vazio</td></tr>}
                    {lista.map((el,index)=>(
                        <tr key={index} onClick={()=>elementOnClick(el.id)}>
                            {columns.map((column)=> (
                                <td key={column.key} className="lg:text-xl py-5 border-b-2 border-zinc-400 text-ellipsis">
                                    <p className="lg:text-xl line-clamp-1">{el[column.key]}</p>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
}