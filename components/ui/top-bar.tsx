import { ModeToggle } from "./mode-toggle"
import { UserNav } from "./user-nav"
import { cn } from "@/lib/utils"

interface TopBarProps {
  title: string
  className?: string
}

export function TopBar({ title, className }: TopBarProps) {
  return (
    <div className={cn("flex h-16 items-center justify-between px-6", className)}>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  )
}

