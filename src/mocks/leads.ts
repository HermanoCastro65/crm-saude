import { Lead } from "@/types/lead";

export const leads: Lead[] = [
    {
        id: "1",
        nome: "Carlos Henrique",
        telefone: "21 99999-1111",
        email: "carlos@gmail.com",
        origem: "Instagram",
        status: "Novo",
        createdAt: "2026-03-20",
        ficha: {
            idades: [35, 32],
            tipoPlano: "PME",
            localidade: "Niterói",
            hospitaisPreferidos: ["Hospital Icaraí", "Niterói D'Or"],
            planoAtual: {
                operadora: "Amil",
                valor: 1200,
            },
            observacoes: "Quer reduzir custo",
        },
    },
];
