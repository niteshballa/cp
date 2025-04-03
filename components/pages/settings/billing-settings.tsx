"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCardIcon, CheckIcon } from "lucide-react"

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Business Plan</h3>
              <p className="text-sm text-muted-foreground">$49.99/month • Renews on April 1, 2023</p>
            </div>
            <Badge className="bg-primary">Current Plan</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              <span className="text-sm">Unlimited transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              <span className="text-sm">Advanced analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              <span className="text-sm">24/7 customer support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary" />
              <span className="text-sm">Custom branding</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Change Plan</Button>
          <Button variant="destructive">Cancel Subscription</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods and billing address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-16 items-center justify-center rounded-md border bg-muted">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 04/2024</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Add Payment Method</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Invoice #INV-001</p>
                <p className="text-sm text-muted-foreground">March 1, 2023 • $49.99</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Invoice #INV-002</p>
                <p className="text-sm text-muted-foreground">February 1, 2023 • $49.99</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Invoice #INV-003</p>
                <p className="text-sm text-muted-foreground">January 1, 2023 • $49.99</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

