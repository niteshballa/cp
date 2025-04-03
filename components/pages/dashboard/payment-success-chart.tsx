"use client"

import { useMemo, useEffect } from "react"
import { DashboardChart } from "./dashboard-chart"
import { generatePaymentSuccessData } from "@/lib/dashboard-utils"

interface PaymentSuccessChartProps {
  timeframe: string
  selectedBusinessId: string
}

export function PaymentSuccessChart({ timeframe, selectedBusinessId }: PaymentSuccessChartProps) {
  // Generate chart data
  const chartData = useMemo(() => {
    return generatePaymentSuccessData(selectedBusinessId || "all")
  }, [selectedBusinessId])

  // Log when business ID changes (same as original component)
  useEffect(() => {
    console.log("PaymentSuccessChart - Business ID changed:", selectedBusinessId)
  }, [selectedBusinessId])

  return (
    <DashboardChart
      title="Payment Success"
      description="Overview of payment success metrics"
      timeframe={timeframe}
      selectedBusinessId={selectedBusinessId || "all"}
      chartType="single"
      metrics={["success", "volume", "conversion"]}
      defaultMetric="success"
      data={chartData}
    />
  )
}