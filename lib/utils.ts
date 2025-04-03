import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num)
}

export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function getPageTitle(pathname: string): string {
  // Remove leading slash and split by slashes
  const parts = pathname.replace(/^\//, "").split("/")

  // Handle root path
  if (parts[0] === "") return "Dashboard"

  // Handle nested paths
  if (parts.length > 1) {
    // Capitalize the last part of the path
    return parts[parts.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Capitalize the first part for single-level paths
  return parts[0]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

