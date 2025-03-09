import { SalesPipeline } from "@/components/sales-pipeline"
import { Sidebar } from "@/components/sidebar"

export default function PipelinePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Pipeline</h2>
          </div>
          <div className="h-[calc(100vh-10rem)]">
            <SalesPipeline />
          </div>
        </div>
      </div>
    </div>
  )
}

