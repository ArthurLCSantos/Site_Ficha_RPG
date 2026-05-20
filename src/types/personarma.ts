
export type Atributo = {

  nome: string

  valor: number
}

export type PersonarmaData = {

  id: string

  nome: string
  objeto: string

  nivel: number

  atributos: Atributo[]

  habilidades: string

  imagem_url?: string

  usuarioId: string 
}