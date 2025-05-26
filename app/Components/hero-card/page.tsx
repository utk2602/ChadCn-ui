"use client"
import { useState } from "react"
import { ArrowLeft, Code, Copy, Check } from "lucide-react"
import React from "react"

// Mock HeroCard component for demo
type HeroCardProps = {
  title: string
  description: string
  image?: string
  imagePosition?: "left" | "right" | "top" | "bottom"
  action?: React.ReactNode
  className?: string
}

function HeroCard({ title, description, image, imagePosition = "right", action, className }: HeroCardProps) {
  const isHorizontal = imagePosition === "left" || imagePosition === "right"
  
  return (
    <div className={`overflow-hidden rounded-lg bg-white/[0.03] border border-white/[0.1] ${className}`}>
      <div className={`flex flex-col gap-6 p-6 ${
        isHorizontal ? "md:flex-row md:items-center" : ""
      } ${imagePosition === "right" ? "md:flex-row-reverse" : ""} ${
        imagePosition === "bottom" ? "flex-col-reverse" : ""
      }`}>
        <div className={`flex flex-col gap-4 ${isHorizontal ? "md:flex-1" : ""}`}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-white">{title}</h2>
          <p className="text-white/70">{description}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>
        
        {image && (
          <div className={`overflow-hidden rounded-md ${
            isHorizontal ? "md:flex-1" : "aspect-video w-full"
          }`}>
            <img 
              src={image} 
              alt="Hero image" 
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Mock GradientButton component
function GradientButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center h-10 px-6 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200">
      {children}
    </button>
  )
}

// CodeBlock Component
function CodeBlock({ children, language = "javascript" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children.replace(/<[^>]*>/g, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative group">
      <div className="rounded-lg bg-[#1e1e1e] border border-[#323233] shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#323233]">
          <span className="text-xs text-[#cccccc] font-medium">{language}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2 py-1 text-xs text-[#cccccc] hover:text-white hover:bg-[#404040] rounded transition-colors"
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
        <pre className="p-4 text-sm font-mono overflow-x-auto">
          <code dangerouslySetInnerHTML={{ __html: children }} />
        </pre>
      </div>
    </div>
  )
}

// Tab components
type TabsProps = {
  defaultValue: string
  children: React.ReactElement[] | React.ReactElement
}

type TabsListProps = {
  children: React.ReactElement<TabsTriggerProps>[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className="w-full">
      {childrenArray.map(child => 
        child.type === TabsList 
          ? React.cloneElement(child as React.ReactElement, { activeTab, setActiveTab })
          : child.type === TabsContent && child.props.value === activeTab
          ? child
          : null
      ).filter(Boolean)}
    </div>
  )
}

function TabsList({ children, activeTab, setActiveTab }: TabsListProps) {
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <div className="flex w-full justify-start mb-6 bg-white/[0.05] rounded-lg p-1">
      {childrenArray.map((child, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(child.props.value)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === child.props.value
              ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
              : "text-white/70 hover:text-white hover:bg-white/[0.1]"
          }`}
        >
          {child.props.children}
        </button>
      ))}
    </div>
  )
}

function TabsTrigger({ value, children }) {
  return <span>{children}</span>
}

function TabsContent({ value, children }) {
  return <div className="space-y-4">{children}</div>
}

export default function HeroCardPage() {
  const [showCode, setShowCode] = useState(false)

  const componentCode = `<span class="text-[#c586c0]">import</span> <span class="text-[#9cdcfe]">React</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"react"</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">cn</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/lib/utils"</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">interface</span> <span class="text-[#4ec9b0]">HeroCardProps</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#9cdcfe]">title</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span>
  <span class="text-[#9cdcfe]">description</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span>
  <span class="text-[#9cdcfe]">image</span><span class="text-[#d4d4d4]">?:</span> <span class="text-[#569cd6]">string</span>
  <span class="text-[#9cdcfe]">imageAlt</span><span class="text-[#d4d4d4]">?:</span> <span class="text-[#569cd6]">string</span>
  <span class="text-[#9cdcfe]">action</span><span class="text-[#d4d4d4]">?:</span> <span class="text-[#569cd6]">React.ReactNode</span>
  <span class="text-[#9cdcfe]">className</span><span class="text-[#d4d4d4]">?:</span> <span class="text-[#569cd6]">string</span>
  <span class="text-[#9cdcfe]">imagePosition</span><span class="text-[#d4d4d4]">?:</span> <span class="text-[#ce9178]">"left"</span> <span class="text-[#d4d4d4]">|</span> <span class="text-[#ce9178]">"right"</span> <span class="text-[#d4d4d4]">|</span> <span class="text-[#ce9178]">"top"</span> <span class="text-[#d4d4d4]">|</span> <span class="text-[#ce9178]">"bottom"</span>
  <span class="text-[#9cdcfe]">variant</span><span class="text-[#d4d4d4]">?:</span> <span class="text-[#ce9178]">"default"</span> <span class="text-[#d4d4d4]">|</span> <span class="text-[#ce9178]">"outline"</span> <span class="text-[#d4d4d4]">|</span> <span class="text-[#ce9178]">"ghost"</span>
<span class="text-[#d4d4d4]">}</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">HeroCard</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.FC</span><span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCardProps</span><span class="text-[#d4d4d4]">&gt;</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">({</span>
  <span class="text-[#9cdcfe]">title</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#9cdcfe]">description</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#9cdcfe]">image</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#9cdcfe]">imageAlt</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#ce9178]">"Hero image"</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#9cdcfe]">action</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#9cdcfe]">className</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#9cdcfe]">imagePosition</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#ce9178]">"right"</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#9cdcfe]">variant</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#ce9178]">"default"</span><span class="text-[#d4d4d4]">,</span>
<span class="text-[#d4d4d4]">})</span> <span class="text-[#d4d4d4]">=&gt;</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#608b4e]">// Component implementation...</span>
<span class="text-[#d4d4d4]">}</span>`

  const usageCode = `<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">HeroCard</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'@/CHADCN-UI/HeroCard'</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Button</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'@/components/ui/button'</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">HeroSection</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span>
      <span class="text-[#92c5f7]">title</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"Build Better Websites"</span>
      <span class="text-[#92c5f7]">description</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"ChadCn UI provides custom components that help you build better websites faster and with more confidence."</span>
      <span class="text-[#92c5f7]">image</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"/path-to-image.jpg"</span>
      <span class="text-[#92c5f7]">imagePosition</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"right"</span> <span class="text-[#608b4e]">// 'left', 'right', 'top', or 'bottom'</span>
      <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"default"</span> <span class="text-[#608b4e]">// 'default', 'outline', or 'ghost'</span>
      <span class="text-[#92c5f7]">action</span><span class="text-[#d4d4d4]">={</span>
        <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span><span class="text-[#d4d4d4]">Get Started</span><span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span>
      <span class="text-[#d4d4d4]">}</span>
    <span class="text-[#d4d4d4]">/&gt;</span>
  <span class="text-[#d4d4d4]">)</span>
<span class="text-[#d4d4d4]">}</span>`

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-6xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          
          {/* Header */}
          <div className="space-y-6">
            <button className="inline-flex items-center text-sm text-white/60 hover:text-white/90 transition-colors mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </button>
            <div className="space-y-4 text-center">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
                HeroCard
              </h1>
              <p className="text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                A versatile hero card component with customizable layout and styling options. Perfect for creating engaging hero sections with flexible image positioning.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Preview
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.1] hover:text-white transition-all duration-200"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            <div className="py-8">
              <HeroCard
                title="Build Better Websites"
                description="ChadCn UI provides custom components that help you build better websites faster and with more confidence."
                image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=400"
                imagePosition="right"
                action={<GradientButton>Get Started</GradientButton>} className={undefined}              />
            </div>

            {showCode && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4 text-white/90">Component Code</h3>
                <CodeBlock language="javascript">
                  {componentCode}
                </CodeBlock>
              </div>
            )}
          </div>

          {/* Props Table */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Props
            </h2>
            <div className="rounded-lg border border-white/[0.1] overflow-hidden bg-white/[0.02]">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="text-left p-4 font-medium text-white/90">Name</th>
                    <th className="text-left p-4 font-medium text-white/90">Type</th>
                    <th className="text-left p-4 font-medium text-white/90">Default</th>
                    <th className="text-left p-4 font-medium text-white/90">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">title</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">string</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">The main heading text for the hero card</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">description</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">string</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">The description text below the title</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">image</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">string</td>
                    <td className="p-4 font-mono text-xs text-white/60">undefined</td>
                    <td className="p-4 text-white/70">URL of the hero image</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">imagePosition</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">"left" | "right" | "top" | "bottom"</td>
                    <td className="p-4 font-mono text-xs text-white/60">"right"</td>
                    <td className="p-4 text-white/70">Position of the image relative to content</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">variant</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">"default" | "outline" | "ghost"</td>
                    <td className="p-4 font-mono text-xs text-white/60">"default"</td>
                    <td className="p-4 text-white/70">Visual style variant of the card</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">action</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">React.ReactNode</td>
                    <td className="p-4 font-mono text-xs text-white/60">undefined</td>
                    <td className="p-4 text-white/70">Call-to-action button or element</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">className</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">string</td>
                    <td className="p-4 font-mono text-xs text-white/60">undefined</td>
                    <td className="p-4 text-white/70">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-lg text-white/90">🖼️ Flexible Layout</h3>
                <p className="text-white/60 leading-relaxed">Position images on any side (left, right, top, bottom) with responsive design</p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-lg text-white/90">🎨 Multiple Variants</h3>
                <p className="text-white/60 leading-relaxed">Choose from default, outline, or ghost styling variants</p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-lg text-white/90">📱 Responsive Design</h3>
                <p className="text-white/60 leading-relaxed">Automatically adapts layout for mobile and desktop screens</p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-lg text-white/90">🔧 Customizable</h3>
                <p className="text-white/60 leading-relaxed">Easy to customize with className prop and CSS utilities</p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Usage Examples
            </h2>

            <Tabs defaultValue="basic">
              <TabsList>
                <TabsTrigger value="basic">Basic Usage</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="positions">Image Positions</TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <h3 className="text-xl font-medium text-white/90 mb-4">Basic Implementation</h3>
                <CodeBlock language="javascript">
                  {usageCode}
                </CodeBlock>
              </TabsContent>

              <TabsContent value="variants">
                <h3 className="text-xl font-medium text-white/90 mb-4">Different Variants</h3>
                <CodeBlock language="javascript">
                  {`<span class="text-[#608b4e]">// Default variant</span>
<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span> <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"default"</span> <span class="text-[#d4d4d4]">...</span> <span class="text-[#d4d4d4]">/&gt;</span>

<span class="text-[#608b4e]">// Outline variant</span>
<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span> <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"outline"</span> <span class="text-[#d4d4d4]">...</span> <span class="text-[#d4d4d4]">/&gt;</span>

<span class="text-[#608b4e]">// Ghost variant</span>
<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span> <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"ghost"</span> <span class="text-[#d4d4d4]">...</span> <span class="text-[#d4d4d4]">/&gt;</span>`}
                </CodeBlock>
              </TabsContent>

              <TabsContent value="positions">
                <h3 className="text-xl font-medium text-white/90 mb-4">Image Positioning</h3>
                <CodeBlock language="javascript">
                  {`<span class="text-[#608b4e]">// Image on the right (default)</span>
<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span> <span class="text-[#92c5f7]">imagePosition</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"right"</span> <span class="text-[#d4d4d4]">...</span> <span class="text-[#d4d4d4]">/&gt;</span>
<span class="text-[#608b4e]">// Image on the left</span>
<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span> <span class="text-[#92c5f7]">imagePosition</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"left"</span> <span class="text-[#d4d4d4]">...</span> <span class="text-[#d4d4d4]">/&gt;</span>
<span class="text-[#608b4e]">// Image on the top</span> 
<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span> <span class="text-[#92c5f7]">imagePosition</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"top"</span> <span class="text-[#d4d4d4]">...</span> <span class="text-[#d4d4d4]">/&gt;</span>
<span class="text-[#608b4e]">// Image on the bottom</span>
<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span> <span class="text-[#92c5f7]">imagePosition</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"bottom"</span> <span class="text-[#d4d4d4]">...</span> <span class="text-[#d4d4d4]">/&gt;</span>`}
                </CodeBlock>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}