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

export function DisputesPage() {
  // Sample data for disputes
  const disputes = [
    {
      id: "DIS-1234",
      paymentId: "PAY-5678",
      amount: "$120.50",
      status: "open",
      dueDate: "2023-07-10",
      customer: "Jane Smith",
      reason: "Item not received",
    },
    {
      id: "DIS-5678",
      paymentId: "PAY-9012",
      amount: "$75.25",
      status: "under_review",
      dueDate: "2023-07-15",
      customer: "Bob Johnson",
      reason: "Unauthorized transaction",
    },
    {
      id: "DIS-9012",
      paymentId: "PAY-3456",
      amount: "$320.00",
      status: "won",
      dueDate: "2023-06-30",
      customer: "Alice Brown",
      reason: "Product damaged",
    },
    {
      id: "DIS-3456",
      paymentId: "PAY-7890",
      amount: "$95.75",
      status: "lost",
      dueDate: "2023-06-25",
      customer: "Charlie Wilson",
      reason: "Duplicate charge",
    },
  ]

  // Function to get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "under_review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "won":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "lost":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  // Function to format status for display
  const formatStatus = (status: string) => {
    return status.replace("_", " ")
  }

  // Function to check if a due date is approaching (within 3 days)
  const isDueDateApproaching = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 && diffDays <= 3
  }

  return (
    <div className="layout-spacious">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search disputes..."
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
                <TableHead className="text-xs font-medium">Reason</TableHead>
                <TableHead className="text-xs font-medium">Due Date</TableHead>
                <TableHead className="text-xs font-medium">Amount</TableHead>
                <TableHead className="text-xs font-medium">Status</TableHead>
                <TableHead className="text-xs font-medium w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dispute) => (
                <TableRow key={dispute.id} className="h-10">
                  <TableCell className="text-sm font-medium">{dispute.id}</TableCell>
                  <TableCell className="text-sm">{dispute.paymentId}</TableCell>
                  <TableCell className="text-sm">{dispute.customer}</TableCell>
                  <TableCell className="text-sm">{dispute.reason}</TableCell>
                  <TableCell className="text-sm">
                    <span
                      className={
                        isDueDateApproaching(dispute.dueDate) && dispute.status !== "won" && dispute.status !== "lost"
                          ? "text-red-600 font-medium"
                          : ""
                      }
                    >
                      {dispute.dueDate}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{dispute.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`badge-enhanced text-[10px] font-medium ${getStatusColor(dispute.status)}`}
                    >
                      {formatStatus(dispute.status)}
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
                        <DropdownMenuItem className="text-xs">Submit evidence</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">Download case file</DropdownMenuItem>
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

