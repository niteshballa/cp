import { PageContainer } from "@/components/ui/page-container"
import { PageTitle } from "@/components/ui/page-title"
import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import { refundsData, getRefundStatusColor, formatCurrency, formatDate } from "@/lib/transaction-utils"

export default function RefundsPage() {
  return (
    <PageContainer>
      <PageTitle heading="Refunds" subheading="View and manage your refund transactions" />

      <TransactionsTable
        title="Refund Transactions"
        description="Track all your refund transactions in one place"
        searchPlaceholder="Search refunds..."
        data={refundsData}
        getStatusColor={getRefundStatusColor}
        columns={[
          {
            key: "id",
            header: "Refund ID",
            cell: (refund) => <div className="font-medium">{refund.id}</div>,
          },
          {
            key: "paymentId",
            header: "Payment ID",
            cell: (refund) => <div className="text-sm text-muted-foreground">{refund.paymentId}</div>,
          },
          {
            key: "date",
            header: "Date",
            cell: (refund) => formatDate(refund.date),
          },
          {
            key: "customer",
            header: "Customer",
            cell: (refund) => (
              <div>
                <div className="font-medium">{refund.customer}</div>
                <div className="text-xs text-muted-foreground">{refund.email}</div>
              </div>
            ),
          },
          {
            key: "reason",
            header: "Reason",
            cell: (refund) => <div className="text-sm">{refund.reason}</div>,
          },
          {
            key: "amount",
            header: "Amount",
            cell: (refund) => <div className="font-medium">{formatCurrency(refund.amount)}</div>,
            className: "text-right",
          },
          {
            key: "status",
            header: "Status",
          },
        ]}
      />
    </PageContainer>
  )
}

