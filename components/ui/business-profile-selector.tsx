"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BuildingIcon } from "lucide-react"

// Sample business profiles
export const businessProfiles = [
  { id: "all", name: "All Businesses" },
  { id: "2", name: "Dummy 1" },
  { id: "3", name: "Dummy 2" },
  { id: "4", name: "Dummy 3" },
]

interface BusinessProfileSelectorProps {
  selectedBusinessId: string
  onSelectBusiness: (id: string) => void
  className?: string
}

export function BusinessProfileSelector({
  selectedBusinessId,
  onSelectBusiness,
  className,
}: BusinessProfileSelectorProps) {
  return (
    <Select value={selectedBusinessId} onValueChange={onSelectBusiness}>
      <SelectTrigger className="w-[180px] text-sm">
        <BuildingIcon className="mr-2 h-4 w-4 opacity-50" />
        <SelectValue placeholder="Select business" />
      </SelectTrigger>
      <SelectContent>
        {businessProfiles.map((business) => (
          <SelectItem key={business.id} value={business.id}>
            {business.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

