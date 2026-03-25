import { LeadStatus } from "@/types/lead"

// 🔥 MESMO TIPO DO SIDEBAR
type StatusType = "Novo" | "Contato" | "Cotação" | "Fechado" | "Perdido"

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

export function StatusBadge({ status }: { status: LeadStatus }) {
  const normalized = normalizeStatus(status)

  const map: Record<StatusType, string> = {
    Novo: "bg-gray-200 text-gray-800",
    Contato: "bg-blue-100 text-blue-700",
    Cotação: "bg-yellow-100 text-yellow-700",
    Fechado: "bg-green-100 text-green-700",
    Perdido: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${
        map[normalized]
      }`}
    >
      {normalized}
    </span>
  )
}