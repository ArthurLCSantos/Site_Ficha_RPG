import { SkillsState } from "./skill"

export type Atributo = {

  nome: string

  valor: number
}

export type PersonagemData = {

  id: string

  nome: string

  origem: string

  especializacao: string

  nivel: number

  atributos: Atributo[]

  habilidades: string

  pericias: SkillsState
}

