import { X, Download, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface MetricInsightPopupProps {
  metric: string
  onClose: () => void
}

const data = [
  {
    name: "Current",
    value: 65,
  },
  {
    name: "Previous",
    value: 45,
  },
]

export function MetricInsightPopup({ metric, onClose }: MetricInsightPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-2">
              <Badge variant="secondary">Adquisicion</Badge>
              <Badge variant="destructive">Aviso</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-sm">
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-start gap-3">
                <span className="bg-green-100 text-green-700 text-base font-semibold px-2 py-1 rounded-md">+15%</span>
                <h3 className="text-xl font-semibold">
                  15% en aumento de membresias despues de la promocion de Black Friday
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Tu plan mas comprado fue el Plan Small Groups</p>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-2 mt-4">
              <Button className="bg-purple-600 hover:bg-purple-700">Descubre el Por que?</Button>
              <Button variant="outline">Ver acciones</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

