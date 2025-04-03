"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  formatValue?: (value: number) => string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1000,
  formatValue = (val) => val.toString(),
  className,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const startTime = useRef<number | null>(null)
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = timestamp - startTime.current

      const percentage = Math.min(progress / duration, 1)
      const easedPercentage = easeOutQuart(percentage)
      const currentValue = Math.floor(easedPercentage * value)

      setDisplayValue(currentValue)

      if (percentage < 1) {
        animationFrameId.current = requestAnimationFrame(animate)
      }
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [value, duration, isInView])

  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4)
  }

  return (
    <span ref={ref} className={className}>
      {formatValue(displayValue)}
    </span>
  )
}

