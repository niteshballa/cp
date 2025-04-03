"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo, use } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { MobileHeader } from "@/components/layout/mobile-header"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn, getPageTitle } from "@/lib/utils"
import { SidebarProvider } from "@/components/providers/sidebar-provider"
import { Toaster } from "@/components/ui/toaster"
import { ConfigProvider } from "@/hooks/use-config"
import { BrandProvider } from "@/hooks/use-brand"
import { ErrorBoundary } from "@/components/error-boundary"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const router = useRouter()
  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname])
  // implement enums for description and title 

  // Redirect to home if on root path
  useEffect(() => {
    if (pathname === "/") {
      router.push("/home")
    }
  }, [pathname, router])

  // Check for dark mode preference
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const isDarkNow = document.documentElement.classList.contains("dark")
          setIsDarkMode(isDarkNow)
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Toggle sidebar collapsed state - memoized to prevent unnecessary re-renders
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  // Determine if the current page is an auth page
  const isAuthPage = useMemo(() => pathname === "/login" || pathname === "/signup", [pathname])

  if (isAuthPage) {
    return <ThemeProvider>{children}</ThemeProvider>
  }

  return (
    <ThemeProvider>
      <ConfigProvider>
        <BrandProvider>
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar for desktop */}
              {!isMobile && (
                <div
                  className={cn(
                    "hidden md:block transition-all duration-300 ease-in-out",
                    sidebarCollapsed ? "w-[70px]" : "w-64",
                  )}
                >
                  <ErrorBoundary>
                    <AppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} isDarkMode={isDarkMode} />
                  </ErrorBoundary>
                </div>
              )}

              {/* Main content area */}
              <div className="flex flex-col flex-1 w-full overflow-hidden">
                {/* Mobile header */}
                {isMobile && (
                  <ErrorBoundary>
                    <MobileHeader isDarkMode={isDarkMode} />
                  </ErrorBoundary>
                )}

                {/* Desktop top bar */}
                {!isMobile && (
                  <div className="hidden md:block">
                    <ErrorBoundary>
                      <TopBar onMenuClick={toggleSidebar} isDarkMode={isDarkMode} pageTitle={pageTitle} />
                    </ErrorBoundary>
                  </div>
                )}

                {/* Page content */}
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </BrandProvider>
      </ConfigProvider>
    </ThemeProvider>
  )
}

