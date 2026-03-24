import { prisma } from "@/lib/prisma"

export async function GET() {
  const leads = await prisma.lead.findMany({
    include: {
      ficha: {
        include: {
          cotacoes: true
        }
      }
    }
  })

  return new Response(JSON.stringify(leads), {
    headers: { "Content-Type": "application/json" }
  })
}

export async function POST(req: Request) {
  const body = await req.json()

  const lead = await prisma.lead.create({
    data: {
      nome: body.nome,
      telefone: body.telefone,
      email: body.email,
      origem: body.origem,
      status: body.status,
      ficha: {
        create: {
          idades: body.ficha.idades,
          quantidadeVidas: body.ficha.quantidadeVidas,
          tipoPlano: body.ficha.tipoPlano,
          localidade: body.ficha.localidade,
          hospitais: body.ficha.hospitaisPreferidos,
          planoAtual: body.ficha.planoAtual,
          observacoes: body.ficha.observacoes,
          primeiroContato: body.ficha.primeiroContato,
          ultimoContato: body.ficha.ultimoContato,
          proximoContato: body.ficha.proximoContato
        }
      }
    },
    include: {
      ficha: {
        include: {
          cotacoes: true
        }
      }
    }
  })

  return new Response(JSON.stringify(lead), {
    headers: { "Content-Type": "application/json" }
  })
}