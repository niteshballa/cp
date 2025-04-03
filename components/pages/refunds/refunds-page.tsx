"use client"

import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import { getRefundStatusColor, refundsData } from "@/lib/transaction-utils"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export function RefundsPage() {
  // Format status for better display
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  // Define custom actions for refunds
  const refundActions = [
    {
      label: "Process refund",
      onClick: (refund: { id: any }) => console.log("Processing refund for", refund.id),
    },
    {
      label: "Contact customer",
      onClick: (refund: { id: any }) => console.log("Contacting customer about refund", refund.id),
    },
  ]

  const columns = [
    {
      key: "id",
      header: "Refund ID",
      cell: (item: { id: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => <span className="font-medium">{item.id}</span>
    },
    {
      key: "paymentId",
      header: "Payment ID",
      cell: (item: { paymentId: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => <span className="text-muted-foreground">{item.paymentId}</span>
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
      key: "reason",
      header: "Reason",
      cell: (item: { reason: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => <span className="text-sm max-w-[200px] truncate block">{item.reason}</span>
    },
    {
      key: "date",
      header: "Date",
      cell: (item: { date: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => <span className="text-sm whitespace-nowrap">{item.date}</span>
    },
    {
      key: "amount",
      header: "Amount",
      cell: (item: { amount: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => <span className="font-medium whitespace-nowrap">{item.amount}</span>,
      className: "text-right",
    },
    { key: "status", header: "Status" }
  ]

  return (
    <TransactionsTable
      title="Refunds"
      description="View and manage all refund transactions"
      searchPlaceholder="Search refunds..."
      data={refundsData}
      columns={columns}
      actions={refundActions}
      getStatusColor={getRefundStatusColor}
      formatStatus={formatStatus}
    />
  )
}