"use client"

import { ArrowDownLeftIcon, ArrowUpRightIcon, RefreshCwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WalletActions() {
  return (
    <Card className="h-full shadow-sm rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">Frequently used wallet operations</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 pt-2">
        <Button className="w-full justify-start h-11 text-sm font-medium rounded-xl" size="default">
          <ArrowUpRightIcon className="mr-2 h-4 w-4" />
          Send Money
        </Button>
        <Button className="w-full justify-start h-11 text-sm font-medium rounded-xl" size="default" variant="outline">
          <ArrowDownLeftIcon className="mr-2 h-4 w-4" />
          Request Money
        </Button>
        <Button className="w-full justify-start h-11 text-sm font-medium rounded-xl" size="default" variant="outline">
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          Exchange Currency
        </Button>
      </CardContent>
    </Card>
  )
}