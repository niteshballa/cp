"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState, useMemo, useCallback } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SearchIcon, FilterIcon, DownloadIcon, ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ErrorBoundary } from "@/components/error-boundary"
import { motion, AnimatePresence } from "framer-motion"

// Sample wallet data
const wallets = [
  { currency: "USD", symbol: "$", balance: 1119.34, available: 987.45 },
  { currency: "EUR", symbol: "€", balance: 842.18, available: 842.18 },
  { currency: "GBP", symbol: "£", balance: 756.92, available: 756.92 },
  { currency: "INR", symbol: "₹", balance: 72972.7, available: 65280.5 },
]

// Sample transaction data
const transactions = [
  {
    id: "txn_1OPH7SS9wUdyjg4jXNForn",
    date: "2025-03-20T07:30:47Z",
    amount: -68.66,
    type: "Payment Fees",
    status: "completed",
    description: "Transaction fee for payment #PAY-1234",
    currency: "USD",
  },
  {
    id: "txn_2OPH7SS9wUdyjg4jXNForn",
    date: "2025-03-20T07:30:47Z",
    amount: -53.0,
    type: "Tax",
    status: "completed",
    description: "Tax deduction for payment #PAY-1234",
    currency: "USD",
  },
  {
    id: "txn_3OPH7SS9wUdyjg4jXNForn",
    date: "2025-03-20T07:30:47Z",
    amount: 1241.0,
    type: "Payment",
    status: "completed",
    description: "Payment received from customer@example.com",
    currency: "USD",
  },
  {
    id: "txn_4oneWW47p0yfig2fWNNsr",
    date: "2025-03-19T15:45:22Z",
    amount: -52.39,
    type: "Payment Fees",
    status: "completed",
    description: "Transaction fee for payment #PAY-5678",
    currency: "USD",
  },
  {
    id: "txn_5oneWW47p0yfig2fWNNsr",
    date: "2025-03-19T15:45:22Z",
    amount: -184.52,
    type: "Tax",
    status: "completed",
    description: "Tax deduction for payment #PAY-5678",
    currency: "USD",
  },
  {
    id: "txn_6oneWW47p0yfig2fWNNsr",
    date: "2025-03-19T15:45:22Z",
    amount: 1209.61,
    type: "Payment",
    status: "completed",
    description: "Payment received from another@example.com",
    currency: "USD",
  },
]

export function LedgerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("transactions")
  const [transactionType, setTransactionType] = useState("all")
  const [currency, setCurrency] = useState("USD")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const itemsPerPage = 5

  // Memoize filtered transactions to prevent unnecessary recalculations
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.description && transaction.description.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = transactionType === "all" || transaction.type === transactionType
      const matchesCurrency = transaction.currency === currency

      return matchesSearch && matchesType && matchesCurrency
    })
  }, [searchQuery, transactionType, currency])

  // Memoize pagination calculations
  const { totalPages, paginatedTransactions } = useMemo(() => {
    const total = Math.ceil(filteredTransactions.length / itemsPerPage)
    const paginated = filteredTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    return { totalPages: total, paginatedTransactions: paginated }
  }, [filteredTransactions, page, itemsPerPage])

  // Memoize animation variants
  const container = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  )

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }),
    [],
  )

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1) // Reset to first page on new search
  }, [])

  // Handle transaction type change
  const handleTypeChange = useCallback((value: string) => {
    setTransactionType(value)
    setPage(1) // Reset to first page on filter change
  }, [])

  // Handle currency change
  const handleCurrencyChange = useCallback((value: string) => {
    setCurrency(value)
    setPage(1) // Reset to first page on currency change
  }, [])

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    setSearchQuery("")
    setTransactionType("all")
    setPage(1)
  }, [])

  // Handle export data
  const handleExportData = useCallback(() => {
    try {
      setIsLoading(true)

      // In a real app, you would implement the export functionality here
      // For example:
      // const csvContent = convertToCSV(filteredTransactions);
      // downloadCSV(csvContent, 'ledger-transactions.csv');

      setTimeout(() => {
        setIsLoading(false)
        // Show success message
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to export data"))
      setIsLoading(false)
    }
  }, [filteredTransactions])

  // Error state
  if (error) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <div className="text-destructive text-xl">Error loading ledger data</div>
          <p className="text-muted-foreground">{error.message}</p>
          <Button onClick={() => setError(null)}>Try Again</Button>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <ErrorBoundary
        fallback={<div className="p-4 border border-destructive rounded-md">Error loading ledger content</div>}
      >
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={handleResetFilters}
                disabled={searchQuery === "" && transactionType === "all"}
              >
                <FilterIcon className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleExportData}
                disabled={isLoading || filteredTransactions.length === 0}
              >
                <DownloadIcon className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="balances">Balances</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="balances" className="mt-4">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                >
                  {wallets.map((wallet) => (
                    <motion.div key={wallet.currency} variants={item} layout>
                      <Card className="bg-card hover:shadow-md transition-all duration-300 p-4">
                        <div className="text-sm text-muted-foreground mb-2">{wallet.currency} Wallet Balance</div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center">
                            <span className="text-2xl">{wallet.symbol}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-2xl font-bold">
                              {wallet.balance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Available:{" "}
                              {wallet.available.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="transactions" className="mt-4">
                <Card className="shadow-sm">
                  <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center gap-2">
                      <Select value={transactionType} onValueChange={handleTypeChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Transaction Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Payment">Payments</SelectItem>
                          <SelectItem value="Payment Fees">Fees</SelectItem>
                          <SelectItem value="Tax">Taxes</SelectItem>
                          <SelectItem value="Refund">Refunds</SelectItem>
                          <SelectItem value="Payout">Payouts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="hidden md:table-cell">Transaction ID</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedTransactions.length > 0 ? (
                          paginatedTransactions.map((transaction, index) => (
                            <TableRow key={`${transaction.id}-${index}`}>
                              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                              <TableCell className="max-w-[200px] truncate" title={transaction.description}>
                                {transaction.description}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    transaction.type === "Payment"
                                      ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                      : transaction.type === "Tax"
                                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                        : transaction.type === "Payment Fees"
                                          ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                          : transaction.type === "Refund"
                                            ? "bg-red-500/10 text-red-500 border-red-500/20"
                                            : "bg-green-500/10 text-green-500 border-green-500/20"
                                  }
                                >
                                  {transaction.type}
                                </Badge>
                              </TableCell>
                              <TableCell className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                                {transaction.amount < 0 ? "-" : "+"}
                                {transaction.currency === "USD"
                                  ? "$"
                                  : transaction.currency === "EUR"
                                    ? "€"
                                    : transaction.currency === "GBP"
                                      ? "£"
                                      : "₹"}
                                {Math.abs(transaction.amount).toFixed(2)}
                              </TableCell>
                              <TableCell className="hidden md:table-cell font-mono text-xs">{transaction.id}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <ChevronDownIcon className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                                    {transaction.type === "Payment" && (
                                      <DropdownMenuItem>Create Refund</DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6">
                              No transactions found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {filteredTransactions.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                      >
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          // Show first page, last page, current page, and pages around current
                          let pageNum
                          if (totalPages <= 5) {
                            pageNum = i + 1
                          } else if (page <= 3) {
                            pageNum = i + 1
                          } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                          } else {
                            pageNum = page - 2 + i
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant={pageNum === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPage(pageNum)}
                            >
                              {pageNum}
                            </Button>
                          )
                        })}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                      >
                        Next
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </ErrorBoundary>
    </PageContainer>
  )
}

