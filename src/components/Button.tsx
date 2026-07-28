import * as React from "react"
import { motion, HTMLMotionProps, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    return (
      <motion.button
        ref={ref}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-display text-sm uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-50",
          "border-brutal shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          {
            "bg-accent-primary text-white hover:bg-accent-primary-hover": variant === "primary",
            "bg-accent-secondary text-white hover:bg-accent-secondary/90": variant === "secondary",
            "bg-transparent text-ink hover:bg-ink hover:text-canvas-primary": variant === "outline",
            "bg-transparent text-ink border-transparent shadow-none hover:bg-ink/10": variant === "ghost",
          },
          {
            "h-10 px-4 py-2": size === "sm",
            "h-12 px-6 py-3": size === "md",
            "h-14 px-8 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
