"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { UserProfile } from "@/components/chat/user-profile"
import { Sidebar } from "@/components/sidebar"

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-hidden pt-16">
        <div className="flex h-full">
          <ChatSidebar onSelectUser={setSelectedUser} />
          <div className="flex-1 flex flex-col">
            {selectedUser && (
              <div className="border-b">
                <UserProfile user={selectedUser} onProfileClick={() => setShowProfile(true)} minimal />
              </div>
            )}
            <ChatInterface selectedUser={selectedUser} />
          </div>
          {showProfile && selectedUser && (
            <div className="w-80 border-l bg-background overflow-y-auto">
              <UserProfile user={selectedUser} onClose={() => setShowProfile(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

