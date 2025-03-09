"use client"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { SentimentDetailsPopup } from "./sentiment-details-popup"

const sentimentData = [
  {
    name: "Relacion precio-calidad",
    positive: 100,
    neutral: 75,
    negative: 75,
    total: 250,
    percentage: "25%",
  },
  {
    name: "Calidad de los entrenadores",
    positive: 80,
    neutral: 60,
    negative: 50,
    total: 190,
    percentage: "25%",
  },
  {
    name: "Ambiente de comunidad",
    positive: 70,
    neutral: 45,
    negative: 44,
    total: 159,
    percentage: "19%",
  },
  {
    name: "Variedad de clases",
    positive: 50,
    neutral: 40,
    negative: 33,
    total: 123,
    percentage: "19%",
  },
  {
    name: "Calidad de las maquinas",
    positive: 30,
    neutral: 22,
    negative: 20,
    total: 72,
    percentage: "19%",
  },
  {
    name: "Limpieza",
    positive: 25,
    neutral: 20,
    negative: 20,
    total: 65,
    percentage: "17%",
  },
]

export function SentimentAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleClosePopup = () => {
    setSelectedCategory(null)
  }

  return (
    <div className="h-full flex flex-col">
      <h4 className="text-lg font-semibold mb-4">Análisis de sentimiento </h4>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-sm">Positivo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="text-sm">Neutral</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm">Negativo</span>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sentimentData}
            layout="vertical"
            barGap={0}
            barSize={20}
            margin={{ top: 0, right: 80, bottom: 0, left: 100 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text x={0} y={0} dy={0} textAnchor="end" fill="#666" fontSize={12}>
                    {payload.value}
                  </text>
                </g>
              )}
              width={100}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white p-2 shadow-lg rounded-lg border text-sm">
                      <p className="font-medium">{data.name}</p>
                      <p>
                        Total: {data.total} respuestas ({data.percentage})
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="positive"
              stackId="a"
              fill="#22c55e"
              radius={[4, 0, 0, 4]}
              onClick={(data) => handleCategoryClick(data.name)}
              cursor="pointer"
            />
            <Bar
              dataKey="neutral"
              stackId="a"
              fill="#facc15"
              onClick={(data) => handleCategoryClick(data.name)}
              cursor="pointer"
            />
            <Bar
              dataKey="negative"
              stackId="a"
              fill="#ef4444"
              radius={[0, 4, 4, 0]}
              onClick={(data) => handleCategoryClick(data.name)}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Este análisis se basa en las reseñas y comentarios de los últimos 30 días.
      </p>
      {selectedCategory && <SentimentDetailsPopup category={selectedCategory} onClose={handleClosePopup} />}
    </div>
  )
}

