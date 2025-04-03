"use client"

import { useState } from "react"
import { HelpCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HelpButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="help-button" size="icon" aria-label="Help">
          <HelpCircleIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Help Center</DialogTitle>
          <DialogDescription>Get help with using the payment dashboard</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quick-help">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quick-help">Quick Help</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="quick-help" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium">Dashboard Overview</h3>
              <p className="text-sm text-muted-foreground">
                The dashboard provides an overview of your payment processing activity, including transaction volume,
                success rates, and revenue metrics.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Business Selector</h3>
              <p className="text-sm text-muted-foreground">
                Use the business selector dropdown to view data for specific businesses or all profiles at once.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Time Range</h3>
              <p className="text-sm text-muted-foreground">
                Select different time ranges to view data for specific periods, from the last 24 hours to the last 90
                days.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium">How do I process a refund?</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to the Payments section, find the transaction you want to refund, and click the "Initiate
                Refund" button.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">How do I add a new business profile?</h3>
              <p className="text-sm text-muted-foreground">
                Go to Settings &gt; Business Profiles and click "Add New Business" to create a new profile.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">What are auto-retries?</h3>
              <p className="text-sm text-muted-foreground">
                Auto-retries automatically attempt to process failed payments again, helping to recover potentially lost
                revenue.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium">Support Email</h3>
              <p className="text-sm text-muted-foreground">support@bnplx.com</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Phone Support</h3>
              <p className="text-sm text-muted-foreground">+1 (800) 123-4567 (Mon-Fri, 9am-5pm EST)</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Available 24/7 through the dashboard</p>
              <Button className="mt-2 w-full">Start Live Chat</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

