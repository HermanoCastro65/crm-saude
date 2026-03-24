"use client"

import { useParams } from "next/navigation"
import { leads } from "mocks/leads"
import { AppLayout } from "components/layout/AppLayout"
import { FichaLead } from "components/leads/FichaLead"

export default function LeadDetailsPage() {
  const params = useParams()
  const lead = leads.find((l) => l.id === params.id)

  if (!lead) return <div>Lead não encontrado</div>

  return (
    <AppLayout>
      <FichaLead lead={lead} />
    </AppLayout>
  )
}