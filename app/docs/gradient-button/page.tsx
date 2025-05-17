import { GradientButton } from "@/CHADCN-UI/GradientButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function GradientButtonPage() {
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
            <h1 className="text-4xl font-bold tracking-tight gradient-text">GradientButton</h1>
            <p className="text-xl text-muted-foreground">
              A customizable button component with gradient styling and hover effects.
            </p>
          </div>
        </div>

        <div className="space-y-6 bg-muted/30 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <GradientButton variant="primary" size="md">
                  Primary Button
                </GradientButton>
                <GradientButton variant="secondary" size="md">
                  Secondary Button
                </GradientButton>
                <GradientButton variant="outline" size="md">
                  Outline Button
                </GradientButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <GradientButton variant="primary" size="sm">
                  Small
                </GradientButton>
                <GradientButton variant="primary" size="md">
                  Medium
                </GradientButton>
                <GradientButton variant="primary" size="lg">
                  Large
                </GradientButton>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="usage" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="code">Component Code</TabsTrigger>
          </TabsList>

          <TabsContent value="installation" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
            <p>No additional dependencies required. Just copy the component code.</p>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-auto">
                <code>{`import { GradientButton } from '@/CHADCN-UI/GradientButton'

export default function ButtonsSection() {
  return (
    <div className="flex gap-4">
      <GradientButton variant="primary" size="md">
        Primary Button
      </GradientButton>
      <GradientButton variant="secondary" size="md">
        Secondary Button
      </GradientButton>
      <GradientButton variant="outline" size="md">
        Outline Button
      </GradientButton>
    </div>
  )
}`}</code>
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Component Code</h2>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-auto">
                <code>{`"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  asChild?: boolean
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, variant = "primary", size = "md", className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    
    const variantStyles = {
      primary: "bg-gradient-to-r from-gray-900 to-black text-white hover:shadow-lg dark:from-white dark:to-gray-200 dark:text-black",
      secondary: "bg-gradient-to-r from-gray-200 to-white text-black hover:shadow-lg dark:from-gray-800 dark:to-gray-900 dark:text-white",
      outline: "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black",
    }
    
    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-md",
      md: "text-sm px-4 py-2 rounded-md",
      lg: "text-base px-6 py-3 rounded-lg",
    }
    
    return (
      <Comp>
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
          {...props}
        >
          {children}
        </button>
      </Comp>
    )
  }
)

GradientButton.displayName = "GradientButton"`}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
