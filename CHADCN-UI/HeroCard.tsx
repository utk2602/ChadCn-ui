"use client"
import type React from "react"
import { cn } from "@/lib/utils"

export interface HeroCardProps {
  title: string
  description: string
  image?: string
  imageAlt?: string
  action?: React.ReactNode
  className?: string
  imagePosition?: "left" | "right" | "top" | "bottom"
  variant?: "default" | "outline" | "ghost"
}

export const HeroCard: React.FC<HeroCardProps> = ({
  title,
  description,
  image,
  imageAlt = "Hero image",
  action,
  className,
  imagePosition = "right",
  variant = "default",
}) => {
  const variantStyles = {
    default: "bg-background border",
    outline: "border-2 bg-transparent",
    ghost: "bg-muted/50",
  }

  const isHorizontal = imagePosition === "left" || imagePosition === "right"

  return (
    <div className={cn("overflow-hidden rounded-lg", variantStyles[variant], className)}>
      <div
        className={cn(
          "flex flex-col gap-6 p-6",
          isHorizontal ? "md:flex-row md:items-center" : "",
          imagePosition === "right" && "md:flex-row-reverse",
          imagePosition === "bottom" && "flex-col-reverse",
        )}
      >
        <div className={cn("flex flex-col gap-4", isHorizontal ? "md:flex-1" : "")}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>

        {image && (
          <div className={cn("overflow-hidden rounded-md", isHorizontal ? "md:flex-1" : "aspect-video w-full")}>
            <img src={image || "/placeholder.svg"} alt={imageAlt} className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </div>
  )
}
