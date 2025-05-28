"use client"

import { useState } from "react"
import { ArrowLeft, Code, Sparkles, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import React, { type ButtonHTMLAttributes } from "react"
import Link from "next/link"

const buttonVariants = cva(
  "font-medium transition-all outline-hidden cursor-pointer duration-200 flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] border-0",
        secondary:
          "bg-gradient-to-r from-white/[0.08] to-white/[0.04] text-white hover:from-white/[0.12] hover:to-white/[0.08] border border-white/[0.1] hover:border-white/[0.2]",
        outline: "bg-transparent border border-white/[0.2] text-white hover:bg-white/[0.05] hover:border-white/[0.4]",
        link: "bg-transparent text-white/60 hover:text-white underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-lg",
        lg: "px-8 py-4 text-lg rounded-xl",
        icon: "p-3 rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
)

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, size = "md", className = "", variant = "default", ...props }: IButtonProps, forwardedRef) => (
    <button ref={forwardedRef} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  ),
)

Button.displayName = "Button"

// CodeBlock component with VS Code styling
interface CodeBlockProps {
  children: string
  language?: string
}

function CodeBlock({ children, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children.replace(/<[^>]*>/g, ""))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="relative group">
      <div className="rounded-lg bg-[#1e1e1e] border border-[#3c3c3c] shadow-2xl overflow-hidden font-mono">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#3c3c3c]">
          <span className="text-xs text-[#cccccc] font-medium">{language}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#cccccc] hover:text-white hover:bg-[#3c3c3c] rounded-md transition-all duration-200"
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="p-4 text-sm overflow-x-auto">
          <code className="text-[#d4d4d4] leading-relaxed" dangerouslySetInnerHTML={{ __html: children }} />
        </div>
      </div>
    </div>
  )
}

const componentCode = `<span class="text-[#569cd6]">"use client"</span>;<br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">cn</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/lib/utils"</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">cva</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#4fc1ff]">type</span> <span class="text-[#9cdcfe]">VariantProps</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"class-variance-authority"</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#9cdcfe]">React</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#4fc1ff]">type</span> <span class="text-[#9cdcfe]">ButtonHTMLAttributes</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"react"</span><br/><br/>

<span class="text-[#c586c0]">const</span> <span class="text-[#4fc1ff]">buttonVariants</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#dcdcaa]">cva</span><span class="text-[#d4d4d4]">(</span><br/>
&nbsp;&nbsp;<span class="text-[#ce9178]">"font-medium transition-all outline-hidden cursor-pointer duration-200 flex items-center justify-center"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">variants</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">variant</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">default</span><span class="text-[#d4d4d4]">:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#ce9178]">"bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] border-0"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">secondary</span><span class="text-[#d4d4d4]">:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#ce9178]">"bg-gradient-to-r from-white/[0.08] to-white/[0.04] text-white hover:from-white/[0.12] hover:to-white/[0.08] border border-white/[0.1] hover:border-white/[0.2]"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">outline</span><span class="text-[#d4d4d4]">:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#ce9178]">"bg-transparent border border-white/[0.2] text-white hover:bg-white/[0.05] hover:border-white/[0.4]"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">link</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"bg-transparent text-white/60 hover:text-white underline-offset-4 hover:underline"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">},</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">size</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">sm</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"px-4 py-2 text-sm rounded-lg"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">md</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"px-6 py-3 text-base rounded-lg"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">lg</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"px-8 py-4 text-lg rounded-xl"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">icon</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"p-3 rounded-lg"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">},</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">},</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">defaultVariants</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">size</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"md"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">variant</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"default"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">},</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">},</span><br/>
<span class="text-[#d4d4d4]">)</span><br/><br/>

<span class="text-[#c586c0]">interface</span> <span class="text-[#4fc1ff]">IButtonProps</span><br/>
&nbsp;&nbsp;<span class="text-[#c586c0]">extends</span> <span class="text-[#9cdcfe]">ButtonHTMLAttributes</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4fc1ff]">HTMLButtonElement</span><span class="text-[#d4d4d4]">&gt;,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">VariantProps</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#c586c0]">typeof</span> <span class="text-[#4fc1ff]">buttonVariants</span><span class="text-[#d4d4d4]">&gt;</span> <span class="text-[#d4d4d4]">{}</span><br/><br/>

<span class="text-[#c586c0]">const</span> <span class="text-[#4fc1ff]">Button</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#9cdcfe]">React</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">forwardRef</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4fc1ff]">HTMLButtonElement</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#4fc1ff]">IButtonProps</span><span class="text-[#d4d4d4]">&gt;(</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">(</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">children</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">size</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#ce9178]">"md"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">className</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#ce9178]">""</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">variant</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#ce9178]">"default"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">...</span><span class="text-[#9cdcfe]">props</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">}:</span> <span class="text-[#4fc1ff]">IButtonProps</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">forwardedRef</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">)</span> <span class="text-[#c586c0]">=&gt;</span> <span class="text-[#d4d4d4]">(</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">button</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#92c5f7]">ref</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#9cdcfe]">forwardedRef</span><span class="text-[#d4d4d4]">}</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#dcdcaa]">cn</span><span class="text-[#d4d4d4]">(</span><span class="text-[#dcdcaa]">buttonVariants</span><span class="text-[#d4d4d4]">({</span> <span class="text-[#9cdcfe]">variant</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">size</span> <span class="text-[#d4d4d4]">}),</span> <span class="text-[#9cdcfe]">className</span><span class="text-[#d4d4d4]">)</span><span class="text-[#d4d4d4]">}</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#92c5f7]">{...props}</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">{</span><span class="text-[#9cdcfe]">children</span><span class="text-[#d4d4d4]">}</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#569cd6]">button</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">)</span><br/>
<span class="text-[#d4d4d4]">)</span>`

const basicUsageCode = `<span class="text-[#569cd6]">"use client"</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Button</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/components/ui/button"</span><br/><br/>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">MyComponent</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;<span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">div</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"space-x-4"</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span><span class="text-[#d4d4d4]">Click me</span><span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Button</span> <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"secondary"</span><span class="text-[#d4d4d4]">&gt;</span><span class="text-[#d4d4d4]">Secondary</span><span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Button</span> <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"outline"</span><span class="text-[#d4d4d4]">&gt;</span><span class="text-[#d4d4d4]">Outline</span><span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">)</span><br/>
<span class="text-[#d4d4d4]">}</span>`

const iconButtonsCode = `<span class="text-[#569cd6]">"use client"</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Button</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/components/ui/button"</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Play</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Download</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Heart</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"lucide-react"</span><br/><br/>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">IconButtons</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;<span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">div</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"space-x-4"</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Button</span> <span class="text-[#92c5f7]">size</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"lg"</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Play</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"mr-2 h-5 w-5"</span> <span class="text-[#d4d4d4]">/&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">Play Video</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Button</span> <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"secondary"</span> <span class="text-[#92c5f7]">size</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"lg"</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Download</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"mr-2 h-5 w-5"</span> <span class="text-[#d4d4d4]">/&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">Download</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Button</span> <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"outline"</span> <span class="text-[#92c5f7]">size</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"lg"</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Heart</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"mr-2 h-5 w-5"</span> <span class="text-[#d4d4d4]">/&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">Like</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">)</span><br/>
<span class="text-[#d4d4d4]">}</span>`

export default function ButtonDocumentationPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-6xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Back Link */}
          <Link href="/docs" className="inline-flex items-center text-sm text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Documentation
          </Link>

          {/* Header */}
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
              Button Component
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              A modern, interactive button component with gradient backgrounds, smooth animations, and comprehensive
              variant support.
            </p>
          </div>

          {/* Preview Section */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Interactive Preview
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-white/[0.2] bg-white/[0.05] hover:bg-white/[0.1] text-white transition-all duration-200"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            {/* Button Demo */}
            <div className="flex flex-wrap items-center justify-center gap-6 p-12 rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.02] to-transparent">
              <Button size="lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Primary Action
              </Button>

              <Button variant="secondary" size="lg">
                <Code className="mr-2 h-5 w-5" />
                Secondary Action
              </Button>

              <Button variant="outline" size="lg">
                <Button className="mr-2 h-5 w-5" />
                Outline Button
              </Button>

              <Button variant="link" size="lg">
                Link Button
              </Button>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] rounded-xl p-6 border border-white/[0.08]">
              <p className="text-white/80 font-medium mb-3">✨ Interactive Features:</p>
              <ul className="text-white/60 space-y-2 text-sm">
                <li>• Hover to see the smooth scale and shadow transitions</li>
                <li>• Beautiful gradient backgrounds with modern color schemes</li>
                <li>• Consistent spacing and typography across all variants</li>
                <li>• Full accessibility support with proper focus states</li>
              </ul>
            </div>

            {showCode && (
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4 text-white/90">Component Implementation</h3>
                <CodeBlock language="tsx">{componentCode}</CodeBlock>
              </div>
            )}
          </div>

          {/* API Reference */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              API Reference
            </h2>
            <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] border-b border-white/[0.08]">
                  <tr>
                    <th className="text-left p-4 font-semibold text-white/90">Prop</th>
                    <th className="text-left p-4 font-semibold text-white/90">Type</th>
                    <th className="text-left p-4 font-semibold text-white/90">Default</th>
                    <th className="text-left p-4 font-semibold text-white/90">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">variant</td>
                    <td className="p-4 font-mono text-xs text-white/70">
                      "default" | "secondary" | "outline" | "link"
                    </td>
                    <td className="p-4 font-mono text-xs text-cyan-300">"default"</td>
                    <td className="p-4 text-white/70">Visual style variant of the button</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">size</td>
                    <td className="p-4 font-mono text-xs text-white/70">"sm" | "md" | "lg" | "icon"</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">"md"</td>
                    <td className="p-4 text-white/70">Size of the button</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">className</td>
                    <td className="p-4 font-mono text-xs text-white/70">string</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">""</td>
                    <td className="p-4 text-white/70">Additional CSS classes to apply</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">children</td>
                    <td className="p-4 font-mono text-xs text-white/70">React.ReactNode</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">—</td>
                    <td className="p-4 text-white/70">Button content (text, icons, etc.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Variant Details */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Variant Details
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 border border-white/[0.08] rounded-xl bg-gradient-to-br from-indigo-500/[0.05] to-transparent">
                <h3 className="font-semibold mb-3 text-white/90 text-lg">Default</h3>
                <p className="text-sm text-white/60 mb-4">
                  Primary action button with vibrant gradient background and modern hover effects.
                </p>
                <code className="text-xs text-indigo-300 bg-black/20 px-2 py-1 rounded">
                  bg-gradient-to-r from-indigo-500 to-cyan-500
                </code>
              </div>
              <div className="p-6 border border-white/[0.08] rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent">
                <h3 className="font-semibold mb-3 text-white/90 text-lg">Secondary</h3>
                <p className="text-sm text-white/60 mb-4">
                  Subtle button with translucent background and elegant hover states.
                </p>
                <code className="text-xs text-white/60 bg-black/20 px-2 py-1 rounded">
                  bg-gradient-to-r from-white/[0.08] to-white/[0.04]
                </code>
              </div>
              <div className="p-6 border border-white/[0.08] rounded-xl bg-gradient-to-br from-transparent to-white/[0.02]">
                <h3 className="font-semibold mb-3 text-white/90 text-lg">Outline</h3>
                <p className="text-sm text-white/60 mb-4">
                  Minimal button with transparent background and subtle border styling.
                </p>
                <code className="text-xs text-white/60 bg-black/20 px-2 py-1 rounded">
                  bg-transparent border border-white/[0.2]
                </code>
              </div>
              <div className="p-6 border border-white/[0.08] rounded-xl bg-gradient-to-br from-cyan-500/[0.05] to-transparent">
                <h3 className="font-semibold mb-3 text-white/90 text-lg">Link</h3>
                <p className="text-sm text-white/60 mb-4">
                  Text-only button that behaves like a link with underline on hover.
                </p>
                <code className="text-xs text-cyan-300 bg-black/20 px-2 py-1 rounded">
                  bg-transparent hover:underline
                </code>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Usage Examples
            </h2>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-white/90">Basic Usage</h3>
                </div>
                <CodeBlock language="tsx">{basicUsageCode}</CodeBlock>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-white/90">With Icons</h3>
                </div>
                <CodeBlock language="tsx">{iconButtonsCode}</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
