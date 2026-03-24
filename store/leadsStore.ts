"use client"

import { Lead } from "@/types/lead"
import { create } from "zustand"

type LeadsState = {
  leads: Lead[]
  fetchLeads: () => Promise<void>
  getLeadById: (id: string) => Promise<Lead | null>
  createLead: (lead: Lead) => Promise<void>
  updateLead: (lead: Lead) => Promise<void>
  deleteLead: (id: string) => Promise<void>
}

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],

  fetchLeads: async () => {
    const res = await fetch("/api/leads")
    const data = await res.json()
    set({ leads: data })
  },

  getLeadById: async (id) => {
    const res = await fetch(`/api/leads/${id}`)
    if (!res.ok) return null
    return res.json()
  },

  createLead: async (lead) => {
    const res = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(lead),
    })

    const newLead = await res.json()

    set((state) => ({
      leads: [newLead, ...state.leads],
    }))
  },

  updateLead: async (lead) => {
    const res = await fetch(`/api/leads/${lead.id}`, {
      method: "PUT",
      body: JSON.stringify(lead),
    })

    const updated = await res.json()

    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === updated.id ? updated : l
      ),
    }))
  },

  deleteLead: async (id) => {
    await fetch(`/api/leads/${id}`, {
      method: "DELETE",
    })

    set((state) => ({
      leads: state.leads.filter((l) => l.id !== id),
    }))
  },
}))