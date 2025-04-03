"use client"

import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import { format } from "date-fns"

// Status color function for payouts
export function getPayoutStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
    case "failed":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
    case "scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
  }
}

// Sample data for payouts
const payoutsData = [
  {
    id: "payout_1234567890",
    amount: "$2,500.00",
    status: "Paid",
    date: "2023-03-15",
    destination: "Bank Account ****1234",
    reference: "PAYOUT-MAR-15",
    fee: "$0.25",
  },
  {
    id: "payout_2345678901",
    amount: "$1,750.00",
    status: "Pending",
    date: "2023-03-22",
    destination: "Bank Account ****1234",
    reference: "PAYOUT-MAR-22",
    fee: "$0.25",
  },
  {
    id: "payout_3456789012",
    amount: "$3,200.00",
    status: "Scheduled",
    date: "2023-03-29",
    destination: "Bank Account ****1234",
    reference: "PAYOUT-MAR-29",
    fee: "$0.25",
  },
  {
    id: "payout_4567890123",
    amount: "$950.00",
    status: "Failed",
    date: "2023-03-08",
    destination: "Bank Account ****5678",
    reference: "PAYOUT-MAR-08",
    fee: "$0.25",
  },
  {
    id: "payout_5678901234",
    amount: "$1,850.00",
    status: "Paid",
    date: "2023-03-01",
    destination: "Bank Account ****1234",
    reference: "PAYOUT-MAR-01",
    fee: "$0.25",
  },
]

export function PayoutsPage() {
  const columns = [
    { key: "id", header: "Payout ID" },
    {
      key: "date",
      header: "Date",
      cell: (item) => format(new Date(item.date), "MMM d, yyyy"),
    },
    { key: "destination", header: "Destination" },
    { key: "reference", header: "Reference" },
    {
      key: "amount",
      header: "Amount",
      cell: (item) => <span className="font-medium">{item.amount}</span>,
      className: "text-right",
    },
    {
      key: "fee",
      header: "Fee",
      className: "text-right",
    },
    { key: "status", header: "Status" },
  ]

  const actions = [
    {
      label: "View Receipt",
      onClick: (item) => console.log("View receipt for", item.id),
    },
    {
      label: "Download Statement",
      onClick: (item) => console.log("Download statement for", item.id),
    },
  ]

  return (
    <TransactionsTable
      title="Payouts"
      description="View and manage your payouts to connected bank accounts"
      searchPlaceholder="Search payouts..."
      data={payoutsData}
      columns={columns}
      actions={actions}
      getStatusColor={getPayoutStatusColor}
    />
  )
}

