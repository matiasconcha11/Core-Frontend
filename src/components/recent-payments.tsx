import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const payments = [
  {
    name: "Carolina Muñoz",
    plan: "Plan Premium",
    amount: "$45.000",
    timeAgo: "hace 2 horas",
    status: "Pago exitoso",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "female",
  },
  {
    name: "Roberto Gómez",
    plan: "Plan Basico",
    amount: "$25.000",
    timeAgo: "hace 3 horas",
    status: "Pago exitoso",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "male",
  },
  {
    name: "María González",
    plan: "Plan Premium",
    amount: "$45.000",
    timeAgo: "hace 5 horas",
    status: "Pago exitoso",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "female",
  },
  {
    name: "Juan Silva",
    plan: "Plan Experto",
    amount: "$65.000",
    timeAgo: "hace 6 horas",
    status: "Pago exitoso",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "male",
  },
  {
    name: "Andrea Torres",
    plan: "Plan Premium",
    amount: "$45.000",
    timeAgo: "hace 8 horas",
    status: "Pago exitoso",
    avatar: "/placeholder.svg?height=32&width=32",
    gender: "female",
  },
]

interface RecentPaymentsProps {
  onUserClick: (user: (typeof payments)[0]) => void
}

const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 80%)`
}

export function RecentPayments({ onUserClick }: RecentPaymentsProps) {
  return (
    <div className="h-full flex flex-col">
      <h4 className="text-lg font-semibold mb-2">Pagos Recientes</h4>
      <p className="text-sm text-muted-foreground mb-4">Has recibido 12 pagos hoy</p>
      <div className="flex-1 overflow-auto pr-4 -mr-4">
        <div className="space-y-4">
          {payments.map((payment, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start p-0 h-auto hover:bg-transparent"
              onClick={() => index === 0 && onUserClick(payment)}
            >
              <div className="flex items-center justify-between space-x-4 w-full">
                <div className="flex items-center space-x-4">
                  <Avatar style={{ backgroundColor: getRandomPastelColor() }}>
                    <AvatarImage src={payment.avatar} />
                    <AvatarFallback>{payment.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{payment.name}</p>
                    <p className="text-sm text-muted-foreground">{payment.plan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium leading-none">{payment.amount}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>{payment.timeAgo}</span>
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

