export type Cotacao = {
  id: string
  titulo: string
  link: string
  valor: number
  createdAt: string
}

export type Contato = {
  data: string
  diaSemana: string
}

export type ProximoContato = {
  data: string
  diaSemana: string
  observacao?: string
}

export type TipoPlano =
  | "Individual"
  | "PME"
  | "Adesão"
  | "Familiar"
  | "Sênior"
  | "Dental"

export type FichaLead = {
  idades: number[]
  quantidadeVidas: number

  tipoPlano: TipoPlano

  localidade: string
  hospitaisPreferidos: string[]

  planoAtual?: {
    operadora: string
    valor?: number
  }

  cotacoes: Cotacao[]

  primeiroContato?: Contato
  ultimoContato?: Contato
  proximoContato?: ProximoContato

  observacoes?: string
}

export type LeadStatus =
  | "Novo"
  | "Contato"
  | "Cotação"
  | "Fechado"
  | "Perdido"

export type Lead = {
  id: string
  nome: string
  telefone: string
  email?: string
  origem: string
  status: LeadStatus
  createdAt: string

  ficha: FichaLead
}