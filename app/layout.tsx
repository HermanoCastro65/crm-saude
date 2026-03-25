import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-background`}>
        {children}
      </body>
    </html>
  )
}