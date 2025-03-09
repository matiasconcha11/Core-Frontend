"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlanRevenuePopup } from "./plan-revenue-popup"

const plans = [
  {
    name: "Basico",
    revenue: "Ingreso mensual: $1.200.000",
    members: 123,
  },
  {
    name: "Pro",
    revenue: "Ingreso mensual: $5.000.000",
    members: 200,
  },
  {
    name: "Experto",
    revenue: "Ingreso mensual: $7.500.000",
    members: 300,
  },
]

export function PlanOverview() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanClick = (planName: string) => {
    setSelectedPlan(planName)
  }

  const handleClosePopup = () => {
    setSelectedPlan(null)
  }

  return (
    <div className="h-full flex flex-col">
      <h4 className="text-lg font-semibold mb-4">Vista general de tus planes</h4>
      <div className="flex-1 overflow-auto pr-4 -mr-4">
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full p-0 h-auto hover:bg-transparent"
              onClick={() => handlePlanClick(plan.name)}
            >
              <Card
                className={
                  plan.name === "Basico"
                    ? "bg-blue-50 dark:bg-blue-900/20 w-full"
                    : plan.name === "Pro"
                      ? "bg-green-50 dark:bg-green-900/20 w-full"
                      : "bg-purple-50 dark:bg-purple-900/20 w-full"
                }
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{plan.revenue}</div>
                  <p className="text-s text-muted-foreground">{plan.members} members</p>
                </CardContent>
              </Card>
            </Button>
          ))}
        </div>
      </div>
      {selectedPlan && <PlanRevenuePopup planName={selectedPlan} onClose={handleClosePopup} />}
    </div>
  )
}

