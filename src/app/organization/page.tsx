import { Sidebar } from "@/components/sidebar"
import { OrganizationSettings } from "@/components/organization-settings"

export default function OrganizationPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto pt-16">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Configuración de la Organización</h2>
          </div>
          <div className="h-[calc(100vh-10rem-4rem)]">
            <OrganizationSettings />
          </div>
        </div>
      </div>
    </div>
  )
}

