"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface PaymentMethodsProps {
  selectedBusinesses: string[]
  className?: string
}

export function PaymentMethods({ selectedBusinesses, className }: PaymentMethodsProps) {
  // Generate business-specific data
  const data = useMemo(() => {
    // Base data for payment methods
    const baseData = [
      { name: "Credit Card", value: 65, fill: "#0088FE" },
      { name: "Bank Transfer", value: 20, fill: "#00C49F" },
      { name: "Digital Wallet", value: 10, fill: "#FFBB28" },
      { name: "Other", value: 5, fill: "#FF8042" },
    ]

    // If all businesses are selected or multiple businesses
    if (selectedBusinesses.length > 1) {
      // Aggregate data for all businesses (more balanced distribution)
      return [
        { name: "Credit Card", value: 55, fill: "#0088FE" },
        { name: "Bank Transfer", value: 25, fill: "#00C49F" },
        { name: "Digital Wallet", value: 15, fill: "#FFBB28" },
        { name: "Other", value: 5, fill: "#FF8042" },
      ]
    } else if (selectedBusinesses.length === 1) {
      // Get data for specific business
      const businessId = selectedBusinesses[0]
      const businessIndex = Number.parseInt(businessId) - 1

      // Modify payment methods based on business
      if (businessIndex === 0) {
        return [
          { name: "Credit Card", value: 65, fill: "#0088FE" },
          { name: "Bank Transfer", value: 20, fill: "#00C49F" },
          { name: "Digital Wallet", value: 10, fill: "#FFBB28" },
          { name: "Other", value: 5, fill: "#FF8042" },
        ]
      } else if (businessIndex === 1) {
        return [
          { name: "Credit Card", value: 50, fill: "#0088FE" },
          { name: "Bank Transfer", value: 30, fill: "#00C49F" },
          { name: "Digital Wallet", value: 15, fill: "#FFBB28" },
          { name: "Other", value: 5, fill: "#FF8042" },
        ]
      } else if (businessIndex === 2) {
        return [
          { name: "Credit Card", value: 45, fill: "#0088FE" },
          { name: "Bank Transfer", value: 15, fill: "#00C49F" },
          { name: "Digital Wallet", value: 35, fill: "#FFBB28" },
          { name: "Other", value: 5, fill: "#FF8042" },
        ]
      } else if (businessIndex === 3) {
        return [
          { name: "Credit Card", value: 55, fill: "#0088FE" },
          { name: "Bank Transfer", value: 25, fill: "#00C49F" },
          { name: "Digital Wallet", value: 10, fill: "#FFBB28" },
          { name: "Other", value: 10, fill: "#FF8042" },
        ]
      }
    }

    // Default case - no businesses selected
    return baseData
  }, [selectedBusinesses])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Distribution by payment type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Percentage"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.fill }} />
              <span className="text-sm">
                {entry.name}: {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

