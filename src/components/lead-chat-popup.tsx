"use client"

import { useState } from "react"
import { X, Send, Paperclip, Smile, Mic, Phone } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface LeadChatPopupProps {
  lead: {
    id: string
    name: string
    value: string
    status: "hot" | "warm" | "cold"
    stage: "lead" | "contact" | "proposal" | "won"
    lastContact: string
  }
  onClose: () => void
}

// Helper function to group messages by date
const groupMessagesByDate = (messages: any[]) => {
  const groups: { [key: string]: any[] } = {}
  messages.forEach((message) => {
    const date = new Date(message.timestamp).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
  })
  return groups
}

export function LeadChatPopup({ lead, onClose }: LeadChatPopupProps) {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "lead"; timestamp: string }[]>([
    {
      text: "Este lead esta siendo manejado por el chat bot de IA.",
      sender: "system",
      timestamp: "2024-02-15T09:00:00",
    },
    {
      text: "Hola, estoy interesado en saber mas informacion sobre los planes!",
      sender: "lead",
      timestamp: "2024-02-15T09:05:00",
    },
    {
      text: "Hola, si tenemos tres opciones de memebresia. Nuestro plan mas popular es big groups a CLP 89.999 al mes que incluye acceso a todo el centro.",
      sender: "user",
      timestamp: "2024-02-15T09:07:00",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          text: newMessage,
          sender: "user",
          timestamp: new Date().toISOString(),
        },
      ])
      setNewMessage("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "bg-red-500"
      case "warm":
        return "bg-yellow-500"
      case "cold":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const groupedMessages = groupMessagesByDate(messages)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="border-b p-4 space-y-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{lead.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{lead.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>+56 9 8765 4321</span>
                  <Badge variant="secondary" className={`${getStatusColor(lead.status)} text-white`}>
                    {lead.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow overflow-hidden p-4">
          <ScrollArea className="h-full pr-4">
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date} className="space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted" />
                  </div>
                  <div className="relative bg-background px-2 text-sm text-muted-foreground">
                    {new Date(date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {dateMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {message.sender === "system" ? (
                      <div className="w-full max-w-[85%] rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                        {message.text}
                      </div>
                    ) : (
                      <div className={`max-w-[85%] space-y-1`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground px-2">
                          {new Date(message.timestamp).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex w-full items-center gap-2"
          >
            <Button type="button" variant="ghost" size="icon" className="shrink-0">
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="button" variant="ghost" size="icon" className="shrink-0">
              <Mic className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button type="submit" size="icon" className="shrink-0">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

