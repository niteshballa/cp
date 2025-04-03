import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-base", className)} {...props} />
    </div>
  ),
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("bg-primary font-medium text-primary-foreground", className)} {...props} />
  ),
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
      {...props}
    />
  ),
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-semibold text-base text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle text-base [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-base text-muted-foreground", className)} {...props} />
  ),
)
TableCaption.displayName = "TableCaption"

// Mobile-friendly table components
interface MobileTableProps extends React.HTMLAttributes<HTMLDivElement> {
  headers: string[]
  children: React.ReactNode
}

const MobileTable = React.forwardRef<HTMLDivElement, MobileTableProps>(
  ({ className, headers, children, ...props }, ref) => (
    <div ref={ref} className={cn("sm:hidden", className)} {...props}>
      <div className="space-y-4">{children}</div>
    </div>
  ),
)
MobileTable.displayName = "MobileTable"

interface MobileTableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const MobileTableRow = React.forwardRef<HTMLDivElement, MobileTableRowProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border p-4 shadow-sm", className)} {...props}>
      {children}
    </div>
  ),
)
MobileTableRow.displayName = "MobileTableRow"

interface MobileTableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  children: React.ReactNode
}

const MobileTableCell = React.forwardRef<HTMLDivElement, MobileTableCellProps>(
  ({ className, label, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-between py-2", className)} {...props}>
      <span className="font-medium text-base text-muted-foreground">{label}</span>
      <div className="text-base">{children}</div>
    </div>
  ),
)
MobileTableCell.displayName = "MobileTableCell"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  MobileTable,
  MobileTableRow,
  MobileTableCell,
}

