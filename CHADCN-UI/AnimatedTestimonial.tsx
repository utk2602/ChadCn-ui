"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
      <div className={cn("transition-opacity duration-500", isAnimating ? "opacity-0" : "opacity-100")}>
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
              index === activeIndex ? "bg-foreground" : "bg-muted-foreground/30",
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
