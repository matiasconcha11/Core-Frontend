"use client"

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, Wand2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MetricInsightPopup } from "./metric-insight-popup"

const metrics = [
  {
    title: "Miembros totales activos ",
    value: "202",
    change: "+2.1%",
    trend: "up",
    description: "Var. Mensual",
  },
  {
    title: "Tasa de retencion de miembros ",
    value: "92%",
    change: "+80.1%",
    trend: "up",
    description: "Var. Mensual",
  },
  {
    title: "Ganancia mensual",
    value: "12.345.678",
    change: "-10.5%",
    trend: "down",
    description: "Var. Mensual",
  },
  {
    title: "Tiempo de vida de tus clientes ",
    value: "12 meses",
    change: "+12.5%",
    trend: "up",
    description: "Promedio de asistencia",
  },
  {
    title: "Tasa de desercion",
    value: "3.2%",
    change: "+5.2%",
    trend: "up",
    description: "Var. Mensual",
  },
  {
    title: "Clientes en riesgo",
    value: "15",
    change: "-2.1%",
    trend: "down",
    description: "Inasistencia hace mas de 7 dias",
  },
]

export function MetricCards() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card key={index} className="flex flex-col bg-gray-50 dark:bg-gray-800/50">
          <CardHeader className="flex-grow flex flex-col justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
            <div className="text-3xl font-extrabold">{metric.value}</div>
          </CardHeader>
          <CardContent className="flex flex-col justify-between pt-2">
            <div className="flex items-center justify-between mb-2">
              <p
                className={`text-sm font-semibold flex items-center ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.trend === "up" ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                )}
                {metric.change}
              </p>
              <p className="text-xs font-medium text-gray-500">{metric.description}</p>
            </div>
            <Button
              size="sm"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
              onClick={() => setSelectedMetric(metric.title)}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Descubre
            </Button>
          </CardContent>
        </Card>
      ))}
      {selectedMetric && <MetricInsightPopup metric={selectedMetric} onClose={() => setSelectedMetric(null)} />}
    </div>
  )
}

