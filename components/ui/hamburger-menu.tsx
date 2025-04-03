"use client"
import { cn } from "@/lib/utils"

interface HamburgerMenuProps {
  isOpen: boolean
  onClick?: () => void
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "minimal" | "elegant"
}

export function HamburgerMenu({ isOpen, onClick, className, size = "md", variant = "default" }: HamburgerMenuProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      container: "w-8 h-8",
      bar: "h-[2px] w-5",
      gap: "gap-[5px]",
    },
    md: {
      container: "w-10 h-10",
      bar: "h-[2px] w-6",
      gap: "gap-[6px]",
    },
    lg: {
      container: "w-12 h-12",
      bar: "h-[2px] w-7",
      gap: "gap-[7px]",
    },
  }

  // Variant configurations
  const variantConfig = {
    default: {
      container: "bg-transparent",
      bar: "bg-current rounded-full",
      activeBar1: "translate-y-[8px] rotate-45",
      activeBar2: "opacity-0",
      activeBar3: "-translate-y-[8px] -rotate-45",
    },
    minimal: {
      container: "bg-transparent",
      bar: "bg-current rounded-sm",
      activeBar1: "translate-y-[6px] rotate-45",
      activeBar2: "scale-x-0 opacity-0",
      activeBar3: "-translate-y-[6px] -rotate-45",
    },
    elegant: {
      container: "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg",
      bar: "bg-current rounded-full",
      activeBar1: "w-6 translate-y-[6px] rotate-45",
      activeBar2: "opacity-0 scale-0",
      activeBar3: "w-6 -translate-y-[6px] -rotate-45",
    },
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "flex flex-col items-center justify-center rounded-md transition-all duration-200",
        sizeConfig[size].container,
        variantConfig[variant].container,
        className,
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.()
        }
      }}
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className={cn("flex flex-col", sizeConfig[size].gap)}>
        <span
          className={cn(
            sizeConfig[size].bar,
            variantConfig[variant].bar,
            "transition-all duration-300 ease-in-out transform origin-center",
            isOpen ? variantConfig[variant].activeBar1 : "",
          )}
        />
        <span
          className={cn(
            sizeConfig[size].bar,
            variantConfig[variant].bar,
            "transition-all duration-300 ease-in-out transform",
            isOpen ? variantConfig[variant].activeBar2 : "",
          )}
        />
        <span
          className={cn(
            sizeConfig[size].bar,
            variantConfig[variant].bar,
            "transition-all duration-300 ease-in-out transform origin-center",
            isOpen ? variantConfig[variant].activeBar3 : "",
          )}
        />
      </div>
    </div>
  )
}

