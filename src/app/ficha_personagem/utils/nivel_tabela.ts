/*
const tabela_nivel: Record<number,number> = {
        1: 0,
        2: 1_000,
        3: 3_000,
        4: 6_000,
        5: 10_000,
        6: 15_000,
        7: 21_000,
        8: 28_000,
        9: 36_000,
        10: 45_000,
        11: 55_000,
        12: 66_000,
        13: 78_000,
        14: 91_000,
        15: 105_000,
        16: 120_000,
        17: 136_000,
        18: 153_000,
        19: 171_000,
        20: 190_000
    }
*/
export function pegarNivel(experiencia:number) {
    return Math.floor((1+Math.sqrt(1+(experiencia/125)))/2)
}

export function pegarExperiencia(nivel:number) {
    return (nivel*nivel - nivel)*500
}