import * as React from "react"

// Enhanced breakpoints for better mobile detection
const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [screenSize, setScreenSize] = React.useState<keyof typeof BREAKPOINTS>('md')

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.sm) setScreenSize('xs')
      else if (width < BREAKPOINTS.md) setScreenSize('sm')
      else if (width < BREAKPOINTS.lg) setScreenSize('md')
      else if (width < BREAKPOINTS.xl) setScreenSize('lg')
      else if (width < BREAKPOINTS["2xl"]) setScreenSize('xl')
      else setScreenSize('2xl')
      
      setIsMobile(width < BREAKPOINTS.md)
    }

    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    const onChange = () => updateScreenSize()
    
    mql.addEventListener("change", onChange)
    updateScreenSize()
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return { isMobile: !!isMobile, screenSize }
}

// Hook for touch gestures
export function useTouchGestures() {
  const [touchStart, setTouchStart] = React.useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = React.useState<{ x: number; y: number } | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)
    
    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        // Swiped left
        return { direction: 'left', distance: distanceX }
      } else {
        // Swiped right
        return { direction: 'right', distance: Math.abs(distanceX) }
      }
    } else if (!isHorizontalSwipe && Math.abs(distanceY) > minSwipeDistance) {
      if (distanceY > 0) {
        // Swiped up
        return { direction: 'up', distance: distanceY }
      } else {
        // Swiped down
        return { direction: 'down', distance: Math.abs(distanceY) }
      }
    }
    
    return null
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}

// Hook for mobile-specific animations
export function useMobileAnimations() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  const fadeInUp = React.useCallback(() => {
    setIsAnimating(true)
    setIsVisible(true)
    setTimeout(() => setIsAnimating(false), 600)
  }, [])

  const fadeOutDown = React.useCallback(() => {
    setIsAnimating(true)
    setIsVisible(false)
    setTimeout(() => setIsAnimating(false), 600)
  }, [])

  const slideInLeft = React.useCallback(() => {
    setIsAnimating(true)
    setIsVisible(true)
    setTimeout(() => setIsAnimating(false), 500)
  }, [])

  const slideInRight = React.useCallback(() => {
    setIsAnimating(true)
    setIsVisible(true)
    setTimeout(() => setIsAnimating(false), 500)
  }, [])

  return {
    isVisible,
    isAnimating,
    fadeInUp,
    fadeOutDown,
    slideInLeft,
    slideInRight,
  }
}

// Utility for responsive values
export function useResponsiveValue<T>(mobileValue: T, desktopValue: T): T {
  const { isMobile } = useIsMobile()
  return isMobile ? mobileValue : desktopValue
}
