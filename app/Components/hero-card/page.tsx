import { HeroCard } from "@/CHADCN-UI/HeroCard"
import { GradientButton } from "@/CHADCN-UI/GradientButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function HeroCardPage() {
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
            <h1 className="text-4xl font-bold tracking-tight gradient-text">HeroCard</h1>
            <p className="text-xl text-muted-foreground">
              A versatile hero card component with customizable layout and styling.
            </p>
          </div>
        </div>

        <div className="space-y-6 bg-muted/30 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
          <HeroCard
            title="Build Better Websites"
            description="ChadCn UI provides custom components that help you build better websites faster and with more confidence."
            image="/placeholder.svg?height=300&width=500"
            imagePosition="right"
            action={<GradientButton>Get Started</GradientButton>}
            className="bg-background"
          />
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
                <code>{`import { HeroCard } from '@/CHADCN-UI/HeroCard'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <HeroCard
      title="Build Better Websites"
      description="ChadCn UI provides custom components that help you build better websites faster and with more confidence."
      image="/path-to-image.jpg"
      imagePosition="right" // 'left', 'right', 'top', or 'bottom'
      variant="default" // 'default', 'outline', or 'ghost'
      action={
        <Button>Get Started</Button>
      }
    />
  )
}`}</code>
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Component Code</h2>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-auto">
                <code>{`import React from "react"
import { cn } from "@/lib/utils"

export interface HeroCardProps {
  title: string
  description: string
  image?: string
  imageAlt?: string
  action?: React.ReactNode
  className?: string
  imagePosition?: "left" | "right" | "top" | "bottom"
  variant?: "default" | "outline" | "ghost"
}

export const HeroCard: React.FC<HeroCardProps> = ({
  title,
  description,
  image,
  imageAlt = "Hero image",
  action,
  className,
  imagePosition = "right",
  variant = "default",
}) => {
  const variantStyles = {
    default: "bg-background border",
    outline: "border-2 bg-transparent",
    ghost: "bg-muted/50",
  }

  const isHorizontal = imagePosition === "left" || imagePosition === "right"
  
  return (
    <div 
      className={cn(
        "overflow-hidden rounded-lg",
        variantStyles[variant],
        className
      )}
    >
      <div 
        className={cn(
          "flex flex-col gap-6 p-6",
          isHorizontal ? "md:flex-row md:items-center" : "",
          imagePosition === "right" && "md:flex-row-reverse",
          imagePosition === "bottom" && "flex-col-reverse"
        )}
      >
        <div className={cn(
          "flex flex-col gap-4",
          isHorizontal ? "md:flex-1" : ""
        )}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>
        
        {image && (
          <div className={cn(
            "overflow-hidden rounded-md",
            isHorizontal ? "md:flex-1" : "aspect-video w-full"
          )}>
            <img 
              src={image || "/placeholder.svg"} 
              alt={imageAlt} 
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}`}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
