"use client"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, FilterIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Import the ResponsiveTabs component
import { ResponsiveTabs } from "@/components/ui/responsive-tabs"

export function AccountSummaryPage() {
  const [activeTab, setActiveTab] = useState("transactions")

  // Sample wallet data
  const wallets = [
    { currency: "USD", symbol: "$", balance: 1119.34 },
    { currency: "INR", symbol: "₹", balance: 972.7 },
  ]

  // Sample transaction data
  const transactions = [
    {
      id: "pay_I5H7SS9wUdyjg4jXNForn",
      date: "20 Mar 25, 7:30:47 am",
      amount: -68.66,
      type: "Payment Fees",
      status: "completed",
    },
    {
      id: "pay_I5H7SS9wUdyjg4jXNForn",
      date: "20 Mar 25, 7:30:47 am",
      amount: -53.0,
      type: "Tax",
      status: "completed",
    },
    {
      id: "pay_I5H7SS9wUdyjg4jXNForn",
      date: "20 Mar 25, 7:30:47 am",
      amount: 1241.0,
      type: "Payment",
      status: "completed",
    },
    {
      id: "pay_4oneWW47p0yfig2fWNNsr",
      date: "20 Mar 25, 7:30:47 am",
      amount: -52.39,
      type: "Payment Fees",
      status: "completed",
    },
    {
      id: "pay_4oneWW47p0yfig2fWNNsr",
      date: "20 Mar 25, 7:30:47 am",
      amount: -184.52,
      type: "Tax",
      status: "completed",
    },
    {
      id: "pay_4oneWW47p0yfig2fWNNsr",
      date: "20 Mar 25, 7:30:47 am",
      amount: 1209.61,
      type: "Payment",
      status: "completed",
    },
  ]

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Account Statement</h1>
          <p className="text-muted-foreground">A concise ledger of your overall account transactions</p>
        </div>

        {/* Replace the Tabs component with ResponsiveTabs */}
        <div className="flex gap-2">
          <ResponsiveTabs
            tabs={[
              { value: "transactions", label: "Transactions" },
              { value: "documentation", label: "Documentation" },
            ]}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.currency} className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">{wallet.currency} Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center">
                    {wallet.currency === "USD" ? (
                      <span className="text-2xl">$</span>
                    ) : (
                      <span className="text-2xl">₹</span>
                    )}
                  </div>
                  <span className="text-3xl font-bold">
                    {wallet.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
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
                  {transactions.map((transaction) => (
                    <TableRow key={`${transaction.id}-${transaction.type}`}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell
                        className={cn("font-medium", transaction.amount < 0 ? "text-red-500" : "text-green-500")}
                      >
                        {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            transaction.type === "Payment"
                              ? "bg-blue-900/30 text-blue-400 border-blue-800"
                              : transaction.type === "Tax"
                                ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                : "bg-purple-900/30 text-purple-400 border-purple-800",
                          )}
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
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t gap-4">
            <Button variant="outline" size="sm" disabled className="w-full sm:w-auto">
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
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
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Next
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}

