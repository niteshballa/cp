"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type BrandConfig, defaultBrand, getBrandConfig } from "@/lib/config"

type BrandContextType = {
  brand: BrandConfig
  updateBrand: (config: Partial<BrandConfig>) => void
}

// Create context with default values to prevent undefined errors
const BrandContext = createContext<BrandContextType>({
  brand: defaultBrand,
  updateBrand: () => {},
})

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandConfig>(defaultBrand)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Load brand config on mount
    setBrand(getBrandConfig())
    setIsInitialized(true)
  }, [])

  const updateBrand = (config: Partial<BrandConfig>) => {
    setBrand((prev) => {
      const newConfig = { ...prev, ...config }

      // Update CSS variables
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--brand-primary", newConfig.primaryColor)
        document.documentElement.style.setProperty("--brand-secondary", newConfig.secondaryColor)
      }

      return newConfig
    })
  }

  return <BrandContext.Provider value={{ brand, updateBrand }}>{children}</BrandContext.Provider>
}

export function useBrand() {
  return useContext(BrandContext)
}

