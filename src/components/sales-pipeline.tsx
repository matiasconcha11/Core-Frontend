"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { LeadChatPopup } from "./lead-chat-popup"

interface Lead {
  id: string
  name: string
  value: string
  status: "hot" | "warm" | "cold"
  stage: "lead" | "contact" | "proposal" | "won"
  lastContact: string
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Juan Pérez",
    value: "$1,200",
    status: "hot",
    stage: "lead",
    lastContact: "2 días atrás",
  },
  {
    id: "2",
    name: "María González",
    value: "$2,500",
    status: "warm",
    stage: "contact",
    lastContact: "1 día atrás",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    value: "$3,800",
    status: "hot",
    stage: "proposal",
    lastContact: "3 horas atrás",
  },
  {
    id: "4",
    name: "Ana Martínez",
    value: "$1,800",
    status: "cold",
    stage: "lead",
    lastContact: "5 días atrás",
  },
  {
    id: "5",
    name: "Roberto Silva",
    value: "$4,200",
    status: "hot",
    stage: "won",
    lastContact: "Hoy",
  },
]

const stages = [
  { id: "lead", name: "Leads", color: "bg-blue-100" },
  { id: "contact", name: "Contactados", color: "bg-yellow-100" },
  { id: "proposal", name: "Propuesta", color: "bg-purple-100" },
  { id: "won", name: "Ganados", color: "bg-green-100" },
]

export function SalesPipeline() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("leadId", leadId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault()
    const leadId = e.dataTransfer.getData("leadId")

    setLeads(leads.map((lead) => (lead.id === leadId ? { ...lead, stage: targetStage as Lead["stage"] } : lead)))
  }

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "hot":
        return "bg-red-500"
      case "warm":
        return "bg-yellow-500"
      case "cold":
        return "bg-blue-500"
    }
  }

  const filteredLeads = leads.filter((lead) => lead.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Pipeline de Ventas</h2>
          <Button size="sm" className="bg-green-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar leads..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="flex-1 min-w-[300px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className={`rounded-t-lg p-3 ${stage.color}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{stage.name}</h3>
                <Badge variant="secondary" className="bg-white/50">
                  {filteredLeads.filter((lead) => lead.stage === stage.id).length}
                </Badge>
              </div>
            </div>

            <div className="mt-2 space-y-2">
              {filteredLeads
                .filter((lead) => lead.stage === stage.id)
                .map((lead) => (
                  <Card
                    key={lead.id}
                    className="p-4 cursor-move hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(lead.status)}`} />
                          <h4 className="font-medium">{lead.name}</h4>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Último contacto: {lead.lastContact}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{lead.value}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>

      {selectedLead && <LeadChatPopup lead={selectedLead} onClose={() => setSelectedLead(null)} />}
    </div>
  )
}

