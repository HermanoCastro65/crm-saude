"use client"

import { Lead } from "@/types/lead"
import { StatusBadge } from "./StatusBadge"
import { Eye, Pencil } from "lucide-react"
import Link from "next/link"

export function LeadTable({ data }: { data: Lead[] }) {
  return (
    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="text-left p-4">Nome</th>
            <th className="text-left p-4">Origem</th>
            <th className="text-left p-4">Plano</th>
            <th className="text-left p-4">Vidas</th>
            <th className="text-left p-4">Próx. Contato</th>
            <th className="text-left p-4">Status</th>
            <th className="text-right p-4">Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map((lead) => (
            <tr
              key={lead.id}
              className="border-t hover:bg-muted/50 transition"
            >
              <td className="p-4 font-medium">
                {lead.nome}
                <div className="text-xs text-muted-foreground">
                  {lead.telefone}
                </div>
              </td>

              <td className="p-4">{lead.origem}</td>

              <td className="p-4">{lead.ficha.tipoPlano}</td>

              <td className="p-4">{lead.ficha.quantidadeVidas}</td>

              <td className="p-4">
                {lead.ficha.proximoContato ? (
                  <div>
                    <div className="font-medium">
                      {lead.ficha.proximoContato.data}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lead.ficha.proximoContato.diaSemana}
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-xs">
                    —
                  </span>
                )}
              </td>

              <td className="p-4">
                <StatusBadge status={lead.status} />
              </td>

              <td className="p-4 text-right space-x-3">
                <Link
                  href={`/leads/${lead.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Eye size={16} />
                  Ver
                </Link>

                <Link
                  href={`/leads/${lead.id}/edit`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:underline"
                >
                  <Pencil size={16} />
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}