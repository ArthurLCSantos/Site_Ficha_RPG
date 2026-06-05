import { SkillsState } from "./skill"

export type Atributo = {

  nome: string

  valor: number
}

export type HabilidadeData = {
  nome: string

  descricao: string
}

export type PersonagemData = {

  id: string

  nome: string

  origem: string

  especializacao: string

  nivel: number

  atributos: Atributo[]

  habilidades: HabilidadeData[]

  pericias: SkillsState

  imagem_url?: string
}

