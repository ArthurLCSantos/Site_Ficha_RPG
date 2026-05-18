import { Skill } from "@/src/types/skill";

export const skills1 : Skill[] = [
{ nome: "Luta", select: ["Força", "Destreza"] },
{ nome: "Atletismo", atributo: "Força" },
{ nome: "Potência", atributo: "Força" },
{ nome: "Limepeza", atributo: "Força" },
{ nome: "Pontaria", select: ["Força", "Destreza"] },
{ nome: "Destreza", atributo: "Destreza" },
{ nome: "Acrobacia", atributo: "Destreza" },
{ nome: "Furtividade", atributo: "Destreza" },
{ nome: "Prestidigitação", atributo: "Destreza" },
];

export const skills2 : Skill[] = [
{ nome: "Reflexos", atributo: "Destreza" },
{ nome: "Fortitude", atributo: "Constituição" },
{ nome: "Resistência à Toxinas", atributo: "Constituição" },
{ nome: "Imacular", atributo: "Constituição" },
{ nome: "Estamina", atributo: "Constituição" },
{ nome: "Intuição", atributo: "Sabedoria" },
{ nome: "Medicina", atributo: "Sabedoria" },
{ nome: "Percepção", atributo: "Sabedoria" },
{ nome: "Conhecimento Mundano", atributo: "Sabedoria" },
];

export const skills3 : Skill[] = [
{ nome: "Vontade", atributo: "Sabedoria" },
{ nome: "Astúcia", atributo: "Inteligência" },
{ nome: "Direção", atributo: "Inteligência" },
{ nome: "Investigação", atributo: "Inteligência" },
{ nome: "Tecnologia", atributo: "Inteligência" },
{ nome: "Persuasão", atributo: "Carisma" },
{ nome: "Enganação", atributo: "Carisma" },
{ nome: "Intimidação", atributo: "Carisma" },
{ nome: "Performance", atributo: "Carisma" },
];

export const allSkills : Skill[] = [...skills1, ...skills2, ...skills3]