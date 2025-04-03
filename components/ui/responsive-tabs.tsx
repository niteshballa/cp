"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ResponsiveTabsProps {
  tabs: { value: string; label: string; hasNotification?: boolean }[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function ResponsiveTabs({ tabs, value, onValueChange, className }: ResponsiveTabsProps) {
  return (
    <>
      {/* Desktop tabs */}
      <Tabs value={value} onValueChange={onValueChange} className={cn("hidden sm:block", className)}>
        <TabsList className="rounded-xl overflow-hidden">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value} 
              className="relative rounded-xl"
            >
              {tab.label}
              {tab.hasNotification && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Mobile dropdown */}
      <div className="sm:hidden w-full">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-full h-11 text-base rounded-xl">
            <SelectValue placeholder="Select tab" />
            {tabs.find((tab) => tab.value === value)?.hasNotification && (
              <span className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
            )}
          </SelectTrigger>
          <SelectContent className="max-h-60 rounded-xl overflow-hidden">
            {tabs.map((tab) => (
              <SelectItem key={tab.value} value={tab.value} className="py-3 text-base relative rounded-xl">
                {tab.label}
                {tab.hasNotification && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500" />
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}