"use client"

import { useState } from "react"
import { Plus, Users, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LessonType {
  id: string
  name: string
  description: string
  minUsers: number
  maxUsers: number
  duration: number
  trainers: string[]
  subscribers: User[]
}

interface User {
  id: string
  name: string
  avatar: string
}

const initialLessonTypes: LessonType[] = [
  {
    id: "1",
    name: "Grupos Grandes",
    description: "Clases para más de 10 personas",
    minUsers: 10,
    maxUsers: 20,
    duration: 60,
    trainers: ["1", "2"],
    subscribers: [
      { id: "1", name: "Ana García", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "2", name: "Carlos Rodríguez", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Elena Martínez", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "2",
    name: "Grupos Pequeños",
    description: "Clases para 5-10 personas",
    minUsers: 5,
    maxUsers: 10,
    duration: 45,
    trainers: ["3"],
    subscribers: [
      { id: "4", name: "David López", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Isabel Fernández", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "3",
    name: "Clases Individuales",
    description: "Sesiones uno a uno",
    minUsers: 1,
    maxUsers: 1,
    duration: 30,
    trainers: ["1"],
    subscribers: [{ id: "6", name: "Javier Sánchez", avatar: "/placeholder.svg?height=32&width=32" }],
  },
]

const trainers = [
  { id: "1", name: "Juan Pérez" },
  { id: "2", name: "María González" },
  { id: "3", name: "Carlos Rodríguez" },
  { id: "4", name: "Ana Martínez" },
  { id: "5", name: "Luis Sánchez" },
]

export function OrganizationSettings() {
  const [lessonTypes, setLessonTypes] = useState<LessonType[]>(initialLessonTypes)
  const [newLessonType, setNewLessonType] = useState<Partial<LessonType>>({ trainers: [] })

  const handleAddLessonType = () => {
    if (
      newLessonType.name &&
      newLessonType.description &&
      newLessonType.minUsers &&
      newLessonType.maxUsers &&
      newLessonType.duration &&
      newLessonType.trainers
    ) {
      setLessonTypes([
        ...lessonTypes,
        {
          ...newLessonType,
          id: Date.now().toString(),
          subscribers: [],
        } as LessonType,
      ])
      setNewLessonType({ trainers: [] })
    }
  }

  const handleDeleteLessonType = (id: string) => {
    setLessonTypes(lessonTypes.filter((lt) => lt.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Clases</CardTitle>
          <CardDescription>Gestiona los tipos de clases ofrecidos en tu gimnasio</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessonTypes.map((lessonType) => (
            <Card key={lessonType.id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{lessonType.name}</CardTitle>
                <CardDescription>{lessonType.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {lessonType.minUsers}-{lessonType.maxUsers} usuarios
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">Duración: {lessonType.duration} minutos</div>
                  <div className="text-sm text-muted-foreground">Entrenadores: {lessonType.trainers.length}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteLessonType(lessonType.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Nuevo Tipo de Clase
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Tipo de Clase</DialogTitle>
                <DialogDescription>
                  Ingresa los detalles del nuevo tipo de clase. Haz clic en guardar cuando hayas terminado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    value={newLessonType.name || ""}
                    onChange={(e) => setNewLessonType({ ...newLessonType, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descripción
                  </Label>
                  <Input
                    id="description"
                    value={newLessonType.description || ""}
                    onChange={(e) => setNewLessonType({ ...newLessonType, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="minUsers" className="text-right">
                    Min Usuarios
                  </Label>
                  <Input
                    id="minUsers"
                    type="number"
                    value={newLessonType.minUsers || ""}
                    onChange={(e) => setNewLessonType({ ...newLessonType, minUsers: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxUsers" className="text-right">
                    Max Usuarios
                  </Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    value={newLessonType.maxUsers || ""}
                    onChange={(e) => setNewLessonType({ ...newLessonType, maxUsers: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duración (min)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newLessonType.duration || ""}
                    onChange={(e) => setNewLessonType({ ...newLessonType, duration: Number(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trainers" className="text-right">
                    Entrenadores
                  </Label>
                  <div className="col-span-3">
                    <Select
                      id="trainers"
                      onValueChange={(value) => {
                        const updatedTrainers = newLessonType.trainers?.includes(value)
                          ? newLessonType.trainers.filter((id) => id !== value)
                          : [...(newLessonType.trainers || []), value]
                        setNewLessonType({ ...newLessonType, trainers: updatedTrainers })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar entrenadores" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainers.map((trainer) => (
                          <SelectItem key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {newLessonType.trainers && newLessonType.trainers.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Entrenadores seleccionados:</p>
                        <div className="flex flex-wrap gap-2">
                          {newLessonType.trainers.map((trainerId) => {
                            const trainer = trainers.find((t) => t.id === trainerId)
                            return trainer ? (
                              <div
                                key={trainer.id}
                                className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center"
                              >
                                {trainer.name}
                                <button
                                  className="ml-2 text-secondary-foreground/50 hover:text-secondary-foreground"
                                  onClick={() =>
                                    setNewLessonType({
                                      ...newLessonType,
                                      trainers: newLessonType.trainers?.filter((id) => id !== trainer.id) || [],
                                    })
                                  }
                                >
                                  ×
                                </button>
                              </div>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddLessonType}>
                  Guardar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

