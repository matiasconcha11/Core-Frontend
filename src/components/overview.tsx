"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Ene", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Abr", total: 2400 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 3200 },
  { name: "Jul", total: 3800 },
]

export function Overview() {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null)

  const currentMonth = data[data.length - 1]
  const lastMonth = data[data.length - 2]
  const percentageChange = ((currentMonth.total - lastMonth.total) / lastMonth.total) * 100

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Ganancia mensual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${currentMonth.total.toLocaleString()}</div>
        <div className="text-xs text-green-500">+{percentageChange.toFixed(2)}% vs mes anterior</div>
        <div className="h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
              onMouseMove={(props) => {
                if (props.activeTooltipIndex !== undefined) {
                  setHoveredMonth(props.activeTooltipIndex)
                }
              }}
              onMouseLeave={() => setHoveredMonth(null)}
            >
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Mes</span>
                            <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Ganancia</span>
                            <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: "#8884d8", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          {hoveredMonth !== null && (
            <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-muted-foreground bg-white bg-opacity-75 py-1">
              {data[hoveredMonth].name}: ${data[hoveredMonth].total.toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

