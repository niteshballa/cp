import type React from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        "flex-1 w-full space-y-4 p-2 sm:p-4 md:p-6 lg:p-8 relative",
        "after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-background/20 after:pointer-events-none after:z-[-1]",
        className,
      )}
    >
      <div className="max-w-[1800px] mx-auto">{children}</div>
    </div>
  )
}

