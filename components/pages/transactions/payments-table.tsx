import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "usehooks-ts"

const PaymentsTable = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle px-4 sm:px-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pricing Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Date (UTC)</TableHead>
                <TableHead className="hidden md:table-cell">Payment Method</TableHead>
                <TableHead className="hidden md:table-cell">Customer Email</TableHead>
                <TableHead>Refund</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>12345</TableCell>
                <TableCell>Success</TableCell>
                <TableCell>Subscription</TableCell>
                <TableCell>$10.00</TableCell>
                <TableCell className="hidden md:table-cell">2023-10-26</TableCell>
                <TableCell className="hidden md:table-cell">Credit Card</TableCell>
                <TableCell className="hidden md:table-cell">test@example.com</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-primary whitespace-nowrap">
                    {isMobile ? "Refund" : "Initiate Refund"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="icon">
                    {/* Placeholder for actions */}
                    ...
                  </Button>
                </TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default PaymentsTable

