import { auth } from "@/src/lib/auth"
import { redirect } from "next/navigation"
import DashboardAdminClient from "./DashboardAdminClient"

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboardUsuario")
  }

  return (
    <DashboardAdminClient adminId={session.user.id} />
  )
}