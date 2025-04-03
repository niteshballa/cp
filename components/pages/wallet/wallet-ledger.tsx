"use client"

import { useState } from "react"
import { ArrowDownLeftIcon, ArrowUpRightIcon, DownloadIcon, FilterIcon, SearchIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"

// Sample ledger data
const ledgerEntries = [
  {
    id: "TRX-001",
    date: "2023-03-15",
    description: "Payment from Client A",
    amount: 1245.5,
    type: "credit",
    category: "payment",
    balance: 24563.65,
  },
  {
    id: "TRX-002",
    date: "2023-03-14",
    description: "Withdrawal to Bank Account",
    amount: 500.0,
    type: "debit",
    category: "withdrawal",
    balance: 23318.15,
  },
  {
    id: "TRX-003",
    date: "2023-03-12",
    description: "Payment from Client B",
    amount: 850.75,
    type: "credit",
    category: "payment",
    balance: 23818.15,
  },
  {
    id: "TRX-004",
    date: "2023-03-10",
    description: "Subscription Fee",
    amount: 29.99,
    type: "debit",
    category: "fee",
    balance: 22967.4,
  },
  {
    id: "TRX-005",
    date: "2023-03-08",
    description: "Payment from Client C",
    amount: 1500.0,
    type: "credit",
    category: "payment",
    balance: 22997.39,
  },
  {
    id: "TRX-006",
    date: "2023-03-05",
    description: "Platform Commission",
    amount: 75.25,
    type: "debit",
    category: "fee",
    balance: 21497.39,
  },
  {
    id: "TRX-007",
    date: "2023-03-03",
    description: "Currency Exchange Fee",
    amount: 12.5,
    type: "debit",
    category: "fee",
    balance: 21572.64,
  },
  {
    id: "TRX-008",
    date: "2023-03-01",
    description: "Payment from Client D",
    amount: 950.0,
    type: "credit",
    category: "payment",
    balance: 21585.14,
  },
]

export function WalletLedger() {
  const [searchQuery, setSearchQuery] = useState("")
  const { config } = useConfig()

  const filteredEntries = ledgerEntries.filter(
    (entry) =>
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="shadow-sm rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Transaction Ledger</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Complete history of all your wallet transactions</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="w-full pl-8 sm:w-[200px] h-9 text-sm rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-input">
              <FilterIcon className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-input">
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold">Transaction ID</TableHead>
                <TableHead className="text-xs font-semibold">Date</TableHead>
                <TableHead className="text-xs font-semibold">Description</TableHead>
                <TableHead className="text-xs font-semibold">Type</TableHead>
                <TableHead className="text-xs font-semibold text-right">Amount</TableHead>
                <TableHead className="text-xs font-semibold text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <TableRow key={entry.id} className={cn(config.animations && "transition-colors hover:bg-muted/50")}>
                    <TableCell className="text-xs font-medium">{entry.id}</TableCell>
                    <TableCell className="text-xs">{entry.date}</TableCell>
                    <TableCell className="text-xs">{entry.description}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "flex w-fit items-center gap-1 text-xs py-0.5 px-1.5 font-medium rounded-full",
                          entry.type === "credit"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400",
                        )}
                      >
                        {entry.type === "credit" ? (
                          <ArrowDownLeftIcon className="h-3 w-3" />
                        ) : (
                          <ArrowUpRightIcon className="h-3 w-3" />
                        )}
                        {entry.type === "credit" ? "Credit" : "Debit"}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right text-xs font-medium",
                        entry.type === "credit"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400",
                      )}
                    >
                      {entry.type === "credit" ? "+" : "-"}${entry.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-xs font-medium">${entry.balance.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-sm">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}