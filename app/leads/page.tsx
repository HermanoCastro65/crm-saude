"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import Link from "next/link"
import { Eye, Pencil } from "lucide-react"
import { StatusBadge } from "@/components/leads/StatusBadge"
import { useEffect } from "react"
import { useLeadsStore } from "@/store/leadsStore"

export default function LeadsPage() {
  const { leads = [], fetchLeads } = useLeadsStore()

  useEffect(() => {
    fetchLeads()
  }, [])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Todos os Leads</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie todos os leads
          </p>
        </div>

        <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Contato</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Origem</th>
                <th className="p-4 text-left">Plano</th>
                <th className="p-4 text-left">Vidas</th>
                <th className="p-4 text-left">Localidade</th>
                <th className="p-4 text-left">Próx. Contato</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-muted-foreground">
                    Nenhum lead encontrado
                  </td>
                </tr>
              )}

              {leads.map((lead) => {
                const ficha = lead.ficha || {}

                return (
                  <tr key={lead.id} className="border-t hover:bg-muted/50">
                    <td className="p-4 font-medium">{lead.nome}</td>
                    <td className="p-4">{lead.telefone}</td>
                    <td className="p-4">{lead.email || "-"}</td>
                    <td className="p-4">{lead.origem}</td>

                    <td className="p-4">{ficha.tipoPlano || "-"}</td>
                    <td className="p-4">{ficha.quantidadeVidas || "-"}</td>
                    <td className="p-4">{ficha.localidade || "-"}</td>

                    <td className="p-4">
                      {ficha.proximoContato ? (
                        <div>
                          <div className="font-medium">
                            {ficha.proximoContato.data}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {ficha.proximoContato.diaSemana}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>

                    <td className="p-4">
                      <StatusBadge status={lead.status} />
                    </td>

                    <td className="p-4 text-right space-x-3">
                      <Link href={`/leads/${lead.id}`}>
                        <Eye size={16} />
                      </Link>
                      <Link href={`/leads/${lead.id}/edit`}>
                        <Pencil size={16} />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}