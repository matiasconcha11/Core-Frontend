"use client"

import { useState } from "react"
import { SchedulingCalendar } from "@/components/scheduling-calendar"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const getWeekDates = (startDate: Date) => {
  const dates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    dates.push(date)
  }
  return dates
}

export default function SchedulingPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(today.setDate(diff))
  })

  const weekDates = getWeekDates(currentWeekStart)

  const goToPreviousWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(newStart.getDate() - 7)
    setCurrentWeekStart(newStart)
  }

  const goToNextWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(newStart.getDate() + 7)
    setCurrentWeekStart(newStart)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto pt-16">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Horario Semanal</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {weekDates[0].toLocaleDateString("es-ES", { month: "long", day: "numeric" })} -
                {weekDates[6].toLocaleDateString("es-ES", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <Button variant="outline" size="icon" onClick={goToNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="h-[calc(100vh-10rem-4rem)]">
            <SchedulingCalendar weekDates={weekDates} />
          </div>
        </div>
      </div>
    </div>
  )
}


