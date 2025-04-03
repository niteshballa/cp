"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { AppSidebar } from "./app-sidebar"
import { cn } from "@/lib/utils"
import { getPageTitle } from "@/lib/utils"

interface MobileHeaderProps {
  isDarkMode: boolean
  onMenuClick?: () => void
  isMenuOpen?: boolean
}

export function MobileHeader({ isDarkMode }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <>
      <div
        className={cn(
          "flex md:hidden items-center justify-between h-16 px-4 border-b",
          isDarkMode ? "bg-[#1a1a1a] border-[#2a2a2a] text-white" : "bg-white border-gray-200 text-gray-900",
        )}
      >
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="mr-2" aria-label="Open menu">
            <MenuIcon className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <AppSidebar isMobile={true} isOpen={isOpen} onClose={() => setIsOpen(false)} isDarkMode={isDarkMode} />
        </SheetContent>
      </Sheet>
    </>
  )
}

