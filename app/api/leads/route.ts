import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        ficha: {
          include: {
            cotacoes: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return Response.json(leads)
  } catch (error: any) {
    console.error("ERRO GET LEADS:", error)

    return Response.json(
      { error: "Erro ao buscar leads" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.nome || !body.telefone) {
      return Response.json(
        { error: "Nome e telefone são obrigatórios" },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.create({
      data: {
        nome: body.nome,
        telefone: body.telefone,
        email: body.email ?? null,
        origem: body.origem ?? "",
        status: body.status ?? "Novo",

        ficha: {
          create: {
            idades: body.ficha?.idades ?? [],
            quantidadeVidas: body.ficha?.quantidadeVidas ?? 1,
            tipoPlano: body.ficha?.tipoPlano ?? "Individual",
            localidade: body.ficha?.localidade ?? "",
            hospitais: body.ficha?.hospitaisPreferidos ?? [],
            planoAtual: body.ficha?.planoAtual ?? null,
            observacoes: body.ficha?.observacoes ?? null,
            primeiroContato: body.ficha?.primeiroContato ?? null,
            ultimoContato: body.ficha?.ultimoContato ?? null,
            proximoContato: body.ficha?.proximoContato ?? null
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

    return Response.json(lead)
  } catch (error: any) {
    console.error("ERRO POST LEAD:", error)

    return Response.json(
      {
        error: "Erro ao criar lead",
        details: error.message
      },
      { status: 500 }
    )
  }
}