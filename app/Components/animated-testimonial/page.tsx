"use client"

import { useState } from "react"
import { ArrowLeft, Code } from "lucide-react"
import Link from "next/link"
import AnimatedTestimonialsDemo from "@/CHADCN-UI/AnimatedTestimonial"
const componentCode = `"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import react, { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

const AnimatedTestimonialsDemo = ({ testimonials }) => {
  const [active, setActive] = useState(testimonials[0]);
  
  const handleprev = () => {
    const currentIndex = testimonials.indexOf(active);
    const length = testimonials.length;
    const prevIndex = (currentIndex - 1 + length) % length;
    setActive(testimonials[prevIndex]);
  };
  
  const handlenext = () => {
    const currentIndex = testimonials.indexOf(active);
    const length = testimonials.length;
    const nextIndex = (currentIndex + 1) % length;
    setActive(testimonials[nextIndex]);
  };
  
  const isActive = (index: number) => {
    return testimonials[index] === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
      <div className="relative h-80 w-full">
        <AnimatePresence>
          {testimonials.map((testimonial, index) => (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotateY: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : randomRotateY(),
                zIndex: isActive(index)
                  ? 999
                  : testimonials.length + 2 - index,
                y: isActive(index) ? [0, -80, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: randomRotateY(),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 origin-bottom"
              key={active.name}
            >
              <Image
                src={testimonial.src}
                alt={testimonial.name}
                width={400}
                height={400}
                draggable={false}
                className="rounded-3xl h-full w-full object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold dark:text-white text-black">
              {active.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {active.designation}
            </p>
            <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
              {active.quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>
        <div className="flex gap-6 pt-5">
          <Button className="h-8 rounded" onClick={handleprev}>
            <ArrowLeft />
          </Button>
          <Button className="h-8 rounded" onClick={handlenext}>
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};`

const usageCode = `import { AnimatedTestimonialsDemo } from "@/components/AnimatedTestimonialsDemo"

const testimonials = [
  {
    quote: "Spectrum UI is a game-changer! Its components are so well-designed...",
    name: "Ananya Gupta",
    designation: "Frontend Engineer, NovaTech",
    src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
  },
  // ... more testimonials
];

export default function MyComponent() {
  return <AnimatedTestimonialsDemo testimonials={testimonials} />
}`

export default function AnimatedTestimonialPage() {
  const [showCode, setShowCode] = useState(false)

  const testimonials = [
    {
      quote: "Spectrum UI is a game-changer! Its components are so well-designed and customizable that it made our app look polished and professional in no time.",
      name: "Ananya Gupta",
      designation: "Frontend Engineer, NovaTech",
      src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb",
    },
    {
      quote: "I love the simplicity and minimalism of Spectrum UI. The components are intuitive and fit seamlessly into our existing projects.",
      name: "Sophia Allen",
      designation: "UI/UX Designer, Creatify",
      src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb",
    },
    {
      quote: "As a junior developer, Spectrum UI has been a lifesaver. The documentation is straightforward, and the components work flawlessly with Tailwind CSS.",
      name: "Ethan Rodriguez",
      designation: "Software Engineer, CodeWorks",
      src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb",
    },
    {
      quote: "The integration with Shadcn made it super easy to customize the components. Spectrum UI is now a must-have in our tech stack.",
      name: "Priya Sharma",
      designation: "Full Stack Developer, Innovate Labs",
      src: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb",
    },
  ]

  return (
    <div className="flex-1 container max-w-7xl py-10">
      <div className="space-y-8">
        
        {/* Header */}
        <div>
          <Link
            href="/docs"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Documentation
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight gradient-text">AnimatedTestimonials</h1>
            <p className="text-xl text-muted-foreground">
              A sophisticated animated testimonial carousel with 3D effects, smooth transitions, and interactive controls powered by Framer Motion.
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6 bg-muted/50 rounded-xl p-6 md:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Preview</h2>
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border hover:bg-muted"
            >
              <Code className="h-4 w-4" />
              {showCode ? "Hide Code" : "View Code"}
            </button>
          </div>

          <AnimatedTestimonialsDemo testimonials={testimonials} />

          {showCode && (
            <div className="rounded-md bg-muted p-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Component Code</h3>
              <pre className="text-sm overflow-auto whitespace-pre-wrap no-scrollbar max-h-96">
                <code>{componentCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Props Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Props</h2>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Default</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-mono text-xs">testimonials</td>
                  <td className="p-3 font-mono text-xs">Testimonial[]</td>
                  <td className="p-3 font-mono text-xs">—</td>
                  <td className="p-3">Array of testimonial objects with quote, name, designation, and src</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonial Type */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Testimonial Type</h2>
          <div className="rounded-md bg-muted p-4">
            <pre className="text-sm overflow-auto">
              <code>{`type Testimonial = {
  quote: string;      // The testimonial text
  name: string;       // Person's name
  designation: string; // Job title and company
  src: string;        // Profile image URL
};`}</code>
            </pre>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">🎭 3D Animations</h3>
              <p className="text-sm text-muted-foreground">Smooth 3D rotations and scaling effects with random rotateY values</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">✨ Text Blur Effect</h3>
              <p className="text-sm text-muted-foreground">Quote text animates in word by word with blur-to-focus effect</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">🖼️ Image Stack</h3>
              <p className="text-sm text-muted-foreground">Beautiful stacked image layout with depth and perspective</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold mb-2">🎮 Interactive Controls</h3>
              <p className="text-sm text-muted-foreground">Previous/next navigation with smooth transitions</p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Usage Examples</h2>

          <div className="space-y-2">
            <h3 className="text-xl font-medium">Basic Usage</h3>
            <div className="rounded-md bg-muted p-4">
              <pre className="rounded-md p-4 overflow-auto text-sm font-mono bg-zinc-900 text-green-300 border border-zinc-700 shadow-inner whitespace-pre-wrap no-scrollbar">
                <code>{usageCode}</code>
              </pre>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-medium">Dependencies</h3>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm overflow-auto">
                <code>{`npm install framer-motion
npm install lucide-react
npm install next

// Required imports:
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";`}</code>
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}