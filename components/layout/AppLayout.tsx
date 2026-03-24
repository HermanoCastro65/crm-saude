import { Sidebar } from "./Sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 bg-background">
        {children}
      </main>
    </div>
  )
}