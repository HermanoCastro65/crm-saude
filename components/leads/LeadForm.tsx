"use client"

import { useState } from "react"
import { Lead, TipoPlano } from "@/types/lead"

type Props = {
  initialData?: Lead
  onSubmit: (lead: Lead) => void
}

export function LeadForm({ initialData, onSubmit }: Props) {
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

  function handleChange(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleFichaChange(field: string, value: any) {
    setForm((prev) => ({
      ...prev,
      ficha: { ...prev.ficha, [field]: value },
    }))
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        placeholder="Nome"
        className="w-full border p-2 rounded"
        value={form.nome}
        onChange={(e) => handleChange("nome", e.target.value)}
      />

      <input
        placeholder="Telefone"
        className="w-full border p-2 rounded"
        value={form.telefone}
        onChange={(e) => handleChange("telefone", e.target.value)}
      />

      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <input
        placeholder="Origem"
        className="w-full border p-2 rounded"
        value={form.origem}
        onChange={(e) => handleChange("origem", e.target.value)}
      />

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
        value={form.ficha.quantidadeVidas}
        onChange={(e) =>
          handleFichaChange("quantidadeVidas", Number(e.target.value))
        }
      />

      <input
        placeholder="Localidade"
        className="w-full border p-2 rounded"
        value={form.ficha.localidade}
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

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Salvar Lead
      </button>
    </form>
  )
}