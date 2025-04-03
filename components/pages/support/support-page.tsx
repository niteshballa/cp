"use client"

import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircleIcon, TicketIcon, MessageSquareIcon, BookOpenIcon, PhoneIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SupportPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Support</h1>
          <p className="text-muted-foreground">Get help and support for your account</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <HelpCircleIcon className="h-5 w-5 text-blue-500" />
                Help Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Browse our knowledge base for answers to common questions.
                </p>
                <div className="relative">
                  <Input placeholder="Search help articles..." />
                  <Button className="absolute right-0 top-0 h-full rounded-l-none">Search</Button>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start" asChild>
                    <a href="/support/help">
                      <BookOpenIcon className="mr-2 h-4 w-4" />
                      Browse Help Articles
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <MessageSquareIcon className="mr-2 h-4 w-4" />
                    Live Chat Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TicketIcon className="h-5 w-5 text-purple-500" />
                Support Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create and manage support tickets for issues that need assistance.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Tickets</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Resolved Tickets</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="grid gap-2">
                  <Button asChild>
                    <a href="/support/tickets">Create New Ticket</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/support/tickets">View My Tickets</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 rounded-xl border">
                <PhoneIcon className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Speak directly with our support team</p>
                <p className="font-medium">+1 (800) 123-4567</p>
                <p className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-xl border">
                <MessageSquareIcon className="h-8 w-8 text-purple-500 mb-2" />
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">Chat with our support team in real-time</p>
                <Button>Start Chat</Button>
                <p className="text-xs text-muted-foreground mt-2">Available 24/7</p>
              </div>

              <div className="flex flex-col items-center text-center p-4 rounded-xl border">
                <TicketIcon className="h-8 w-8 text-emerald-500 mb-2" />
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Send us an email for non-urgent issues</p>
                <p className="font-medium">support@bnplx.com</p>
                <p className="text-xs text-muted-foreground">Response within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

