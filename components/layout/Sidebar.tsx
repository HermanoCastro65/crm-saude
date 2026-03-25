"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus } from "lucide-react"
import { useLeadsStore } from "@/store/leadsStore"

// 🔥 TIPO SEGURO
type StatusType = "Novo" | "Contato" | "Cotação" | "Fechado" | "Perdido"

const statusList: StatusType[] = [
  "Novo",
  "Contato",
  "Cotação",
  "Fechado",
  "Perdido",
]

const statusColors: Record<StatusType, string> = {
  Novo: "bg-gray-400",
  Contato: "bg-blue-400",
  Cotação: "bg-yellow-400",
  Fechado: "bg-green-400",
  Perdido: "bg-red-400",
}

// 🔥 NORMALIZA BACKEND → FRONT
function normalizeStatus(status: string): StatusType {
  if (!status) return "Novo"

  if (status === "Cotacao") return "Cotação"
  if (status === "Novo") return "Novo"
  if (status === "Contato") return "Contato"
  if (status === "Fechado") return "Fechado"
  if (status === "Perdido") return "Perdido"

  return "Novo"
}

export function Sidebar() {
  const pathname = usePathname()
  const leads = useLeadsStore((state) => state.leads || [])

  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-blue-700 to-blue-500 text-white p-4 overflow-y-auto">
      <h1 className="text-xl font-bold mb-6">CRM Saúde</h1>

      <Link
        href="/leads/new"
        className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-white text-blue-700 font-semibold text-sm shadow hover:scale-[1.02] transition"
      >
        <Plus size={16} />
        Novo Lead
      </Link>

      <Link
        href="/leads"
        className="block mb-6 p-2 rounded-lg bg-white text-blue-700 font-semibold text-sm shadow"
      >
        Ver todos os leads
      </Link>

      {statusList.map((status) => {
        const filtered = leads.filter(
          (l) => normalizeStatus(l.status) === status
        )

        return (
          <div key={status} className="mb-6">
            <h2 className="text-xs uppercase opacity-80 mb-2">
              {status} ({filtered.length})
            </h2>

            {filtered.map((lead) => {
              const active = pathname === `/leads/${lead.id}`
              const normalized = normalizeStatus(lead.status)

              return (
                <Link
                  key={lead.id}
                  href={`/leads/${lead.id}`}
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all
                  ${
                    active
                      ? "bg-white text-blue-700 shadow"
                      : "hover:bg-blue-600"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      statusColors[normalized]
                    }`}
                  />
                  {lead.nome}
                </Link>
              )
            })}
          </div>
        )
      })}
    </aside>
  )
}