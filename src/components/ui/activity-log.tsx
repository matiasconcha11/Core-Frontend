import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    name: "Patricio",
    plan: "Plan Premium",
    phone: "+569 2343-2342",
    timeAgo: "10 minutos",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "male",
  },
  {
    name: "Tomas",
    plan: "Plan Premium",
    phone: "+569 6789-6789",
    timeAgo: "15 minutos",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "male",
  },
  {
    name: "Fabiola",
    plan: "Plan Premium",
    phone: "+569 3494-3494",
    timeAgo: "22 minutos",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "female",
  },
  {
    name: "Fernando",
    plan: "Plan Basico",
    phone: "+569 6767-6767",
    timeAgo: "20 minutos",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "male",
  },
  {
    name: "Garrido",
    plan: "Plan Premium",
    phone: "+569 555-5555",
    timeAgo: "12 minutos",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "male",
  },
]

export function ActivityLog() {
  return (
    <div className="h-full flex flex-col">
      <h4 className="text-lg font-semibold mb-2">Actividad de tus clientes</h4>
      <p className="text-sm text-muted-foreground mb-4">Hoy han llegado 37 usuarios a tu gimnasio.</p>
      <div className="flex-1 overflow-auto pr-4 -mr-4">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className={activity.gender === "male" ? "bg-blue-100" : "bg-pink-100"}>
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{activity.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.plan} / {activity.phone}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Ingreso hace {activity.timeAgo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

