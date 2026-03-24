import { Lead } from "types/lead"

export const leads: Lead[] = [
  {
    id: "1",
    nome: "Carlos Henrique",
    telefone: "21 99999-1111",
    email: "carlos@gmail.com",
    origem: "Instagram",
    status: "Cotação",
    createdAt: "2026-03-20",

    ficha: {
      idades: [35, 32],
      quantidadeVidas: 2,
      tipoPlano: "PME",
      localidade: "Niterói",
      hospitaisPreferidos: ["Hospital Icaraí", "Niterói D'Or"],

      planoAtual: {
        operadora: "Amil",
        valor: 1200,
      },

      cotacoes: [
        {
          id: "c1",
          titulo: "Plano Amil PME",
          link: "https://cotacao.com/amil",
          valor: 980,
          createdAt: "2026-03-21",
        },
        {
          id: "c2",
          titulo: "Plano Intermédica",
          link: "https://cotacao.com/intermedica",
          valor: 870,
          createdAt: "2026-03-22",
        },
      ],

      primeiroContato: {
        data: "2026-03-20",
        diaSemana: "Quinta-feira",
      },

      ultimoContato: {
        data: "2026-03-22",
        diaSemana: "Sábado",
      },

      proximoContato: {
        data: "2026-03-25",
        diaSemana: "Terça-feira",
        observacao: "Follow-up após envio da proposta",
      },

      observacoes:
        "Cliente quer reduzir custo mantendo hospitais específicos",
    },
  },
  {
    id: "2",
    nome: "Juliana Souza",
    telefone: "21 98888-2222",
    email: "juliana@gmail.com",
    origem: "Indicação",
    status: "Contato",
    createdAt: "2026-03-18",

    ficha: {
      idades: [52],
      quantidadeVidas: 1,
      tipoPlano: "Sênior",
      localidade: "Rio de Janeiro",
      hospitaisPreferidos: ["Hospital São Lucas"],

      cotacoes: [],

      primeiroContato: {
        data: "2026-03-18",
        diaSemana: "Segunda-feira",
      },

      ultimoContato: {
        data: "2026-03-19",
        diaSemana: "Terça-feira",
      },

      proximoContato: {
        data: "2026-03-26",
        diaSemana: "Quarta-feira",
        observacao: "Aguardar retorno do filho",
      },

      observacoes: "Busca plano com boa rede hospitalar",
    },
  },
]