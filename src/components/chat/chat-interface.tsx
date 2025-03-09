"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "prospect"
  timestamp: Date
}

interface ChatInterfaceProps {
  selectedUser: any
}

export function ChatInterface({ selectedUser }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedUser) {
      // Simulate loading chat history
      setMessages([
        {
          id: "1",
          content: "¡Hola! Me interesa unirme al gimnasio",
          sender: "prospect",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
        },
        {
          id: "2",
          content: "¡Bienvenido! ¿Qué tipo de membresía te interesa?",
          sender: "user",
          timestamp: new Date(Date.now() - 1000 * 60 * 4),
        },
      ])
    }
  }, [selectedUser])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Selecciona un prospecto para comenzar el chat
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-blue-100"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <Button type="button" variant="ghost" size="icon" className="shrink-0">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1"
        />
        <Button type="button" variant="ghost" size="icon" className="shrink-0">
          <Smile className="h-5 w-5" />
        </Button>
        <Button type="submit" size="icon" className="shrink-0">
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}

