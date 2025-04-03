"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false} {...props}>
      {children}
    </NextThemesProvider>
  )
}

// Custom hook that wraps next-themes useTheme
export function useTheme() {
  // Use the hook from next-themes
  const nextTheme = useNextTheme()
  const [mounted, setMounted] = React.useState(false)

  // Add client-side only effect to ensure theme is applied to document
  React.useEffect(() => {
    setMounted(true)

    // Add a class to the body when the theme is fully loaded
    // This helps with transitions
    if (nextTheme.resolvedTheme) {
      document.body.classList.add("theme-loaded")

      // Apply theme color to meta tag for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", nextTheme.resolvedTheme === "dark" ? "#09090b" : "#ffffff")
      }
    }
  }, [nextTheme.resolvedTheme])

  if (!mounted) {
    return {
      theme: undefined,
      setTheme: (theme: string) => console.log("Theme not mounted yet"),
      resolvedTheme: undefined,
      systemTheme: undefined,
    }
  }

  return nextTheme
}

