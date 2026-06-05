import { useState } from "react"

type DataColumn<T> = {
    key: keyof T,
    label: string
}

type MyTableProps<T> = {
    columns: DataColumn<T>[],
    lista: T[],
    onCreate?: (arg0: T) => void,
    onErase?: (arg0: T) => void
}

export default function MyTable<T>({
    columns,
    lista,
    onCreate,
    onErase
}: MyTableProps<T>) {

    const [newItem, setNewItem] = useState<Partial<T>>({})

    const [creating, setCreating] = useState(false)

    function handleNewItem() {
        if (!creating) {
            setCreating(true)
            return
        }

        const hasValue =
            Object.values(newItem).some(value => String(value ?? "").trim() !== ""
            )

        if (!hasValue) {
            setCreating(false)
            setNewItem({})
            return
        }

        onCreate?.(newItem as T)
        setNewItem({})
        setCreating(false)
    }

    return (

        <div
            className="
            w-full
            overflow-x-auto
            border
            border-zinc-300
            bg-white
            "
        >

            <table
                className="
                w-full
                border-collapse
                text-sm
                lg:text-base
                "
            >

                <thead
                    className="
                    bg-zinc-900
                    text-white
                    "
                >

                    <tr>

                        {columns.map((column) => (

                            <th key={String(column.key)} className="px-6 py-4 font-bold tracking-wide text-left">
                                {column.label}
                            </th>
                        ))}

                        <th className="w-20 text-center">

                            {onCreate && <button className="size-10
                                    rounded-2xl
                                    bg-white
                                    text-black
                                    font-bold
                                    text-xl
                                    cursor-pointer" type="button" onClick={handleNewItem}>
                                {creating ? "✓" : "+"}

                            </button>}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lista.length === 0 && !creating &&
                        <tr>
                            <td
                                colSpan={columns.length + 1}

                                className=" text-center py-10 text-zinc-500 text-lg">
                                Está vazio
                            </td>
                        </tr>
                    }

                    {lista.map((el, index) => (
                        <tr key={index} className="border-b border-zinc-200 transition-colors">
                            {columns.map((column) => (
                                <td key={String(column.key)} className="px-6 py-4 text-zinc-700">

                                    <p className="break-all">
                                        {String(el[column.key])}
                                    </p>

                                </td>
                            ))}
                            <td
                                className="text-center"
                            >
                                {onErase &&
                                    <button
                                        className="size-9 rounded-xl bg-red-500 text-white font-bold cursor-pointer"
                                        type="button"
                                        onClick={()=>onErase(el)}>
                                        −
                                    </button>
                                }
                            </td>
                        </tr>
                    ))}
                    {creating &&
                        <tr className="bg-zinc-100 border-t-2 border-zinc-300">
                            {columns.map((column) => (
                                <td key={String(column.key)} className="px-4 py-3">
                                    <textarea
                                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 outline-none transition-all focus:border-zinc-500"
                                        value={String(newItem[column.key] ?? "")}
                                        onChange={(e)=>
                                            setNewItem(prev => ({
                                                ...prev,
                                                [column.key]:e.target.value
                                            }))
                                        }
                                    />
                                </td>
                            ))}
                            <td />
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}