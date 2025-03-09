"use client"

import { useState } from "react"
import { Bell, X, Info, AlertTriangle, CreditCard, TrendingUp, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const notifications = [
  {
    id: 1,
    title: "Alta afluencia en horas peak",
    message:
      "El gimnasio ha estado al 90% de capacidad de 6-8 PM esta semana. Considera agregar más equipo o clases en ese horario",
    date: "2023-07-15",
    icon: Info,
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Feedback negativo detectado",
    message: "Se registraron 5 comentarios negativos sobre la limpieza. Revisa los reportes y actúa",
    date: "2023-07-14",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
  {
    id: 3,
    title: "Bajas en membresias",
    message: "5 clientes cancelaron su suscripción esta semana. Contacta a los clientes para obtener feedback",
    date: "2023-07-13",
    icon: CreditCard,
    color: "text-red-500",
  },
  {
    id: 4,
    title: "Interaccion con promociones",
    message: "El 40% de los clientes han mostrado interés en el nuevo plan de entrenamiento personalizado.",
    date: "2023-07-12",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    id: 5,
    title: "Nuevas inscripciones",
    message: "🚀 20 nuevos miembros este mes. ¡Buen trabajo! ¿Quieres enviarles un email de bienvenida?",
    date: "2023-07-11",
    icon: Gift,
    color: "text-purple-500",
  },
]

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-96 z-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close notifications">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className="mb-4 last:mb-0 border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`${notification.color} p-2 rounded-full bg-opacity-10`}>
                        <notification.icon className={`h-5 w-5 ${notification.color}`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

