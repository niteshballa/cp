"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, CheckCircleIcon, AlertCircleIcon, InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { businessProfiles } from "@/components/ui/business-profile-selector"

interface RecentTransactionsProps {
  selectedBusinesses: string[]
  className?: string
}

export function RecentTransactions({ selectedBusinesses, className }: RecentTransactionsProps) {
  // Format currency helper
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  // Generate business-specific data
  const transactions = useMemo(() => {
    // Base transactions data
    const baseTransactions = [
      { id: "TX-1234", customer: "John Doe", amount: 125.99, status: "completed", date: "Today, 2:30 PM" },
      { id: "TX-1235", customer: "Jane Smith", amount: 74.5, status: "completed", date: "Today, 1:15 PM" },
      { id: "TX-1236", customer: "Bob Johnson", amount: 249.99, status: "pending", date: "Today, 11:42 AM" },
      { id: "TX-1237", customer: "Alice Brown", amount: 19.99, status: "failed", date: "Yesterday, 4:23 PM" },
    ]

    // If all businesses are selected or multiple businesses
    if (selectedBusinesses.length > 1) {
      // Show transactions from different businesses
      return [
        {
          id: "TX-8765",
          customer: "Global Corp",
          amount: 325.5,
          status: "completed",
          date: "Today, 3:45 PM",
          business: "Aurum Intel",
        },
        {
          id: "TX-5432",
          customer: "Tech Solutions",
          amount: 189.99,
          status: "completed",
          date: "Today, 2:10 PM",
          business: "Dummy 1",
        },
        {
          id: "TX-9876",
          customer: "Innovate Inc",
          amount: 450.0,
          status: "pending",
          date: "Today, 12:30 PM",
          business: "Dummy 2",
        },
        {
          id: "TX-4321",
          customer: "Future Labs",
          amount: 75.25,
          status: "failed",
          date: "Yesterday, 5:15 PM",
          business: "Dummy 3",
        },
      ]
    } else if (selectedBusinesses.length === 1) {
      // Get data for specific business
      const businessId = selectedBusinesses[0]
      const businessIndex = Number.parseInt(businessId) - 1
      const business = businessProfiles[businessIndex]

      // Business-specific transactions
      if (businessIndex === 0) {
        return [
          {
            id: "TX-1234",
            customer: "John Doe",
            amount: 125.99,
            status: "completed",
            date: "Today, 2:30 PM",
            business: business.name,
          },
          {
            id: "TX-1235",
            customer: "Jane Smith",
            amount: 74.5,
            status: "completed",
            date: "Today, 1:15 PM",
            business: business.name,
          },
          {
            id: "TX-1236",
            customer: "Bob Johnson",
            amount: 249.99,
            status: "pending",
            date: "Today, 11:42 AM",
            business: business.name,
          },
          {
            id: "TX-1237",
            customer: "Alice Brown",
            amount: 19.99,
            status: "failed",
            date: "Yesterday, 4:23 PM",
            business: business.name,
          },
        ]
      } else if (businessIndex === 1) {
        return [
          {
            id: "TX-5432",
            customer: "Tech Solutions",
            amount: 189.99,
            status: "completed",
            date: "Today, 2:10 PM",
            business: business.name,
          },
          {
            id: "TX-5433",
            customer: "Data Systems",
            amount: 299.5,
            status: "completed",
            date: "Today, 12:45 PM",
            business: business.name,
          },
          {
            id: "TX-5434",
            customer: "Cloud Services",
            amount: 149.99,
            status: "pending",
            date: "Today, 10:30 AM",
            business: business.name,
          },
          {
            id: "TX-5435",
            customer: "Network Solutions",
            amount: 89.99,
            status: "failed",
            date: "Yesterday, 3:15 PM",
            business: business.name,
          },
        ]
      } else if (businessIndex === 2) {
        return [
          {
            id: "TX-9876",
            customer: "Innovate Inc",
            amount: 450.0,
            status: "completed",
            date: "Today, 3:20 PM",
            business: business.name,
          },
          {
            id: "TX-9877",
            customer: "Creative Labs",
            amount: 275.5,
            status: "completed",
            date: "Today, 1:45 PM",
            business: business.name,
          },
          {
            id: "TX-9878",
            customer: "Design Studio",
            amount: 350.0,
            status: "pending",
            date: "Today, 11:15 AM",
            business: business.name,
          },
          {
            id: "TX-9879",
            customer: "Concept Works",
            amount: 125.75,
            status: "failed",
            date: "Yesterday, 4:50 PM",
            business: business.name,
          },
        ]
      } else if (businessIndex === 3) {
        return [
          {
            id: "TX-4321",
            customer: "Future Labs",
            amount: 175.25,
            status: "completed",
            date: "Today, 3:10 PM",
            business: business.name,
          },
          {
            id: "TX-4322",
            customer: "Quantum Research",
            amount: 225.0,
            status: "completed",
            date: "Today, 1:30 PM",
            business: business.name,
          },
          {
            id: "TX-4323",
            customer: "Dynamics Group",
            amount: 199.99,
            status: "pending",
            date: "Today, 10:45 AM",
            business: business.name,
          },
          {
            id: "TX-4324",
            customer: "Frontier Tech",
            amount: 150.5,
            status: "failed",
            date: "Yesterday, 5:20 PM",
            business: business.name,
          },
        ]
      }
    }

    // Default case - no businesses selected
    return baseTransactions
  }, [selectedBusinesses])

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment activity</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            <span>View All</span>
            <ArrowRightIcon className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    transaction.status === "completed"
                      ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : transaction.status === "pending"
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
                  )}
                >
                  {transaction.status === "completed" ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : transaction.status === "pending" ? (
                    <InfoIcon className="h-5 w-5" />
                  ) : (
                    <AlertCircleIcon className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{transaction.customer}</div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.id} • {transaction.date}
                    {transaction.business && ` • ${transaction.business}`}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(transaction.amount)}</div>
                <div className="text-xs">
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      transaction.status === "completed"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200"
                        : transaction.status === "pending"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200"
                          : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200",
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

