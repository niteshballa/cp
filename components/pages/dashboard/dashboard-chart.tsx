"use client"

import { useMemo, useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ResponsiveTabs } from "@/components/ui/responsive-tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/components/theme-provider"
import {
  CheckCircleIcon,
  LineChartIcon,
  BarChart2Icon,
  TrendingUpIcon,
  ZapIcon,
  LucideIcon
} from "lucide-react"

type MetricType = "success" | "volume" | "conversion" | "retries" | "recovered"

interface MetricConfig {
  id: MetricType
  label: string
  description: string
  icon: LucideIcon
  color: string
  darkColor: string
  lightStrokeColor: string
  darkStrokeColor: string
  lightFillColor: string
  darkFillColor: string
  yAxisDomain: [number | string, number | string]
  formatter: (value: number) => string
  tooltipLabel: string
}

interface ChartDataPoint {
  date: string
  [key: string]: string | number
}

interface DashboardChartProps {
  title: string
  description: string
  timeframe: string
  selectedBusinessId: string
  chartType?: "single" | "multi"
  metrics: MetricType[]
  data: ChartDataPoint[]
  defaultMetric?: MetricType
  displayValue?: number | string
  displayLabel?: string
}

const METRIC_CONFIG: Record<MetricType, MetricConfig> = {
  success: {
    id: "success",
    label: "Success Rate",
    description: "Percentage of successful transactions",
    icon: CheckCircleIcon,
    color: "bg-emerald-100 text-emerald-600",
    darkColor: "dark:bg-emerald-900/30 dark:text-emerald-400",
    lightStrokeColor: "#10b981", // emerald-500
    darkStrokeColor: "#34d399",  // emerald-400
    lightFillColor: "#d1fae5",   // emerald-100
    darkFillColor: "#064e3b",    // emerald-900
    yAxisDomain: [95, 100],
    formatter: (value: number) => `${value}%`,
    tooltipLabel: "Success Rate"
  },
  volume: {
    id: "volume",
    label: "Transaction Volume",
    description: "Average daily transaction volume",
    icon: TrendingUpIcon,
    color: "bg-blue-100 text-blue-600",
    darkColor: "dark:bg-blue-900/30 dark:text-blue-400",
    lightStrokeColor: "#3b82f6", // blue-500
    darkStrokeColor: "#60a5fa",  // blue-400
    lightFillColor: "#dbeafe",   // blue-100
    darkFillColor: "#1e3a8a",    // blue-900
    yAxisDomain: [0, 'auto'],
    formatter: (value: number) => `$${value.toLocaleString()}`,
    tooltipLabel: "Volume"
  },
  conversion: {
    id: "conversion",
    label: "Conversion Rate",
    description: "Percentage of visitors who complete a transaction",
    icon: BarChart2Icon,
    color: "bg-amber-100 text-amber-600",
    darkColor: "dark:bg-amber-900/30 dark:text-amber-400",
    lightStrokeColor: "#f59e0b", // amber-500
    darkStrokeColor: "#fbbf24",  // amber-400
    lightFillColor: "#fef3c7",   // amber-100
    darkFillColor: "#78350f",    // amber-900
    yAxisDomain: [0, 5],
    formatter: (value: number) => `${value}%`,
    tooltipLabel: "Conversion Rate"
  },
  retries: {
    id: "retries",
    label: "Retries",
    description: "Failed transactions automatically retried",
    icon: ZapIcon,
    color: "bg-amber-100 text-amber-600",
    darkColor: "dark:bg-amber-900/30 dark:text-amber-400",
    lightStrokeColor: "#f59e0b", // amber-500
    darkStrokeColor: "#fbbf24",  // amber-400
    lightFillColor: "#fef3c7",   // amber-100
    darkFillColor: "#78350f",    // amber-900
    yAxisDomain: [0, 'auto'],
    formatter: (value: number) => value.toString(),
    tooltipLabel: "Retries"
  },
  recovered: {
    id: "recovered",
    label: "Recovered",
    description: "Failed transactions recovered after retry",
    icon: ZapIcon,
    color: "bg-emerald-100 text-emerald-600",
    darkColor: "dark:bg-emerald-900/30 dark:text-emerald-400",
    lightStrokeColor: "#10b981", // emerald-500
    darkStrokeColor: "#34d399",  // emerald-400
    lightFillColor: "#d1fae5",   // emerald-100
    darkFillColor: "#064e3b",    // emerald-900
    yAxisDomain: [0, 'auto'],
    formatter: (value: number) => value.toString(),
    tooltipLabel: "Recovered"
  }
}

// Custom tooltip component with theme awareness
const CustomTooltip = ({ active, payload, label, theme }: any) => {
  if (active && payload && payload.length) {
    const isDark = theme === 'dark';

    return (
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border p-3 rounded-lg shadow-lg`}>
        <p className={`font-medium text-sm ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function DashboardChart({
  title,
  description,
  timeframe,
  selectedBusinessId,
  chartType = "single",
  metrics,
  data,
  defaultMetric,
  displayValue,
  displayLabel
}: DashboardChartProps) {
  const [chartView, setChartView] = useState("area")
  const [selectedMetric, setSelectedMetric] = useState<MetricType>(defaultMetric || metrics[0])
  const { theme, resolvedTheme } = useTheme()
  const isDarkTheme = theme === 'dark' || resolvedTheme === 'dark'

  // Get grid and axis colors based on theme
  const gridColor = isDarkTheme ? "#374151" : "#e5e7eb";  // dark: gray-700, light: gray-200
  const textColor = isDarkTheme ? "#9ca3af" : "#6b7280";  // dark: gray-400, light: gray-500

  // Log when business ID changes
  useEffect(() => {
    console.log(`DashboardChart (${title}) - Business ID changed:`, selectedBusinessId)
  }, [selectedBusinessId, title])

  // Calculate average values for single metric views
  const avgValues = useMemo(() => {
    if (chartType === "multi") return null

    const result: Record<string, string | number> = {}

    metrics.forEach(metric => {
      const values = data.map(item => Number(item[metric] || 0))
      const sum = values.reduce((acc, val) => acc + val, 0)
      const avg = sum / values.length

      if (metric === "volume") {
        result[metric] = Math.round(avg).toLocaleString()
      } else if (metric === "success" || metric === "conversion") {
        result[metric] = avg.toFixed(1) + "%"
      } else {
        result[metric] = avg.toFixed(1)
      }
    })

    return result
  }, [data, metrics, chartType])

  // Handle metric display value
  const getDisplayValue = () => {
    if (displayValue !== undefined) return displayValue
    if (chartType === "multi") {
      // For multi-charts like auto-retries, calculate a combined metric if no display value provided
      const totalRetries = data.reduce((sum, item) => sum + (Number(item.retries) || 0), 0)
      const totalRecovered = data.reduce((sum, item) => sum + (Number(item.recovered) || 0), 0)
      const rate = totalRetries > 0 ? Math.round((totalRecovered / totalRetries) * 100) : 0
      return `${rate}%`
    }

    // For single metric charts, use the average value
    return avgValues?.[selectedMetric] || "0"
  }

  // Get domain for the Y axis based on selected metric
  const getYAxisDomain = () => {
    if (chartType === "multi") {
      // For multi charts we usually want auto scaling
      return [0, 'auto']
    }

    return METRIC_CONFIG[selectedMetric]?.yAxisDomain || [0, 'auto']
  }

  // Get formatter for the Y axis
  const getYAxisFormatter = (value: number) => {
    if (chartType === "single") {
      return METRIC_CONFIG[selectedMetric]?.formatter(value) || value.toString()
    }

    // Default formatter for multi charts
    return value.toString()
  }

  // Get the icon for the current metric or chart
  const MetricIcon = chartType === "single"
    ? METRIC_CONFIG[selectedMetric]?.icon
    : ZapIcon


  // Get stroke color based on theme
  const getStrokeColor = (metric: MetricType) => {
    const config = METRIC_CONFIG[metric];
    return isDarkTheme ? config.darkStrokeColor : config.lightStrokeColor;
  }

  // Get fill color based on theme
  const getFillColor = (metric: MetricType) => {
    const config = METRIC_CONFIG[metric];
    return isDarkTheme ? config.darkFillColor : config.lightFillColor;
  }

  return (
    <Card className="shadow-sm border rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-sm font-semibold">{
              chartType === "single" ? METRIC_CONFIG[selectedMetric]?.label || title : title
            }</CardTitle>
            <CardDescription className="text-sm">
              {chartType === "single" ? METRIC_CONFIG[selectedMetric]?.description || description : description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {/* Only show metric selector for single charts with multiple metrics */}
            {chartType === "single" && metrics.length > 1 && (
              <Select value={selectedMetric} onValueChange={(v) => setSelectedMetric(v as MetricType)}>
                <SelectTrigger className="w-[140px] text-sm font-medium rounded-xl">
                  <TrendingUpIcon className="mr-2 h-3 w-3 opacity-50" />
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map(metric => (
                    <SelectItem key={metric} value={metric}>
                      {METRIC_CONFIG[metric].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <ResponsiveTabs
              tabs={[
                { value: "area", label: "Area" },
                { value: "bar", label: "Bar" }
              ]}
              value={chartView}
              onValueChange={setChartView}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          {/* <div className="flex items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getIconClasses()}`}>
              {MetricIcon && <MetricIcon className="h-5 w-5" />}
            </div>
            <div>
              <div className="text-lg font-semibold">{getDisplayValue()}</div>
              <div className="text-sm text-muted-foreground">
                {displayLabel || (chartType === "multi" ? "Recovery rate" : "Average for selected period")}
              </div>
            </div>
          </div> */}
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === "area" ? (
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  {/* Create gradient definitions for each metric in multi chart mode */}
                  {chartType === "multi" ? (
                    // Multi chart mode - create a gradient for each metric
                    metrics.map(metric => (
                      <linearGradient key={metric} id={`color${metric}`} x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={getStrokeColor(metric)}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={getStrokeColor(metric)}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    ))
                  ) : (
                    // Single metric mode - just create one gradient
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={getStrokeColor(selectedMetric)}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={getStrokeColor(selectedMetric)}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  )}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: textColor }}
                />
                <YAxis
                  domain={getYAxisDomain() as [number, number] | [number, string]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: textColor }}
                  tickFormatter={getYAxisFormatter}
                />
                <Tooltip content={<CustomTooltip theme={theme || resolvedTheme} />} />

                {/* Add a legend for multi-metric charts */}
                {chartType === "multi" && (
                  <Legend
                    wrapperStyle={{ paddingTop: "10px" }}
                    formatter={(value) => <span className={isDarkTheme ? 'text-gray-200' : 'text-gray-700'}>{value}</span>}
                  />
                )}

                {/* Render appropriate areas based on chart type */}
                {chartType === "multi" ? (
                  // Multi chart mode (e.g. auto-retries)
                  metrics.map((metric) => (
                    <Area
                      key={metric}
                      type="monotone"
                      dataKey={metric}
                      name={METRIC_CONFIG[metric].label}
                      stroke={getStrokeColor(metric)}
                      fill={`url(#color${metric})`}
                      strokeWidth={2}
                    />
                  ))
                ) : (
                  // Single metric mode
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    name={METRIC_CONFIG[selectedMetric].label}
                    stroke={getStrokeColor(selectedMetric)}
                    fill="url(#colorMetric)"
                    strokeWidth={2}
                  />
                )}
              </AreaChart>
            ) : (
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: textColor }}
                />
                <YAxis
                  domain={getYAxisDomain() as [number, number] | [number, string]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: textColor }}
                  tickFormatter={getYAxisFormatter}
                />
                <Tooltip content={<CustomTooltip theme={theme || resolvedTheme} />} />

                {/* Add a legend for multi-metric charts */}
                {chartType === "multi" && (
                  <Legend
                    wrapperStyle={{ paddingTop: "10px" }}
                    formatter={(value) => <span className={isDarkTheme ? 'text-gray-200' : 'text-gray-700'}>{value}</span>}
                  />
                )}

                {/* Render appropriate bars based on chart type */}
                {chartType === "multi" ? (
                  // Multi chart mode (e.g. auto-retries)
                  metrics.map((metric) => (
                    <Bar
                      key={metric}
                      dataKey={metric}
                      name={METRIC_CONFIG[metric].label}
                      fill={getStrokeColor(metric)}
                      radius={[4, 4, 0, 0]}
                    />
                  ))
                ) : (
                  // Single metric mode
                  <Bar
                    dataKey={selectedMetric}
                    name={METRIC_CONFIG[selectedMetric].label}
                    fill={getStrokeColor(selectedMetric)}
                    radius={[4, 4, 0, 0]}
                  />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}