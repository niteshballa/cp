"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CustomersFilterProps {
  statusFilter: string | null
  onStatusFilterChange: (value: string | null) => void
}

export function CustomersFilter({ statusFilter, onStatusFilterChange }: CustomersFilterProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between border-b">
      <div className="flex flex-wrap items-center gap-2">
        <Select value={statusFilter || ""} onValueChange={(value) => onStatusFilterChange(value || null)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onStatusFilterChange(null)
          }}
        >
          Reset Filters
        </Button>
        <Button size="sm">Apply Filters</Button>
      </div>
    </div>
  )
}

