"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { DialogDescription } from "@/components/ui/dialog"

interface Business {
  id: string
  name: string
}

interface BusinessSelectorProps {
  selectedBusinesses: string[]
  onSelectionChange: (businesses: string[]) => void
  className?: string
}

export function BusinessSelector({ selectedBusinesses, onSelectionChange, className }: BusinessSelectorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [businesses, setBusinesses] = useState<Business[]>([
    { id: "acme", name: "Acme Corporation" },
    { id: "globex", name: "Globex Inc" },
    { id: "initech", name: "Initech LLC" },
    { id: "umbrella", name: "Umbrella Corp" },
    { id: "stark", name: "Stark Industries" },
  ])

  // Simulate loading businesses from an API
  useEffect(() => {
    // In a real app, this would be an API call
    const loadBusinesses = async () => {
      try {
        setIsLoading(true)
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // In a real app, you would fetch businesses from an API
        // const response = await fetch('/api/businesses')
        // const data = await response.json()
        // setBusinesses(data)

        // For demo, we'll use the hardcoded businesses
      } catch (error) {
        console.error("Failed to load businesses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBusinesses()
  }, [])

  const toggleBusiness = (businessId: string) => {
    if (selectedBusinesses.includes(businessId)) {
      // If already selected, remove it (unless it's the last one)
      if (selectedBusinesses.length > 1) {
        onSelectionChange(selectedBusinesses.filter((id) => id !== businessId))
      }
    } else {
      // If not selected, add it
      onSelectionChange([...selectedBusinesses, businessId])
    }
  }

  const selectAll = () => {
    onSelectionChange(businesses.map((b) => b.id))
  }

  const getSelectedText = () => {
    if (selectedBusinesses.length === businesses.length) {
      return "All Businesses"
    }

    if (selectedBusinesses.length === 1) {
      const business = businesses.find((b) => b.id === selectedBusinesses[0])
      return business?.name || "Select Business"
    }

    return `${selectedBusinesses.length} Businesses`
  }

  return (
    <div id="business-selector">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn("flex justify-between", className || "w-full sm:w-[200px]")}
            disabled={isLoading}
            size={{ "@media (max-width: 640px)": "mobile", "@media (min-width: 641px)": "default" } as any}
          >
            {isLoading ? "Loading..." : getSelectedText()}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Select Business</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogDescription>Select a business profile to view its dashboard data and analytics.</DialogDescription>
          <DropdownMenuCheckboxItem
            checked={selectedBusinesses.length === businesses.length}
            onCheckedChange={selectAll}
          >
            All Businesses
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          {businesses.map((business) => (
            <DropdownMenuCheckboxItem
              key={business.id}
              checked={selectedBusinesses.includes(business.id)}
              onCheckedChange={() => toggleBusiness(business.id)}
            >
              {business.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

