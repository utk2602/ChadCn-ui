"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  asChild?: boolean
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, variant = "primary", size = "md", className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-gray-900 to-black text-white hover:shadow-lg dark:from-white dark:to-gray-200 dark:text-black",
      secondary:
        "bg-gradient-to-r from-gray-200 to-white text-black hover:shadow-lg dark:from-gray-800 dark:to-gray-900 dark:text-white",
      outline:
        "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black",
    }

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-md",
      md: "text-sm px-4 py-2 rounded-md",
      lg: "text-base px-6 py-3 rounded-lg",
    }

    return (
      <Comp>
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
            variantStyles[variant],
            sizeStyles[size],
            className,
          )}
          {...props}
        >
          {children}
        </button>
      </Comp>
    )
  },
)

GradientButton.displayName = "GradientButton"
