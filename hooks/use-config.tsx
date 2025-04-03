"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Config = {
  theme: string
  radius: number
  fontSize: number
  fontWeight: "normal" | "medium" | "semibold"
  condensedUi: boolean
  animations: boolean
}

const initialConfig: Config = {
  theme: "indigo",
  radius: 8,
  fontSize: 16,
  fontWeight: "normal",
  condensedUi: false,
  animations: true,
}

const ConfigContext = createContext<{
  config: Config
  setConfig: (config: Config) => void
}>({
  config: initialConfig,
  setConfig: () => {},
})

export function ConfigProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [config, setConfig] = useState<Config>(initialConfig)

  useEffect(() => {
    const savedConfig = localStorage.getItem("ui-config")
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        setConfig(parsedConfig)

        // Apply saved config
        document.documentElement.classList.add(parsedConfig.theme)
        document.documentElement.style.setProperty("--radius", `${parsedConfig.radius}px`)
        document.documentElement.style.setProperty("--font-size", `${parsedConfig.fontSize}px`)
        document.documentElement.style.setProperty("--font-weight", parsedConfig.fontWeight)
        document.documentElement.classList.toggle("condensed-ui", parsedConfig.condensedUi)
        document.documentElement.classList.toggle("no-animations", !parsedConfig.animations)
      } catch (error) {
        console.error("Failed to parse saved config", error)
      }
    } else {
      // Apply default config
      document.documentElement.classList.add(initialConfig.theme)
      document.documentElement.style.setProperty("--radius", `${initialConfig.radius}px`)
      document.documentElement.style.setProperty("--font-size", `${initialConfig.fontSize}px`)
      document.documentElement.style.setProperty("--font-weight", initialConfig.fontWeight)
    }
  }, [])

  const handleSetConfig = (newConfig: Config) => {
    setConfig(newConfig)
    localStorage.setItem("ui-config", JSON.stringify(newConfig))
  }

  return <ConfigContext.Provider value={{ config, setConfig: handleSetConfig }}>{children}</ConfigContext.Provider>
}

export const useConfig = () => {
  return useContext(ConfigContext)
}

