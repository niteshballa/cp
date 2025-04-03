import { WalletIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"

interface LogoProps {
  className?: string
  iconClassName?: string
}

export function Logo({ className, iconClassName }: LogoProps) {
  const { config } = useConfig()

  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md bg-primary shadow-sm",
        config.animations && "transition-all duration-300 hover:shadow-md",
        className,
      )}
    >
      <WalletIcon className={cn("h-5 w-5 text-primary-foreground", iconClassName)} />
    </div>
  )
}

