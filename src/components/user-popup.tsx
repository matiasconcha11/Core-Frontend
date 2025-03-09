import { X, Calendar, Dumbbell, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

interface UserPopupProps {
  user: {
    name: string
    plan: string
    amount: string
    avatar: string
  }
  onClose: () => void
}

const monthlyActivity = [
  { month: "Enero", weeks: [3, 4, 5, 4] },
  { month: "Febrero", weeks: [5, 3, 4, 5] },
  { month: "Marzo", weeks: [4, 5, 6, 5] },
]

const milestones = [
  { title: "Primer Entrenamiento", completed: true },
  { title: "3 Dias consecutivos", completed: true },
  { title: "Perder 5 kilos de peso", completed: false },
  { title: "Levantar 100kgs en Press banca en Marzo", completed: true },
]

const characteristicsData = [
  { characteristic: "Fuerza", value: 80 },
  { characteristic: "Resistencia", value: 65 },
  { characteristic: "Flexibilidad", value: 70 },
  { characteristic: "Velocidad", value: 60 },
  { characteristic: "Equilibrio", value: 75 },
  { characteristic: "Coordinación", value: 85 },
]

export function UserPopup({ user, onClose }: UserPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
          <div className="col-span-1 space-y-4">
            <Card className="h-[calc(50%-0.5rem)] overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Nombre:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Plan:</span>
                    <span>{user.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Último Pago:</span>
                    <span>{user.amount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-[calc(50%-0.5rem)] overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                <CardTitle className="flex items-center">
                  <Target className="mr-2" />
                  Metas de Fitness
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Perder 5 kilos</span>
                  </li>
                  <li className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Mejorar la salud cardiovascular</span>
                  </li>
                  <li className="flex items-center">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>Aumentar la masa muscular en un 5%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-1 md:col-span-2 h-full overflow-auto">
            <CardHeader>
              <CardTitle>Seguimiento del progreso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={characteristicsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="characteristic" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Características" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Hitos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-md ${
                        milestone.completed ? "bg-green-100 border-green-500" : "bg-gray-100 border-gray-300"
                      } border`}
                    >
                      <p className="text-sm font-medium">{milestone.title}</p>
                      <p className="text-xs text-gray-600">{milestone.completed ? "Completado" : "En Progreso"}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Actividad Mensual</h3>
                <div className="space-y-4">
                  {monthlyActivity.map((month, monthIndex) => (
                    <div key={monthIndex} className="bg-gray-100 p-4 rounded-md">
                      <h4 className="text-sm font-semibold mb-2">{month.month}</h4>
                      <div className="flex justify-between">
                        {month.weeks.map((daysAttended, weekIndex) => (
                          <div
                            key={weekIndex}
                            className="w-12 h-12 flex items-center justify-center rounded-md"
                            style={{
                              backgroundColor: `rgba(59, 130, 246, ${daysAttended / 7})`,
                              color: daysAttended > 3 ? "white" : "black",
                            }}
                          >
                            <span className="text-sm font-medium">{daysAttended}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>Menos activo</span>
                  <div className="flex space-x-1">
                    {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: `rgba(59, 130, 246, ${opacity})` }}
                      ></div>
                    ))}
                  </div>
                  <span>Más activo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

