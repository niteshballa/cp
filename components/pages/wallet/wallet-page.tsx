"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/ui/page-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  EyeOffIcon,
  CreditCardIcon,
  BanknoteIcon as BankIcon,
  TrendingDownIcon,
  DollarSignIcon,
  CalendarIcon,
  InfoIcon,
} from "lucide-react"
import { TransactionsTable } from "@/components/pages/transactions/transactions-table"
import { cn } from "@/lib/utils"

// Sample data
const walletTransactions = [
  {
    id: "txn_1234567890",
    type: "deposit",
    amount: "$750.00",
    status: "completed",
    date: "Mar 21, 2025",
    description: "Payment from Customer #1234",
    source: "Credit Card ****4242",
  },
  {
    id: "txn_0987654321",
    type: "withdrawal",
    amount: "$1,200.00",
    status: "completed",
    date: "Mar 20, 2025",
    description: "Withdrawal to Bank Account",
    source: "Bank Account ****1234",
  },
  {
    id: "txn_5678901234",
    type: "payment",
    amount: "$350.00",
    status: "completed",
    date: "Mar 19, 2025",
    description: "Payment from Customer #5678",
    source: "Credit Card ****1234",
  },
  {
    id: "txn_3456789012",
    type: "deposit",
    amount: "$500.00",
    status: "pending",
    date: "Mar 18, 2025",
    description: "Deposit from Bank Account",
    source: "Bank Account ****5678",
  },
  {
    id: "txn_6789012345",
    type: "refund",
    amount: "$125.00",
    status: "completed",
    date: "Mar 17, 2025",
    description: "Refund to Customer #9012",
    source: "Credit Card ****5678",
  },
]

const paymentMethods = [
  {
    id: "pm_1234567890",
    type: "card",
    name: "Visa ending in 4242",
    last4: "4242",
    expiryDate: "12/2026",
    isDefault: true,
  },
  {
    id: "pm_0987654321",
    type: "bank",
    name: "Chase Bank Account",
    last4: "1234",
    isDefault: false,
  },
]

const balances = [
  { currency: "USD", amount: 12345.67, pending: 1250.0, reserved: 500.0 },
  { currency: "EUR", amount: 10234.56, pending: 850.0, reserved: 300.0 },
  { currency: "GBP", amount: 8765.43, pending: 650.0, reserved: 200.0 },
]

const quickActions = [
  { icon: <ArrowUpIcon />, label: "Send Money" },
  { icon: <ArrowDownIcon />, label: "Request Money" },
  { icon: <CreditCardIcon />, label: "Virtual Card" },
  { icon: <DollarSignIcon />, label: "Exchange" },
]

const statements = [
  { period: "March 2025", date: "Apr 1, 2025", count: "24 transactions" },
  { period: "February 2025", date: "Mar 1, 2025", count: "18 transactions" },
  { period: "January 2025", date: "Feb 1, 2025", count: "31 transactions" },
]

// Helper functions
const getTransactionStatusColor = (status) => {
  const statusColors = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
    failed: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  }
  return statusColors[status.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
}

const getTransactionIcon = (type) => {
  const icons = {
    deposit: <ArrowDownIcon className="h-3.5 w-3.5 text-green-500" />,
    withdrawal: <ArrowUpIcon className="h-3.5 w-3.5 text-red-500" />,
    payment: <DollarSignIcon className="h-3.5 w-3.5 text-blue-500" />,
    refund: <TrendingDownIcon className="h-3.5 w-3.5 text-purple-500" />,
  }
  return icons[type] || <DollarSignIcon className="h-3.5 w-3.5" />
}

// Define transaction columns for reuse
const transactionColumns = [
  {
    key: "description",
    header: "Transaction",
    cell: (item) => (
      <div className="flex items-center gap-3">
        <div className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {getTransactionIcon(item.type)}
        </div>
        <div>
          <div className="font-medium text-sm">{item.description}</div>
          <div className="text-[10px] text-muted-foreground">{item.source}</div>
        </div>
      </div>
    ),
  },
  { key: "date", header: "Date" },
  {
    key: "amount",
    header: "Amount",
    cell: (item) => (
      <span
        className={cn(
          "text-sm",
          ["withdrawal", "refund"].includes(item.type) ? "text-red-600" : "text-green-600",
        )}
      >
        {["withdrawal", "refund"].includes(item.type) ? "-" : "+"}
        {item.amount}
      </span>
    ),
    className: "text-right",
  },
  { key: "status", header: "Status" },
]

export function WalletPage() {
  // State management
  const [showBalance, setShowBalance] = useState(true)
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  // Get selected balance
  const selectedBalance = balances.find((b) => b.currency === selectedCurrency) || balances[0]

  // Formatting helpers
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Summary and Quick Actions Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Balance Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-100 dark:border-blue-900 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CardDescription className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Available Balance
                  </CardDescription>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <InfoIcon className="h-3 w-3" />
                  </button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="h-7 w-7 text-blue-600 dark:text-blue-400"
                >
                  {showBalance ? <EyeOffIcon className="h-3.5 w-3.5" /> : <EyeIcon className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-[70px] h-8 bg-white/50 dark:bg-white/10 border-blue-200 dark:border-blue-800">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {balances.map((balance) => (
                      <SelectItem key={balance.currency} value={balance.currency} className="py-1">
                        <span className="text-sm">{balance.currency}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <CardTitle className="text-xl font-semibold text-blue-700 dark:text-blue-300">
                  {showBalance ? formatCurrency(selectedBalance.amount, selectedCurrency) : "••••••"}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {/* Use a loop for balance info boxes */}
                {[
                  { label: "Pending", value: selectedBalance.pending },
                  { label: "Reserved", value: selectedBalance.reserved }
                ].map((item, index) => (
                  <div key={index} className="bg-white/60 dark:bg-white/5 rounded-xl p-2.5">
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{item.label}</div>
                    <div className="text-base font-semibold text-blue-700 dark:text-blue-300">
                      {showBalance ? formatCurrency(item.value, selectedCurrency) : "••••••"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-blue-600 dark:text-blue-400 border-t border-blue-100 dark:border-blue-900 pt-3">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>Last updated: Today, 2:30 PM</span>
              </div>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card className="md:col-span-2 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Manage Your Funds</CardTitle>
                <div className="flex gap-2">
                  {/* Action buttons */}
                  <Dialog open={isWithdrawing} onOpenChange={setIsWithdrawing}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1.5">
                        <ArrowUpIcon className="h-3.5 w-3.5" />
                        Withdraw
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Withdraw Funds</DialogTitle>
                        <DialogDescription>Withdraw funds to your connected bank account or card.</DialogDescription>
                      </DialogHeader>
                      <form className="space-y-5 py-4">
                        <div className="space-y-3">
                          <Label htmlFor="withdraw-amount" className="text-sm font-medium">
                            Amount
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input id="withdraw-amount" placeholder="0.00" className="pl-8 h-9" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="withdraw-destination" className="text-sm font-medium">
                            Destination
                          </Label>
                          <Select defaultValue={paymentMethods[0].id}>
                            <SelectTrigger className="h-9">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              {paymentMethods.map((method) => (
                                <SelectItem key={method.id} value={method.id} className="py-1.5">
                                  <div className="flex items-center gap-2">
                                    {method.type === "card" ? (
                                      <CreditCardIcon className="h-3.5 w-3.5" />
                                    ) : (
                                      <BankIcon className="h-3.5 w-3.5" />
                                    )}
                                    <span className="text-sm">{method.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="withdraw-note" className="text-sm font-medium">
                            Note (Optional)
                          </Label>
                          <Input id="withdraw-note" placeholder="Add a note to this withdrawal" className="h-9" />
                        </div>
                        <DialogFooter className="mt-6">
                          <Button type="submit" size="sm">
                            Withdraw Funds
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isDepositing} onOpenChange={setIsDepositing}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="h-8 gap-1.5">
                        <ArrowDownIcon className="h-3.5 w-3.5" />
                        Deposit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Deposit Funds</DialogTitle>
                        <DialogDescription>Add funds to your wallet from a connected payment method.</DialogDescription>
                      </DialogHeader>
                      <form className="space-y-5 py-4">
                        <div className="space-y-3">
                          <Label htmlFor="deposit-amount" className="text-sm font-medium">
                            Amount
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input id="deposit-amount" placeholder="0.00" className="pl-8 h-9" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="deposit-source" className="text-sm font-medium">
                            Source
                          </Label>
                          <Select defaultValue={paymentMethods[0].id}>
                            <SelectTrigger className="h-9">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              {paymentMethods.map((method) => (
                                <SelectItem key={method.id} value={method.id} className="py-1.5">
                                  <div className="flex items-center gap-2">
                                    {method.type === "card" ? (
                                      <CreditCardIcon className="h-3.5 w-3.5" />
                                    ) : (
                                      <BankIcon className="h-3.5 w-3.5" />
                                    )}
                                    <span className="text-sm">{method.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="deposit-note" className="text-sm font-medium">
                            Note (Optional)
                          </Label>
                          <Input id="deposit-note" placeholder="Add a note to this deposit" className="h-9" />
                        </div>
                        <DialogFooter className="mt-6">
                          <Button type="submit" size="sm">
                            Deposit Funds
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Manage your funds and transactions</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Loop through quick actions */}
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto flex flex-col items-center justify-center py-3 px-2 gap-2 border-dashed"
                  >
                    <div className="h-5 w-5 text-gray-500">{action.icon}</div>
                    <span className="text-sm">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-9 bg-transparent p-0 mb-4">
            {/* Loop through tab options */}
            {["transactions", "payment-methods", "statements"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent h-9 px-4"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Transactions Tab - Direct TransactionsTable component */}
          <TabsContent value="transactions" className="mt-0">
            <TransactionsTable
              title="Transaction History"
              description="View your recent wallet transactions"
              searchPlaceholder="Search transactions..."
              data={walletTransactions}
              columns={transactionColumns}
              getStatusColor={getTransactionStatusColor}
            />
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="mt-0">
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Manage your connected payment methods
                    </CardDescription>
                  </div>
                  <Dialog open={isAddingPaymentMethod} onOpenChange={setIsAddingPaymentMethod}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="h-8 gap-1.5">
                        <PlusIcon className="h-3.5 w-3.5" />
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Add Payment Method</DialogTitle>
                        <DialogDescription>Connect a new bank account or card to your wallet.</DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="card" className="mt-4">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="card" className="text-sm font-medium">
                            Credit Card
                          </TabsTrigger>
                          <TabsTrigger value="bank" className="text-sm font-medium">
                            Bank Account
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="space-y-5 py-4">
                          <div className="space-y-3">
                            <Label htmlFor="card-number" className="text-sm font-medium">
                              Card Number
                            </Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" className="h-9" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label htmlFor="expiry" className="text-sm font-medium">
                                Expiry Date
                              </Label>
                              <Input id="expiry" placeholder="MM/YY" className="h-9" />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="cvc" className="text-sm font-medium">
                                CVC
                              </Label>
                              <Input id="cvc" placeholder="123" className="h-9" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="card-name" className="text-sm font-medium">
                              Name on Card
                            </Label>
                            <Input id="card-name" placeholder="John Doe" className="h-9" />
                          </div>
                          <DialogFooter>
                            <Button type="submit" size="sm">
                              Add Card
                            </Button>
                          </DialogFooter>
                        </TabsContent>
                        <TabsContent value="bank" className="space-y-5 py-4">
                          <div className="space-y-3">
                            <Label htmlFor="account-name" className="text-sm font-medium">
                              Account Holder Name
                            </Label>
                            <Input id="account-name" placeholder="John Doe" className="h-9" />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="routing-number" className="text-sm font-medium">
                              Routing Number
                            </Label>
                            <Input id="routing-number" placeholder="123456789" className="h-9" />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="account-number" className="text-sm font-medium">
                              Account Number
                            </Label>
                            <Input id="account-number" placeholder="1234567890" className="h-9" />
                          </div>
                          <DialogFooter>
                            <Button type="submit" size="sm">
                              Add Bank Account
                            </Button>
                          </DialogFooter>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          {method.type === "card" ? (
                            <CreditCardIcon className="h-4 w-4 text-blue-600" />
                          ) : (
                            <BankIcon className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{method.name}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {method.type === "card" ? `Expires ${method.expiryDate}` : "Bank Account"}
                            {method.isDefault && (
                              <span className="ml-2 text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-1.5 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-7 text-sm px-2">
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-sm px-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <InfoIcon className="h-3 w-3" />
                  <span>Payment methods are securely stored and processed</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Statements Tab */}
          <TabsContent value="statements" className="mt-0">
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Account Statements</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      View and download your monthly account statements
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5">
                    <DollarSignIcon className="h-3.5 w-3.5" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="h-10 px-4 text-left text-sm font-medium text-muted-foreground">Period</th>
                        <th className="h-10 px-4 text-left text-sm font-medium text-muted-foreground">
                          Date Generated
                        </th>
                        <th className="h-10 px-4 text-left text-sm font-medium text-muted-foreground">
                          Transaction Count
                        </th>
                        <th className="h-10 px-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statements.map((statement, index) => (
                        <tr key={index} className={index < statements.length - 1 ? "border-b" : ""}>
                          <td className="h-12 px-4 text-sm font-medium">{statement.period}</td>
                          <td className="h-12 px-4 text-sm">{statement.date}</td>
                          <td className="h-12 px-4 text-sm">{statement.count}</td>
                          <td className="h-12 px-4 text-right">
                            <Button variant="ghost" size="sm" className="h-6 text-sm px-2">
                              <DollarSignIcon className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}