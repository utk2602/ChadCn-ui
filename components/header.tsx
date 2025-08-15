"use client"

import Link from "next/link"
import { Github, Twitter, Search, Sun, Moon, Monitor, Component, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useIsMobile, useTouchGestures, useMobileAnimations } from "@/components/ui/use-mobile"
import { useCompleteTheme, useIsDarkTheme } from "@/components/ui/use-theme"
import { useState, useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { isMobile, screenSize } = useIsMobile()
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures()
  const { isVisible, fadeInUp, fadeOutDown } = useMobileAnimations()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const themeData = useCompleteTheme()
  const isDark = useIsDarkTheme()

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  // Initialize mobile animations
  useEffect(() => {
    fadeInUp()
  }, [fadeInUp])

  const handleTouchEnd = () => {
    const result = onTouchEnd()
    if (result?.direction === 'left' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    } else if (result?.direction === 'right' && !isMobileMenuOpen) {
      setIsMobileMenuOpen(true)
    }
  }

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      fadeOutDown()
      setTimeout(() => setIsMobileMenuOpen(false), 300)
    } else {
      setIsMobileMenuOpen(true)
      fadeInUp()
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b mobile-transition",
      isDark 
        ? "bg-black text-white border-zinc-800" 
        : "bg-white text-zinc-900 border-zinc-200"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center space-x-2 touch-feedback">
            <Component className={cn(
              "h-8 w-8",
              isDark ? "text-white" : "text-zinc-900"
            )} />
            <span className={cn(
              "font-bold text-xl transition-all duration-300",
              isMobile ? "text-lg" : "text-xl",
              isMobile && isSearchOpen ? "hidden" : "block"
            )}>
              ChadCn UI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/docs"
              className={cn(
                "transition-colors hover:opacity-80 mobile-nav-item",
                pathname.startsWith("/docs") 
                  ? (isDark ? "text-white" : "text-zinc-900")
                  : (isDark ? "text-white/60" : "text-zinc-600"),
              )}
            >
              Docs
            </Link>
            <Link
              href="/Components"
              className={cn(
                "transition-colors hover:opacity-80 mobile-nav-item",
                pathname.startsWith("/Components") 
                  ? (isDark ? "text-white" : "text-zinc-900")
                  : (isDark ? "text-white/60" : "text-zinc-600"),
              )}
            >
              Components 
            </Link>
            <Link
              href="/colors"
              className={cn(
                "transition-colors hover:opacity-80 mobile-nav-item",
                pathname.startsWith("/colors") 
                  ? (isDark ? "text-white" : "text-zinc-900")
                  : (isDark ? "text-white/60" : "text-zinc-600"),
              )}
            >
              Colors
            </Link>
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className={cn(
              "md:hidden touch-feedback",
              isDark 
                ? "text-white/80 hover:text-white" 
                : "text-zinc-600 hover:text-zinc-900"
            )}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          {/* Search - Enhanced for mobile */}
          <div className={cn(
            "relative transition-all duration-300",
            isMobile ? "flex-1 max-w-xs" : "hidden lg:flex items-center"
          )}>
            {isMobile && !isSearchOpen ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className={cn(
                  "touch-feedback",
                  isDark 
                    ? "text-white/80 hover:text-white" 
                    : "text-zinc-600 hover:text-zinc-900"
                )}
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </Button>
            ) : (
              <div className={cn(
                "relative w-full transition-all duration-300",
                isMobile && isSearchOpen ? "opacity-100 scale-100" : "opacity-100 scale-100"
              )}>
                <Search className={cn(
                  "absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4",
                  isDark ? "text-white/60" : "text-zinc-400"
                )} />
                <Input
                  type="search"
                  placeholder={isMobile ? "Search..." : "Search documentation..."}
                  className={cn(
                    "w-full pl-8 border placeholder:text-zinc-500 focus-visible:ring-zinc-300",
                    isDark 
                      ? "bg-white/10 border-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/30" 
                      : "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-zinc-300",
                    isMobile ? "text-sm h-10" : "w-64"
                  )}
                  autoFocus={isMobile && isSearchOpen}
                />
                {!isMobile && (
                  <kbd className={cn(
                    "absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none",
                    isDark ? "text-white/40" : "text-zinc-400"
                  )}>⌘K</kbd>
                )}
                {isMobile && isSearchOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSearch}
                    className={cn(
                      "absolute right-1 top-1/2 transform -translate-y-1/2 touch-feedback",
                      isDark 
                        ? "text-white/60 hover:text-white" 
                        : "text-zinc-400 hover:text-zinc-900"
                    )}
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* GitHub Button - Responsive */}
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className={cn(
              "touch-feedback",
              isDark 
                ? "text-white/80 hover:text-white" 
                : "text-zinc-600 hover:text-zinc-900"
            )}
          >
            <Link
              href="https://github.com/utk2602/ChadCn-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              <span className={cn(
                "transition-all duration-300",
                isMobile ? "hidden" : "hidden lg:inline-block"
              )}>
                Star on GitHub
              </span>
            </Link>
          </Button>

          {/* Twitter - Always visible */}
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className={cn(
              "touch-feedback",
              isDark 
                ? "text-white/80 hover:text-white" 
                : "text-zinc-600 hover:text-zinc-900"
            )}
          >
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>

          {/* Theme Toggle - Always visible */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "touch-feedback",
                  isDark 
                    ? "text-white/80 hover:text-white" 
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Monitor className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={cn(
              "border",
              isDark 
                ? "bg-black border-white/10" 
                : "bg-white border-zinc-200"
            )}>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className={cn(
                  "mobile-nav-item",
                  isDark 
                    ? "text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10" 
                    : "text-zinc-700 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100"
                )}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className={cn(
                  "mobile-nav-item",
                  isDark 
                    ? "text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10" 
                    : "text-zinc-700 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100"
                )}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className={cn(
                  "mobile-nav-item",
                  isDark 
                    ? "text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10" 
                    : "text-zinc-700 hover:text-zinc-900 focus:text-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100"
                )}
              >
                <Monitor className="h-4 w-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div 
          className={cn(
            "md:hidden fixed inset-0 z-40 mobile-backdrop",
            isDark ? "bg-black/95" : "bg-white/95"
          )}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            {/* Close button */}
            <button
              onClick={toggleMobileMenu}
              className={cn(
                "absolute top-4 right-4 p-2 rounded-lg touch-feedback",
                isDark 
                  ? "bg-white/10 text-white" 
                  : "bg-zinc-100 text-zinc-900"
              )}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-4 mobile-fade-in-up">
              <Link
                href="/docs"
                className={cn(
                  "mobile-nav-item text-lg py-4 px-6 rounded-xl transition-all duration-200",
                  pathname.startsWith("/docs") 
                    ? (isDark ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-900")
                    : (isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50")
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link
                href="/Components"
                className={cn(
                  "mobile-nav-item text-lg py-4 px-6 rounded-xl transition-all duration-200",
                  pathname.startsWith("/Components") 
                    ? (isDark ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-900")
                    : (isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50")
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Components
              </Link>
              <Link
                href="/colors"
                className={cn(
                  "mobile-nav-item text-lg py-4 px-6 rounded-xl transition-all duration-200",
                  pathname.startsWith("/colors") 
                    ? (isDark ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-900")
                    : (isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50")
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Colors
              </Link>
            </nav>

            {/* Mobile Footer */}
            <div className="mt-auto pb-8 mobile-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "touch-feedback",
                    isDark 
                      ? "text-white/80 hover:text-white" 
                      : "text-zinc-600 hover:text-zinc-900"
                  )}
                >
                  <Link
                    href="https://github.com/utk2602/ChadCn-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "touch-feedback",
                    isDark 
                      ? "text-white/80 hover:text-white" 
                      : "text-zinc-600 hover:text-zinc-900"
                  )}
                >
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                    <span>Twitter</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Swipe indicator */}
            <div className={cn(
              "swipe-indicator text-center text-sm",
              isDark ? "text-white/60" : "text-zinc-500"
            )}>
              <span>Swipe left to close</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}