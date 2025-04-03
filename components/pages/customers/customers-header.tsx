"use client"

import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageTitle } from "@/components/ui/page-title"

interface CustomersHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function CustomersHeader({ searchQuery, onSearchChange }: CustomersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PageTitle title="Customers" description="Manage your customer relationships" />
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search customers..."
          className="w-full sm:w-[250px]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
    </div>
  )
}

