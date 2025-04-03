"use client"

import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WalletBalance() {
  return (
    <Card className="h-full shadow-sm rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Wallet Balance</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Your current balance across all currencies</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="usd">
          <TabsList className="mb-4 h-8">
            <TabsTrigger value="usd" className="text-xs font-medium h-6 px-3">USD</TabsTrigger>
            <TabsTrigger value="eur" className="text-xs font-medium h-6 px-3">EUR</TabsTrigger>
            <TabsTrigger value="gbp" className="text-xs font-medium h-6 px-3">GBP</TabsTrigger>
          </TabsList>
          <TabsContent value="usd">
            <div className="flex flex-col">
              <div className="flex items-center">
                <DollarSignIcon className="mr-2 h-6 w-6 text-primary" />
                <span className="text-2xl font-bold">$24,563.65</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted p-3">
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <ArrowUpIcon className="mr-1 h-3.5 w-3.5 text-emerald-500" />
                    Income
                  </div>
                  <div className="mt-1 text-sm font-semibold">$12,450.80</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Last 30 days</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <ArrowDownIcon className="mr-1 h-3.5 w-3.5 text-rose-500" />
                    Expenses
                  </div>
                  <div className="mt-1 text-sm font-semibold">$8,234.25</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Last 30 days</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="eur">
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="mr-2 text-xl font-bold">€</span>
                <span className="text-2xl font-bold">18,742.30</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted p-3">
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <ArrowUpIcon className="mr-1 h-3.5 w-3.5 text-emerald-500" />
                    Income
                  </div>
                  <div className="mt-1 text-sm font-semibold">€9,850.40</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Last 30 days</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <ArrowDownIcon className="mr-1 h-3.5 w-3.5 text-rose-500" />
                    Expenses
                  </div>
                  <div className="mt-1 text-sm font-semibold">€6,125.75</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Last 30 days</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="gbp">
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="mr-2 text-xl font-bold">£</span>
                <span className="text-2xl font-bold">15,328.90</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted p-3">
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <ArrowUpIcon className="mr-1 h-3.5 w-3.5 text-emerald-500" />
                    Income
                  </div>
                  <div className="mt-1 text-sm font-semibold">£8,240.50</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Last 30 days</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="flex items-center text-xs text-muted-foreground font-medium">
                    <ArrowDownIcon className="mr-1 h-3.5 w-3.5 text-rose-500" />
                    Expenses
                  </div>
                  <div className="mt-1 text-sm font-semibold">£5,125.30</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Last 30 days</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}