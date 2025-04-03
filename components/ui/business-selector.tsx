"use client"

import { useState } from "react"
import { ChevronDownIcon, CheckIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface BusinessProfile {
  id: string
  name: string
  avatar?: string
  initials: string
}

const businessProfiles: BusinessProfile[] = [
  { id: "1", name: "Aurum Intel", initials: "AI" },
  { id: "2", name: "Dummy 1", initials: "NC" },
  { id: "3", name: "Dummy 2", initials: "VS" },
]

export function BusinessSelector() {
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>(["1"])

  const toggleBusinessSelection = (id: string) => {
    setSelectedBusinesses((prev) => {
      if (prev.includes(id)) {
        return prev.filter((b) => b !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const selectAllBusinesses = () => {
    setSelectedBusinesses(businessProfiles.map((b) => b.id))
  }

  const clearBusinessSelection = () => {
    setSelectedBusinesses([])
  }

  const getDisplayBusinessName = () => {
    if (selectedBusinesses.length === 0) {
      return "Select Business"
    } else if (selectedBusinesses.length === 1) {
      const business = businessProfiles.find((b) => b.id === selectedBusinesses[0])
      return business?.name || "Business"
    } else if (selectedBusinesses.length === businessProfiles.length) {
      return "All Businesses"
    } else {
      const primaryBusiness = businessProfiles.find((b) => b.id === selectedBusinesses[0])
      return `${primaryBusiness?.name} +${selectedBusinesses.length - 1}`
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 bg-purple-900 text-white">
              <AvatarFallback>
                {businessProfiles.find((b) => b.id === selectedBusinesses[0])?.initials || "B"}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">{getDisplayBusinessName()}</span>
          </div>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]">
        {businessProfiles.map((business) => (
          <DropdownMenuCheckboxItem
            key={business.id}
            checked={selectedBusinesses.includes(business.id)}
            onCheckedChange={() => toggleBusinessSelection(business.id)}
            className="flex items-center gap-2"
          >
            <Avatar className="h-6 w-6 bg-purple-900 text-white">
              <AvatarFallback>{business.initials}</AvatarFallback>
            </Avatar>
            <span>{business.name}</span>
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={selectAllBusinesses} className="flex items-center gap-2">
          <CheckIcon className="h-4 w-4" />
          <span>Select All</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={clearBusinessSelection} className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          <span>Add Business</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

