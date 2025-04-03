import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MoreHorizontal, Search, Filter } from "lucide-react"

export function RefundPage() {
  // Sample data for refunds
  const refunds = [
    {
      id: "REF-1234",
      paymentId: "PAY-5678",
      amount: "$120.50",
      status: "completed",
      date: "2023-06-10",
      customer: "Jane Smith",
    },
    {
      id: "REF-5678",
      paymentId: "PAY-9012",
      amount: "$75.25",
      status: "pending",
      date: "2023-06-12",
      customer: "Bob Johnson",
    },
    {
      id: "REF-9012",
      paymentId: "PAY-3456",
      amount: "$50.00",
      status: "failed",
      date: "2023-06-15",
      customer: "Alice Brown",
    },
    {
      id: "REF-3456",
      paymentId: "PAY-7890",
      amount: "$95.75",
      status: "completed",
      date: "2023-06-18",
      customer: "Charlie Wilson",
    },
  ]

  // Function to get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div className="layout-spacious">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search refunds..."
              className="input-enhanced pl-8 w-[200px] sm:w-[300px] h-9"
            />
          </div>
          <Button variant="outline" size="sm" className="button-enhanced h-9">
            <Filter className="h-4 w-4 mr-2" />
            <span className="text-xs">Filter</span>
          </Button>
        </div>
        <Button size="sm" className="button-enhanced h-9">
          <span className="text-xs">Export</span>
        </Button>
      </div>

      <Card className="card-enhanced overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="table-enhanced">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium">ID</TableHead>
                <TableHead className="text-xs font-medium">Payment ID</TableHead>
                <TableHead className="text-xs font-medium">Customer</TableHead>
                <TableHead className="text-xs font-medium">Date</TableHead>
                <TableHead className="text-xs font-medium">Amount</TableHead>
                <TableHead className="text-xs font-medium">Status</TableHead>
                <TableHead className="text-xs font-medium w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id} className="h-10">
                  <TableCell className="text-sm font-medium">{refund.id}</TableCell>
                  <TableCell className="text-sm">{refund.paymentId}</TableCell>
                  <TableCell className="text-sm">{refund.customer}</TableCell>
                  <TableCell className="text-sm">{refund.date}</TableCell>
                  <TableCell className="text-sm font-medium">{refund.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`badge-enhanced text-[10px] font-medium ${getStatusColor(refund.status)}`}
                    >
                      {refund.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 button-enhanced">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl">
                        <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs">View details</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">Download receipt</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

