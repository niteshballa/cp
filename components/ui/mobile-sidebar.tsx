"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { useTheme } from "@/components/theme-provider"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const { resolvedTheme } = useTheme()

  // Use resolvedTheme to determine the current theme
  const currentTheme = resolvedTheme || "dark" // Default to dark if undefined

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={`p-0 w-[280px] border-r-0 ${currentTheme === "light" ? "bg-gray-100" : "bg-gray-900"}`}
      >
        <AppSidebar isMobile={true} isOpen={open} onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

