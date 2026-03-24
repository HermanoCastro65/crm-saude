import { LeadStatus } from "types/lead"

export function StatusBadge({ status }: { status: LeadStatus }) {
  const map = {
    Novo: "bg-gray-200 text-gray-800",
    Contato: "bg-blue-100 text-blue-700",
    Cotação: "bg-yellow-100 text-yellow-700",
    Fechado: "bg-green-100 text-green-700",
    Perdido: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${map[status]}`}
    >
      {status}
    </span>
  )
}