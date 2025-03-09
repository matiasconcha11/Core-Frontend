import { X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface PlanRevenuePopupProps {
  planName: string
  onClose: () => void
}

// Sample data - replace with actual data in a real application
const generateMonthlyData = (baseRevenue: number) => {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  return months.map((month, index) => ({
    month,
    revenue: Math.floor(baseRevenue * (1 + (Math.random() - 0.5) * 0.2)),
    projection: Math.floor(baseRevenue * (1 + (index / 12) * 0.5)),
  }))
}

const planData = {
  Basico: generateMonthlyData(1200000),
  Pro: generateMonthlyData(5000000),
  Experto: generateMonthlyData(7500000),
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(value)

export function PlanRevenuePopup({ planName, onClose }: PlanRevenuePopupProps) {
  const data = planData[planName as keyof typeof planData]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ingresos Mensuales - Plan {planName}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888888" tick={{ fill: "#888888", fontSize: 12 }} />
                <YAxis
                  stroke="#888888"
                  tick={{ fill: "#888888", fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000000}M`}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), "Ingresos"]}
                  labelFormatter={(label) => `Mes: ${label}`}
                  contentStyle={{ backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Ingresos Reales"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="projection"
                  name="Proyección"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            Ingresos mensuales y proyección para el Plan {planName}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

