import { cn } from "@/lib/utils"

interface PageTitleProps {
  title: string
  description?: string
  className?: string
}

export function PageTitle({ title, description, className }: PageTitleProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">{title}</h1>
      {description && (
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">{description}</p>
      )}
    </div>
  )
}

