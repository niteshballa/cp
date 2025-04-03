"use client"

import { useState } from "react"
import { CalendarIcon, RefreshCwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveTabs } from "@/components/ui/responsive-tabs"
import { BusinessProfileSelector } from "@/components/ui/business-profile-selector"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

interface DashboardHeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  timeframe: string
  setTimeframe: (timeframe: string) => void
  selectedBusinessId: string
  setSelectedBusinessId: (id: string) => void
  onRefresh: () => void
  isRefreshing: boolean
}

export function DashboardHeader({
  activeTab,
  setActiveTab,
  timeframe,
  setTimeframe,
  selectedBusinessId,
  setSelectedBusinessId,
  onRefresh,
  isRefreshing,
}: DashboardHeaderProps) {
  // Update the tabs array to include notification status
  const tabs = [
    { value: "overview", label: "Overview", hasNotification: false },
    { value: "auto-retries", label: "Auto-retries", hasNotification: false },
    { value: "refunds", label: "Refunds", hasNotification: false },
  ]

  const handleRefresh = () => {
    onRefresh()
    toast({
      title: "Dashboard refreshed",
      description: "The latest data has been loaded.",
      duration: 3000,
    })
  }

  return (
    <div className="flex flex-col gap-5 mb-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Left side: Tabs */}
          <ResponsiveTabs
            tabs={tabs}
            value={activeTab}
            onValueChange={setActiveTab}
          />

          {/* Time range selector with consistent font size */}
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[160px] h-11 border border-input rounded-xl text-sm font-medium">
              <CalendarIcon className="mr-2 h-5 w-5 opacity-70" />
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-input">
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right side: Business selector and refresh button */}
        <div className="flex items-center gap-3">
          <BusinessProfileSelector selectedBusinessId={selectedBusinessId} onSelectBusiness={setSelectedBusinessId} />

          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-shrink-0 h-11 w-11 rounded-xl border border-input"
          >
            <RefreshCwIcon className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </div>
    </div>
  )
}