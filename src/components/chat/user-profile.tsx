"use client"

import { X, Phone, Mail, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface UserProfileProps {
  user: any
  onClose?: () => void
  onProfileClick?: () => void
  minimal?: boolean
}

export function UserProfile({ user, onClose, onProfileClick, minimal = false }: UserProfileProps) {
  if (minimal) {
    return (
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={onProfileClick}>
        <div className="flex items-center gap-3">
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-start">
        <h3 className="font-semibold text-lg">Perfil del Prospecto</h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="text-center">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.plan}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Registrado: {user.joinDate}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Etiquetas
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Intereses</h4>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest: string) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

