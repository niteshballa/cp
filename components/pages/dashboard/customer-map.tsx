"use client"

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { GradientCard } from "@/components/ui/gradient-card"

export function CustomerMap({ className }: { className?: string }) {
  const { config } = useConfig()

  return (
    <GradientCard
      gradient="accent"
      className={cn(
        "h-full",
        className,
        config.animations && "animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 fill-mode-both",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Customer Locations</CardTitle>
          <Badge variant="outline" className="font-normal bg-primary/10 text-primary">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-square w-full rounded-md bg-muted/30 flex items-center justify-center overflow-hidden relative">
          {/* Placeholder map with gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20"></div>

          {/* Placeholder dots representing customers */}
          <div
            className={cn("absolute h-2 w-2 rounded-full bg-primary", config.animations && "animate-pulse")}
            style={{ top: "30%", left: "40%" }}
          ></div>
          <div
            className={cn("absolute h-3 w-3 rounded-full bg-primary", config.animations && "animate-pulse")}
            style={{ top: "50%", left: "70%" }}
          ></div>
          <div
            className={cn("absolute h-2 w-2 rounded-full bg-primary", config.animations && "animate-pulse")}
            style={{ top: "70%", left: "30%" }}
          ></div>
          <div
            className={cn("absolute h-4 w-4 rounded-full bg-primary", config.animations && "animate-pulse")}
            style={{ top: "40%", left: "60%" }}
          ></div>
          <div
            className={cn("absolute h-2 w-2 rounded-full bg-primary", config.animations && "animate-pulse")}
            style={{ top: "60%", left: "50%" }}
          ></div>

          <div className="text-center text-muted-foreground z-10">
            <p>Interactive map</p>
            <p className="text-xs">Coming soon</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="font-medium">Top Countries</span>
            <span className="text-muted-foreground">USA, UK, Canada</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Active Now</span>
            <span className="text-muted-foreground">24 customers</span>
          </div>
        </div>
      </CardContent>
    </GradientCard>
  )
}

