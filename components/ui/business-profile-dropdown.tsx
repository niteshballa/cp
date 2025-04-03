"use client"

import { useState } from "react"
import { Check, ChevronDown, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample business profiles data
const businessProfiles = [
  { value: "all", label: "All Profiles" },
  { value: "retail", label: "Retail Store" },
  { value: "online", label: "Online Shop" },
  { value: "wholesale", label: "Wholesale Business" },
]

interface BusinessProfileDropdownProps {
  className?: string
}

export function BusinessProfileDropdown({ className }: BusinessProfileDropdownProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("all")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>{businessProfiles.find((profile) => profile.value === value)?.label || "Select profile..."}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search profiles..." />
          <CommandList>
            <CommandEmpty>No profile found.</CommandEmpty>
            <CommandGroup>
              {businessProfiles.map((profile) => (
                <CommandItem
                  key={profile.value}
                  value={profile.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === profile.value ? "opacity-100" : "opacity-0")} />
                  {profile.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

