"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Member {
  name: string
  image: string
}

interface ScheduleItem {
  time: string
  coach: string
  className: string
  members: Member[]
}

const scheduleData: ScheduleItem[] = [
  {
    time: "5:00 am",
    coach: "Pepe Gomez",
    className: "Small Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "6:00 am",
    coach: "Matias Concha",
    className: "Big Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "7:00 am",
    coach: "Fabinho Fuentes",
    className: "Small Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "8:00 am",
    coach: "Pepinho H",
    className: "Big Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "9:00 am",
    coach: "John Smith",
    className: "Small Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "10:00 am",
    coach: "Emily Johnson",
    className: "Big Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "11:00 am",
    coach: "Michael Brown",
    className: "Small Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "12:00 pm",
    coach: "Jessica Lee",
    className: "Big Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "1:00 pm",
    coach: "David Wilson",
    className: "Small Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "2:00 pm",
    coach: "Sophia Martinez",
    className: "Big Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "3:00 pm",
    coach: "Daniel Taylor",
    className: "Small Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "4:00 pm",
    coach: "Olivia Anderson",
    className: "Big Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
  {
    time: "5:00 pm",
    coach: "Marcos Sultana",
    className: "Small Groups",
    members: [
      {
        name: "Marco Polo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Lisa Dunn",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "James Wan",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Anne Clavner",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
      {
        name: "Jason Dex",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iB7hYQoWxzmdF6IoAQUvEqloArbDKR.png",
      },
    ],
  },
]

export default function Schedule() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (time: string) => {
    setOpenSection(openSection === time ? null : time)
  }

  return (
    <div className="h-full flex flex-col">
      <h4 className="text-lg font-semibold mb-4">Proximas Clases</h4>
      <div className="flex-1 overflow-auto pr-4 -mr-4">
        <div className="space-y-2">
          {scheduleData.map((item, index) => (
            <div
              key={item.time}
              className={`rounded-lg overflow-hidden ${index % 2 === 1 ? "bg-blue-50" : "bg-white"}`}
            >
              <Button
                variant="ghost"
                className="w-full p-4 flex flex-col items-start gap-1 h-auto hover:bg-opacity-10 hover:bg-black"
                onClick={() => toggleSection(item.time)}
              >
                <div className="flex w-full items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-left">{item.time}</h2>
                    <p className="text-sm text-gray-600">Coach: {item.coach}</p>
                    <p className="text-sm text-gray-600">{item.className}</p>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      openSection === item.time ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </Button>
              {openSection === item.time && (
                <div className="p-4">
                  <h3 className="text-sm font-medium mb-2">Members</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {item.members.map((member, memberIndex) => (
                      <div key={`${member.name}-${memberIndex}`} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{member.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

