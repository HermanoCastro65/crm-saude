"use client"

import { useParams } from "next/navigation"
import { AppLayout } from "@/components/layout/AppLayout"
import { FichaLead } from "@/components/leads/FichaLead"
import { useEffect, useState } from "react"
import { Lead } from "@/types/lead"

export default function LeadPage() {
  const params = useParams()
  const [lead, setLead] = useState<Lead | null>(null)

  useEffect(() => {
    if (!params?.id) return

    async function load() {
      try {
        const res = await fetch(`/api/leads/${params.id}`)
        if (!res.ok) return

        const data = await res.json()
        setLead(data)
      } catch (err) {
        console.error("Erro ao carregar lead", err)
      }
    }

    load()
  }, [params?.id])

  if (!lead) {
    return (
      <AppLayout>
        <div className="p-6">Carregando...</div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <FichaLead lead={lead} />
    </AppLayout>
  )
}