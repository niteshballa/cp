"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type SidebarContextType = {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  expanded: true,
  setExpanded: () => {},
  toggleSidebar: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Check for saved state in localStorage
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebar-expanded")
      if (savedState !== null) {
        setExpanded(savedState === "true")
      }
    }
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("sidebar-expanded", expanded.toString())
    }
  }, [expanded, mounted])

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  return <SidebarContext.Provider value={{ expanded, setExpanded, toggleSidebar }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

