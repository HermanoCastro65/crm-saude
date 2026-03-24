import { Home, Users, Kanban } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-blue-600 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-8">
        CRM Saúde
      </h1>

      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-500"
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          href="/leads"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-500"
        >
          <Users size={18} />
          Leads
        </Link>

        <Link
          href="/pipeline"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-500"
        >
          <Kanban size={18} />
          Pipeline
        </Link>
      </nav>
    </aside>
  )
}