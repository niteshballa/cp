"use client"

import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCardIcon, RefreshCwIcon, AlertTriangleIcon } from "lucide-react"

export function TransactionsPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Manage all your payment transactions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-blue-500" />
                Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">View and manage all your payment transactions</p>
              <Button variant="outline" asChild>
                <a href="/transactions/payments">View Payments</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <RefreshCwIcon className="h-5 w-5 text-amber-500" />
                Refunds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Process and track refunds for your customers</p>
              <Button variant="outline" asChild>
                <a href="/transactions/refund">Manage Refunds</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangleIcon className="h-5 w-5 text-rose-500" />
                Disputes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Handle and resolve payment disputes</p>
              <Button variant="outline" asChild>
                <a href="/transactions/disputes">View Disputes</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

