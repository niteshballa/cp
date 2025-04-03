"use client"

import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import { paymentsData } from "@/lib/transaction-utils"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export function PaymentsPage() {
  // Define the status color function locally to avoid server component error
  const getStatusColor = (status: string) => {
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

  // Format status for better display
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  // Define custom actions for payments
  const paymentActions = [
    {
      label: "Issue refund",
      onClick: (payment: { id: any }) => console.log("Issuing refund for", payment.id),
    },
    {
      label: "Send receipt",
      onClick: (payment: { id: any }) => console.log("Sending receipt for", payment.id),
    },
  ]

  const columns = [
    {
      key: "id",
      header: "Payment ID",
      cell: (item: { id: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => <span className="font-medium">{item.id}</span>
    },
    {
      key: "customer",
      header: "Customer",
      cell: (item: { customer: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{item.customer}</span>
          <span className="text-xs text-muted-foreground">{item.email}</span>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      cell: (item: { date: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => <span className="text-sm whitespace-nowrap">{item.date}</span>
    },
    {
      key: "method",
      header: "Payment Method",
      cell: (item: { method: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; processor: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
        <div className="flex flex-col">
          <span className="text-sm">{item.method}</span>
          <span className="text-xs text-muted-foreground">{item.processor}</span>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (item: { amount: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; currency: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
        <div className="text-right">
          <span className="font-medium whitespace-nowrap">{item.amount}</span>
          {item.currency && (
            <span className="text-xs text-muted-foreground ml-1">{item.currency}</span>
          )}
        </div>
      ),
      className: "text-right",
    },
    { key: "status", header: "Status" }
  ]

  return (
    <TransactionsTable
      title="Payments"
      description="View and manage all payment transactions"
      searchPlaceholder="Search payments..."
      data={paymentsData}
      columns={columns}
      actions={paymentActions}
      getStatusColor={getStatusColor}
      formatStatus={formatStatus}
    />
  )
}

