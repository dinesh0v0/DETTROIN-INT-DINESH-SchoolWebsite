import * as React from "react"
import { motion, HTMLMotionProps, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable && !shouldReduceMotion ? { y: -4, x: -4, boxShadow: "8px 8px 0px 0px #1A1A1A" } : {}}
        className={cn(
          "bg-canvas-primary border-brutal shadow-brutal overflow-hidden transition-shadow duration-200",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"
