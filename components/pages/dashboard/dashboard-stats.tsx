"use client"

import { ArrowDownIcon, ArrowUpIcon, CreditCardIcon, DollarSignIcon, RefreshCcwIcon, ShieldIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface DashboardStatsProps {
  activeTab: string
  timeframe: string
  selectedBusinessId: string
}

export function DashboardStats({ activeTab, timeframe, selectedBusinessId }: DashboardStatsProps) {
  // This would normally come from an API
  const stats = {
    overview: [
      {
        title: "Total Volume",
        value: 1250000,
        formattedValue: "$ 1,250,000",
        change: 12.5,
        icon: DollarSignIcon,
        color: "from-emerald-500 to-teal-500",
      },
      {
        title: "Successful Payments",
        value: 8750,
        formattedValue: "8,750",
        change: 8.2,
        icon: CreditCardIcon,
        color: "from-blue-500 to-indigo-500",
      },
      {
        title: "Failed Payments",
        value: 320,
        formattedValue: "320",
        change: -5.1,
        icon: ShieldIcon,
        color: "from-rose-500 to-pink-500",
      },
      {
        title: "Conversion Rate",
        value: 96.5,
        formattedValue: "96.5%",
        change: 2.3,
        icon: RefreshCcwIcon,
        color: "from-amber-500 to-orange-500",
      },
    ],
    "auto-retries": [
      {
        title: "Retried Payments",
        value: 1250,
        formattedValue: "1,250",
        change: 5.2,
        icon: RefreshCcwIcon,
        color: "from-emerald-500 to-teal-500",
      },
      {
        title: "Recovered Amount",
        value: 87500,
        formattedValue: "$87,500",
        change: 12.8,
        icon: DollarSignIcon,
        color: "from-blue-500 to-indigo-500",
      },
      {
        title: "Recovery Rate",
        value: 68.5,
        formattedValue: "68.5%",
        change: 3.7,
        icon: ShieldIcon,
        color: "from-amber-500 to-orange-500",
      },
      {
        title: "Avg. Attempts",
        value: 2.3,
        formattedValue: "2.3",
        change: -1.2,
        icon: CreditCardIcon,
        color: "from-violet-500 to-purple-500",
      },
    ],
  }

  const currentStats = stats[activeTab as keyof typeof stats] || stats.overview

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {currentStats.map((stat, index) => (
        <motion.div
          key={`${activeTab}-${stat.title}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <h3 className="text-xl font-medium tracking-tight">
                    <AnimatedCounter value={stat.value} formatValue={() => stat.formattedValue} />
                  </h3>
                  <div
                    className={cn(
                      "flex items-center mt-1 text-xs font-medium",
                      stat.change > 0 ? "text-emerald-500" : "text-rose-500",
                    )}
                  >
                    {stat.change > 0 ? (
                      <ArrowUpIcon className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-3 w-3" />
                    )}
                    <span>
                      {Math.abs(stat.change)}% from last{" "}
                      {timeframe === "7days" ? "week" : timeframe === "30days" ? "month" : "year"}
                    </span>
                  </div>
                </div>
                <div className={cn("flex items-center justify-center rounded-full p-2 bg-gradient-to-br", stat.color)}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

