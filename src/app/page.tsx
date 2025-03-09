"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { MetricCards } from "@/components/metric-cards"
import { Overview } from "@/components/overview"
import { Sidebar } from "@/components/sidebar"
import { TimeFilter } from "@/components/time-filter"
import { PlanOverview } from "@/components/plan-overview"
import { RecentPayments } from "@/components/recent-payments"
import { SentimentAnalysis } from "@/components/sentiment-analysis"
import Schedule from "@/components/schedule"
import { UserPopup } from "@/components/user-popup"

export default function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <TimeFilter />
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background sm:w-[150px]"
                disabled
              >
                <option>Filter 2</option>
              </select>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background sm:w-[150px]"
                disabled
              >
                <option>Filter 3</option>
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-7">
              <div className="col-span-4">
                <MetricCards />
              </div>
              <Card className="col-span-3 p-6">
                <Overview />
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card className="p-6 h-[400px]">
                <Schedule />
              </Card>
              <Card className="p-6 h-[400px]">
                <RecentPayments onUserClick={setSelectedUser} />
              </Card>
              <Card className="p-6 h-[400px]">
                <PlanOverview />
              </Card>
              <Card className="p-6 h-[400px]">
                <SentimentAnalysis />
              </Card>
            </div>
          </div>
        </div>
      </div>
      {selectedUser && <UserPopup user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  )
}

