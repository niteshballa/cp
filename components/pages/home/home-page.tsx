"use client"

import { useState, useEffect, useCallback } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { DashboardHeader } from "../dashboard/dashboard-header"
import { DashboardStats } from "../dashboard/dashboard-stats"
import { PaymentSuccessChart } from "../dashboard/payment-success-chart"
import { AutoRetriesChart } from "../dashboard/auto-retries-chart"
import { RefundAnalytics } from "../dashboard/refund-analytics"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function HomePage() {
  // State management
  const [activeTab, setActiveTab] = useState("overview")
  const [timeframe, setTimeframe] = useState("7days")
  const [selectedBusinessId, setSelectedBusinessId] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Function to load dashboard data
  const loadDashboardData = useCallback(() => {
    setIsRefreshing(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 800)
  }, [])

  // Initial data load
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])

  // Handle business selection change
  useEffect(() => {
    console.log("Business selection changed in HomePage:", selectedBusinessId)
    loadDashboardData()
  }, [selectedBusinessId, loadDashboardData])

  // Handle refresh
  const handleRefresh = () => {
    loadDashboardData()
  }

  return (
    <PageContainer>
      <DashboardHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        selectedBusinessId={selectedBusinessId}
        setSelectedBusinessId={setSelectedBusinessId}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {isLoading ? (
        <div className="space-y-6">
          {/* Skeleton for stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-1/3 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skeleton for chart */}
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === "overview" && (
            <>
              <DashboardStats activeTab="overview" timeframe={timeframe} selectedBusinessId={selectedBusinessId} />
              <PaymentSuccessChart timeframe={timeframe} selectedBusinessId={selectedBusinessId} />
            </>
          )}

          {activeTab === "auto-retries" && (
            <>
              <DashboardStats activeTab="auto-retries" timeframe={timeframe} selectedBusinessId={selectedBusinessId} />
              <AutoRetriesChart timeframe={timeframe} selectedBusinessId={selectedBusinessId} />
            </>
          )}

          {activeTab === "refunds" && <RefundAnalytics timeframe={timeframe} selectedBusinessId={selectedBusinessId} />}
        </div>
      )}
    </PageContainer>
  )
}

