"use client"

import type React from "react"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  MobileTable,
  MobileTableRow,
  MobileTableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Search, Download, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

export type Column<T> = {
  header: string
  accessorKey: string
  cell?: (item: T) => React.ReactNode
  className?: string
  enableSorting?: boolean
  enableHiding?: boolean
  meta?: {
    align?: "left" | "center" | "right"
    width?: string
    minWidth?: string
    maxWidth?: string
    isRowAction?: boolean
  }
}

export type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  searchKey?: string
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  pagination?: {
    pageIndex: number
    pageSize: number
    pageCount: number
    onPageChange: (page: number) => void
  }
  toolbar?: React.ReactNode
  emptyState?: React.ReactNode
  isLoading?: boolean
  className?: string
  rowClassName?: (item: T) => string
  onRowClick?: (item: T) => void
  hideSearch?: boolean
  hideToolbar?: boolean
  hidePagination?: boolean
  showBorder?: boolean
  showRowHover?: boolean
  showRowDivider?: boolean
  showCardWrapper?: boolean
  mobileKeys?: string[]
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  onSearch,
  pagination,
  toolbar,
  emptyState,
  isLoading,
  className,
  rowClassName,
  onRowClick,
  hideSearch = false,
  hideToolbar = false,
  hidePagination = false,
  showBorder = true,
  showRowHover = true,
  showRowDivider = true,
  showCardWrapper = true,
  mobileKeys = [],
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useIsMobile()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const tableContent = (
    <>
      {!hideToolbar && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
          <div className="text-sm text-muted-foreground">
            {data.length} {data.length === 1 ? "item" : "items"}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {!hideSearch && (
              <div className="relative flex-1 sm:flex-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-9 h-9 text-sm w-full sm:w-[200px] lg:w-[250px]"
                />
              </div>
            )}
            {toolbar}
            {!toolbar && (
              <>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {isMobile ? (
        <MobileTable headers={columns.map((col) => col.header)}>
          {data.length > 0 ? (
            data.map((item) => (
              <MobileTableRow
                key={item.id}
                className={cn(
                  "transition-colors",
                  onRowClick && "cursor-pointer hover:bg-muted/50",
                  rowClassName && rowClassName(item),
                )}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns
                  .filter((col) => !mobileKeys.length || mobileKeys.includes(col.accessorKey))
                  .map((column) => (
                    <MobileTableCell key={column.accessorKey} label={column.header}>
                      {column.cell ? column.cell(item) : String(item[column.accessorKey as keyof T] || "")}
                    </MobileTableCell>
                  ))}
              </MobileTableRow>
            ))
          ) : (
            <div className="py-6 text-center text-muted-foreground">{emptyState || <p>No data available</p>}</div>
          )}
        </MobileTable>
      ) : (
        <div className={cn("overflow-x-auto -mx-4 sm:mx-0", className)}>
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <div className={cn(showBorder && "rounded-md border")}>
              <Table>
                <TableHeader>
                  <TableRow className={cn(!showRowDivider && "border-b-0")}>
                    {columns.map((column) => (
                      <TableHead
                        key={column.accessorKey}
                        className={cn(
                          "text-sm font-medium h-10",
                          column.meta?.align === "center" && "text-center",
                          column.meta?.align === "right" && "text-right",
                          column.meta?.width && `w-[${column.meta.width}]`,
                          column.meta?.minWidth && `min-w-[${column.meta.minWidth}]`,
                          column.meta?.maxWidth && `max-w-[${column.meta.maxWidth}]`,
                          column.className,
                        )}
                      >
                        {column.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((item) => (
                      <TableRow
                        key={item.id}
                        className={cn(
                          "h-14 text-sm",
                          !showRowHover && "hover:bg-transparent",
                          !showRowDivider && "border-b-0",
                          onRowClick && "cursor-pointer",
                          rowClassName && rowClassName(item),
                        )}
                        onClick={() => onRowClick && onRowClick(item)}
                      >
                        {columns.map((column) => (
                          <TableCell
                            key={column.accessorKey}
                            className={cn(
                              "py-3 text-sm",
                              column.meta?.align === "center" && "text-center",
                              column.meta?.align === "right" && "text-right",
                              column.meta?.isRowAction && "w-[80px]",
                              column.className,
                            )}
                          >
                            {column.cell ? column.cell(item) : String(item[column.accessorKey as keyof T] || "")}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        {emptyState || <p className="text-muted-foreground">No data available</p>}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}

      {!hidePagination && pagination && (
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => pagination.onPageChange(pagination.pageIndex - 1)}
            disabled={pagination.pageIndex === 0}
            className="h-9 text-sm gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm">
            Page {pagination.pageIndex + 1} of {pagination.pageCount || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => pagination.onPageChange(pagination.pageIndex + 1)}
            disabled={pagination.pageIndex === (pagination.pageCount || 1) - 1}
            className="h-9 text-sm gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )

  if (showCardWrapper) {
    return <Card className="overflow-hidden">{<CardContent className="p-6">{tableContent}</CardContent>}</Card>
  }

  return tableContent
}

// Helper components for common use cases
export function StatusBadge({ status, variant }: { status: string; variant?: "default" | "outline" }) {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes("success") || statusLower.includes("complete") || statusLower.includes("active")) {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    }
    if (statusLower.includes("pending") || statusLower.includes("processing")) {
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
    }
    if (statusLower.includes("fail") || statusLower.includes("error") || statusLower.includes("declined")) {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    }
    if (statusLower.includes("refund")) {
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
    }
    if (statusLower.includes("dispute") || statusLower.includes("chargeback")) {
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }

  return (
    <Badge variant={variant} className={cn("text-xs font-medium", getStatusColor(status))}>
      {status}
    </Badge>
  )
}

export function TypeBadge({ type }: { type: string }) {
  return (
    <Badge variant="outline" className="text-xs font-normal bg-gray-50 dark:bg-gray-900/50">
      {type}
    </Badge>
  )
}

export function AmountCell({
  amount,
  currency = "USD",
  showSign = true,
}: { amount: number; currency?: string; showSign?: boolean }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  })

  const formattedAmount = formatter.format(amount)
  const isNegative = amount < 0

  return (
    <span className={cn("font-medium", isNegative && "text-red-600 dark:text-red-400")}>
      {showSign && !isNegative && amount > 0 ? "+" : ""}
      {formattedAmount}
    </span>
  )
}

export function DateCell({ date, showTime = true }: { date: string | Date; showTime?: boolean }) {
  const d = typeof date === "string" ? new Date(date) : date

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...(showTime && { hour: "2-digit", minute: "2-digit", hour12: true }),
  })

  return <span className="whitespace-nowrap">{formatter.format(d)}</span>
}

