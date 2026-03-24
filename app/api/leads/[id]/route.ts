import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop()

    if (!id) {
      return new Response(JSON.stringify({ error: "ID não encontrado" }), {
        status: 400,
      })
    }

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        ficha: {
          include: {
            cotacoes: true,
          },
        },
      },
    })

    if (!lead) {
      return new Response(JSON.stringify({ error: "Lead não encontrado" }), {
        status: 404,
      })
    }

    return new Response(JSON.stringify(lead), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("ERRO GET ID:", error)

    return new Response(
      JSON.stringify({
        error: "Erro interno",
        details: error.message,
      }),
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop()

    if (!id) {
      return new Response(JSON.stringify({ error: "ID inválido" }), {
        status: 400,
      })
    }

    const body = await req.json()

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        nome: body.nome,
        telefone: body.telefone,
        email: body.email ?? null,
        origem: body.origem,
        status: body.status,
      },
    })

    // 🔥 atualiza ficha separado (evita crash)
    if (body.ficha) {
      await prisma.fichaLead.update({
        where: { leadId: id },
        data: {
          idades: body.ficha.idades ?? [],
          quantidadeVidas: body.ficha.quantidadeVidas ?? 1,
          tipoPlano: body.ficha.tipoPlano,
          localidade: body.ficha.localidade ?? "",
          hospitais: body.ficha.hospitaisPreferidos ?? [],
          planoAtual: body.ficha.planoAtual ?? null,
          observacoes: body.ficha.observacoes ?? null,
          primeiroContato: body.ficha.primeiroContato ?? null,
          ultimoContato: body.ficha.ultimoContato ?? null,
          proximoContato: body.ficha.proximoContato ?? null,
        },
      })
    }

    return new Response(JSON.stringify(updated), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("ERRO PUT:", error)

    return new Response(
      JSON.stringify({
        error: "Erro ao atualizar",
        details: error.message,
      }),
      { status: 500 }
    )
  }
}