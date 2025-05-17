import Link from "next/link"
import { Github, Twitter, ArrowRight, Zap, Shield, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:py-40 flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/20 via-transparent to-gray-900/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-50/20 animate-gradient-shift" />
        
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center text-center space-y-12">
            {/* Added the dramatic text styling with the class you provided */}
            <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-400 select-none">
              ChadCn - UI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Bold, clean, and custom UI components for the modern web.
              <br className="hidden md:inline" /> Built with a Chad-like attitude.
            </p>

            {/* Decorative element */}
            <div className="w-24 h-1 bg-primary rounded-full my-8" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 font-medium px-8 rounded-full">
                <Link href="/docs">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 font-medium rounded-full border-2">
                <Link href="https://github.com/utk2602" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span>Star on GitHub</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative circle elements */}
        <div className="absolute left-10 top-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-10 bottom-20 w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-secondary/50 dark:bg-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Unique Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Custom-built components with a monochrome design philosophy
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-background rounded-xl border shadow-sm p-8 text-left transition-all duration-200 hover:shadow-md hover:translate-y-[-4px] hover:border-primary/50">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Custom Components</h3>
              <p className="text-muted-foreground">
                Unique, hand-crafted components that aren't based on existing libraries.
              </p>
            </div>
            
            <div className="bg-background rounded-xl border shadow-sm p-8 text-left transition-all duration-200 hover:shadow-md hover:translate-y-[-4px] hover:border-primary/50">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Monochrome Design</h3>
              <p className="text-muted-foreground">
                Clean black and white aesthetics for a bold, minimalist look.
              </p>
            </div>
            
            <div className="bg-background rounded-xl border shadow-sm p-8 text-left transition-all duration-200 hover:shadow-md hover:translate-y-[-4px] hover:border-primary/50">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Easy Integration</h3>
              <p className="text-muted-foreground">
                Simple copy-paste code snippets with clear documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="bg-muted rounded-3xl p-12 md:p-16 flex flex-col items-center text-center relative overflow-hidden border">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative">Ready to build with ChadCn UI?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mb-10 relative">
              Start using our custom components to create beautiful, responsive interfaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 relative">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/docs">View Documentation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-2">
                <Link href="/components">Browse Components</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center mb-8">
            {/* Added the "ChadCn - UI" text at the bottom as requested */}
            <div className="text-center text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-400 select-none mb-8">
              ChadCn - UI
            </div>
            
            <div className="flex gap-6 mb-8">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://github.com/utk2602"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-8">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} ChadCn UI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
              <Link href="/components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Components</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}