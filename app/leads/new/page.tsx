"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { FichaLead } from "@/components/leads/FichaLead"
import { useRouter } from "next/navigation"

export default function NewLeadPage() {
  const router = useRouter()

  function handleCreate(newLead: any) {
    router.push(`/leads/${newLead.id}`)
  }

  return (
    <AppLayout>
      <FichaLead lead={undefined as any} isNew onCreate={handleCreate} />
    </AppLayout>
  )
}