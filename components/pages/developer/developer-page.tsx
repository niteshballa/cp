"use client"

import { PageContainer } from "@/components/ui/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeIcon, WebhookIcon, KeyIcon, CopyIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DeveloperPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Developer Tools</h1>
          <p className="text-muted-foreground">Access API keys, documentation, and developer resources</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5 text-blue-500" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Test Mode API Key</p>
                  <div className="flex gap-2">
                    <Input value="sk_test_51NzQjkLkz7VkTl0iUY5ibpqO" readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon">
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Live Mode API Key</p>
                  <div className="flex gap-2">
                    <Input value="••••••••••••••••••••••••••••••" readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon">
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Manage API Keys
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <WebhookIcon className="h-5 w-5 text-purple-500" />
                Webhooks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Set up webhooks to receive real-time notifications for events in your account.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Endpoints</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Events Subscribed</span>
                  <span className="font-medium">8</span>
                </div>
                <Button asChild>
                  <a href="/developer/webhooks">Configure Webhooks</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Explore our comprehensive API documentation to integrate bnplx into your applications.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="justify-start h-auto py-4" asChild>
                  <a href="/developer/api">
                    <CodeIcon className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">API Reference</div>
                      <div className="text-xs text-muted-foreground">Detailed API endpoints and parameters</div>
                    </div>
                  </a>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <CodeIcon className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">SDK Documentation</div>
                    <div className="text-xs text-muted-foreground">Client libraries for various languages</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <CodeIcon className="h-5 w-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Integration Guides</div>
                    <div className="text-xs text-muted-foreground">Step-by-step integration tutorials</div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

