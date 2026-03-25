import { prisma } from "@/lib/prisma"

function getIdFromUrl(req: Request) {
  const url = new URL(req.url)
  return url.pathname.split("/")[3]
}

export async function POST(req: Request) {
  try {
    const id = getIdFromUrl(req)

    if (!id) {
      return Response.json({ error: "ID inválido" }, { status: 400 })
    }

    const body = await req.json()

    if (!body.titulo || !body.valor) {
      return Response.json(
        { error: "Título e valor são obrigatórios" },
        { status: 400 }
      )
    }

    const ficha = await prisma.fichaLead.findUnique({
      where: { leadId: id }
    })

    if (!ficha) {
      return Response.json(
        { error: "Ficha não encontrada" },
        { status: 404 }
      )
    }

    const cotacao = await prisma.cotacao.create({
      data: {
        fichaId: ficha.id,
        titulo: body.titulo,
        link: body.link ?? "",
        valor: body.valor
      }
    })

    return Response.json(cotacao)
  } catch (error: any) {
    console.error("ERRO COTACAO:", error)

    return Response.json(
      { error: "Erro ao criar cotação", details: error.message },
      { status: 500 }
    )
  }
}