"use client"

import { useState } from "react"
import { ArrowLeft, Code } from "lucide-react"
import Link from "next/link"
import { AnimatedTestimonial } from "@/CHADCN-UI/AnimatedTestimonial"

// Component code is kept separate for reference in the documentation
const componentCode = `"use client"

import React, { useState, useEffect } from "react"

export type Testimonial = {
  author: string
  role?: string
  content: string
  avatar?: string
}

export interface AnimatedTestimonialProps {
  testimonials: Testimonial[]
  autoplay?: boolean
  interval?: number
  className?: string
}

export const AnimatedTestimonial: React.FC<AnimatedTestimonialProps> = ({
  testimonials,
  autoplay = true,
  interval = 5000,
  className = "",
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
    <div className={\`relative overflow-hidden rounded-lg border p-6 \${className}\`}>
      <div 
        className={\`transition-opacity duration-500 \${
          isAnimating ? "opacity-0" : "opacity-100"
        }\`}
      >
        <blockquote className="space-y-4">
          <p className="text-lg italic">"{testimonials[activeIndex].content}"</p>
          <footer className="flex items-center gap-4">
            {testimonials[activeIndex].avatar && (
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <img 
                  src={testimonials[activeIndex].avatar} 
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
            className={\`h-2 w-2 rounded-full transition-colors \${
              index === activeIndex ? "bg-foreground" : "bg-muted-foreground/30"
            }\`}
            aria-label={\`Go to testimonial \${index + 1}\`}
          />
        ))}
      </div>
    </div>
  )
}`

export default function AnimatedTestimonialPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="w-full h-full py-6 px-6 bg-gray-900 text-gray-100">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div>
          <Link
            href="/docs"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-100 mb-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Documentation
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">AnimatedTestimonial</h1>
            <p className="text-xl text-gray-400">
              A customizable animated testimonial component with autoplay and navigation.
            </p>
          </div>
        </div>

        {/* Preview section with code toggle */}
        <div className="space-y-6 bg-gray-800 rounded-xl p-6 md:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-gray-700 hover:bg-gray-700"
            >
              <Code className="h-4 w-4" />
              {showCode ? "Hide Code" : "View Code"}
            </button>
          </div>
          <AnimatedTestimonial
            testimonials={[
              {
                author: "John Doe",
                role: "CEO",
                content: "This product changed our business completely!"
              },
              {
                author: "Jane Smith",
                role: "Designer",
                content: "The best UI library I've ever used."
              }
            ]}
          />
          
          {/* Toggleable Code */}
          {showCode && (
            <div className="rounded-md bg-gray-700 p-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Component Code</h3>
              <pre className="text-sm overflow-auto">
                <code>{componentCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Props Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Props</h2>
          <div className="rounded-md border border-gray-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Default</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="p-3 font-mono text-xs">testimonials</td>
                  <td className="p-3 font-mono text-xs">Testimonial[]</td>
                  <td className="p-3 font-mono text-xs">defaultTestimonials</td>
                  <td className="p-3">Array of testimonial objects to display</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">autoplay</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 font-mono text-xs">true</td>
                  <td className="p-3">Whether to automatically cycle through testimonials</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">interval</td>
                  <td className="p-3 font-mono text-xs">number</td>
                  <td className="p-3 font-mono text-xs">5000</td>
                  <td className="p-3">Time in milliseconds between transitions</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">className</td>
                  <td className="p-3 font-mono text-xs">string</td>
                  <td className="p-3 font-mono text-xs">""</td>
                  <td className="p-3">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Usage Examples</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Basic Usage</h3>
            <div className="rounded-md bg-gray-800 p-4">
              <pre className="text-sm overflow-auto">
                <code>{`import { AnimatedTestimonial } from "@/CHADCN-UI/AnimatedTestimonial"

export default function MyComponent() {
  const testimonials = [
    {
      author: "John Doe",
      role: "CEO",
      content: "This product changed our business completely!"
    },
    {
      author: "Jane Smith",
      role: "Designer",
      content: "The best UI library I've ever used."
    }
  ]

  return <AnimatedTestimonial testimonials={testimonials} />
}`}</code>
              </pre>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">With Custom Interval</h3>
            <div className="rounded-md bg-gray-800 p-4">
              <pre className="text-sm overflow-auto">
                <code>{`<AnimatedTestimonial 
  testimonials={testimonials}
  autoplay={true}
  interval={8000} // 8 seconds between transitions
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}