"use client"

import { useState, useMemo } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConfig } from "@/hooks/use-config"
import { GradientCard } from "@/components/ui/gradient-card"
import { cn } from "@/lib/utils"
import { LineChartIcon, BarChart2Icon } from "lucide-react"

// Base data for charts
const baseRevenueData = {
  "24h": [
    { name: "12AM", revenue: 1200, target: 1000 },
    { name: "4AM", revenue: 900, target: 1000 },
    { name: "8AM", revenue: 1500, target: 1200 },
    { name: "12PM", revenue: 2200, target: 1800 },
    { name: "4PM", revenue: 2800, target: 2000 },
    { name: "8PM", revenue: 2100, target: 1800 },
    { name: "11PM", revenue: 1800, target: 1500 },
  ],
  "7days": [
    { name: "Mon", revenue: 4000, target: 3500 },
    { name: "Tue", revenue: 3000, target: 3500 },
    { name: "Wed", revenue: 5000, target: 4000 },
    { name: "Thu", revenue: 4500, target: 4000 },
    { name: "Fri", revenue: 6000, target: 4500 },
    { name: "Sat", revenue: 5500, target: 4500 },
    { name: "Sun", revenue: 7000, target: 5000 },
  ],
  "30days": [
    { name: "Week 1", revenue: 15000, target: 14000 },
    { name: "Week 2", revenue: 18000, target: 15000 },
    { name: "Week 3", revenue: 16500, target: 15000 },
    { name: "Week 4", revenue: 22000, target: 18000 },
  ],
  "90days": [
    { name: "Jan", revenue: 45000, target: 40000 },
    { name: "Feb", revenue: 52000, target: 45000 },
    { name: "Mar", revenue: 48000, target: 45000 },
  ],
  custom: [
    { name: "Jan", revenue: 45000, target: 40000 },
    { name: "Feb", revenue: 52000, target: 45000 },
    { name: "Mar", revenue: 48000, target: 45000 },
  ],
}

interface RevenueChartProps {
  timeframe: string
  className?: string
  selectedBusinesses: string[]
}

export function RevenueChart({ timeframe, className, selectedBusinesses }: RevenueChartProps) {
  const { config } = useConfig()
  const [chartType, setChartType] = useState("line")

  // Generate business-specific data
  const data = useMemo(() => {
    const baseData = baseRevenueData[timeframe as keyof typeof baseRevenueData] || baseRevenueData["7days"]

    // If all businesses are selected or multiple businesses
    if (selectedBusinesses.length > 1) {
      // Aggregate data for all businesses (increase values)
      return baseData.map((item) => ({
        ...item,
        revenue: Math.round(item.revenue * 3.2),
        target: Math.round(item.target * 3),
      }))
    } else if (selectedBusinesses.length === 1) {
      // Get data for specific business
      const businessId = selectedBusinesses[0]
      const businessIndex = Number.parseInt(businessId) - 1

      // Modify data based on business index to make it unique
      return baseData.map((item) => ({
        ...item,
        revenue: Math.round(item.revenue * (1 + businessIndex * 0.2)),
        target: Math.round(item.target * (1 + businessIndex * 0.15)),
      }))
    }

    // Default case - no businesses selected
    return baseData
  }, [timeframe, selectedBusinesses])

  return (
    <GradientCard
      gradient="custom"
      customGradient="linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(59, 130, 246, 0.05))"
      className={cn(
        "md:col-span-2 lg:col-span-5 w-full",
        config.animations && "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both",
        className,
      )}
    >
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              {timeframe === "24h" ? "Hourly" : timeframe === "7days" ? "Daily" : "Weekly"} revenue trends
            </CardDescription>
          </div>
          <Tabs value={chartType} onValueChange={setChartType} className="w-full md:w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="line" className="flex items-center gap-1">
                <LineChartIcon className="h-3.5 w-3.5" />
                <span>Line</span>
              </TabsTrigger>
              <TabsTrigger value="area" className="flex items-center gap-1">
                <BarChart2Icon className="h-3.5 w-3.5" />
                <span>Area</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--primary))",
            },
            target: {
              label: "Target",
              color: "hsl(var(--muted-foreground))",
            },
          }}
          className="h-[200px] sm:h-[250px] md:h-[350px]"
        >
          {chartType === "line" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>
      </CardContent>
    </GradientCard>
  )
}

