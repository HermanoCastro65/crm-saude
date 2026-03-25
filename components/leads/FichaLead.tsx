"use client"

import { Lead } from "@/types/lead"
import { useState } from "react"
import { useLeadsStore } from "@/store/leadsStore"

type Props = {
  lead: Lead
  isNew?: boolean
  onCreate?: (lead: Lead) => void
}

export function FichaLead({ lead, isNew, onCreate }: Props) {
  const [data, setData] = useState<Lead>(
    lead || {
      id: crypto.randomUUID(),
      nome: "",
      telefone: "",
      email: "",
      origem: "",
      status: "Novo",
      createdAt: new Date().toISOString(),
      ficha: {
        idades: [],
        quantidadeVidas: 1,
        tipoPlano: "Individual",
        localidade: "",
        hospitaisPreferidos: [],
        cotacoes: [],
      },
    }
  )

  const [editing, setEditing] = useState(false)
  if (!data?.ficha) return null

  const createLead = useLeadsStore((state) => state.createLead)
  const updateLead = useLeadsStore((state) => state.updateLead)

  function update(field: string, value: any) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function updateFicha(field: string, value: any) {
    setData((prev) => ({
      ...prev,
      ficha: { ...prev.ficha, [field]: value },
    }))
  }

  function updateCotacao(index: number, field: string, value: any) {
    const novas = [...data.ficha.cotacoes]
    novas[index] = { ...novas[index], [field]: value }
    updateFicha("cotacoes", novas)
  }

  function addCotacao() {
    updateFicha("cotacoes", [
      ...data.ficha.cotacoes,
      {
        id: crypto.randomUUID(),
        titulo: "",
        link: "",
        valor: 0,
        createdAt: new Date().toISOString(),
      },
    ])
  }

  const [loading, setLoading] = useState(false)

  async function handleSave() {
    try {
      setLoading(true)

      if (isNew) {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!res.ok) throw new Error("Erro ao criar lead")

        const created = await res.json()

        if (onCreate) onCreate(created)
        setData(created)

      } else {
        const res = await fetch(`/api/leads/${data.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })

        if (!res.ok) throw new Error("Erro ao atualizar lead")

        // 🔥 evita duplicar cotação
        for (const cotacao of data.ficha.cotacoes) {
          if (!cotacao.titulo) continue

          await fetch(`/api/leads/${data.id}/cotacoes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              titulo: cotacao.titulo,
              link: cotacao.link,
              valor: cotacao.valor,
            }),
          })
        }
      }

      setEditing(false)

    } catch (err) {
      console.error(err)
      alert("Erro ao salvar")
    } finally {
      setLoading(false)
    }
  }

  const isAtrasado =
    data.ficha.proximoContato &&
    new Date(data.ficha.proximoContato.data) < new Date()

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="card flex justify-between">
        <div className="space-y-3 w-full max-w-xl">

          {editing ? (
            <input
              className="input text-3xl font-semibold"
              value={data.nome}
              onChange={(e) => update("nome", e.target.value)}
            />
          ) : (
            <h1 className="text-3xl font-semibold">{data.nome || "Novo Lead"}</h1>
          )}

          {/* TELEFONE */}
          <div>
            <p className="label">Telefone</p>
            {editing ? (
              <input
                className="input"
                value={data.telefone}
                onChange={(e) => update("telefone", e.target.value)}
              />
            ) : (
              <p>{data.telefone || "-"}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <p className="label">Email</p>
            {editing ? (
              <input
                className="input"
                value={data.email || ""}
                onChange={(e) => update("email", e.target.value)}
              />
            ) : (
              <p>{data.email || "-"}</p>
            )}
          </div>
        </div>

        <button
          onClick={editing ? handleSave : () => setEditing(true)}
          disabled={loading}
          className={editing ? "btn-success" : "btn-primary"}
        >
          {loading ? "Salvando..." : editing ? "Salvar" : "Editar"}
        </button>
      </div>

      {/* INFO */}
      <div className="grid grid-cols-3 gap-4">
        <Card title="Origem">
          {editing ? (
            <input className="input" value={data.origem} onChange={(e) => update("origem", e.target.value)} />
          ) : data.origem}
        </Card>

        <Card title="Status">
          {editing ? (
            <select className="input" value={data.status} onChange={(e) => update("status", e.target.value)}>
              <option>Novo</option>
              <option>Contato</option>
              <option>Cotação</option>
              <option>Fechado</option>
              <option>Perdido</option>
            </select>
          ) : data.status}
        </Card>

        <Card title="Criado em">
          {editing ? (
            <input
              className="input"
              value={data.createdAt}
              onChange={(e) => update("createdAt", e.target.value)}
            />
          ) : (
            new Date(data.createdAt).toLocaleDateString()
          )}
        </Card>
      </div>

      {/* CONTATOS */}
      <div className="grid grid-cols-3 gap-4">
        <Card title="Primeiro Contato">
          {editing ? (
            <input className="input" value={data.createdAt} onChange={(e) => update("createdAt", e.target.value)} />
          ) : new Date(data.createdAt).toLocaleDateString()}
        </Card>

        <Card title="Último Contato">
          {editing ? (
            <input
              type="date"
              className="input"
              value={data.ficha.ultimoContato?.data || ""}
              onChange={(e) => {
                const date = new Date(e.target.value)

                updateFicha("ultimoContato", {
                  data: e.target.value,
                  diaSemana: date.toLocaleDateString("pt-BR", {
                    weekday: "long",
                  }),
                })
              }}
            />
          ) : (
            `${data.ficha.ultimoContato?.data || "-"} ${data.ficha.ultimoContato?.diaSemana || ""
            }`
          )}
        </Card>

        <Card title="Próximo Contato">
          {editing ? (
            <input
              type="date"
              className="input"
              value={data.ficha.proximoContato?.data || ""}
              onChange={(e) => {
                const date = new Date(e.target.value)

                updateFicha("proximoContato", {
                  data: e.target.value,
                  diaSemana: date.toLocaleDateString("pt-BR", {
                    weekday: "long",
                  }),
                })
              }}
            />
          ) : (
            `${data.ficha.proximoContato?.data || "-"} ${data.ficha.proximoContato?.diaSemana || ""
            }`
          )}
        </Card>
      </div>

      {/* FICHA */}
      <div className="grid grid-cols-3 gap-4">
        <Card title="Plano">
          {editing ? (
            <select
              className="input"
              value={data.ficha.tipoPlano}
              onChange={(e) =>
                updateFicha("tipoPlano", e.target.value)
              }
            >
              <option>Individual</option>
              <option>PME</option>
              <option>Adesão</option>
              <option>Familiar</option>
              <option>Sênior</option>
              <option>Dental</option>
            </select>
          ) : (
            data.ficha.tipoPlano
          )}
        </Card>

        <Card title="Vidas">
          {editing ? (
            <input type="number" className="input" value={data.ficha.quantidadeVidas} onChange={(e) => updateFicha("quantidadeVidas", Number(e.target.value))} />
          ) : data.ficha.quantidadeVidas}
        </Card>

        <Card title="Local">
          {editing ? (
            <input className="input" value={data.ficha.localidade} onChange={(e) => updateFicha("localidade", e.target.value)} />
          ) : data.ficha.localidade}
        </Card>
      </div>

      {/* IDADES */}
      <Card title="Idades">
        {editing ? (
          <input
            className="input"
            value={data.ficha.idades.join(", ")}
            onChange={(e) =>
              updateFicha(
                "idades",
                e.target.value.split(",")
                  .map((i) => Number(i.trim()))
                  .filter((n) => !isNaN(n))
              )
            }
          />
        ) : data.ficha.idades.join(", ") || "-"}
      </Card>

      {/* HOSPITAIS */}
      <Card title="Hospitais">
        {editing ? (
          <input
            className="input"
            value={(data.ficha.hospitaisPreferidos || []).join(", ") || "-"}
            onChange={(e) =>
              updateFicha(
                "hospitaisPreferidos",
                e.target.value.split(",").map((h) => h.trim())
              )
            }
          />
        ) : (data.ficha.hospitaisPreferidos || []).join(", ") || "-"}
      </Card>

      {/* PLANO ATUAL */}
      <Card title="Plano Atual">
        {editing ? (
          <div className="flex gap-2">
            <input className="input" placeholder="Operadora"
              value={data.ficha.planoAtual?.operadora || ""}
              onChange={(e) =>
                updateFicha("planoAtual", {
                  ...(data.ficha.planoAtual || {}),
                  operadora: e.target.value,
                })
              }
            />
            <input className="input" type="number" placeholder="Valor"
              value={data.ficha.planoAtual?.valor || ""}
              onChange={(e) =>
                updateFicha("planoAtual", {
                  ...(data.ficha.planoAtual || {}),
                  valor: Number(e.target.value),
                })
              }
            />
          </div>
        ) : data.ficha.planoAtual
          ? `${data.ficha.planoAtual.operadora} - R$ ${data.ficha.planoAtual.valor}`
          : "-"}
      </Card>

      {/* COTAÇÕES */}
      <div className="card space-y-4">
        <div className="flex justify-between">
          <h2 className="font-semibold">Cotações</h2>
          {editing && (
            <button onClick={addCotacao} className="text-blue-600 text-sm">
              + Adicionar
            </button>
          )}
        </div>

        {data.ficha.cotacoes.map((c, i) => (
          <div key={c.id} className="grid grid-cols-4 gap-2 border p-3 rounded-xl">
            <input className="input" value={c.titulo} onChange={(e) => updateCotacao(i, "titulo", e.target.value)} />
            <input className="input" value={c.link} onChange={(e) => updateCotacao(i, "link", e.target.value)} />
            <input className="input" type="number" value={c.valor} onChange={(e) => updateCotacao(i, "valor", Number(e.target.value))} />
            <input className="input" value={c.createdAt} onChange={(e) => updateCotacao(i, "createdAt", e.target.value)} />
          </div>
        ))}
      </div>

      {/* OBS */}
      <Card title="Observações">
        {editing ? (
          <textarea className="input" value={data.ficha.observacoes || ""} onChange={(e) => updateFicha("observacoes", e.target.value)} />
        ) : data.ficha.observacoes || "-"}
      </Card>
    </div>
  )
}

function Card({ title, children }: any) {
  return (
    <div className="card">
      <p className="label mb-1">{title}</p>
      <div className="font-medium">{children}</div>
    </div>
  )
}