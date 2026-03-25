"use client"

import { useState } from "react"
import { Lead, TipoPlano } from "@/types/lead"
import { useLeadsStore } from "@/store/leadsStore"

type Props = {
  initialData?: Lead
  onSubmit?: (lead: Lead) => void
}

function normalizeStatus(status: string) {
  if (status === "Cotação") return "Cotacao"
  if (status === "Cotacao") return "Cotacao"
  if (status === "Novo") return "Novo"
  if (status === "Contato") return "Contato"
  if (status === "Fechado") return "Fechado"
  if (status === "Perdido") return "Perdido"

  return "Novo"
}

export function LeadForm({ initialData, onSubmit }: Props) {
  const createLead = useLeadsStore((state) => state.createLead)
  const updateLead = useLeadsStore((state) => state.updateLead)

  const [form, setForm] = useState<Lead>(
    initialData || {
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

  const [loading, setLoading] = useState(false)

  function handleChange(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleFichaChange(field: string, value: any) {
    setForm((prev) => ({
      ...prev,
      ficha: { ...prev.ficha, [field]: value },
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)

      if (!form.nome || !form.telefone) {
        alert("Nome e telefone são obrigatórios")
        return
      }

      // 🔥 AQUI ESTÁ A CORREÇÃO PRINCIPAL
      const payload: Lead = {
        ...form,
        status: normalizeStatus(form.status) as any,
      }

      if (initialData) {
        await updateLead(payload)
      } else {
        await createLead(payload)
      }

      if (onSubmit) onSubmit(payload)

    } catch (err) {
      console.error(err)
      alert("Erro ao salvar lead")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Nome"
        className="w-full border p-2 rounded"
        value={form.nome || ""}
        onChange={(e) => handleChange("nome", e.target.value)}
      />

      <input
        placeholder="Telefone"
        className="w-full border p-2 rounded"
        value={form.telefone || ""}
        onChange={(e) => handleChange("telefone", e.target.value)}
      />

      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={form.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        placeholder="Origem"
        className="w-full border p-2 rounded"
        value={form.origem || ""}
        onChange={(e) => handleChange("origem", e.target.value)}
      />

      {/* 🔥 SELECT DE STATUS (IMPORTANTE) */}
      <select
        className="w-full border p-2 rounded"
        value={form.status}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <option>Novo</option>
        <option>Contato</option>
        <option>Cotação</option>
        <option>Fechado</option>
        <option>Perdido</option>
      </select>

      <select
        className="w-full border p-2 rounded"
        value={form.ficha.tipoPlano}
        onChange={(e) =>
          handleFichaChange("tipoPlano", e.target.value as TipoPlano)
        }
      >
        <option>Individual</option>
        <option>PME</option>
        <option>Adesão</option>
        <option>Familiar</option>
        <option>Sênior</option>
        <option>Dental</option>
      </select>

      <input
        placeholder="Quantidade de vidas"
        type="number"
        className="w-full border p-2 rounded"
        value={form.ficha.quantidadeVidas || 0}
        onChange={(e) =>
          handleFichaChange("quantidadeVidas", Number(e.target.value))
        }
      />

      <input
        placeholder="Localidade"
        className="w-full border p-2 rounded"
        value={form.ficha.localidade || ""}
        onChange={(e) =>
          handleFichaChange("localidade", e.target.value)
        }
      />

      <textarea
        placeholder="Observações"
        className="w-full border p-2 rounded"
        value={form.ficha.observacoes || ""}
        onChange={(e) =>
          handleFichaChange("observacoes", e.target.value)
        }
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar Lead"}
      </button>
    </form>
  )
}