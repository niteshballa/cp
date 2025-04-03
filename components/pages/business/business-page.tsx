"use client"

import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReceiptIcon, BanknoteIcon, StoreIcon, FileTextIcon, UsersIcon, UserIcon } from "lucide-react"

export function BusinessPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Business Management</h1>
          <p className="text-muted-foreground">Manage your business settings and operations</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <ReceiptIcon className="h-5 w-5 text-blue-500" />
                Account Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">View your account balance and transaction history</p>
              <Button variant="outline" asChild>
                <a href="/business/account-summary">View Summary</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BanknoteIcon className="h-5 w-5 text-emerald-500" />
                Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage your payout schedule and history</p>
              <Button variant="outline" asChild>
                <a href="/business/payouts">Manage Payouts</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <StoreIcon className="h-5 w-5 text-purple-500" />
                Store Front
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Customize your customer-facing payment pages</p>
              <Button variant="outline" asChild>
                <a href="/business/store-front">Customize Store</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 text-amber-500" />
                Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Generate and download business reports</p>
              <Button variant="outline" asChild>
                <a href="/business/reports">View Reports</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-blue-500" />
                Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage team members and permissions</p>
              <Button variant="outline" asChild>
                <a href="/business/team">Manage Team</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-indigo-500" />
                Business Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Update your business information and settings</p>
              <Button variant="outline" asChild>
                <a href="/business/profile">Edit Profile</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}

