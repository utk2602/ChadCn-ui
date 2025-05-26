"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Code, Zap, Users, TrendingUp, Shield, Copy, Check } from "lucide-react"

// TypeScript interface for a single tab item
interface FeatureTabItem {
  icon?: React.ReactNode
  title: string
  isNew?: boolean
  backgroundPositionX: number
  backgroundPositionY: number
  backgroundSizeX: number
}

// TypeScript interface for FeatureTabs props
interface FeatureTabsProps {
  tabs: FeatureTabItem[]
  backgroundImage?: string
  header?: string
  subheader?: string
  defaultSelectedIndex?: number
  animationDuration?: number
}

// Custom Button Component
const Button = ({
  children,
  onClick,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline"
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-black"
  const variants = {
    default: "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 active:from-indigo-700 active:to-cyan-700",
    outline: "border border-white/20 bg-white/5 text-white hover:bg-white/10 active:bg-white/15 backdrop-blur-sm",
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

// Custom Table Components
const Table = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full overflow-hidden ${className}`}>
    <table className="w-full text-sm border-collapse">{children}</table>
  </div>
)

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-white/5 border-b border-white/10">{children}</thead>
)

const TableRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <tr className={`border-b border-white/5 ${className}`}>{children}</tr>
)

const TableHead = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`text-left p-3 font-medium text-white/90 ${className}`}>{children}</th>
)

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-white/5">{children}</tbody>
)

const TableCell = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`p-3 ${className}`}>{children}</td>
)

// Enhanced FeatureTabs component with modern styling
const FeatureTabs = ({
  tabs,
  backgroundImage,
  header,
  subheader,
  defaultSelectedIndex = 0,
  animationDuration = 2,
}: FeatureTabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 mb-2">{header}</h2>
        <p className="text-white/60 text-lg">{subheader}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Tabs */}
        <div className="flex flex-col space-y-4 lg:w-1/2">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-300 border backdrop-blur-sm ${
                selectedIndex === index
                  ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border-indigo-400/50 shadow-lg transform scale-105 shadow-indigo-500/20"
                  : "bg-white/5 text-white/80 border-white/10 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <div className={selectedIndex === index ? "text-indigo-400" : "text-white/60"}>{tab.icon}</div>
              <span className="font-medium flex-1">{tab.title}</span>
              {tab.isNew && (
                <span
                  className={`px-2 py-1 text-xs rounded-full font-bold ${
                    selectedIndex === index ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white" : "bg-white/20 text-white/90"
                  }`}
                >
                  NEW
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Preview Area */}
        <div className="lg:w-1/2 w-full">
          <div
            className="h-80 rounded-lg bg-cover bg-center transition-all duration-1000 ease-out border border-white/20 shadow-2xl backdrop-blur-sm"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : "linear-gradient(45deg, #1e1e1e, #333333)",
              backgroundPosition: backgroundImage
                ? `${tabs[selectedIndex]?.backgroundPositionX || 0}% ${tabs[selectedIndex]?.backgroundPositionY || 0}%`
                : "center",
              backgroundSize: backgroundImage ? `${tabs[selectedIndex]?.backgroundSizeX || 100}%` : "cover",
              filter: "grayscale(20%) contrast(1.1)",
            }}
          />
        </div>
      </div>
    </div>
  )
}

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
      <div className="rounded-lg bg-black/40 border border-white/10 shadow-lg overflow-hidden backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <span className="text-xs text-white/70 font-medium">{language}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
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
        <pre className="p-4 text-sm font-mono overflow-x-auto text-white/80">
          <code dangerouslySetInnerHTML={{ __html: children }} />
        </pre>
      </div>
    </div>
  )
}

const sampleTabs = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast Performance",
    isNew: true,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team Collaboration",
    backgroundPositionX: 100,
    backgroundPositionY: 0,
    backgroundSizeX: 120,
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Analytics Dashboard",
    backgroundPositionX: 0,
    backgroundPositionY: 100,
    backgroundSizeX: 130,
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Enterprise Security",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 100,
    backgroundSizeX: 140,
  },
]

export default function FeatureTabsPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-4xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center text-sm text-white/50 hover:text-white/80 mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
                FeatureTabs
              </h1>
              <p className="text-xl text-white/60 leading-relaxed">
                An interactive feature showcase component with animated background transitions and modern styling.
              </p>
            </div>
          </div>

          {/* Large Single Preview */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Preview</h2>
              <Button onClick={() => setShowCode(!showCode)} variant="outline">
                <Code className="h-4 w-4 mr-2" />
                {showCode ? "Hide Code" : "View Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-8 md:p-12 overflow-hidden backdrop-blur-sm">
              <FeatureTabs
                tabs={sampleTabs}
                backgroundImage="https://img.freepik.com/premium-vector/dashboard-design-business-development-technology-web-template-dashboard-vector-design_29008-372.jpg"
                header="Elevate your workflow"
                subheader="Transform your productivity with our comprehensive suite of tools"
                defaultSelectedIndex={0}
                animationDuration={1.5}
              />
            </div>

            <div className="text-sm text-white/60 space-y-3 border-t border-white/10 pt-6">
              <p className="text-white/80 font-medium">Features:</p>
              <ul className="space-y-2 text-white/60 leading-relaxed">
                <li>• Click different tabs to see animated background transitions</li>
                <li>• Modern gradient design with glassmorphism effects</li>
                <li>• Smooth scaling and color transitions on selection</li>
                <li>• Responsive design that adapts to different screen sizes</li>
                <li>• Support for "new" badges with gradient styling</li>
                <li>• Backdrop blur effects for enhanced visual depth</li>
              </ul>
            </div>

            {showCode && (
              <div className="rounded-xl bg-black/20 border border-white/10 p-6 mt-8 backdrop-blur-sm">
                <h3 className="text-xl font-medium mb-4 text-white/90">Component Code</h3>
                <div className="text-white/60 text-center py-8">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Component code section available</p>
                  <p className="text-sm mt-2">Implementation details can be found in the usage examples below</p>
                </div>
              </div>
            )}
          </div>

          {/* Configuration */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Props & Configuration
            </h2>
            <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">tabs</TableCell>
                    <TableCell className="font-mono text-xs text-white/70">FeatureTabItem[]</TableCell>
                    <TableCell className="font-mono text-xs text-white/50">—</TableCell>
                    <TableCell className="text-white/70">
                      Array of tab objects with icon, title, and background positions
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">backgroundImage</TableCell>
                    <TableCell className="font-mono text-xs text-white/70">string</TableCell>
                    <TableCell className="font-mono text-xs text-white/50">undefined</TableCell>
                    <TableCell className="text-white/70">URL of the background image for the preview area</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">header</TableCell>
                    <TableCell className="font-mono text-xs text-white/70">string</TableCell>
                    <TableCell className="font-mono text-xs text-white/50">"Elevate your workflow"</TableCell>
                    <TableCell className="text-white/70">Main heading text</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">subheader</TableCell>
                    <TableCell className="font-mono text-xs text-white/70">string</TableCell>
                    <TableCell className="font-mono text-xs text-white/50">"Transform your productivity..."</TableCell>
                    <TableCell className="text-white/70">Subtitle text</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">defaultSelectedIndex</TableCell>
                    <TableCell className="font-mono text-xs text-white/70">number</TableCell>
                    <TableCell className="font-mono text-xs text-white/50">0</TableCell>
                    <TableCell className="text-white/70">Index of the initially selected tab</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">animationDuration</TableCell>
                    <TableCell className="font-mono text-xs text-white/70">number</TableCell>
                    <TableCell className="font-mono text-xs text-white/50">2</TableCell>
                    <TableCell className="text-white/70">Duration of transition animations in seconds</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Tab Item Structure */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              FeatureTabItem Structure
            </h2>
            <CodeBlock language="typescript">
              {`<span style="color: #569cd6">interface</span> <span style="color: #4ec9b0">FeatureTabItem</span> <span style="color: #d4d4d4">{</span>
  <span style="color: #9cdcfe">icon</span><span style="color: #d4d4d4">?:</span> <span style="color: #4ec9b0">React.ReactNode</span><span style="color: #d4d4d4">;</span>           <span style="color: #608b4e">// Icon component (from lucide-react, etc.)</span>
  <span style="color: #9cdcfe">title</span><span style="color: #d4d4d4">:</span> <span style="color: #4ec9b0">string</span><span style="color: #d4d4d4">;</span>                    <span style="color: #608b4e">// Display title for the tab</span>
  <span style="color: #9cdcfe">isNew</span><span style="color: #d4d4d4">?:</span> <span style="color: #4ec9b0">boolean</span><span style="color: #d4d4d4">;</span>                  <span style="color: #608b4e">// Show "new" badge</span>
  <span style="color: #9cdcfe">backgroundPositionX</span><span style="color: #d4d4d4">:</span> <span style="color: #4ec9b0">number</span><span style="color: #d4d4d4">;</span>      <span style="color: #608b4e">// X position for background image (0-100)</span>
  <span style="color: #9cdcfe">backgroundPositionY</span><span style="color: #d4d4d4">:</span> <span style="color: #4ec9b0">number</span><span style="color: #d4d4d4">;</span>      <span style="color: #608b4e">// Y position for background image (0-100)</span>
  <span style="color: #9cdcfe">backgroundSizeX</span><span style="color: #d4d4d4">:</span> <span style="color: #4ec9b0">number</span><span style="color: #d4d4d4">;</span>          <span style="color: #608b4e">// Background image scale percentage</span>
<span style="color: #d4d4d4">}</span>`}
            </CodeBlock>
          </div>

          {/* Key Features */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Key Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-white text-lg">Animated Transitions</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Smooth background position and size transitions with customizable duration and easing effects.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-white text-lg">Modern Design</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Glassmorphism effects with gradient styling and backdrop blur for a contemporary look.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-white text-lg">Responsive Design</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Adapts from horizontal layout on desktop to vertical stacking on mobile devices.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-white text-lg">Interactive Feedback</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Gradient transitions and scaling effects provide clear visual feedback for user interactions.
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Usage Examples
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-white/90 mb-4">Basic Implementation</h3>
                <CodeBlock language="javascript">
                  {`<span style="color: #c586c0">import</span> <span style="color: #d4d4d4">{</span> <span style="color: #9cdcfe">FeatureTabs</span> <span style="color: #d4d4d4">}</span> <span style="color: #c586c0">from</span> <span style="color: #ce9178">"@/components/feature-tabs"</span>
<span style="color: #c586c0">import</span> <span style="color: #d4d4d4">{</span> <span style="color: #9cdcfe">Zap</span><span style="color: #d4d4d4">,</span> <span style="color: #9cdcfe">Users</span><span style="color: #d4d4d4">,</span> <span style="color: #9cdcfe">TrendingUp</span> <span style="color: #d4d4d4">}</span> <span style="color: #c586c0">from</span> <span style="color: #ce9178">'lucide-react'</span>

<span style="color: #569cd6">const</span> <span style="color: #9cdcfe">myTabs</span> <span style="color: #d4d4d4">=</span> <span style="color: #d4d4d4">[</span>
  <span style="color: #d4d4d4">{</span>
    <span style="color: #9cdcfe">icon</span><span style="color: #d4d4d4">:</span> <span style="color: #d4d4d4">&lt;</span><span style="color: #4ec9b0">Zap</span> <span style="color: #92c5f7">className</span><span style="color: #d4d4d4">=</span><span style="color: #ce9178">"h-5 w-5"</span> <span style="color: #d4d4d4">/&gt;,</span>
    <span style="color: #9cdcfe">title</span><span style="color: #d4d4d4">:</span> <span style="color: #ce9178">"Fast Performance"</span><span style="color: #d4d4d4">,</span>
    <span style="color: #9cdcfe">backgroundPositionX</span><span style="color: #d4d4d4">:</span> <span style="color: #b5cea8">0</span><span style="color: #d4d4d4">,</span>
    <span style="color: #9cdcfe">backgroundPositionY</span><span style="color: #d4d4d4">:</span> <span style="color: #b5cea8">0</span><span style="color: #d4d4d4">,</span>
    <span style="color: #9cdcfe">backgroundSizeX</span><span style="color: #d4d4d4">:</span> <span style="color: #b5cea8">150</span><span style="color: #d4d4d4">,</span>
  <span style="color: #d4d4d4">},</span>
  <span style="color: #608b4e">// ... more tabs</span>
<span style="color: #d4d4d4">];</span>

<span style="color: #d4d4d4">&lt;</span><span style="color: #4ec9b0">FeatureTabs</span>
  <span style="color: #92c5f7">tabs</span><span style="color: #d4d4d4">={</span><span style="color: #9cdcfe">myTabs</span><span style="color: #d4d4d4">}</span>
  <span style="color: #92c5f7">backgroundImage</span><span style="color: #d4d4d4">=</span><span style="color: #ce9178">"https://example.com/image.jpg"</span>
  <span style="color: #92c5f7">header</span><span style="color: #d4d4d4">=</span><span style="color: #ce9178">"Your Custom Header"</span>
  <span style="color: #92c5f7">subheader</span><span style="color: #d4d4d4">=</span><span style="color: #ce9178">"Your custom description"</span>
<span style="color: #d4d4d4">/&gt;</span>`}
                </CodeBlock>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white/90 mb-4">Advanced Customization</h3>
                <CodeBlock language="javascript">
                  {`<span style="color: #d4d4d4">&lt;</span><span style="color: #4ec9b0">FeatureTabs</span>
  <span style="color: #92c5f7">tabs</span><span style="color: #d4d4d4">={</span><span style="color: #9cdcfe">tabs</span><span style="color: #d4d4d4">}</span>
  <span style="color: #92c5f7">backgroundImage</span><span style="color: #d4d4d4">=</span><span style="color: #ce9178">"https://example.com/dashboard.jpg"</span>
  <span style="color: #92c5f7">header</span><span style="color: #d4d4d4">=</span><span style="color: #ce9178">"Advanced Features"</span>
  <span style="color: #92c5f7">subheader</span><span style="color: #d4d4d4">=</span><span style="color: #ce9178">"Powerful tools for modern teams"</span>
  <span style="color: #92c5f7">defaultSelectedIndex</span><span style="color: #d4d4d4">={</span><span style="color: #b5cea8">1</span><span style="color: #d4d4d4">}</span>
  <span style="color: #92c5f7">animationDuration</span><span style="color: #d4d4d4">={</span><span style="color: #b5cea8">1.5</span><span style="color: #d4d4d4">}</span>
<span style="color: #d4d4d4">/&gt;</span>`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}