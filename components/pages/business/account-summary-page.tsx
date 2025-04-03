"use client"

import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon, FilterIcon } from "lucide-react"

// Sample wallet data
const wallets = [
  { currency: "USD", symbol: "$", balance: 1119.34 },
  { currency: "INR", symbol: "₹", balance: 972.7 },
]

// Sample transaction data
const transactions = [
  {
    id: "pay_I5H7SS9wUdyjg4jXNForn",
    date: "2025-03-20T07:30:47Z",
    amount: -68.66,
    type: "Payment Fees",
    status: "completed",
  },
  {
    id: "pay_I5H7SS9wUdyjg4jXNForn",
    date: "2025-03-20T07:30:47Z",
    amount: -53.0,
    type: "Tax",
    status: "completed",
  },
  {
    id: "pay_I5H7SS9wUdyjg4jXNForn",
    date: "2025-03-20T07:30:47Z",
    amount: 1241.0,
    type: "Payment",
    status: "completed",
  },
  {
    id: "pay_4oneWW47p0yfig2fWNNsr",
    date: "2025-03-20T07:30:47Z",
    amount: -52.39,
    type: "Payment Fees",
    status: "completed",
  },
  {
    id: "pay_4oneWW47p0yfig2fWNNsr",
    date: "2025-03-20T07:30:47Z",
    amount: -184.52,
    type: "Tax",
    status: "completed",
  },
  {
    id: "pay_4oneWW47p0yfig2fWNNsr",
    date: "2025-03-20T07:30:47Z",
    amount: 1209.61,
    type: "Payment",
    status: "completed",
  },
]

export function AccountSummaryPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Account Statement</h1>
          <p className="text-muted-foreground">A concise ledger of your overall account transactions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.currency}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">{wallet.currency} Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center">
                    <span className="text-2xl">{wallet.symbol}</span>
                  </div>
                  <span className="text-3xl font-bold">
                    {wallet.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Transaction Amount</TableHead>
                  <TableHead>Transaction Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={`${transaction.id}-${transaction.type}-${index}`}>
                    <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                    <TableCell className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                      {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          transaction.type === "Payment"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : transaction.type === "Tax"
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell font-mono text-xs">{transaction.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t gap-4">
            <Button variant="outline" size="sm" disabled>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Next
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}

