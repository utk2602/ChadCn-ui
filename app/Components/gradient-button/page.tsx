"use client"

import { useState } from "react"
import { ArrowLeft, Code, Play, Square, Link, Sparkles } from "lucide-react"

// Button component based on your provided code
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import React, { ButtonHTMLAttributes } from "react"

const buttonVariants = cva(
  "font-head transition-all outline-hidden cursor-pointer duration-200 font-medium flex items-center",
  {
    variants: {
      variant: {
        default:
          "shadow-md hover:shadow-none bg-primary text-black border-2 border-black transition hover:translate-y-1 hover:bg-primary-hover",
        secondary:
          "shadow-md hover:shadow-none bg-secondary shadow-primary text-secondary-foreground border-2 border-black transition hover:translate-y-1",
        outline:
          "shadow-md hover:shadow-none bg-transparent border-2 transition hover:translate-y-1",
        link: "bg-transparent hover:underline",
      },
      size: {
        sm: "px-3 py-1 text-sm shadow hover:shadow-none",
        md: "px-4 py-1.5 text-base",
        lg: "px-8 py-3 text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
)

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      size = "md",
      className = "",
      variant = "default",
      ...props
    }: IButtonProps,
    forwardedRef,
  ) => (
    <button
      ref={forwardedRef}
      className={cn(buttonVariants({ variant, size }), className)}
      style={{
        // Adding fallback colors since we don't have the full theme
        '--primary': '#fbbf24',
        '--primary-hover': '#f59e0b',
        '--secondary': '#e5e7eb',
        '--secondary-foreground': '#374151',
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = "Button"

const componentCode = `import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "font-head transition-all outline-hidden cursor-pointer duration-200 font-medium flex items-center",
  {
    variants: {
      variant: {
        default:
          "shadow-md hover:shadow-none bg-primary text-black border-2 border-black transition hover:translate-y-1 hover:bg-primary-hover",
        secondary:
          "shadow-md hover:shadow-none bg-secondary shadow-primary text-secondary-foreground border-2 border-black transition hover:translate-y-1",
        outline:
          "shadow-md hover:shadow-none bg-transparent border-2 transition hover:translate-y-1",
        link: "bg-transparent hover:underline",
      },
      size: {
        sm: "px-3 py-1 text-sm shadow hover:shadow-none",
        md: "px-4 py-1.5 text-base",
        lg: "px-8 py-3 text-lg",
        icon: "p-2",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      size = "md",
      className = "",
      variant = "default",
      ...props
    }: IButtonProps,
    forwardedRef,
  ) => (
    <button
      ref={forwardedRef}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";`;

export default function ButtonDocumentationPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex-1 container max-w-7xl py-10">
        <div className="space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center text-sm text-white hover:text-white mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r text-white bg-clip-text text-transparent">
                Button
              </h1>
              <p className="text-xl text-gray-300">
                A modern, interactive button component with neomorphism design, multiple variants, and smooth hover animations.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6 bg-black rounded-xl p-6 md:p-8 border border-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">Preview</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-white bg-black hover:bg-white hover:text-black text-white transition-colors"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            {/* Button Demo */}
            <div className="flex items-center justify-center gap-8 p-16 rounded-lg border border-white bg-black">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white border-black shadow-lg hover:shadow-none hover:translate-y-1"
              >
                Primary Action
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-black shadow-lg hover:shadow-none"
              >
                Secondary Action
              </Button>
            </div>

            <div className="text-sm text-white space-y-2">
              <p><strong className="text-white">Interactive Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-white">
                <li>Hover to see the neomorphic shadow-to-flat transition</li>
                <li>Notice the subtle translate-y animation on hover</li>
                <li>Clean black and white design with bold contrast</li>
                <li>Accessible with proper focus states and semantic HTML</li>
              </ul>
            </div>

            {showCode && (
              <div className="rounded-md bg-black border border-white p-4 mt-4">
                <h3 className="text-lg font-medium mb-2 text-white">Component Code</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{componentCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* API Reference */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">API Reference</h2>
            <div className="rounded-md border border-white overflow-hidden bg-black">
              <table className="w-full text-sm">
                <thead className="bg-white text-black">
                  <tr>
                    <th className="text-left p-3 font-medium">Prop</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Default</th>
                    <th className="text-left p-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white">
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">variant</td>
                    <td className="p-3 font-mono text-xs text-white">"default" | "secondary" | "outline" | "link"</td>
                    <td className="p-3 font-mono text-xs text-white">"default"</td>
                    <td className="p-3 text-white">Visual style variant of the button</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">size</td>
                    <td className="p-3 font-mono text-xs text-white">"sm" | "md" | "lg" | "icon"</td>
                    <td className="p-3 font-mono text-xs text-white">"md"</td>
                    <td className="p-3 text-white">Size of the button</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">className</td>
                    <td className="p-3 font-mono text-xs text-white">string</td>
                    <td className="p-3 font-mono text-xs text-white">""</td>
                    <td className="p-3 text-white">Additional CSS classes to apply</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">children</td>
                    <td className="p-3 font-mono text-xs text-white">React.ReactNode</td>
                    <td className="p-3 font-mono text-xs text-white">—</td>
                    <td className="p-3 text-white">Button content (text, icons, etc.)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-white">...props</td>
                    <td className="p-3 font-mono text-xs text-white">ButtonHTMLAttributes</td>
                    <td className="p-3 font-mono text-xs text-white">—</td>
                    <td className="p-3 text-white">All standard HTML button attributes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Variant Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Variant Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-white rounded-lg bg-black">
                <h3 className="font-semibold mb-2 text-white">Default</h3>
                <p className="text-sm text-white mb-2">
                  Primary action button with solid background and neomorphic shadow effect.
                </p>
                <code className="text-xs text-white">bg-primary text-black border-2 border-black</code>
              </div>
              <div className="p-4 border border-white rounded-lg bg-black">
                <h3 className="font-semibold mb-2 text-white">Secondary</h3>
                <p className="text-sm text-white mb-2">
                  Secondary action button with muted colors and subtle styling.
                </p>
                <code className="text-xs text-white">bg-secondary text-secondary-foreground</code>
              </div>
              <div className="p-4 border border-white rounded-lg bg-black">
                <h3 className="font-semibold mb-2 text-white">Outline</h3>
                <p className="text-sm text-white mb-2">
                  Minimal button with transparent background and border only.
                </p>
                <code className="text-xs text-white">bg-transparent border-2</code>
              </div>
              <div className="p-4 border border-white rounded-lg bg-black">
                <h3 className="font-semibold mb-2 text-white">Link</h3>
                <p className="text-sm text-white mb-2">
                  Text-only button that looks like a link with underline on hover.
                </p>
                <code className="text-xs text-white">bg-transparent hover:underline</code>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Usage Examples</h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-200">Basic Usage</h3>
                <div className="rounded-md bg-black border border-white p-4">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{`import { Button } from "@/components/ui/button"

export default function MyComponent() {
  return (
    <div className="space-x-4">
      <Button>Click me</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-200">With Icons</h3>
                <div className="rounded-md bg-black border border-white p-4">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{`import { Button } from "@/components/ui/button"
import { Play, Download, Heart } from "lucide-react"

export default function IconButtons() {
  return (
    <div className="space-x-4">
      <Button>
        <Play className="mr-2 h-4 w-4" />
        Play Video
      </Button>
      
      <Button variant="secondary">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      
      <Button size="icon" variant="outline">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-200">Event Handling</h3>
                <div className="rounded-md bg-black border border-white p-4">
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    <code>{`import { Button } from "@/components/ui/button"

export default function InteractiveButton() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <Button 
      onClick={handleClick}
      disabled={false}
      className="w-full"
    >
      Submit Form
    </Button>
  )
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Design Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Design Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Neomorphic Effects</h3>
                <p className="text-sm text-gray-400">
                  Modern shadow-to-flat transition on hover creates depth and interactivity.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Smooth Animations</h3>
                <p className="text-sm text-gray-400">
                  Subtle translate-y movement and 200ms transitions for premium feel.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Type Safety</h3>
                <p className="text-sm text-gray-400">
                  Full TypeScript support with proper prop types and ref forwarding.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibual mb-2 text-white">Accessibility</h3>
                <p className="text-sm text-gray-400">
                  Semantic HTML, keyboard navigation, and screen reader support.
                </p>
              </div>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Implementation Notes</h2>
            <div className="p-4 border border-white rounded-lg bg-black">
              <h3 className="font-semibold mb-2 text-white">Dependencies & Setup</h3>
              <ul className="text-sm text-white space-y-1">
                <li>• Requires <code className="text-white">class-variance-authority</code> for variant management</li>
                <li>• Uses <code className="text-white">@/lib/utils</code> for className merging (cn function)</li>
                <li>• Styled with Tailwind CSS utility classes</li>
                <li>• Supports all standard HTML button attributes through prop spreading</li>
                <li>• Font family uses <code className="text-white">font-head</code> - ensure this is defined in your Tailwind config</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}