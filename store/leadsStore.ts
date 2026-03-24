"use client"

import { Lead } from "@/types/lead"
import { create } from "zustand"

type LeadsState = {
  leads: Lead[]
  setLeads: (leads: Lead[]) => void
  updateLead: (lead: Lead) => void
  addLead: (lead: Lead) => void
}

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],

  setLeads: (leads) => set({ leads }),

  updateLead: (updatedLead) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead
      ),
    })),

  addLead: (lead) =>
    set((state) => ({
      leads: [...state.leads, lead],
    })),
}))