"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, RefreshCcwIcon, DollarSignIcon, PercentIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/ui/animated-counter"

interface RefundAnalyticsProps {
  timeframe: string
  selectedBusinessId: string
}

export function RefundAnalytics({ timeframe, selectedBusinessId }: RefundAnalyticsProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Generate business-specific refund data
  const refundData = useMemo(() => {
    // Base refund data
    const baseData = {
      refundRate: "2.5%",
      refundRateChange: "+0.3%",
      refundRateTrend: "up" as const,
      totalRefunds: "18",
      totalRefundsChange: "+3",
      totalRefundsTrend: "up" as const,
      refundAmount: "$2,450.00",
      refundAmountChange: "+$350.00",
      refundAmountTrend: "up" as const,
      avgRefundSize: "$136.11",
      avgRefundSizeChange: "-$12.50",
      avgRefundSizeTrend: "down" as const,
    }

    // If all businesses are selected
    if (selectedBusinessId === "all") {
      return {
        refundRate: "3.1%",
        refundRateChange: "+0.5%",
        refundRateTrend: "up" as const,
        totalRefunds: "65",
        totalRefundsChange: "+12",
        totalRefundsTrend: "up" as const,
        refundAmount: "$8,750.00",
        refundAmountChange: "+$1,250.00",
        refundAmountTrend: "up" as const,
        avgRefundSize: "$134.62",
        avgRefundSizeChange: "-$8.75",
        avgRefundSizeTrend: "down" as const,
      }
    }

    // Business-specific data
    const businessIndex = Number.parseInt(selectedBusinessId) - 1

    if (businessIndex === 0) {
      return baseData
    } else if (businessIndex === 1) {
      return {
        refundRate: "1.8%",
        refundRateChange: "-0.4%",
        refundRateTrend: "down" as const,
        totalRefunds: "12",
        totalRefundsChange: "-2",
        totalRefundsTrend: "down" as const,
        refundAmount: "$1,850.00",
        refundAmountChange: "-$250.00",
        refundAmountTrend: "down" as const,
        avgRefundSize: "$154.17",
        avgRefundSizeChange: "+$15.30",
        avgRefundSizeTrend: "up" as const,
      }
    } else if (businessIndex === 2) {
      return {
        refundRate: "3.2%",
        refundRateChange: "+0.7%",
        refundRateTrend: "up" as const,
        totalRefunds: "25",
        totalRefundsChange: "+5",
        totalRefundsTrend: "up" as const,
        refundAmount: "$3,750.00",
        refundAmountChange: "+$850.00",
        refundAmountTrend: "up" as const,
        avgRefundSize: "$150.00",
        avgRefundSizeChange: "+$12.50",
        avgRefundSizeTrend: "up" as const,
      }
    } else if (businessIndex === 3) {
      return {
        refundRate: "2.1%",
        refundRateChange: "-0.2%",
        refundRateTrend: "down" as const,
        totalRefunds: "15",
        totalRefundsChange: "-1",
        totalRefundsTrend: "down" as const,
        refundAmount: "$2,100.00",
        refundAmountChange: "-$150.00",
        refundAmountTrend: "down" as const,
        avgRefundSize: "$140.00",
        avgRefundSizeChange: "-$5.25",
        avgRefundSizeTrend: "down" as const,
      }
    }

    return baseData
  }, [selectedBusinessId])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Refund Rate */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 * 0.1 }}>
          <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Refund Rate</p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    <AnimatedCounter
                      value={Number.parseFloat(refundData.refundRate)}
                      formatValue={(val) => `${val}%`}
                    />
                  </h3>
                  <div
                    className={cn(
                      "flex items-center mt-1 text-xs font-medium",
                      refundData.refundRateTrend === "down" ? "text-emerald-500" : "text-rose-500",
                    )}
                  >
                    {refundData.refundRateTrend === "down" ? (
                      <ArrowDownIcon className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowUpIcon className="mr-1 h-3 w-3" />
                    )}
                    <span>{refundData.refundRateChange} from last period</span>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-full p-2 bg-gradient-to-br from-amber-500 to-orange-500">
                  <PercentIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Refunds */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 * 0.1 }}>
          <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Refunds</p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    <AnimatedCounter value={Number.parseInt(refundData.totalRefunds)} formatValue={(val) => `${val}`} />
                  </h3>
                  <div
                    className={cn(
                      "flex items-center mt-1 text-xs font-medium",
                      refundData.totalRefundsTrend === "down" ? "text-emerald-500" : "text-rose-500",
                    )}
                  >
                    {refundData.totalRefundsTrend === "down" ? (
                      <ArrowDownIcon className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowUpIcon className="mr-1 h-3 w-3" />
                    )}
                    <span>{refundData.totalRefundsChange} from last period</span>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-full p-2 bg-gradient-to-br from-blue-500 to-indigo-500">
                  <RefreshCcwIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Refund Amount */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 * 0.1 }}>
          <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Refund Amount</p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    <AnimatedCounter
                      value={Number.parseFloat(refundData.refundAmount.replace(/[$,]/g, ""))}
                      formatValue={(val) => `$${val.toLocaleString()}`}
                    />
                  </h3>
                  <div
                    className={cn(
                      "flex items-center mt-1 text-xs font-medium",
                      refundData.refundAmountTrend === "down" ? "text-emerald-500" : "text-rose-500",
                    )}
                  >
                    {refundData.refundAmountTrend === "down" ? (
                      <ArrowDownIcon className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowUpIcon className="mr-1 h-3 w-3" />
                    )}
                    <span>{refundData.refundAmountChange} from last period</span>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-full p-2 bg-gradient-to-br from-purple-500 to-pink-500">
                  <DollarSignIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Average Refund Size */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 * 0.1 }}>
          <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Average Refund Size</p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    <AnimatedCounter
                      value={Number.parseFloat(refundData.avgRefundSize.replace(/[$,]/g, ""))}
                      formatValue={(val) => `$${val.toLocaleString()}`}
                    />
                  </h3>
                  <div
                    className={cn(
                      "flex items-center mt-1 text-xs font-medium",
                      refundData.avgRefundSizeTrend === "up" ? "text-emerald-500" : "text-rose-500",
                    )}
                  >
                    {refundData.avgRefundSizeTrend === "up" ? (
                      <ArrowUpIcon className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-3 w-3" />
                    )}
                    <span>{refundData.avgRefundSizeChange} from last period</span>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-full p-2 bg-gradient-to-br from-emerald-500 to-teal-500">
                  <DollarSignIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Refund Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Refund Reasons</CardTitle>
            <CardDescription>Top reasons for refunds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Product not as described</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Changed mind</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Damaged in shipping</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Wrong item received</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "15%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Other</span>
                <span className="text-sm font-medium">5%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Refund Processing Time</CardTitle>
            <CardDescription>Average time to process refunds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full py-6">
              <div className="text-5xl font-bold mb-2">2.3</div>
              <div className="text-sm text-muted-foreground">Days on average</div>

              <div className="mt-8 w-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Same day</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">1-3 days</span>
                  <span className="text-sm font-medium">55%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">4-7 days</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">7+ days</span>
                  <span className="text-sm font-medium">3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

