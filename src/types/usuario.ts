import { PersonagemData } from "./personagem"
import { PersonarmaData } from "./personarma"

export type UsuarioData = {
    id : string,
    nome : string,
    email : string,
    senha : string,
    role : string,
    personagens: PersonagemData[],
    personarmas: PersonarmaData[],
}