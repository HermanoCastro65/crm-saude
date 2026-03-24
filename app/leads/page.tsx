"use client"

import { AppLayout } from "components/layout/AppLayout"
import { leads } from "mocks/leads"
import { LeadTable } from "components/leads/LeadTable"

export default function LeadsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Leads</h1>
            <p className="text-muted-foreground">
              Gerencie seus clientes e oportunidades
            </p>
          </div>
        </div>

        <LeadTable data={leads} />
      </div>
    </AppLayout>
  )
}