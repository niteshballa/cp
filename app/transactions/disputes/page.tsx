import { PageContainer } from "@/components/ui/page-container"
import { PageTitle } from "@/components/ui/page-title"
import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import {
  disputesData,
  getDisputeStatusColor,
  formatDisputeStatus,
  formatCurrency,
  formatDate,
  isDueDateApproaching,
} from "@/lib/transaction-utils"
import { cn } from "@/lib/utils"

export default function DisputesPage() {
  return (
    <PageContainer>
      <PageTitle heading="Disputes" subheading="View and manage your payment disputes" />

      <TransactionsTable
        title="Dispute Transactions"
        description="Manage all your payment disputes in one place"
        searchPlaceholder="Search disputes..."
        data={disputesData}
        getStatusColor={getDisputeStatusColor}
        formatStatus={formatDisputeStatus}
        columns={[
          {
            key: "id",
            header: "Dispute ID",
            cell: (dispute) => <div className="font-medium">{dispute.id}</div>,
          },
          {
            key: "paymentId",
            header: "Payment ID",
            cell: (dispute) => <div className="text-sm text-muted-foreground">{dispute.paymentId}</div>,
          },
          {
            key: "customer",
            header: "Customer",
            cell: (dispute) => (
              <div>
                <div className="font-medium">{dispute.customer}</div>
                <div className="text-xs text-muted-foreground">{dispute.email}</div>
              </div>
            ),
          },
          {
            key: "reason",
            header: "Reason",
            cell: (dispute) => <div className="text-sm">{dispute.reason}</div>,
          },
          {
            key: "amount",
            header: "Amount",
            cell: (dispute) => <div className="font-medium">{formatCurrency(dispute.amount)}</div>,
            className: "text-right",
          },
          {
            key: "dueDate",
            header: "Due Date",
            cell: (dispute) => (
              <div className={cn("text-sm", isDueDateApproaching(dispute.dueDate) ? "text-amber-600 font-medium" : "")}>
                {formatDate(dispute.dueDate)}
                {isDueDateApproaching(dispute.dueDate) && (
                  <div className="text-xs text-amber-600">Action required soon</div>
                )}
              </div>
            ),
          },
          {
            key: "status",
            header: "Status",
          },
        ]}
        actions={[
          {
            label: "Submit evidence",
            onClick: (dispute) => console.log("Submit evidence for", dispute.id),
          },
          {
            label: "Accept dispute",
            onClick: (dispute) => console.log("Accept dispute", dispute.id),
          },
        ]}
      />
    </PageContainer>
  )
}

