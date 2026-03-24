"use client"

import { useParams, useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/AppLayout"
import { LeadForm } from "@/components/leads/LeadForm"
import { useEffect, useState } from "react"
import { Lead } from "@/types/lead"

export default function EditLeadPage() {
  const params = useParams()
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/leads/${params.id}`)
      if (!res.ok) return
      const data = await res.json()
      setLead(data)
    }

    load()
  }, [params.id])

  if (!lead) return <div>Carregando...</div>

  function handleUpdate() {
    router.push("/leads")
  }

  return (
    <AppLayout>
      <div className="max-w-xl">
        <h1 className="text-xl font-bold mb-4">Editar Lead</h1>

        <LeadForm initialData={lead} onSubmit={handleUpdate} />
      </div>
    </AppLayout>
  )
}