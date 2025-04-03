import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveContainerProps {
  children: ReactNode
  className?: string
  fullWidth?: boolean
  noPadding?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  fullWidth = false,
  noPadding = false,
}: ResponsiveContainerProps) {
  return (
    <div className={cn(fullWidth ? "w-full" : "max-w-7xl mx-auto", !noPadding && "px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}

