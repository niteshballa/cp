import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface GradientCardProps extends React.ComponentProps<typeof Card> {
  gradient?: string
  hoverEffect?: boolean
  glassEffect?: boolean
}

export function GradientCard({
  gradient = "from-primary/20 to-primary/5",
  hoverEffect = true,
  glassEffect = true,
  className,
  children,
  ...props
}: GradientCardProps) {
  return (
    <Card
      className={cn(
        "border border-border/50 shadow-md overflow-hidden",
        `bg-gradient-to-br ${gradient}`,
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        glassEffect && "backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  )
}

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle }

