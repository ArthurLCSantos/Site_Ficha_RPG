"use client"

import { createContext, useContext } from "react"
export const CharacterContext = createContext<any>(null)

export function usePersonagem() {
    const context = useContext(CharacterContext)

    if (!context) {throw new Error("useCharacter deve ser usado dentro do CharacterProvider")}
    
    return context
}