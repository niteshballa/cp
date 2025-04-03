"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MobileNavProps {
  children: React.ReactNode
}

export function MobileNav({ children }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px]">
        <ScrollArea className="h-full">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <div className="flex-1 overflow-auto p-2">{children}</div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

