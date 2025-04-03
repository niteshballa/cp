"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { MobileHeader } from "@/components/layout/mobile-header"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password"

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [pathname])

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {isMobile && mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Sidebar - hidden completely when closed on mobile */}
      {(isMobile && mobileSidebarOpen) || !isMobile ? (
        <div
          className={cn(
            "fixed top-0 left-0 bottom-0 z-50 transition-all duration-300",
            isMobile ? (mobileSidebarOpen ? "translate-x-0" : "-translate-x-full") : "",
            sidebarCollapsed ? "w-[70px]" : "w-64",
          )}
        >
          <AppSidebar
            collapsed={sidebarCollapsed}
            isMobile={isMobile}
            onToggle={toggleSidebar}
            isOpen={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
            isDarkMode={false} />
        </div>
      ) : null}

      {/* Main content */}
      <div
        className={cn(
          "flex flex-col flex-1 h-screen w-full transition-all duration-300",
          !isMobile && (sidebarCollapsed ? "ml-[70px]" : "ml-64"),
        )}
      >
        {/* Mobile header */}
        {isMobile ? (
          <MobileHeader onMenuClick={toggleSidebar} isMenuOpen={mobileSidebarOpen} isDarkMode={false} />
        ) : (
          <TopBar onMenuClick={toggleSidebar} isMenuOpen={sidebarCollapsed} isDarkMode={false} />
        )}

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="pb-safe">{children}</div>
        </main>
      </div>
    </div>
  )
}

