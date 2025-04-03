"use client"

import { useState } from "react"
import { DownloadIcon, EyeIcon, MoreHorizontalIcon, RefreshCwIcon, XCircleIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Sample payment data
const payments = [
  {
    id: "PAY-123456",
    date: "2023-03-15",
    customer: "Alex Johnson",
    email: "alex@example.com",
    amount: 245.5,
    status: "completed",
    method: "Credit Card",
    cardLast4: "4242",
  },
  {
    id: "PAY-123457",
    date: "2023-03-15",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    amount: 1045.0,
    status: "completed",
    method: "PayPal",
    cardLast4: null,
  },
  {
    id: "PAY-123458",
    date: "2023-03-14",
    customer: "Michael Brown",
    email: "michael@example.com",
    amount: 350.25,
    status: "pending",
    method: "Credit Card",
    cardLast4: "1234",
  },
  {
    id: "PAY-123459",
    date: "2023-03-14",
    customer: "Emily Davis",
    email: "emily@example.com",
    amount: 120.75,
    status: "completed",
    method: "Apple Pay",
    cardLast4: null,
  },
  {
    id: "PAY-123460",
    date: "2023-03-13",
    customer: "David Wilson",
    email: "david@example.com",
    amount: 550.0,
    status: "failed",
    method: "Credit Card",
    cardLast4: "5678",
  },
  {
    id: "PAY-123461",
    date: "2023-03-13",
    customer: "Jessica Taylor",
    email: "jessica@example.com",
    amount: 780.5,
    status: "completed",
    method: "Google Pay",
    cardLast4: null,
  },
  {
    id: "PAY-123462",
    date: "2023-03-12",
    customer: "Ryan Martinez",
    email: "ryan@example.com",
    amount: 95.2,
    status: "completed",
    method: "Credit Card",
    cardLast4: "9012",
  },
]

interface PaymentsTableProps {
  searchQuery: string
  statusFilter: string | null
  dateRange: [Date | null, Date | null]
}

export function PaymentsTable({ searchQuery, statusFilter, dateRange }: PaymentsTableProps) {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])

  const filteredPayments = payments.filter((payment) => {
    // Search filter
    const matchesSearch =
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = !statusFilter || payment.status === statusFilter

    // Date filter
    const [startDate, endDate] = dateRange
    const paymentDate = new Date(payment.date)
    const matchesDate = !startDate || !endDate || (paymentDate >= startDate && paymentDate <= endDate)

    return matchesSearch && matchesStatus && matchesDate
  })

  const toggleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([])
    } else {
      setSelectedPayments(filteredPayments.map((p) => p.id))
    }
  }

  const toggleSelectPayment = (id: string) => {
    if (selectedPayments.includes(id)) {
      setSelectedPayments(selectedPayments.filter((p) => p !== id))
    } else {
      setSelectedPayments([...selectedPayments, id])
    }
  }

  return (
    <div>
      {selectedPayments.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50">
          <div className="text-sm">
            {selectedPayments.length} payment{selectedPayments.length > 1 ? "s" : ""} selected
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" variant="destructive">
              <XCircleIcon className="mr-2 h-4 w-4" />
              Cancel Payments
            </Button>
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={selectedPayments.includes(payment.id)}
                      onChange={() => toggleSelectPayment(payment.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{payment.customer}</span>
                      <span className="text-xs text-muted-foreground">{payment.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {payment.method}
                    {payment.cardLast4 && (
                      <span className="text-xs text-muted-foreground ml-1">•••• {payment.cardLast4}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        payment.status === "completed" &&
                          "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400",
                        payment.status === "pending" &&
                          "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
                        payment.status === "failed" &&
                          "bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400",
                      )}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DownloadIcon className="mr-2 h-4 w-4" />
                          Download receipt
                        </DropdownMenuItem>
                        {payment.status === "pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <RefreshCwIcon className="mr-2 h-4 w-4" />
                              Retry payment
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <XCircleIcon className="mr-2 h-4 w-4" />
                              Cancel payment
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  No payments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

