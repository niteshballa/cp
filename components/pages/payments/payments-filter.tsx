"use client"

import type React from "react"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { useState, useEffect } from "react"

interface PaymentsFilterProps {
  statusFilter: string | null
  onStatusFilterChange: (value: string | null) => void
  dateRange: [Date | null, Date | null]
  onDateRangeChange: (value: [Date | null, Date | null]) => void
}

export function PaymentsFilter({
  statusFilter,
  onStatusFilterChange,
  dateRange,
  onDateRangeChange,
}: PaymentsFilterProps) {
  const [startDate, endDate] = dateRange
  const [searchInput, setSearchInput] = useState("")
  const debouncedSearch = useDebounce(searchInput, 300)

  useEffect(() => {
    // Your existing filter logic, but using debouncedSearch instead
    // ...
  }, [debouncedSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between border-b">
      <div className="flex flex-wrap items-center gap-2">
        <Select value={statusFilter || ""} onValueChange={(value) => onStatusFilterChange(value || null)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal w-[240px]",
                !startDate && !endDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate && endDate ? (
                <>
                  {format(startDate, "LLL dd, y")} - {format(endDate, "LLL dd, y")}
                </>
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={{
                from: startDate || undefined,
                to: endDate || undefined,
              }}
              onSelect={(range) => {
                onDateRangeChange([range?.from || null, range?.to || null])
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onStatusFilterChange(null)
            onDateRangeChange([null, null])
          }}
        >
          Reset Filters
        </Button>
        <Button size="sm">Apply Filters</Button>
      </div>
    </div>
  )
}

