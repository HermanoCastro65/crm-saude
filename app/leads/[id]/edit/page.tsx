"use client"

import { useParams, useRouter } from "next/navigation"
import { leads } from "@/mocks/leads"
import { AppLayout } from "@/components/layout/AppLayout"
import { LeadForm } from "@/components/leads/LeadForm"

export default function EditLeadPage() {
  const params = useParams()
  const router = useRouter()

  const leadIndex = leads.findIndex((l) => l.id === params.id)
  const lead = leads[leadIndex]

  function handleUpdate(updated: any) {
    leads[leadIndex] = updated
    router.push("/leads")
  }

  if (!lead) return <div>Lead não encontrado</div>

  return (
    <AppLayout>
      <div className="max-w-xl">
        <h1 className="text-xl font-bold mb-4">
          Editar Lead
        </h1>

        <LeadForm initialData={lead} onSubmit={handleUpdate} />
      </div>
    </AppLayout>
  )
}