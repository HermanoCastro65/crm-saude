"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { FichaLead } from "@/components/leads/FichaLead"
import { leads } from "@/mocks/leads"
import { useRouter } from "next/navigation"

export default function NewLeadPage() {
  const router = useRouter()

function handleCreate(newLead: any) {
  const leadCompleto = {
    ...newLead,
    ficha: {
      idades: newLead.ficha?.idades || [],
      quantidadeVidas: newLead.ficha?.quantidadeVidas || 1,
      tipoPlano: newLead.ficha?.tipoPlano || "Individual",
      localidade: newLead.ficha?.localidade || "",
      hospitaisPreferidos: newLead.ficha?.hospitaisPreferidos || [],
      planoAtual: newLead.ficha?.planoAtual || undefined,

      cotacoes: newLead.ficha?.cotacoes || [],

      primeiroContato: {
        data: new Date().toISOString().split("T")[0],
        diaSemana: new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
        }),
      },

      ultimoContato: newLead.ficha?.ultimoContato || undefined,
      proximoContato: newLead.ficha?.proximoContato || undefined,

      observacoes: newLead.ficha?.observacoes || "",
    },
  }

  leads.push(leadCompleto)
  router.push(`/leads/${leadCompleto.id}`)
}

  return (
    <AppLayout>
      <FichaLead lead={undefined as any} isNew onCreate={handleCreate} />
    </AppLayout>
  )
}