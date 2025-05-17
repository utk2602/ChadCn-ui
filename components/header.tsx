"use client"

import Link from "next/link"
import { Github, Twitter, Search, Sun, Moon, Monitor } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="font-bold text-xl hidden md:inline-block">ChadCn UI</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/docs"
            className={cn(
              "transition-colors hover:text-white/80",
              pathname.startsWith("/docs") ? "text-white" : "text-white/60",
            )}
          >
            Docs
          </Link>
          <Link
            href="/blocks"
            className={cn(
              "transition-colors hover:text-white/80",
              pathname.startsWith("/blocks") ? "text-white" : "text-white/60",
            )}
          >
            Blocks
          </Link>
          <Link
            href="/colors"
            className={cn(
              "transition-colors hover:text-white/80",
              pathname.startsWith("/colors") ? "text-white" : "text-white/60",
            )}
          >
            Colors
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="text-white/80 hover:text-white">
            <Link
              href="https://github.com/utk2602"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              <span className="hidden md:inline-block">Star on GitHub</span>
              <span className="hidden md:inline-block bg-white/10 px-2 py-1 rounded text-xs">359</span>
            </Link>
          </Button>

          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 text-white/60 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="w-64 pl-8 bg-white/10 border-white/10 text-white placeholder:text-white/60 focus-visible:ring-white/30"
            />
            <kbd className="absolute right-2.5 text-white/40 pointer-events-none">⌘K</kbd>
          </div>

          <Button variant="ghost" size="icon" asChild className="text-white/80 hover:text-white">
            <Link href="https://github.com/utk2602" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="text-white/80 hover:text-white">
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
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
            <DropdownMenuContent align="end" className="bg-black border-white/10">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="text-white/80 hover:text-white focus:text-white hover:bg-white/10 focus:bg-white/10"
              >
                <Monitor className="h-4 w-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
