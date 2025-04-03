"use client"

import { useState } from "react"
import { PlusIcon, CopyIcon, EyeIcon, EyeOffIcon, KeyIcon, ShieldIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageContainer } from "@/components/ui/page-container"
import { PageTitle } from "@/components/ui/page-title"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

type ApiKey = {
  id: string
  name: string
  prefix: string
  createdAt: string
  lastUsed?: string
  environment: "test" | "live"
}

export function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isAddingKey, setIsAddingKey] = useState(false)
  const [showPublishableKey, setShowPublishableKey] = useState(false)
  const [showResponseHashKey, setShowResponseHashKey] = useState(false)

  const publishableKey = "pk_prd_c004059212374465a5d42c52699ecff2"
  const responseHashKey = "JY3lxzuNYVeUZYEVtpGkY4HpzJPEIFSVHVdJvINRhjqkautZbSruqsJaw4LzEEtA"

  const handleAddKey = (formData: FormData) => {
    const name = formData.get("name") as string
    const environment = formData.get("environment") as "test" | "live"

    const newKey: ApiKey = {
      id: `key_${Math.random().toString(36).substring(2, 15)}`,
      name,
      prefix: `sk_${environment === "test" ? "test" : "live"}_${Math.random().toString(36).substring(2, 8)}`,
      createdAt: new Date().toISOString(),
      environment,
    }

    setApiKeys([...apiKeys, newKey])
    setIsAddingKey(false)

    toast({
      title: "API Key Created",
      description: "Your new API key has been created successfully.",
    })
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${label} has been copied to your clipboard.`,
      })
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageTitle title="API Keys" description="Manage API keys and credentials for integrated payment services" />
          <Dialog open={isAddingKey} onOpenChange={setIsAddingKey}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <PlusIcon className="h-4 w-4" />
                Create New API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key for your application. This key will be shown only once.
                </DialogDescription>
              </DialogHeader>
              <form action={handleAddKey} className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Key Name
                  </Label>
                  <Input id="name" name="name" placeholder="e.g. Production Server" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="environment" className="text-right">
                    Environment
                  </Label>
                  <Select name="environment" defaultValue="test">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Key</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="secret">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="secret">Secret API Keys</TabsTrigger>
            <TabsTrigger value="publishable">Publishable Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="secret">
            <Card>
              <CardHeader className="bg-muted/50 p-6">
                <CardTitle>Secret API Keys</CardTitle>
                <CardDescription>
                  These keys should be kept confidential and only used in secure server-side code
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {apiKeys.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Key</TableHead>
                        <TableHead>Environment</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys.map((key) => (
                        <TableRow key={key.id}>
                          <TableCell>{key.name}</TableCell>
                          <TableCell className="font-mono text-xs">{key.prefix}•••••••••••••</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${key.environment === "live"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                }`}
                            >
                              {key.environment === "live" ? "Live" : "Test"}
                            </span>
                          </TableCell>
                          <TableCell>{formatDate(key.createdAt)}</TableCell>
                          <TableCell>{key.lastUsed ? formatDate(key.lastUsed) : "Never"}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(`${key.prefix}•••••••••••••`, "API Key")}
                            >
                              <CopyIcon className="h-4 w-4" />
                              <span className="sr-only">Copy</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <KeyIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No API Keys</h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      You haven't created any API keys yet. Create your first key to integrate with our payment
                      services.
                    </p>
                    <Button onClick={() => setIsAddingKey(true)}>Create API Key</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publishable">
            <Card>
              <CardHeader className="bg-muted/50 p-6">
                <CardTitle>Publishable Key and Payment Response Hash Key</CardTitle>
                <CardDescription>
                  These keys can be safely included in client-side code and are used for initialization and verification
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="publishable-key" className="text-base font-medium">
                      Publishable Key
                    </Label>
                    <Button variant="ghost" size="icon" onClick={() => setShowPublishableKey(!showPublishableKey)}>
                      {showPublishableKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="publishable-key"
                      readOnly
                      value={showPublishableKey ? publishableKey : "•".repeat(publishableKey.length)}
                      className="font-mono pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => copyToClipboard(publishableKey, "Publishable Key")}
                    >
                      <CopyIcon className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="response-hash-key" className="text-base font-medium">
                      Payment Response Hash Key
                    </Label>
                    <Button variant="ghost" size="icon" onClick={() => setShowResponseHashKey(!showResponseHashKey)}>
                      {showResponseHashKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="response-hash-key"
                      readOnly
                      value={showResponseHashKey ? responseHashKey : "•".repeat(responseHashKey.length)}
                      className="font-mono pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => copyToClipboard(responseHashKey, "Response Hash Key")}
                    >
                      <CopyIcon className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-xl flex items-start gap-3 mt-4">
                  <ShieldIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Security Note</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      The Publishable Key can be included in client-side code, but the Response Hash Key should only be
                      used on your server to verify webhook signatures and payment responses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  )
}

