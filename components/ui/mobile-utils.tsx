"use client"
import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useIsMobile, useMobileAnimations, useTouchGestures } from './use-mobile'
import { ChevronUp, ChevronDown, X, Menu, ArrowLeft, ArrowRight } from 'lucide-react'

// Mobile Bottom Sheet Component
interface MobileBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
  snapPoints?: number[]
  defaultSnapPoint?: number
}

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  snapPoints = [25, 50, 75, 100],
  defaultSnapPoint = 50
}) => {
  const { isMobile } = useIsMobile()
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures()
  const [currentSnapPoint, setCurrentSnapPoint] = useState(defaultSnapPoint)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleTouchEnd = () => {
    const result = onTouchEnd()
    if (result?.direction === 'down' && result.distance > 50) {
      onClose()
    }
  }

  const handleSnapPointChange = (snapPoint: number) => {
    setCurrentSnapPoint(snapPoint)
  }

  if (!isMobile) return null

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 mobile-backdrop"
          onClick={onClose}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl mobile-transition",
          isOpen ? "translate-y-0" : "translate-y-full",
          className
        )}
        style={{ height: `${currentSnapPoint}vh` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 touch-feedback"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Snap Point Controls */}
        <div className="flex justify-center gap-2 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
          {snapPoints.map((snapPoint) => (
            <button
              key={snapPoint}
              onClick={() => handleSnapPointChange(snapPoint)}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium mobile-transition",
                currentSnapPoint === snapPoint
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              )}
            >
              {snapPoint}%
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  )
}

// Mobile Swipeable Card Component
interface MobileSwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  className?: string
  threshold?: number
}

export const MobileSwipeableCard: React.FC<MobileSwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className,
  threshold = 50
}) => {
  const { isMobile } = useIsMobile()
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleTouchEnd = () => {
    const result = onTouchEnd()
    if (!result || result.distance < threshold) return

    setIsAnimating(true)
    
    switch (result.direction) {
      case 'left':
        onSwipeLeft?.()
        break
      case 'right':
        onSwipeRight?.()
        break
      case 'up':
        onSwipeUp?.()
        break
      case 'down':
        onSwipeDown?.()
        break
    }

    setTimeout(() => setIsAnimating(false), 300)
  }

  if (!isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={cn(
        "mobile-card mobile-transition",
        isAnimating && "scale-95 opacity-75",
        className
      )}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}

// Mobile Pull to Refresh Component
interface MobilePullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  className?: string
  threshold?: number
}

export const MobilePullToRefresh: React.FC<MobilePullToRefreshProps> = ({
  onRefresh,
  children,
  className,
  threshold = 80
}) => {
  const { isMobile } = useIsMobile()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isRefreshing) return
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isRefreshing) return
    
    const currentY = e.touches[0].clientY
    const distance = Math.max(0, currentY - startY)
    
    if (distance > 0) {
      setPullDistance(distance * 0.5) // Reduce pull distance for better UX
    }
  }

  const handleTouchEnd = async () => {
    if (isRefreshing || pullDistance < threshold) {
      setPullDistance(0)
      return
    }

    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
      setPullDistance(0)
    }
  }

  if (!isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Pull indicator */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-center bg-blue-500 text-white mobile-transition",
          pullDistance > 0 ? "opacity-100" : "opacity-0"
        )}
        style={{ height: `${pullDistance}px` }}
      >
        {isRefreshing ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            <span>Refreshing...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ChevronDown className={cn("transition-transform", pullDistance > threshold && "rotate-180")} />
            <span>{pullDistance > threshold ? "Release to refresh" : "Pull to refresh"}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="mobile-transition"
        style={{ transform: `translateY(${pullDistance}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  )
}

// Mobile Infinite Scroll Component
interface MobileInfiniteScrollProps {
  children: React.ReactNode
  onLoadMore: () => Promise<void>
  hasMore: boolean
  className?: string
  threshold?: number
}

export const MobileInfiniteScroll: React.FC<MobileInfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  className,
  threshold = 100
}) => {
  const { isMobile } = useIsMobile()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isMobile || !hasMore || isLoading) return

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      if (scrollTop + windowHeight >= documentHeight - threshold) {
        setIsLoading(true)
        onLoadMore().finally(() => setIsLoading(false))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile, hasMore, isLoading, onLoadMore, threshold])

  if (!isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className}>
      {children}
      
      {/* Loading indicator */}
      {hasMore && (
        <div className="flex justify-center py-6">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500" />
            <span>Loading more...</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile Gesture Indicator Component
interface MobileGestureIndicatorProps {
  gesture: 'swipe' | 'pinch' | 'rotate' | 'longPress'
  direction?: 'left' | 'right' | 'up' | 'down'
  className?: string
}

export const MobileGestureIndicator: React.FC<MobileGestureIndicatorProps> = ({
  gesture,
  direction,
  className
}) => {
  const { isMobile } = useIsMobile()

  if (!isMobile) return null

  const getGestureIcon = () => {
    switch (gesture) {
      case 'swipe':
        return direction === 'left' ? <ArrowLeft /> : <ArrowRight />
      case 'pinch':
        return '🤏'
      case 'rotate':
        return '🔄'
      case 'longPress':
        return '⏱️'
      default:
        return '👆'
    }
  }

  const getGestureText = () => {
    switch (gesture) {
      case 'swipe':
        return `Swipe ${direction || 'any direction'}`
      case 'pinch':
        return 'Pinch to zoom'
      case 'rotate':
        return 'Rotate to adjust'
      case 'longPress':
        return 'Long press for options'
      default:
        return 'Touch to interact'
    }
  }

  return (
    <div className={cn(
      "flex items-center gap-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-full",
      className
    )}>
      <span className="text-lg">{getGestureIcon()}</span>
      <span>{getGestureText()}</span>
    </div>
  )
} 