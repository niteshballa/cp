"use client"

import { useBrand } from "@/hooks/use-brand"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  iconOnly?: boolean
}

export function BrandLogo({ className, iconOnly = false }: BrandLogoProps) {
  const { brand } = useBrand()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full"
        style={{ backgroundColor: brand.logo?.bgColor || "#111827" }}
      >
        {brand.logo?.icon || (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#111827"
            />
            <path
              d="M15.5 9C15.5 10.933 13.933 12.5 12 12.5C10.067 12.5 8.5 10.933 8.5 9C8.5 7.067 10.067 5.5 12 5.5C13.933 5.5 15.5 7.067 15.5 9Z"
              fill="#4ADE80"
            />
          </svg>
        )}
      </div>

      {!iconOnly && <span className="text-lg font-bold">{brand.name || "bnplx"}</span>}
    </div>
  )
}

