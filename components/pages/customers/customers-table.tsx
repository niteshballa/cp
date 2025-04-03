"use client"

import { EyeIcon, MailIcon, MoreHorizontalIcon, PhoneIcon, TrashIcon, UserIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Sample customer data
const customers = [
  {
    id: "CUST-001",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    totalSpent: 1245.5,
    lastTransaction: "2023-03-15",
  },
  {
    id: "CUST-002",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    totalSpent: 3045.0,
    lastTransaction: "2023-03-14",
  },
  {
    id: "CUST-003",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    totalSpent: 850.25,
    lastTransaction: "2023-02-28",
  },
  {
    id: "CUST-004",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    totalSpent: 2120.75,
    lastTransaction: "2023-03-10",
  },
  {
    id: "CUST-005",
    name: "David Wilson",
    email: "david@example.com",
    phone: "+1 (555) 567-8901",
    status: "new",
    totalSpent: 550.0,
    lastTransaction: "2023-03-05",
  },
  {
    id: "CUST-006",
    name: "Jessica Taylor",
    email: "jessica@example.com",
    phone: "+1 (555) 678-9012",
    status: "active",
    totalSpent: 1780.5,
    lastTransaction: "2023-03-12",
  },
  {
    id: "CUST-007",
    name: "Ryan Martinez",
    email: "ryan@example.com",
    phone: "+1 (555) 789-0123",
    status: "inactive",
    totalSpent: 395.2,
    lastTransaction: "2023-02-15",
  },
]

interface CustomersTableProps {
  searchQuery: string
  statusFilter: string | null
}

export function CustomersTable({ searchQuery, statusFilter }: CustomersTableProps) {
  const filteredCustomers = customers.filter((customer) => {
    // Search filter
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = !statusFilter || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total Spent</TableHead>
            <TableHead>Last Transaction</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">{customer.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <MailIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <PhoneIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      customer.status === "active" &&
                        "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400",
                      customer.status === "inactive" &&
                        "bg-slate-100 text-slate-800 hover:bg-slate-100 dark:bg-slate-900/30 dark:text-slate-400",
                      customer.status === "new" &&
                        "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
                    )}
                  >
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{customer.lastTransaction}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        Edit customer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No customers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

