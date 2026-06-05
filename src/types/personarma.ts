
export type Atributo = {

  nome: string

  valor: number
}

export type HabilidadeData = {
  nome: string,
  dano: number,
  dado: string,
  nivel: number
}

export type PersonarmaData = {

  id: string

  nome: string
  objeto: string

  nivel: number

  atributos: Atributo[]

  habilidades: HabilidadeData[]

  imagem_url?: string

  usuarioId: string 
}