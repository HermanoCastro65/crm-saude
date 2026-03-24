export type FichaLead = {
    idades: number[]
    tipoPlano: "Individual" | "Familiar" | "PME" | "Adesão"
    localidade: string
    hospitaisPreferidos: string[]
    planoAtual?: {
        operadora: string
        valor?: number
    }
    observacoes?: string
}

export type Lead = {
    id: string
    nome: string
    telefone: string
    email?: string
    origem: string
    status: "Novo" | "Contato" | "Cotação" | "Fechado" | "Perdido"
    createdAt: string
    ficha: FichaLead
}