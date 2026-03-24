"use client"

import { useParams } from "next/navigation"
import { leads } from "@/mocks/leads"
import { AppLayout } from "@/components/layout/AppLayout"
import { FichaLead } from "@/components/leads/FichaLead"

export default function LeadPage() {
  const params = useParams()

  const lead = leads.find((l) => l.id === params.id)

  if (!lead) {
    return (
      <AppLayout>
        <div className="p-6">Lead não encontrado</div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <FichaLead lead={lead} />
    </AppLayout>
  )
}