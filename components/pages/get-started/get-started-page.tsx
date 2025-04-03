"use client"

import { useState, useEffect } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCardIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CodeIcon,
  ShieldCheckIcon,
  LightbulbIcon,
  CircleDollarSignIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export function GetStartedPage() {
  const [activeTab, setActiveTab] = useState("quick-payment")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 600)
  }, [])

  return (
    <PageContainer>
      <div className="space-y-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Skeleton className="h-[460px] md:col-span-2 rounded-xl" />
            <div className="space-y-10">
              <Skeleton className="h-[180px] rounded-xl" />
              <Skeleton className="h-[220px] rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="md:col-span-2">
              <CardHeader className="pb-6">
                <CardTitle>Try a Test Payment</CardTitle>
                <CardDescription>Process a test payment to see how bnplx works</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-8 w-full">
                    <TabsTrigger value="quick-payment">Quick Payment</TabsTrigger>
                    <TabsTrigger value="checkout-link">Checkout Link</TabsTrigger>
                    <TabsTrigger value="api">API</TabsTrigger>
                  </TabsList>

                  <TabsContent value="quick-payment" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <div className="flex mt-3">
                          <Select defaultValue="USD">
                            <SelectTrigger className="w-[80px] rounded-r-none">
                              <SelectValue placeholder="USD" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="INR">INR</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input id="amount" placeholder="100.00" className="rounded-l-none" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select defaultValue="card">
                          <SelectTrigger className="mt-3">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Credit Card</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="wallet">Digital Wallet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="4242 4242 4242 4242" className="mt-3" />
                      <p className="text-xs text-muted-foreground mt-3">
                        Use 4242 4242 4242 4242 for a successful test payment
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-3" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="mt-3" />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="checkout-link" className="space-y-8">
                    <div>
                      <Label htmlFor="checkout-amount">Amount</Label>
                      <div className="flex mt-3">
                        <Select defaultValue="USD">
                          <SelectTrigger className="w-[80px] rounded-r-none">
                            <SelectValue placeholder="USD" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="INR">INR</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="checkout-amount" placeholder="100.00" className="rounded-l-none" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" placeholder="Test Product" className="mt-3" />
                    </div>

                    <div>
                      <Label htmlFor="customer-email">Customer Email (Optional)</Label>
                      <Input id="customer-email" placeholder="customer@example.com" className="mt-3" />
                    </div>
                  </TabsContent>

                  <TabsContent value="api" className="space-y-8">
                    <div className="bg-muted p-6 rounded-md font-mono text-xs overflow-x-auto">
                      <pre>{`curl -X POST https://api.bnplx.com/v1/payments \\
  -H "Authorization: Bearer YOUR_SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "currency": "usd",
    "payment_method_types": ["card"],
    "payment_method_data": {
      "type": "card",
      "card": {
        "number": "4242424242424242",
        "exp_month": 12,
        "exp_year": 2025,
        "cvc": "123"
      }
    }
  }'`}</pre>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Replace <code className="bg-muted px-1 py-0.5 rounded text-xs">YOUR_SECRET_KEY</code> with your test API key
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="pt-8">
                <Button className="w-full">
                  {activeTab === "api" ? "Copy Code" : activeTab === "checkout-link" ? "Generate Link" : "Process Payment"}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-10">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/business/account-summary">
                      <CreditCardIcon className="mr-3 h-4 w-4" />
                      Account Summary
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/developer/api">
                      <CodeIcon className="mr-3 h-4 w-4" />
                      API Documentation
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/verification/kyc">
                      <ShieldCheckIcon className="mr-3 h-4 w-4" />
                      Verification
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/business/payouts">
                      <CircleDollarSignIcon className="mr-3 h-4 w-4" />
                      Payouts
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle>Setup Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <div>
                        <p>Account Created</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center",
                          "bg-amber-500/20 text-amber-500 border border-amber-500",
                        )}
                      >
                        <span className="text-xs">2</span>
                      </div>
                      <div>
                        <p>Verify Identity</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center",
                          "bg-muted text-muted-foreground border border-border",
                        )}
                      >
                        <span className="text-xs">3</span>
                      </div>
                      <div>
                        <p>Set Up Payouts</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="w-full bg-muted rounded-full h-1">
                        <div className="bg-green-500 h-1 rounded-full" style={{ width: "33%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">1 of 3 steps completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <Card className="md:col-span-3 bg-muted/10">
            <CardContent className="flex flex-col md:flex-row items-center justify-between py-8">
              <p>Need help getting started?</p>
              <Button size="sm" className="mt-6 md:mt-0">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}