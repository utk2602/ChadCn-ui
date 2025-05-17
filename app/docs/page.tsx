"use client"

import Link from "next/link"
import { ArrowRight, FileCode, Package, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
  return (
    <div className="flex-1 container max-w-6xl py-10 px-4">
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to the ChadCn UI documentation. Learn how to use our custom components.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background rounded-xl border p-6 card-hover">
                <FileCode className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Components</h3>
                <p className="text-muted-foreground mb-4">Explore our collection of custom-built UI components.</p>
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector('[data-value="components"]')?.click()
                    }}
                  >
                    Browse Components
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="bg-background rounded-xl border p-6 card-hover">
                <Package className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Installation</h3>
                <p className="text-muted-foreground mb-4">Learn how to install and set up ChadCn UI in your project.</p>
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector('[data-value="installation"]')?.click()
                    }}
                  >
                    Installation Guide
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="bg-background rounded-xl border p-6 card-hover">
                <Lightbulb className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Usage</h3>
                <p className="text-muted-foreground mb-4">Get started with examples and best practices.</p>
                <Button asChild variant="outline" size="sm" className="gap-1">
                  <Link href="/docs/usage">
                    View Examples
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-6 bg-muted/50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
              <p className="text-muted-foreground">
                ChadCn UI is a collection of custom UI components built with React and Tailwind CSS. These components
                are designed to be bold, clean, and easy to use.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Installation</h3>
                <p>To use ChadCn UI components, you need to have React and Tailwind CSS installed in your project.</p>

                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>npm install chadcn-ui</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Usage</h3>
                <p>Import the components you need from the library and use them in your React application.</p>

                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`import { AnimatedTestimonial } from 'chadcn-ui'

export default function MyPage() {
  return (
    <AnimatedTestimonial 
      author="Chad Developer"
      content="This UI library is absolutely amazing!"
    />
  )
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
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
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  AnimatedTestimonial
                </h3>
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
          </TabsContent>

          <TabsContent value="installation" className="space-y-6">
            <div className="space-y-6 bg-muted/50 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
              <p className="text-muted-foreground">Follow these steps to install ChadCn UI in your project.</p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">1. Install the package</h3>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>npm install chadcn-ui</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">2. Set up Tailwind CSS</h3>
                <p>Make sure you have Tailwind CSS installed and configured in your project.</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/chadcn-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">3. Import styles</h3>
                <p>Import the ChadCn UI styles in your global CSS file.</p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    <code>{`/* globals.css */
@import 'chadcn-ui/dist/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;`}</code>
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
