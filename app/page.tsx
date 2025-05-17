import Link from "next/link"
import { Github, Twitter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 flex items-center">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter gradient-text">ChadCn UI</h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Bold, clean, and custom UI components for the modern web.
                <br className="hidden md:inline" /> Built with a Chad-like attitude.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 font-medium px-8">
                <Link href="/docs">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 font-medium">
                <Link href="https://github.com/utk2602" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span>Star on GitHub</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/50 dark:bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unique Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Custom-built components with a monochrome design philosophy
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-background rounded-xl border p-8 text-left card-hover">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-layout-template"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Components</h3>
              <p className="text-muted-foreground">
                Unique, hand-crafted components that aren't based on existing libraries.
              </p>
            </div>
            <div className="bg-background rounded-xl border p-8 text-left card-hover">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-palette"
                >
                  <circle cx="13.5" cy="6.5" r=".5" />
                  <circle cx="17.5" cy="10.5" r=".5" />
                  <circle cx="8.5" cy="7.5" r=".5" />
                  <circle cx="6.5" cy="12.5" r=".5" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Monochrome Design</h3>
              <p className="text-muted-foreground">Clean black and white aesthetics for a bold, minimalist look.</p>
            </div>
            <div className="bg-background rounded-xl border p-8 text-left card-hover">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-code"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Integration</h3>
              <p className="text-muted-foreground">Simple copy-paste code snippets with clear documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="bg-muted rounded-2xl p-8 md:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build with ChadCn UI?</h2>
            <p className="text-muted-foreground max-w-2xl mb-8">
              Start using our custom components to create beautiful, responsive interfaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/docs">View Documentation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/components">Browse Components</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} ChadCn UI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com/utk2602"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
