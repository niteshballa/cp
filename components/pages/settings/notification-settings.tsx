"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="payment-notifications">Payment Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive emails for payment confirmations and receipts</p>
              </div>
              <Switch id="payment-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="account-notifications">Account Updates</Label>
                <p className="text-sm text-muted-foreground">Receive emails about your account activity and security</p>
              </div>
              <Switch id="account-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-notifications">Marketing</Label>
                <p className="text-sm text-muted-foreground">Receive emails about new features and special offers</p>
              </div>
              <Switch id="marketing-notifications" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Push Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-payment">Payment Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when you receive payments</p>
              </div>
              <Switch id="push-payment" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-security">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about security events and suspicious activities
                </p>
              </div>
              <Switch id="push-security" defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

