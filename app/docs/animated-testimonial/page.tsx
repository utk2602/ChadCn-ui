import { AnimatedTestimonial } from "@/CHADCN-UI/AnimatedTestimonial"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const testimonials = [
  {
    author: "Chad Developer",
    role: "Senior Engineer",
    content: "This UI library is absolutely amazing! The components are clean, customizable, and easy to use.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    author: "Jane Smith",
    role: "UI/UX Designer",
    content: "I love the monochrome design. It's bold, clean, and fits perfectly with our brand identity.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    author: "John Doe",
    role: "Product Manager",
    content: "The documentation is clear and the components are easy to implement. Great work!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AnimatedTestimonialPage() {
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
            <h1 className="text-4xl font-bold tracking-tight gradient-text">AnimatedTestimonial</h1>
            <p className="text-xl text-muted-foreground">
              A customizable animated testimonial component with autoplay and navigation.
            </p>
          </div>
        </div>

        <div className="space-y-6 bg-muted/30 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
          <AnimatedTestimonial testimonials={testimonials} className="bg-background" />
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
                <code>{`import { AnimatedTestimonial } from '@/CHADCN-UI/AnimatedTestimonial'

const testimonials = [
  {
    author: "Chad Developer",
    role: "Senior Engineer",
    content: "This UI library is absolutely amazing! The components are clean, customizable, and easy to use.",
    avatar: "/path-to-avatar.jpg",
  },
  {
    author: "Jane Smith",
    role: "UI/UX Designer",
    content: "I love the monochrome design. It's bold, clean, and fits perfectly with our brand identity.",
    avatar: "/path-to-avatar.jpg",
  },
]

export default function TestimonialsSection() {
  return (
    <AnimatedTestimonial 
      testimonials={testimonials}
      autoplay={true}
      interval={5000}
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
                <code>{`"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface TestimonialProps {
  author: string
  role?: string
  content: string
  avatar?: string
  className?: string
}

interface AnimatedTestimonialsProps {
  testimonials: TestimonialProps[]
  autoplay?: boolean
  interval?: number
  className?: string
}

export const AnimatedTestimonial: React.FC<AnimatedTestimonialsProps> = ({
  testimonials,
  autoplay = true,
  interval = 5000,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!autoplay) return

    const timer = setInterval(() => {
      nextTestimonial()
    }, interval)

    return () => clearInterval(timer)
  }, [activeIndex, autoplay, interval])

  const nextTestimonial = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg border p-6", className)}>
      <div 
        className={cn(
          "transition-opacity duration-500",
          isAnimating ? "opacity-0" : "opacity-100"
        )}
      >
        <blockquote className="space-y-4">
          <p className="text-lg italic">"{testimonials[activeIndex].content}"</p>
          <footer className="flex items-center gap-4">
            {testimonials[activeIndex].avatar && (
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <img 
                  src={testimonials[activeIndex].avatar || "/placeholder.svg"} 
                  alt={testimonials[activeIndex].author}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-semibold">{testimonials[activeIndex].author}</p>
              {testimonials[activeIndex].role && (
                <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
              )}
            </div>
          </footer>
        </blockquote>
      </div>
      
      <div className="absolute bottom-6 right-6 flex gap-2">
        <button 
          onClick={prevTestimonial}
          className="flex h-8 w-8 items-center justify-center rounded-full border bg-background hover:bg-muted"
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <button 
          onClick={nextTestimonial}
          className="flex h-8 w-8 items-center justify-center rounded-full border bg-background hover:bg-muted"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
      
      <div className="absolute bottom-6 left-6 flex gap-1">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              index === activeIndex ? "bg-foreground" : "bg-muted-foreground/30"
            )}
            aria-label={\`Go to testimonial \${index + 1}\`}
          />
        ))}
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
