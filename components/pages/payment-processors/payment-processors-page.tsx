"use client"

import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import { format } from "date-fns"

// Status color function for processors
export function getProcessorStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
    case "inactive":
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
    case "error":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
  }
}

// Sample data for payment processors
const processorsData = [
  {
    id: "proc_1234567890",
    name: "Stripe",
    status: "Active",
    integration_date: new Date("2023-01-15"),
    transaction_count: 1250,
    transaction_volume: "$125,000.00",
    fee_structure: "2.9% + $0.30",
    api_version: "2023-08-16",
  },
  {
    id: "proc_2345678901",
    name: "PayPal",
    status: "Active",
    integration_date: new Date("2023-02-10"),
    transaction_count: 850,
    transaction_volume: "$76,500.00",
    fee_structure: "3.49% + $0.49",
    api_version: "v2",
  },
  {
    id: "proc_3456789012",
    name: "Adyen",
    status: "Pending",
    integration_date: new Date("2023-03-05"),
    transaction_count: 0,
    transaction_volume: "$0.00",
    fee_structure: "Custom",
    api_version: "v68",
  },
  {
    id: "proc_4567890123",
    name: "Square",
    status: "Inactive",
    integration_date: new Date("2022-11-20"),
    transaction_count: 320,
    transaction_volume: "$28,450.00",
    fee_structure: "2.6% + $0.10",
    api_version: "2023-06-08",
  },
  {
    id: "proc_5678901234",
    name: "Braintree",
    status: "Error",
    integration_date: new Date("2023-01-30"),
    transaction_count: 125,
    transaction_volume: "$12,750.00",
    fee_structure: "2.9% + $0.30",
    api_version: "2023-03",
  },
]

export function PaymentProcessorsPage() {
  const columns = [
    {
      key: "name",
      header: "Processor",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
            <span className="text-xs font-semibold">{item.name.substring(0, 2)}</span>
          </div>
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
    },
    {
      key: "integration_date",
      header: "Integration Date",
      cell: (item) => format(item.integration_date, "MMM d, yyyy"),
    },
    {
      key: "transaction_count",
      header: "Transactions",
      cell: (item) => item.transaction_count.toLocaleString(),
      className: "text-right",
    },
    {
      key: "transaction_volume",
      header: "Volume",
      className: "text-right",
    },
    {
      key: "fee_structure",
      header: "Fee Structure",
    },
  ]

  const actions = [
    {
      label: "Edit Configuration",
      onClick: (item) => console.log("Edit configuration for", item.name),
    },
    {
      label: "View API Logs",
      onClick: (item) => console.log("View API logs for", item.name),
    },
    {
      label: "Disable Integration",
      onClick: (item) => console.log("Disable integration for", item.name),
    },
  ]

  return (
    <TransactionsTable
      title="Payment Processors"
      description="Manage your payment processor integrations"
      searchPlaceholder="Search processors..."
      data={processorsData}
      columns={columns}
      actions={actions}
      getStatusColor={getProcessorStatusColor}
    />
  )
}

