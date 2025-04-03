"use client"

import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import { getDisputeStatusColor, formatDisputeStatus, isDueDateApproaching, disputesData } from "@/lib/transaction-utils"

export function DisputesPage() {
  const columns = [
    { key: "id", header: "Dispute ID" },
    { key: "paymentId", header: "Payment ID" },
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
    { key: "reason", header: "Reason" },
    {
      key: "dueDate",
      header: "Due Date",
      cell: (item) => (
        <span
          className={
            isDueDateApproaching(new Date(item.dueDate)) && !["won", "lost"].includes(item.status.toLowerCase())
              ? "text-red-600 font-medium"
              : ""
          }
        >
          {item.dueDate}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (item) => <span className="font-medium">{item.amount}</span>,
      className: "text-right",
    },
    { key: "status", header: "Status" },
  ]

  const actions = [
    {
      label: "Submit evidence",
      onClick: (item) => console.log("Submit evidence for", item.id),
    },
    {
      label: "Download case file",
      onClick: (item) => console.log("Download case file for", item.id),
    },
  ]

  return (
    <TransactionsTable
      title="Disputes"
      description="View and manage all payment disputes"
      searchPlaceholder="Search disputes..."
      data={disputesData}
      columns={columns}
      actions={actions}
      getStatusColor={getDisputeStatusColor}
      formatStatus={formatDisputeStatus}
    />
  )
}

