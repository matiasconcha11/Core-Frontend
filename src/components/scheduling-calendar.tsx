"use client"

import React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

interface TimeBlockInfoPopupProps {
  block: TimeBlock
  trainer: Trainer
  onClose: () => void
}

function TimeBlockInfoPopup({ block, trainer, onClose }: TimeBlockInfoPopupProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Time Block Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Class Type</Label>
            <div>{block.lessonType}</div>
          </div>
          <div>
            <Label>Trainer</Label>
            <div>{trainer.name}</div>
          </div>
          <div>
            <Label>Date and Time</Label>
            <div>
              {block.date} {block.startTime} - {block.endTime}
            </div>
          </div>
          <div>
            <Label>Member Count</Label>
            <div>
              {block.enrolledStudents} / {block.maxStudents}
            </div>
          </div>
          <div>
            <Label>Attending Members</Label>
            <div className="space-y-1">
              {mockUsers.slice(0, block.enrolledStudents).map((user, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

interface Trainer {
  id: string
  name: string
  role: string
  hoursPerWeek: number
  normalHours: number
  extraHours: number
  avatar: string
}

interface TimeBlock {
  id: string
  startTime: string
  endTime: string
  type: "SERVICIO" | "SERVICIO EXTRA"
  trainer: string
  date: string
  enrolledStudents?: number
  maxStudents?: number
  minStudents?: number
  lessonType: string
  deleted?: boolean
}

const trainers: Trainer[] = [
  {
    id: "1",
    name: "ANDRES FERNANDEZ",
    role: "SUPERVISION",
    hoursPerWeek: 44,
    normalHours: 37.5,
    extraHours: 0,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "JOSE SANCHEZ",
    role: "SERVICIO",
    hoursPerWeek: 44,
    normalHours: 36,
    extraHours: 8,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "PEDRO MORALES",
    role: "SERVICIO",
    hoursPerWeek: 30,
    normalHours: 28,
    extraHours: 4,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "MARIA LOPEZ",
    role: "SERVICIO",
    hoursPerWeek: 40,
    normalHours: 35,
    extraHours: 5,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "JUAN GARCIA",
    role: "SERVICIO",
    hoursPerWeek: 35,
    normalHours: 30,
    extraHours: 5,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    name: "ANA MARTINEZ",
    role: "SUPERVISION",
    hoursPerWeek: 45,
    normalHours: 40,
    extraHours: 5,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "7",
    name: "CARLOS RODRIGUEZ",
    role: "SERVICIO",
    hoursPerWeek: 38,
    normalHours: 35,
    extraHours: 3,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "8",
    name: "LAURA FERNANDEZ",
    role: "SERVICIO",
    hoursPerWeek: 42,
    normalHours: 38,
    extraHours: 4,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const mockUsers = [
  { name: "Ana Martinez", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Carlos Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Sofia Garcia", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Diego Lopez", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Laura Torres", avatar: "/placeholder.svg?height=32&width=32" },
]

const generateMockSchedule = (weekDates: Date[]): Record<string, TimeBlock[]> => {
  const schedule: Record<string, TimeBlock[]> = {}
  trainers.forEach((trainer) => {
    schedule[trainer.id] = []
    weekDates.forEach((date) => {
      const numBlocks = Math.floor(Math.random() * 5) + 1 // 1 to 5 blocks per day
      for (let i = 0; i < numBlocks; i++) {
        const startHour = Math.floor(Math.random() * 12) + 8 // 8 AM to 7 PM
        const duration = Math.floor(Math.random() * 3) + 1 // 1 to 3 hours
        schedule[trainer.id].push({
          id: `${trainer.id}-${date.toISOString()}-${i}`,
          startTime: `${startHour.toString().padStart(2, "0")}:00`,
          endTime: `${(startHour + duration).toString().padStart(2, "0")}:00`,
          type: Math.random() > 0.2 ? "SERVICIO" : "SERVICIO EXTRA",
          trainer: trainer.id,
          date: date.toISOString().split("T")[0],
          enrolledStudents: Math.floor(Math.random() * 6) + 1,
          maxStudents: 6,
          lessonType: "GRUPOS_GRANDES", //Adding a default lesson type
        })
      }
    })
  })
  return schedule
}

interface EditBlockPopupProps {
  block: TimeBlock
  trainer: Trainer
  onClose: () => void
  onSave: (updatedBlock: TimeBlock) => void
}

function EditBlockPopup({ block, trainer, onClose, onSave }: EditBlockPopupProps) {
  const [startTime, setStartTime] = useState(block.startTime)
  const [endTime, setEndTime] = useState(block.endTime)
  const [type, setType] = useState(block.type)

  const handleSave = () => {
    onSave({
      ...block,
      startTime,
      endTime,
      type,
    })
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Turno</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Fecha</Label>
            <Input type="date" value={block.date} disabled />
          </div>
          <div>
            <Label>Rol</Label>
            <Select value={type} onValueChange={(value: "SERVICIO" | "SERVICIO EXTRA") => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SERVICIO">SERVICIO</SelectItem>
                <SelectItem value="SERVICIO EXTRA">SERVICIO EXTRA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Hora Inicio</Label>
              <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div>
              <Label>Hora Fin</Label>
              <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Empleado</Label>
            <Input value={trainer.name} disabled />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Are you sure you want to delete this time block?")) {
                onSave({ ...block, deleted: true })
                onClose()
              }
            }}
          >
            Delete
          </Button>
          <div>
            <Button variant="outline" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface AddTimeBlockPopupProps {
  isOpen: boolean
  onClose: () => void
  onAddTimeBlock: (newTimeBlock: TimeBlock) => void
  trainers: Trainer[]
  lessonTypes: { id: string; name: string }[]
  date: string
  time: string
  setDate: (date: string) => void
}

function AddTimeBlockPopup({
  isOpen,
  onClose,
  onAddTimeBlock,
  trainers,
  lessonTypes,
  date,
  time,
  setDate,
}: AddTimeBlockPopupProps) {
  const [startTime, setStartTime] = useState(time)
  const [endTime, setEndTime] = useState("")
  const [selectedTrainer, setSelectedTrainer] = useState("")
  const [minMembers, setMinMembers] = useState(1)
  const [maxMembers, setMaxMembers] = useState(6)
  const [lessonType, setLessonType] = useState("")
  const [shiftType, setShiftType] = useState<"SERVICIO" | "SERVICIO EXTRA">("SERVICIO")

  const handleAddTimeBlock = () => {
    const newTimeBlock: TimeBlock = {
      id: `new-${Date.now()}`,
      startTime,
      endTime,
      type: shiftType,
      trainer: selectedTrainer,
      date,
      enrolledStudents: 0,
      maxStudents: maxMembers,
      minStudents: minMembers,
      lessonType,
    }
    onAddTimeBlock(newTimeBlock)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar bloque de tiempo</DialogTitle>
          <DialogDescription>Ingrese los detalles para el nuevo bloque de tiempo.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Fecha
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Hora de inicio
            </Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">
              Hora de fin
            </Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="trainer" className="text-right">
              Entrenador
            </Label>
            <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar entrenador" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minMembers" className="text-right">
              Mín. miembros
            </Label>
            <Input
              id="minMembers"
              type="number"
              value={minMembers}
              onChange={(e) => setMinMembers(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxMembers" className="text-right">
              Máx. miembros
            </Label>
            <Input
              id="maxMembers"
              type="number"
              value={maxMembers}
              onChange={(e) => setMaxMembers(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lessonType" className="text-right">
              Tipo de clase
            </Label>
            <Select value={lessonType} onValueChange={setLessonType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar tipo de clase" />
              </SelectTrigger>
              <SelectContent>
                {lessonTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shiftType" className="text-right">
              Tipo de turno
            </Label>
            <Select value={shiftType} onValueChange={(value: "SERVICIO" | "SERVICIO EXTRA") => setShiftType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar tipo de turno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SERVICIO">Normal</SelectItem>
                <SelectItem value="SERVICIO EXTRA">Extra</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddTimeBlock}>Agregar bloque de tiempo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface SchedulingCalendarProps {
  weekDates: Date[]
}

export function SchedulingCalendar({ weekDates }: SchedulingCalendarProps) {
  const [selectedBlock, setSelectedBlock] = useState<{ block: TimeBlock; trainer: Trainer } | null>(null)
  const [showAddTimeBlockPopup, setShowAddTimeBlockPopup] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<Record<string, TimeBlock[]>>({})
  const [selectedTrainer, setSelectedTrainer] = useState<string | "all">("all")
  const [selectedClassType, setSelectedClassType] = useState<string>("all")
  const [selectedTime, setSelectedTime] = useState<string>("08:00")
  const [selectedTimeBlock, setSelectedTimeBlock] = useState<{ block: TimeBlock; trainer: Trainer } | null>(null)
  const [trainerHours, setTrainerHours] = useState<Record<string, { normal: number; extra: number }>>({})

  useEffect(() => {
    const initialSchedule = generateMockSchedule(weekDates)
    setSchedule(initialSchedule)
    updateTrainerHours(initialSchedule)
  }, [weekDates])

  const updateTrainerHours = (currentSchedule: Record<string, TimeBlock[]>) => {
    const hours: Record<string, { normal: number; extra: number }> = {}
    Object.entries(currentSchedule).forEach(([trainerId, blocks]) => {
      hours[trainerId] = { normal: 0, extra: 0 }
      blocks.forEach((block) => {
        const duration = calculateDuration(block.startTime, block.endTime)
        if (block.type === "SERVICIO") {
          hours[trainerId].normal += duration
        } else {
          hours[trainerId].extra += duration
        }
      })
    })
    setTrainerHours(hours)
  }

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`1970-01-01T${startTime}:00`)
    const end = new Date(`1970-01-01T${endTime}:00`)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60) // Duration in hours
  }

  const handleSaveBlock = (updatedBlock: TimeBlock) => {
    setSchedule((prevSchedule) => {
      const updatedSchedule = { ...prevSchedule }
      const trainerBlocks = updatedSchedule[updatedBlock.trainer]
      if (updatedBlock.deleted) {
        updatedSchedule[updatedBlock.trainer] = trainerBlocks.filter((block) => block.id !== updatedBlock.id)
      } else {
        const blockIndex = trainerBlocks.findIndex((block) => block.id === updatedBlock.id)
        if (blockIndex !== -1) {
          trainerBlocks[blockIndex] = updatedBlock
        }
      }
      updateTrainerHours(updatedSchedule)
      return updatedSchedule
    })
  }

  const handleAddTimeBlock = (newTimeBlock: TimeBlock) => {
    setSchedule((prevSchedule) => {
      const updatedSchedule = { ...prevSchedule }
      if (!updatedSchedule[newTimeBlock.trainer]) {
        updatedSchedule[newTimeBlock.trainer] = []
      }
      updatedSchedule[newTimeBlock.trainer].push(newTimeBlock)
      updateTrainerHours(updatedSchedule)
      return updatedSchedule
    })
  }

  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8 // Start from 8 AM
    return `${hour.toString().padStart(2, "0")}:00`
  })

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesTrainer = selectedTrainer === "all" || trainer.id === selectedTrainer
    if (!matchesTrainer) return false

    if (selectedClassType !== "all") {
      const trainerBlocks = schedule[trainer.id] || []
      return trainerBlocks.some((block) => block.lessonType === selectedClassType)
    }
    return true
  })

  const calculateBookingsForTimeBlock = (blocks: TimeBlock[], date: string, time: string) => {
    return blocks.filter((block) => block.date === date && block.startTime === time)
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedDate(weekDates[0].toISOString().split("T")[0])
              setSelectedTime("08:00")
              setShowAddTimeBlockPopup(true)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar bloque de tiempo
          </Button>
          <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar entrenador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los entrenadores</SelectItem>
              {trainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedClassType} onValueChange={setSelectedClassType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tipo de clase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="GRUPOS_GRANDES">Grupos Grandes</SelectItem>
              <SelectItem value="GRUPOS_PEQUENOS">Grupos Pequeños</SelectItem>
              <SelectItem value="CLASES_INDIVIDUALES">Clases Individuales</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-4 overflow-hidden flex-grow flex flex-col h-[calc(100vh-8rem)]">
          <div className="grid grid-cols-[auto,repeat(7,minmax(150px,1fr))] gap-1 h-full overflow-y-auto">
            <div className="sticky left-0 z-10 bg-background w-10"></div>
            {weekDates.map((date, dayIndex) => (
              <div key={date.toISOString()} className="min-w-[150px]">
                <div className="h-10 flex items-center justify-center font-semibold border-b sticky top-0 bg-background z-10">
                  {date.toLocaleDateString("es-ES", { weekday: "short", month: "short", day: "numeric" })}
                </div>
                {timeSlots.map((time, timeIndex) => {
                  const bookingsInTimeBlock = filteredTrainers.flatMap((trainer) => {
                    const trainerBlocks = schedule[trainer.id] || []
                    return calculateBookingsForTimeBlock(trainerBlocks, date.toISOString().split("T")[0], time).map(
                      (block) => ({ block, trainer }),
                    )
                  })
                  const blockHeight = Math.max(48, bookingsInTimeBlock.length * 48)
                  return (
                    <div
                      key={`${date.toISOString()}-${time}`}
                      className="border-b border-r relative"
                      style={{ height: `${blockHeight}px` }}
                    >
                      {bookingsInTimeBlock.map(({ block, trainer }, index) => (
                        <div
                          key={block.id}
                          className={`absolute left-0 right-0 ${
                            block.type === "SERVICIO" ? "bg-green-100" : "bg-orange-100"
                          } border rounded-md p-1 overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:z-10 hover:shadow-lg`}
                          style={{
                            top: `${index * 48}px`,
                            height: "48px",
                          }}
                          onClick={() => setSelectedTimeBlock({ block, trainer })}
                        >
                          <div className="flex flex-col justify-between h-full">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium truncate">{trainer.name}</span>
                              <span className="text-xs truncate">
                                {block.startTime}-{block.endTime}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs truncate">{block.lessonType}</span>
                              <div className="flex items-center space-x-1">
                                <span className="text-xs bg-white bg-opacity-50 px-1 rounded">
                                  {block.enrolledStudents || 0}/{block.maxStudents || 6}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-0 h-4 w-4"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedBlock({ block, trainer })
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-2">
          <h3 className="text-xl font-bold mb-2">Trainer Profiles</h3>
          <ScrollArea className="h-40">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
              {trainers.map((trainer) => (
                <Card key={trainer.id} className="p-2">
                  <CardHeader className="p-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={trainer.avatar} alt={trainer.name} />
                        <AvatarFallback>{trainer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm">{trainer.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{trainer.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2">
                    <div className="space-y-1 text-xs">
                      <p>Hours/week: {trainer.hoursPerWeek}</p>
                      <p>Normal: {trainerHours[trainer.id]?.normal.toFixed(2) || 0}</p>
                      <p>Extra: {trainerHours[trainer.id]?.extra.toFixed(2) || 0}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {selectedBlock && (
          <EditBlockPopup
            block={selectedBlock.block}
            trainer={selectedBlock.trainer}
            onClose={() => setSelectedBlock(null)}
            onSave={handleSaveBlock}
          />
        )}
        <AddTimeBlockPopup
          isOpen={showAddTimeBlockPopup}
          onClose={() => setShowAddTimeBlockPopup(false)}
          onAddTimeBlock={handleAddTimeBlock}
          trainers={trainers}
          lessonTypes={[
            { id: "GRUPOS_GRANDES", name: "Grupos Grandes" },
            { id: "GRUPOS_PEQUENOS", name: "Grupos Pequeños" },
            { id: "CLASES_INDIVIDUALES", name: "Clases Individuales" },
          ]}
          date={selectedDate || weekDates[0].toISOString().split("T")[0]}
          setDate={setSelectedDate}
          time={selectedTime}
        />
        {selectedTimeBlock && (
          <TimeBlockInfoPopup
            block={selectedTimeBlock.block}
            trainer={selectedTimeBlock.trainer}
            onClose={() => setSelectedTimeBlock(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

