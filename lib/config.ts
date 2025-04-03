import type React from "react"
import { getEnvConfig } from "@/lib/env-config"

// Configuration for white-labeling and branding
export type BrandConfig = {
    name: string
    primaryColor: string
    secondaryColor: string
    testModeColor: string
    liveModeColor: string
}

// Get environment config
const envConfig = getEnvConfig()

// Default configuration
export const defaultBrand: BrandConfig = {
    name: envConfig.companyName,
    primaryColor: "#4ADE80",
    secondaryColor: "#6366F1",
    testModeColor: "#F59E0B",
    liveModeColor: "#10B981",
}

// Function to get current brand config
export function getBrandConfig(): BrandConfig {
    // In a real app, this could load from localStorage, API, etc.
    return defaultBrand
}

// Function to update brand config
export function updateBrandConfig(config: Partial<BrandConfig>): BrandConfig {
    // In a real app, this would save to localStorage, API, etc.
    const newConfig = { ...defaultBrand, ...config }

    // Update CSS variables to reflect brand colors
    if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--primary", newConfig.primaryColor)
        document.documentElement.style.setProperty("--secondary", newConfig.secondaryColor)
    }

    return newConfig
}

