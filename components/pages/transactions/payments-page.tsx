"use client"

import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import { paymentsData } from "@/lib/transaction-utils"

export function PaymentsPage() {
  // Define the status color function locally to avoid server component error
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
      case "failed":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
      case "refunded":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  const columns = [
    { key: "id", header: "Payment ID" },
    {
      key: "customer",
      header: "Customer",
      cell: (item) => (
        <div className="flex flex-col">
          <span>{item.customer}</span>
          <span className="text-xs text-muted-foreground">{item.email}</span>
        </div>
      ),
    },
    { key: "method", header: "Method" },
    { key: "processor", header: "Processor" },
    { key: "date", header: "Date" },
    {
      key: "amount",
      header: "Amount",
      cell: (item) => <span className="font-medium">{item.amount}</span>,
      className: "text-right",
    },
    { key: "status", header: "Status" },
  ]

  return (
    <TransactionsTable
      title="Payments"
      description="View and manage all payment transactions"
      searchPlaceholder="Search payments..."
      data={paymentsData}
      columns={columns}
      getStatusColor={getStatusColor}
    />
  )
}