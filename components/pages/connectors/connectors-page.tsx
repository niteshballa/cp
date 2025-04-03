import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus } from "lucide-react"

export function ConnectorsPage() {
  // Sample data for connected processors
  const connectedProcessors = [
    {
      id: 1,
      name: "Stripe",
      status: "active",
      type: "Credit Card",
      lastSync: "2023-06-01 14:30",
    },
    {
      id: 2,
      name: "PayPal",
      status: "active",
      type: "Digital Wallet",
      lastSync: "2023-06-02 10:15",
    },
    {
      id: 3,
      name: "Square",
      status: "inactive",
      type: "POS",
      lastSync: "2023-05-28 09:45",
    },
    {
      id: 4,
      name: "Adyen",
      status: "active",
      type: "Credit Card",
      lastSync: "2023-06-01 16:20",
    },
  ]

  // Sample data for available processors
  const availableProcessors = [
    {
      id: 5,
      name: "Braintree",
      type: "Credit Card",
      description: "Accept payments with Braintree's secure platform.",
    },
    {
      id: 6,
      name: "Klarna",
      type: "Buy Now, Pay Later",
      description: "Offer flexible payment options to your customers.",
    },
    {
      id: 7,
      name: "Affirm",
      type: "Buy Now, Pay Later",
      description: "Provide installment payment plans for your customers.",
    },
    {
      id: 8,
      name: "Amazon Pay",
      type: "Digital Wallet",
      description: "Let customers use their Amazon account to pay.",
    },
  ]

  // Function to get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div className="layout-spacious">
      <Tabs defaultValue="connected" className="w-full">
        <TabsList className="mb-6 rounded-xl">
          <TabsTrigger value="connected" className="text-xs rounded-xl">
            Connected Processors
          </TabsTrigger>
          <TabsTrigger value="available" className="text-xs rounded-xl">
            Available Processors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connected">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="relative mb-4 sm:mb-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search processors..."
                className="input-enhanced pl-8 w-[200px] sm:w-[300px] h-9"
              />
            </div>
            <Button size="sm" className="button-enhanced h-9">
              <Plus className="h-4 w-4 mr-2" />
              <span className="text-xs">Add Processor</span>
            </Button>
          </div>

          <Card className="card-enhanced overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="table-enhanced">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-medium">Name</TableHead>
                    <TableHead className="text-xs font-medium">Type</TableHead>
                    <TableHead className="text-xs font-medium">Last Sync</TableHead>
                    <TableHead className="text-xs font-medium">Status</TableHead>
                    <TableHead className="text-xs font-medium w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connectedProcessors.map((processor) => (
                    <TableRow key={processor.id} className="h-10">
                      <TableCell className="text-sm font-medium">{processor.name}</TableCell>
                      <TableCell className="text-sm">{processor.type}</TableCell>
                      <TableCell className="text-sm">{processor.lastSync}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`badge-enhanced text-[10px] font-medium ${getStatusColor(processor.status)}`}
                        >
                          {processor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                            Configure
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 px-2 text-[10px] button-enhanced">
                            Sync
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="available">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search available processors..."
              className="input-enhanced pl-8 w-full max-w-sm h-9"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProcessors.map((processor) => (
              <Card key={processor.id} className="card-enhanced">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{processor.name}</CardTitle>
                  <CardDescription className="text-xs">{processor.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{processor.description}</p>
                  <Button size="sm" className="w-full button-enhanced h-9">
                    <span className="text-xs">Connect</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

