import { AppLayout } from "components/layout/AppLayout"

export default function Home() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          Leads hoje
        </div>

        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          Em negociação
        </div>

        <div className="bg-card p-4 rounded-2xl border shadow-sm">
          Fechados
        </div>
      </div>
    </AppLayout>
  )
}