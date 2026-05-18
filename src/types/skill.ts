export type Skill = {

  nome: string

  atributo?: string

  select?: string[]
}

export type SkillState = {

  atributo: string

  treinada: boolean
}

export type SkillsState = {

  [key: string]: SkillState
}

type SkillTableProps = {

  skills: Skill[]

  skillsState: SkillsState

  updateSkillAttribute: (
    skillName: string,
    value: string
  ) => void

  updateSkillTraining: (
    skillName: string,
    value: boolean
  ) => void
}