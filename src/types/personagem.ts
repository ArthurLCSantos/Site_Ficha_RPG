import { ItemData } from "./item"
import { SkillsState } from "./skill"

export type Atributo = {
  nome: string

  valor: number
}

export type HabilidadeData = {
  nome: string

  descricao: string
}

export type StatusData = {
  atual: number
  
  maximo: number
}

export type PersonagemData = {

  id: string

  nome: string

  origem: string

  especializacao: string

  experiencia: number

  ca: number,

  vida: StatusData

  estamina: StatusData

  atributos: Atributo[]

  habilidades: HabilidadeData[]

  pericias: SkillsState


  imagem_url?: string

  historia: string

  ideais: string

  defeitos: string

  inventario: ItemData[]
}

