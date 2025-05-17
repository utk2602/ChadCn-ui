import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function BlocksPage() {
  return (
    <div className="flex-1 container max-w-6xl py-10 px-4">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">Blocks</h1>
          <p className="text-xl text-muted-foreground">Pre-built UI blocks for rapid application development.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/docs/animated-testimonial"
            className="group bg-background rounded-xl border p-6 hover:border-foreground transition-colors card-hover"
          >
            <div className="aspect-video w-full bg-muted rounded-lg mb-4 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <span className="text-sm">AnimatedTestimonial Preview</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">AnimatedTestimonial</h3>
            <p className="text-muted-foreground mb-4">Animated testimonial cards with smooth transitions.</p>
            <div className="flex items-center text-sm font-medium text-primary">
              View Component
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/docs/hero-card"
            className="group bg-background rounded-xl border p-6 hover:border-foreground transition-colors card-hover"
          >
            <div className="aspect-video w-full bg-muted rounded-lg mb-4 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <span className="text-sm">HeroCard Preview</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">HeroCard</h3>
            <p className="text-muted-foreground mb-4">Bold hero section cards with customizable content.</p>
            <div className="flex items-center text-sm font-medium text-primary">
              View Component
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/docs/gradient-button"
            className="group bg-background rounded-xl border p-6 hover:border-foreground transition-colors card-hover"
          >
            <div className="aspect-video w-full bg-muted rounded-lg mb-4 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <span className="text-sm">GradientButton Preview</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">GradientButton</h3>
            <p className="text-muted-foreground mb-4">Stylish gradient buttons with hover effects.</p>
            <div className="flex items-center text-sm font-medium text-primary">
              View Component
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
