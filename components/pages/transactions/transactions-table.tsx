"use client"

import type React from "react"

import { useState } from "react"
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { MoreHorizontal, Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type TransactionColumn = {
  key: string
  header: string
  cell?: (item: any) => React.ReactNode
  className?: string
}

export type TransactionAction = {
  label: string
  onClick: (item: any) => void
}

export type TransactionTableProps = {
  title: string
  description?: string
  searchPlaceholder: string
  data: any[]
  columns: TransactionColumn[]
  actions?: TransactionAction[]
  getStatusColor: (status: string) => string
  formatStatus?: (status: string) => string
}

export function TransactionsTable({
  title,
  description,
  searchPlaceholder,
  data,
  columns,
  actions = [],
  getStatusColor,
  formatStatus = (status) => status,
}: TransactionTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg bg-white dark:bg-gray-950">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="pl-9 h-9 w-[180px] sm:w-[240px] rounded-xl border-muted bg-background"
                />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-xl">
                <Filter className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-xl">
                <Download className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-muted/60">
                  {columns.map((column) => (
                    <TableHead
                      key={column.key}
                      className={cn("h-10 text-xs font-medium text-muted-foreground", column.className)}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <TableRow
                      key={item.id}
                      className={cn("h-14 transition-colors", hoveredRow === item.id ? "bg-muted/40" : "")}
                      onMouseEnter={() => setHoveredRow(item.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.key} className={cn("py-4 text-sm font-medium", column.className)}>
                          {column.key === "status" ? (
                            <Badge
                              className={cn(
                                "px-2.5 py-0.5 text-xs font-medium rounded-full",
                                getStatusColor(item.status),
                              )}
                            >
                              {formatStatus(item.status)}
                            </Badge>
                          ) : column.cell ? (
                            column.cell(item)
                          ) : (
                            item[column.key]
                          )}
                        </TableCell>
                      ))}
                      <TableCell className="text-right pr-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-8 w-8 p-0 rounded-full opacity-70 hover:opacity-100 hover:bg-muted",
                                hoveredRow === item.id ? "opacity-100" : "opacity-0 sm:opacity-70",
                              )}
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[180px] rounded-xl">
                            <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs cursor-pointer">View details</DropdownMenuItem>
                            {actions.map((action, index) => (
                              <DropdownMenuItem
                                key={index}
                                className="text-xs cursor-pointer"
                                onClick={() => action.onClick(item)}
                              >
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem className="text-xs cursor-pointer">Download receipt</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <p className="text-sm">No transactions found</p>
                        <p className="text-xs mt-1">Try adjusting your search or filter</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {data.length > 0 && (
            <div className="flex items-center justify-between px-4 py-4 border-t border-muted/60">
              <div className="text-xs text-muted-foreground">
                Showing <span className="font-medium">{data.length}</span> of{" "}
                <span className="font-medium">{data.length}</span> transactions
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}