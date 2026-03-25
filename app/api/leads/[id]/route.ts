import { prisma } from "@/lib/prisma"

function getIdFromUrl(req: Request) {
  const url = new URL(req.url)
  return url.pathname.split("/").pop()
}

// 🔥 NORMALIZAÇÃO DEFINITIVA (ACEITA QUALQUER VARIAÇÃO)
function normalizeStatus(status: any) {
  if (!status) return "Novo"

  const value = String(status).toLowerCase()

  if (value.includes("novo")) return "Novo"
  if (value.includes("contato")) return "Contato"
  if (value.includes("cota")) return "Cotacao"
  if (value.includes("fechado")) return "Fechado"
  if (value.includes("perdido")) return "Perdido"

  return "Novo"
}

export async function GET(req: Request) {
  try {
    const id = getIdFromUrl(req)

    if (!id) {
      return Response.json({ error: "ID inválido" }, { status: 400 })
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
      return Response.json({ error: "Lead não encontrado" }, { status: 404 })
    }

    return Response.json(lead)
  } catch (error: any) {
    console.error("ERRO GET ID:", error)

    return Response.json(
      { error: "Erro ao buscar lead", details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const id = getIdFromUrl(req)

    if (!id) {
      return Response.json({ error: "ID inválido" }, { status: 400 })
    }

    const body = await req.json()

    // 🔥 NORMALIZA STATUS AQUI
    const status = normalizeStatus(body.status)

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        nome: body.nome ?? "",
        telefone: body.telefone ?? "",
        email: body.email ?? null,
        origem: body.origem ?? "",
        status: status,
      },
    })

    // 🔥 ATUALIZA FICHA COM SEGURANÇA
    if (body.ficha) {
      await prisma.fichaLead.update({
        where: { leadId: id },
        data: {
          idades: body.ficha.idades ?? [],
          quantidadeVidas: body.ficha.quantidadeVidas ?? 1,
          tipoPlano: body.ficha.tipoPlano ?? "Individual",
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

    return Response.json(updated)
  } catch (error: any) {
    console.error("ERRO PUT:", error)

    return Response.json(
      {
        error: "Erro ao atualizar lead",
        details: error.message,
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const id = getIdFromUrl(req)

    if (!id) {
      return Response.json({ error: "ID inválido" }, { status: 400 })
    }

    await prisma.lead.delete({
      where: { id },
    })

    return Response.json({ success: true })
  } catch (error: any) {
    console.error("ERRO DELETE:", error)

    return Response.json(
      {
        error: "Erro ao deletar",
        details: error.message,
      },
      { status: 500 }
    )
  }
}