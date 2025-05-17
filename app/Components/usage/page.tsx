import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UsagePage() {
  return (
    <div className="flex-1 container max-w-6xl py-10 px-4">
      <div className="space-y-10">
        <div>
          <Link
            href="/docs"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Documentation
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight gradient-text">Usage Examples</h1>
            <p className="text-xl text-muted-foreground">Learn how to use ChadCn UI components in your projects.</p>
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="basic">Basic Usage</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Usage</TabsTrigger>
            <TabsTrigger value="patterns">Common Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="space-y-6 bg-muted/50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight">Basic Usage</h2>
              <p className="text-muted-foreground">Here's how to use ChadCn UI components in your React application.</p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Import Components</h3>
                <p>Import the components you need from the library.</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`import { AnimatedTestimonial, HeroCard, GradientButton } from 'chadcn-ui'`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Use Components</h3>
                <p>Use the components in your JSX.</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`export default function HomePage() {
  return (
    <div>
      <HeroCard
        title="Welcome to My Website"
        description="A beautiful website built with ChadCn UI components."
        image="/hero-image.jpg"
        action={
          <GradientButton>Get Started</GradientButton>
        }
      />
      
      {/* More components... */}
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-6 bg-muted/50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight">Advanced Usage</h2>
              <p className="text-muted-foreground">Learn how to customize and extend ChadCn UI components.</p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Customizing Components</h3>
                <p>You can customize components using props or by extending them.</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`import { GradientButton } from 'chadcn-ui'
import { cn } from '@/lib/utils'

// Customizing with props
export function CustomButton({ className, ...props }) {
  return (
    <GradientButton
      variant="primary"
      className={cn("px-8 py-3 text-lg", className)}
      {...props}
    />
  )
}

// Usage
<CustomButton>Custom Button</CustomButton>`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Composition</h3>
                <p>Compose multiple components together to create complex UIs.</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`import { HeroCard, AnimatedTestimonial, GradientButton } from 'chadcn-ui'

export function LandingPage() {
  return (
    <div className="space-y-12">
      <HeroCard
        title="Welcome"
        description="..."
        action={<GradientButton>Get Started</GradientButton>}
      />
      
      <section>
        <h2>What Our Customers Say</h2>
        <AnimatedTestimonial testimonials={testimonials} />
      </section>
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="space-y-6 bg-muted/50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight">Common Patterns</h2>
              <p className="text-muted-foreground">Explore common patterns and best practices when using ChadCn UI.</p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Responsive Design</h3>
                <p>ChadCn UI components are designed to be responsive by default.</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`<HeroCard
  title="Responsive Hero"
  description="This card will adapt to different screen sizes."
  imagePosition="right" // Will stack vertically on mobile
/>`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Dark Mode Support</h3>
                <p>All components support dark mode out of the box.</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`// Your theme provider
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <YourApp />
</ThemeProvider>

// Components will automatically adapt to dark mode
<GradientButton>
  This button will look good in both light and dark mode
</GradientButton>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
