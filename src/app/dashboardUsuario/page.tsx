import { auth } from "@/src/lib/auth"
import { redirect } from "next/navigation"
import DashboardUsuarioClient from "./DashboardUsuarioClient"

export default async function DashboardUsuario() {

  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <DashboardUsuarioClient />
  )
}