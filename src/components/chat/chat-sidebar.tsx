"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

const users = [
  {
    id: "1",
    name: "Ana García",
    email: "ana@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Me interesa el plan premium",
    lastActive: "hace 5 min",
    tags: ["big-groups", "trial-user"],
    plan: "Premium",
    phone: "+56 9 1234 5678",
    joinDate: "2024-02-15",
    interests: ["Yoga", "Cardio"],
    status: "pending",
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "¿Cuál es el horario de clases?",
    lastActive: "hace 15 min",
    tags: ["small-groups"],
    plan: "Básico",
    phone: "+56 9 8765 4321",
    joinDate: "2024-02-10",
    interests: ["Musculación"],
    status: "confirmed",
  },
  {
    id: "3",
    name: "María López",
    email: "maria@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Necesito cambiar mi horario",
    lastActive: "hace 30 min",
    tags: ["big-groups", "inactive-member"],
    plan: "Premium",
    phone: "+56 9 9876 5432",
    joinDate: "2024-02-01",
    interests: ["Pilates", "Yoga"],
    status: "reschedule",
  },
  {
    id: "4",
    name: "Juan Pérez",
    email: "juan@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    lastMessage: "Tengo un problema con el pago",
    lastActive: "hace 1 hora",
    tags: ["small-groups", "trial-user"],
    plan: "Básico",
    phone: "+56 9 8765 4321",
    joinDate: "2024-02-05",
    interests: ["Crossfit"],
    status: "takeover",
  },
]

interface ChatSidebarProps {
  onSelectUser: (user: any) => void
}

export function ChatSidebar({ onSelectUser }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag === "all" || user.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "big-groups":
        return "bg-blue-500 text-white"
      case "small-groups":
        return "bg-green-500 text-white"
      case "trial-user":
        return "bg-purple-500 text-white"
      case "inactive-member":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="w-80 border-r bg-background flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar prospectos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por etiqueta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las etiquetas</SelectItem>
            <SelectItem value="big-groups">Grupos Grandes</SelectItem>
            <SelectItem value="small-groups">Grupos Pequeños</SelectItem>
            <SelectItem value="trial-user">Usuario de Prueba</SelectItem>
            <SelectItem value="inactive-member">Miembro Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Pending Booking */}
          <Collapsible defaultOpen className="space-y-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Agendamiento Pendiente</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full px-2 py-0.5">
                  {filteredUsers.filter((user) => user.status === "pending").length}
                </Badge>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {filteredUsers
                .filter((user) => user.status === "pending")
                .map((user) => (
                  <Button
                    key={user.id}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto hover:bg-muted"
                    onClick={() => onSelectUser(user)}
                  >
                    <div className="flex gap-3 w-full">
                      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                        <div className="flex gap-1 mt-1">
                          {user.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className={`${getTagColor(tag)} text-xs`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Confirmed Booking */}
          <Collapsible defaultOpen className="space-y-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Agendamiento Confirmado</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full px-2 py-0.5">
                  {filteredUsers.filter((user) => user.status === "confirmed").length}
                </Badge>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {filteredUsers
                .filter((user) => user.status === "confirmed")
                .map((user) => (
                  <Button
                    key={user.id}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto hover:bg-muted"
                    onClick={() => onSelectUser(user)}
                  >
                    <div className="flex gap-3 w-full">
                      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                        <div className="flex gap-1 mt-1">
                          {user.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className={`${getTagColor(tag)} text-xs`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Reschedule Requested */}
          <Collapsible defaultOpen className="space-y-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Re-Agendamiento</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full px-2 py-0.5">
                  {filteredUsers.filter((user) => user.status === "reschedule").length}
                </Badge>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {filteredUsers
                .filter((user) => user.status === "reschedule")
                .map((user) => (
                  <Button
                    key={user.id}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto hover:bg-muted"
                    onClick={() => onSelectUser(user)}
                  >
                    <div className="flex gap-3 w-full">
                      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                        <div className="flex gap-1 mt-1">
                          {user.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className={`${getTagColor(tag)} text-xs`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Manual Takeover Needed */}
          <Collapsible defaultOpen className="space-y-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Chat Manual</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full px-2 py-0.5">
                  {filteredUsers.filter((user) => user.status === "takeover").length}
                </Badge>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {filteredUsers
                .filter((user) => user.status === "takeover")
                .map((user) => (
                  <Button
                    key={user.id}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto hover:bg-muted"
                    onClick={() => onSelectUser(user)}
                  >
                    <div className="flex gap-3 w-full">
                      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                        <div className="flex gap-1 mt-1">
                          {user.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className={`${getTagColor(tag)} text-xs`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </div>
  )
}

