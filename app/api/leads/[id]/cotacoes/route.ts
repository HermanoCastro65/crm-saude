import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const parts = url.pathname.split("/")
    const id = parts[3] // /api/leads/{id}/cotacoes

    if (!id) {
      return new Response(JSON.stringify({ error: "ID inválido" }), {
        status: 400,
      })
    }

    const body = await req.json()

    const ficha = await prisma.fichaLead.findUnique({
      where: { leadId: id },
    })

    if (!ficha) {
      return new Response(
        JSON.stringify({ error: "Ficha não encontrada" }),
        { status: 404 }
      )
    }

    const cotacao = await prisma.cotacao.create({
      data: {
        fichaId: ficha.id,
        titulo: body.titulo,
        link: body.link,
        valor: body.valor,
      },
    })

    return new Response(JSON.stringify(cotacao), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("ERRO COTACAO:", error)

    return new Response(
      JSON.stringify({
        error: "Erro ao criar cotação",
        details: error.message,
      }),
      { status: 500 }
    )
  }
}