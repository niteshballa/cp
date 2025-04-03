"use client"

import { useEffect, useState } from "react"
import { CheckIcon, PaletteIcon, XIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { themes } from "@/registry/themes"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  const { theme: currentTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { config, setConfig } = useConfig()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-10 w-10 rounded-full shadow-md border border-border bg-background z-50"
        >
          <PaletteIcon className="h-5 w-5" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] max-h-[80vh] overflow-y-auto">
        <DrawerHeader className="flex items-center justify-between border-b px-4 py-2">
          <DrawerTitle className="text-lg">Customize Theme</DrawerTitle>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DrawerHeader>
        <Tabs defaultValue="themes" className="px-4 py-6">
          <TabsList className="w-full mb-4 grid grid-cols-3">
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="fonts">Fonts</TabsTrigger>
          </TabsList>
          <TabsContent value="themes" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Color Theme</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {themes.map((theme) => (
                  <Button
                    key={theme.name}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setConfig({
                        ...config,
                        theme: theme.name,
                      })
                      document.documentElement.classList.remove(...themes.map((t) => t.name))
                      document.documentElement.classList.add(theme.name)
                    }}
                    className={cn("justify-start px-3 py-6 border-2", config.theme === theme.name && "border-primary")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: theme.activeColor }} />
                      <span>{theme.label}</span>
                    </div>
                    {config.theme === theme.name && <CheckIcon className="ml-auto h-4 w-4 text-primary" />}
                  </Button>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Mode</h3>
              <div className="grid grid-cols-3 gap-2">
                {["light", "dark", "system"].map((mode) => (
                  <Button
                    key={mode}
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(mode)}
                    className={cn("justify-start px-3", currentTheme === mode && "border-2 border-primary")}
                  >
                    <span className="capitalize">{mode}</span>
                    {currentTheme === mode && <CheckIcon className="ml-auto h-4 w-4 text-primary" />}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="radius">Border Radius</Label>
                <span className="text-xs text-muted-foreground">{config.radius}px</span>
              </div>
              <Slider
                id="radius"
                min={0}
                max={24}
                step={1}
                value={[config.radius]}
                onValueChange={(value) => {
                  setConfig({
                    ...config,
                    radius: value[0],
                  })
                  document.documentElement.style.setProperty("--radius", `${value[0]}px`)
                }}
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-sm font-medium">UI Preferences</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="condensed-ui">Condensed UI</Label>
                <Switch
                  id="condensed-ui"
                  checked={config.condensedUi}
                  onCheckedChange={(checked) => {
                    setConfig({
                      ...config,
                      condensedUi: checked,
                    })
                    document.documentElement.classList.toggle("condensed-ui", checked)
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="animations">UI Animations</Label>
                <Switch
                  id="animations"
                  checked={config.animations}
                  onCheckedChange={(checked) => {
                    setConfig({
                      ...config,
                      animations: checked,
                    })
                    document.documentElement.classList.toggle("no-animations", !checked)
                  }}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="fonts" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size">Font Size</Label>
                <span className="text-xs text-muted-foreground">{config.fontSize}px</span>
              </div>
              <Slider
                id="font-size"
                min={12}
                max={18}
                step={1}
                value={[config.fontSize]}
                onValueChange={(value) => {
                  setConfig({
                    ...config,
                    fontSize: value[0],
                  })
                  document.documentElement.style.setProperty("--font-size", `${value[0]}px`)
                }}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Font Weight</h3>
              <div className="grid grid-cols-3 gap-2">
                {["normal", "medium", "semibold"].map((weight) => (
                  <Button
                    key={weight}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setConfig({
                        ...config,
                        fontWeight: weight,
                      })
                      document.documentElement.style.setProperty("--font-weight", weight)
                    }}
                    className={cn("justify-start px-3", config.fontWeight === weight && "border-2 border-primary")}
                  >
                    <span className="capitalize">{weight}</span>
                    {config.fontWeight === weight && <CheckIcon className="ml-auto h-4 w-4 text-primary" />}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}

