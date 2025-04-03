import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Settings, ArrowRight, Check } from "lucide-react"

export function WorkflowPage() {
  return (
    <div className="layout-spacious">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6 rounded-xl">
          <TabsTrigger value="active" className="text-xs rounded-xl">
            Active Configuration
          </TabsTrigger>
          <TabsTrigger value="manage" className="text-xs rounded-xl">
            Manage Rules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-3 grid-spacious">
            {/* Smart Routing Card */}
            <Card className="card-enhanced">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Smart Routing</CardTitle>
                  <Badge
                    variant="outline"
                    className="badge-enhanced bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px]"
                  >
                    Active
                  </Badge>
                </div>
                <CardDescription className="text-xs">Optimize payment success rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Rules</p>
                      <p className="text-xs text-muted-foreground">5 active rules</p>
                    </div>
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Fallback</p>
                      <p className="text-xs text-muted-foreground">Stripe → PayPal</p>
                    </div>
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Performance</p>
                      <p className="text-xs text-muted-foreground">+12% success rate</p>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full button-enhanced h-8">
                    <Settings className="h-3.5 w-3.5 mr-2" />
                    <span className="text-xs">Configure</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Retry Logic Card */}
            <Card className="card-enhanced">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Retry Logic</CardTitle>
                  <Badge
                    variant="outline"
                    className="badge-enhanced bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px]"
                  >
                    Active
                  </Badge>
                </div>
                <CardDescription className="text-xs">Automatically retry failed payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Max Attempts</p>
                      <p className="text-xs text-muted-foreground">3 attempts</p>
                    </div>
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Interval</p>
                      <p className="text-xs text-muted-foreground">24 hours between attempts</p>
                    </div>
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Recovery</p>
                      <p className="text-xs text-muted-foreground">+8% recovery rate</p>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full button-enhanced h-8">
                    <Settings className="h-3.5 w-3.5 mr-2" />
                    <span className="text-xs">Configure</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fraud Prevention Card */}
            <Card className="card-enhanced">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Fraud Prevention</CardTitle>
                  <Badge
                    variant="outline"
                    className="badge-enhanced bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 text-[10px]"
                  >
                    Partial
                  </Badge>
                </div>
                <CardDescription className="text-xs">Detect and prevent fraudulent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Rules</p>
                      <p className="text-xs text-muted-foreground">3 active rules</p>
                    </div>
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">AI Detection</p>
                      <p className="text-xs text-muted-foreground">Not configured</p>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Blocked</p>
                      <p className="text-xs text-muted-foreground">12 transactions this month</p>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full button-enhanced h-8">
                    <Settings className="h-3.5 w-3.5 mr-2" />
                    <span className="text-xs">Configure</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manage">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Payment Routing Rules</h2>
            <Button size="sm" className="button-enhanced h-9">
              <Plus className="h-4 w-4 mr-2" />
              <span className="text-xs">Add Rule</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Rule 1 */}
            <Card className="card-enhanced">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">High-Value Transactions</h3>
                    <p className="text-xs text-muted-foreground">If amount {">"} $1000, route to Stripe</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="badge-enhanced bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px]"
                    >
                      Active
                    </Badge>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Disable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 2 */}
            <Card className="card-enhanced">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">European Customers</h3>
                    <p className="text-xs text-muted-foreground">If region = EU, route to Adyen</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="badge-enhanced bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px]"
                    >
                      Active
                    </Badge>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Disable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 3 */}
            <Card className="card-enhanced">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Mobile Transactions</h3>
                    <p className="text-xs text-muted-foreground">If device = mobile, prefer PayPal</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="badge-enhanced bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px]"
                    >
                      Active
                    </Badge>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Disable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 4 */}
            <Card className="card-enhanced">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Recurring Subscriptions</h3>
                    <p className="text-xs text-muted-foreground">If payment_type = subscription, route to Stripe</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="badge-enhanced bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px]"
                    >
                      Active
                    </Badge>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Disable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 5 */}
            <Card className="card-enhanced">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">First-Time Customers</h3>
                    <p className="text-xs text-muted-foreground">If customer_type = new, apply extra verification</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="badge-enhanced bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-[10px]"
                    >
                      Active
                    </Badge>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                      Disable
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

