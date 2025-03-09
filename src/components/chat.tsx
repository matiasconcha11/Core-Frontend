"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Chat() {
  const [messages, setMessages] = useState([{ text: "Hola, bienvenido al chat!", sender: "bot" }])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh - 20rem)]">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

