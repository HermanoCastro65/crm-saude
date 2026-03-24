import { AppLayout } from "@/components/layout/AppLayout"

import { redirect } from "next/navigation"

export default function Home() {
  redirect("/leads")
}