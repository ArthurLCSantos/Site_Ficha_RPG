"use client"
import { signOut } from "next-auth/react"
import Button from "@/src/app/components/Button"

export default function SignOutButton({className=""}) {

  return (
    <Button className={className} onClick={() => signOut()}>
      Sair
    </Button>
  )
}