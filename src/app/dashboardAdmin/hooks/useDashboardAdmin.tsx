import { useEffect, useState } from "react"

export default function useDashboardAdmin() {
    const [usuarios,setUsuarios] = useState([])

    useEffect(()=>{
        async function loadData(){
            const res = await fetch("/api/admin/usuarios")

            const data = await res.json()

            setUsuarios(data)
        }

        loadData()
    },[])

    return {
        usuarios
    }
}