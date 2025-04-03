import { format } from "date-fns"

// Payment status colors
export function getPaymentStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
    case "failed":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
    case "processing":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
    case "refunded":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
  }
}

// Refund status colors
export function getRefundStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
    case "failed":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
    case "processing":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
    case "cancelled":
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
  }
}

// Dispute status colors
export function getDisputeStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
    case "under review":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
    case "won":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
    case "lost":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
    case "needs response":
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
  }
}

// Format dispute status for display
export function formatDisputeStatus(status: string): string {
  // Capitalize each word
  return status
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

// Check if a due date is approaching (within 7 days)
export function isDueDateApproaching(date: Date): boolean {
  const now = new Date()
  const dueDate = new Date(date)
  const diffTime = dueDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 && diffDays <= 7
}

// Format currency
export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount)
}

// Format date
export function formatDate(date: Date): string {
  return format(new Date(date), "MMM d, yyyy")
}

// Sample data for payments
export const paymentsData = [
  {
    id: "pay_1234567890",
    amount: formatCurrency(125.0, "USD"),
    currency: "USD",
    status: "Completed",
    date: formatDate(new Date("2023-03-15")),
    customer: "John Smith",
    email: "john.smith@example.com",
    method: "Credit Card",
    processor: "Stripe",
  },
  {
    id: "pay_2345678901",
    amount: formatCurrency(79.99, "USD"),
    currency: "USD",
    status: "Pending",
    date: formatDate(new Date("2023-03-14")),
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    method: "Bank Transfer",
    processor: "ACH",
  },
  {
    id: "pay_3456789012",
    amount: formatCurrency(199.5, "EUR"),
    currency: "EUR",
    status: "Failed",
    date: formatDate(new Date("2023-03-13")),
    customer: "Michael Brown",
    email: "m.brown@example.com",
    method: "Credit Card",
    processor: "Stripe",
  },
  {
    id: "pay_4567890123",
    amount: formatCurrency(45.75, "GBP"),
    currency: "GBP",
    status: "Completed",
    date: formatDate(new Date("2023-03-12")),
    customer: "Emma Wilson",
    email: "emma.w@example.com",
    method: "Digital Wallet",
    processor: "PayPal",
  },
  {
    id: "pay_5678901234",
    amount: formatCurrency(299.99, "USD"),
    currency: "USD",
    status: "Processing",
    date: formatDate(new Date("2023-03-11")),
    customer: "David Lee",
    email: "david.lee@example.com",
    method: "Credit Card",
    processor: "Stripe",
  },
]

// Sample data for refunds
export const refundsData = [
  {
    id: "ref_1234567890",
    paymentId: "pay_9876543210",
    amount: formatCurrency(125.0, "USD"),
    currency: "USD",
    status: "Completed",
    date: formatDate(new Date("2023-03-15")),
    customer: "John Smith",
    email: "john.smith@example.com",
    reason: "Customer request",
    method: "Card refund",
    processor: "Stripe",
  },
  {
    id: "ref_2345678901",
    paymentId: "pay_8765432109",
    amount: formatCurrency(79.99, "USD"),
    currency: "USD",
    status: "Pending",
    date: formatDate(new Date("2023-03-14")),
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    reason: "Item not received",
    method: "Bank transfer",
    processor: "PayPal",
  },
  {
    id: "ref_3456789012",
    paymentId: "pay_7654321098",
    amount: formatCurrency(199.5, "EUR"),
    currency: "EUR",
    status: "Failed",
    date: formatDate(new Date("2023-03-13")),
    customer: "Michael Brown",
    email: "m.brown@example.com",
    reason: "Duplicate charge",
    method: "Card refund",
    processor: "Adyen",
  },
  {
    id: "ref_4567890123",
    paymentId: "pay_6543210987",
    amount: formatCurrency(45.75, "GBP"),
    currency: "GBP",
    status: "Completed",
    date: formatDate(new Date("2023-03-12")),
    customer: "Emma Wilson",
    email: "emma.w@example.com",
    reason: "Product defect",
    method: "Wallet credit",
    processor: "Stripe",
  },
  {
    id: "ref_5678901234",
    paymentId: "pay_5432109876",
    amount: formatCurrency(299.99, "USD"),
    currency: "USD",
    status: "Processing",
    date: formatDate(new Date("2023-03-11")),
    customer: "David Lee",
    email: "david.lee@example.com",
    reason: "Order cancellation",
    method: "Card refund",
    processor: "Stripe",
  },
]

// Sample data for disputes
export const disputesData = [
  {
    id: "dsp_1234567890",
    paymentId: "pay_9876543210",
    amount: formatCurrency(125.0, "USD"),
    currency: "USD",
    status: "Open",
    date: formatDate(new Date("2023-03-15")),
    customer: "John Smith",
    email: "john.smith@example.com",
    reason: "Unauthorized transaction",
    evidenceStatus: "Required",
    dueDate: formatDate(new Date("2023-04-15")),
  },
  {
    id: "dsp_2345678901",
    paymentId: "pay_8765432109",
    amount: formatCurrency(79.99, "USD"),
    currency: "USD",
    status: "Under Review",
    date: formatDate(new Date("2023-03-14")),
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    reason: "Product not received",
    evidenceStatus: "Submitted",
    dueDate: formatDate(new Date("2023-04-14")),
  },
  {
    id: "dsp_3456789012",
    paymentId: "pay_7654321098",
    amount: formatCurrency(199.5, "EUR"),
    currency: "EUR",
    status: "Lost",
    date: formatDate(new Date("2023-03-13")),
    customer: "Michael Brown",
    email: "m.brown@example.com",
    reason: "Product not as described",
    evidenceStatus: "Reviewed",
    dueDate: formatDate(new Date("2023-04-13")),
  },
  {
    id: "dsp_4567890123",
    paymentId: "pay_6543210987",
    amount: formatCurrency(45.75, "GBP"),
    currency: "GBP",
    status: "Won",
    date: formatDate(new Date("2023-03-12")),
    customer: "Emma Wilson",
    email: "emma.w@example.com",
    reason: "Duplicate charge",
    evidenceStatus: "Accepted",
    dueDate: formatDate(new Date("2023-04-12")),
  },
  {
    id: "dsp_5678901234",
    paymentId: "pay_5432109876",
    amount: formatCurrency(299.99, "USD"),
    currency: "USD",
    status: "Needs Response",
    date: formatDate(new Date("2023-03-11")),
    customer: "David Lee",
    email: "david.lee@example.com",
    reason: "Credit not processed",
    evidenceStatus: "Required",
    dueDate: formatDate(new Date("2023-04-11")),
  },
]

