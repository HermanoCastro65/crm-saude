"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { leads } from "@/mocks/leads"
import Link from "next/link"
import { Eye, Pencil } from "lucide-react"
import { StatusBadge } from "@/components/leads/StatusBadge"

export default function LeadsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Todos os Leads</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie todos os leads
            </p>
          </div>
        </div>

        <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Contato</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Origem</th>
                <th className="text-left p-4">Plano</th>
                <th className="text-left p-4">Vidas</th>
                <th className="text-left p-4">Localidade</th>
                <th className="text-left p-4">Próx. Contato</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t hover:bg-muted/50 transition"
                >
                  <td className="p-4 font-medium">
                    {lead.nome}
                  </td>

                  <td className="p-4">{lead.telefone}</td>

                  <td className="p-4">
                    {lead.email || "-"}
                  </td>

                  <td className="p-4">{lead.origem}</td>

                  <td className="p-4">
                    {lead.ficha.tipoPlano}
                  </td>

                  <td className="p-4">
                    {lead.ficha.quantidadeVidas}
                  </td>

                  <td className="p-4">
                    {lead.ficha.localidade}
                  </td>

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
                      href={`/leads/${lead.id}`}
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
      </div>
    </AppLayout>
  )
}