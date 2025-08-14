"use client"
import type React from "react"
import { cn } from "@/lib/utils"
import { useIsMobile, useMobileAnimations, useTouchGestures } from "@/components/ui/use-mobile"
import { useEffect, useState } from "react"

export interface HeroCardProps {
  title: string
  description: string
  image?: string
  imageAlt?: string
  action?: React.ReactNode
  className?: string
  imagePosition?: "left" | "right" | "top" | "bottom"
  variant?: "default" | "outline" | "ghost"
  mobileImagePosition?: "top" | "bottom" // Mobile-specific image position
  showMobileAnimation?: boolean
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
  mobileImagePosition = "top",
  showMobileAnimation = true,
}) => {
  const { isMobile, screenSize } = useIsMobile()
  const { isVisible, fadeInUp, scaleIn } = useMobileAnimations()
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Initialize mobile animations
  useEffect(() => {
    if (isMobile && showMobileAnimation) {
      fadeInUp()
      setTimeout(() => scaleIn(), 200)
    }
  }, [isMobile, showMobileAnimation, fadeInUp, scaleIn])

  // Handle image load
  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  // Handle touch interactions
  const handleTouchEnd = () => {
    const result = onTouchEnd()
    if (result?.direction === 'up' && isMobile) {
      // Trigger some mobile-specific action
      console.log('Swipe up detected')
    }
  }

  const variantStyles = {
    default: "bg-background border shadow-lg hover:shadow-xl mobile-transition",
    outline: "border-2 bg-transparent hover:bg-muted/20 mobile-transition",
    ghost: "bg-muted/50 hover:bg-muted/70 mobile-transition",
  }

  // Determine layout based on device and props
  const effectiveImagePosition = isMobile ? mobileImagePosition : imagePosition
  const isHorizontal = effectiveImagePosition === "left" || effectiveImagePosition === "right"
  const isVertical = effectiveImagePosition === "top" || effectiveImagePosition === "bottom"

  // Mobile-specific styles
  const mobileStyles = {
    container: isMobile ? "mobile-card" : "",
    title: isMobile ? "mobile-text-xl" : "text-2xl md:text-3xl",
    description: isMobile ? "mobile-text-base" : "text-base",
    padding: isMobile ? "p-4" : "p-6",
    gap: isMobile ? "gap-4" : "gap-6",
    imageContainer: isMobile ? "aspect-square md:aspect-video" : "aspect-video",
  }

  return (
    <div 
      className={cn(
        "overflow-hidden rounded-xl mobile-transition",
        variantStyles[variant], 
        mobileStyles.container,
        className,
        isMobile && showMobileAnimation ? "mobile-fade-in-up" : "",
        isHovered && !isMobile ? "scale-[1.02]" : ""
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cn(
          "flex flex-col",
          mobileStyles.gap,
          mobileStyles.padding,
          isHorizontal ? "md:flex-row md:items-center" : "",
          effectiveImagePosition === "right" && "md:flex-row-reverse",
          effectiveImagePosition === "bottom" && "flex-col-reverse",
          // Mobile-specific layout adjustments
          isMobile && effectiveImagePosition === "top" && "flex-col",
          isMobile && effectiveImagePosition === "bottom" && "flex-col-reverse",
        )}
      >
        {/* Content Section */}
        <div className={cn(
          "flex flex-col gap-3 md:gap-4", 
          isHorizontal ? "md:flex-1" : "",
          isMobile && "order-2"
        )}>
          <h2 className={cn(
            "font-bold tracking-tight mobile-transition",
            mobileStyles.title,
            isMobile && "text-center md:text-left"
          )}>
            {title}
          </h2>
          <p className={cn(
            "text-muted-foreground mobile-transition",
            mobileStyles.description,
            isMobile && "text-center md:text-left leading-relaxed"
          )}>
            {description}
          </p>
          {action && (
            <div className={cn(
              "mt-2 mobile-transition",
              isMobile && "flex justify-center md:justify-start"
            )}>
              {action}
            </div>
          )}
        </div>

        {/* Image Section */}
        {image && (
          <div className={cn(
            "overflow-hidden rounded-lg mobile-transition",
            isHorizontal ? "md:flex-1" : mobileStyles.imageContainer,
            "w-full",
            isMobile && "order-1",
            // Mobile-specific image sizing
            isMobile && screenSize === 'xs' && "h-48",
            isMobile && screenSize === 'sm' && "h-56",
            !isMobile && "h-64 md:h-80"
          )}>
            <div className="relative w-full h-full group">
              <img 
                src={image || "/placeholder.svg"} 
                alt={imageAlt} 
                className={cn(
                  "h-full w-full object-cover mobile-transition",
                  isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
                  isMobile ? "touch-feedback" : "hover:scale-105"
                )}
                onLoad={handleImageLoad}
                loading="lazy"
              />
              
              {/* Mobile-specific image overlay */}
              {isMobile && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 mobile-transition" />
              )}
              
              {/* Loading state */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile-specific features */}
      {isMobile && (
        <div className="px-4 pb-4">
          {/* Mobile interaction indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>💡</span>
            <span>Swipe up for more info</span>
          </div>
        </div>
      )}

      {/* Mobile quick actions */}
      {isMobile && action && (
        <div className="px-4 pb-4">
          <div className="flex gap-2 justify-center">
            {React.isValidElement(action) && React.cloneElement(action as React.ReactElement, {
              className: cn(
                (action as React.ReactElement).props.className,
                "mobile-button touch-feedback"
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
