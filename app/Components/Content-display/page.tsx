"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Code, Zap, Users, TrendingUp, Shield } from "lucide-react"

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
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
  const variants = {
    default: "bg-white text-black hover:bg-gray-200 active:bg-gray-300",
    outline: "border-2 border-white bg-transparent text-white hover:bg-white hover:text-black active:bg-gray-200",
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
  <thead className="bg-gray-800 border-b-2 border-white">{children}</thead>
)

const TableRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <tr className={`border-b border-gray-600 ${className}`}>{children}</tr>
)

const TableHead = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`text-left p-3 font-medium text-white ${className}`}>{children}</th>
)

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-600">{children}</tbody>
)

const TableCell = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`p-3 ${className}`}>{children}</td>
)

// Enhanced FeatureTabs component with black and white styling
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
        <h2 className="text-3xl font-bold text-white mb-2">{header}</h2>
        <p className="text-gray-300 text-lg">{subheader}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Tabs */}
        <div className="flex flex-col space-y-4 lg:w-1/2">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                selectedIndex === index
                  ? "bg-white text-black border-white shadow-lg transform scale-105"
                  : "bg-black text-white border-gray-600 hover:border-white hover:bg-gray-900"
              }`}
            >
              <div className={selectedIndex === index ? "text-black" : "text-white"}>{tab.icon}</div>
              <span className="font-medium flex-1">{tab.title}</span>
              {tab.isNew && (
                <span
                  className={`px-2 py-1 text-xs rounded-full font-bold ${
                    selectedIndex === index ? "bg-black text-white" : "bg-white text-black"
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
            className="h-80 rounded-lg bg-cover bg-center transition-all duration-1000 ease-out border-2 border-white shadow-2xl"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : "linear-gradient(45deg, #000000, #333333)",
              backgroundPosition: backgroundImage
                ? `${tabs[selectedIndex]?.backgroundPositionX || 0}% ${tabs[selectedIndex]?.backgroundPositionY || 0}%`
                : "center",
              backgroundSize: backgroundImage ? `${tabs[selectedIndex]?.backgroundSizeX || 100}%` : "cover",
              filter: "grayscale(100%) contrast(1.2)",
            }}
          />
        </div>
      </div>
    </div>
  )
}

const componentCode = ``

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
    <div className="min-h-screen bg-black text-white">
      <div className="flex-1 container max-w-7xl py-10 px-4">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white border-b-4 border-white pb-2 inline-block">
                FeatureTabs
              </h1>
              <p className="text-xl text-gray-300">
                An interactive feature showcase component with animated background transitions and customizable styling.
              </p>
            </div>
          </div>

          {/* Large Single Preview */}
          <div className="space-y-6 bg-gray-900 rounded-xl p-8 md:p-12 border-2 border-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">Preview</h2>
              <Button onClick={() => setShowCode(!showCode)} variant="outline">
                <Code className="h-4 w-4 mr-2" />
                {showCode ? "Hide Code" : "View Code"}
              </Button>
            </div>

            <div className="rounded-lg border-2 border-white bg-black p-8 md:p-12 overflow-hidden">
              <FeatureTabs
                tabs={sampleTabs}
                backgroundImage="https://img.freepik.com/premium-vector/dashboard-design-business-development-technology-web-template-dashboard-vector-design_29008-372.jpg"
                header="Elevate your workflow"
                subheader="Transform your productivity with our comprehensive suite of tools"
                defaultSelectedIndex={0}
                animationDuration={1.5}
              />
            </div>

            <div className="text-sm text-gray-300 space-y-2 border-t-2 border-gray-600 pt-4">
              <p>
                <strong className="text-white">Features:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Click different tabs to see animated background transitions</li>
                <li>High contrast black and white design with enhanced visibility</li>
                <li>Smooth scaling and color inversion effects on selection</li>
                <li>Responsive design that adapts to different screen sizes</li>
                <li>Support for "new" badges with inverted styling</li>
                <li>Grayscale filter applied to background images for consistency</li>
              </ul>
            </div>

            {showCode && (
              <div className="rounded-md bg-black border-2 border-white p-4 mt-6">
                <h3 className="text-lg font-medium mb-2 text-white">Component Code</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap bg-gray-900 p-4 rounded border">
                    <code>{componentCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white border-b-2 border-white pb-2 inline-block">
              Props & Configuration
            </h2>
            <div className="rounded-md border-2 border-white overflow-hidden bg-gray-900">
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
                    <TableCell className="font-mono text-xs text-gray-300">FeatureTabItem[]</TableCell>
                    <TableCell className="font-mono text-xs text-gray-500">—</TableCell>
                    <TableCell className="text-gray-300">
                      Array of tab objects with icon, title, and background positions
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">backgroundImage</TableCell>
                    <TableCell className="font-mono text-xs text-gray-300">string</TableCell>
                    <TableCell className="font-mono text-xs text-gray-500">undefined</TableCell>
                    <TableCell className="text-gray-300">URL of the background image for the preview area</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">header</TableCell>
                    <TableCell className="font-mono text-xs text-gray-300">string</TableCell>
                    <TableCell className="font-mono text-xs text-gray-400">"Elevate your SEO efforts."</TableCell>
                    <TableCell className="text-gray-300">Main heading text</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">subheader</TableCell>
                    <TableCell className="font-mono text-xs text-gray-300">string</TableCell>
                    <TableCell className="font-mono text-xs text-gray-400">"For small startups to large..."</TableCell>
                    <TableCell className="text-gray-300">Subtitle text</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">defaultSelectedIndex</TableCell>
                    <TableCell className="font-mono text-xs text-gray-300">number</TableCell>
                    <TableCell className="font-mono text-xs text-gray-400">0</TableCell>
                    <TableCell className="text-gray-300">Index of the initially selected tab</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-xs text-white font-bold">animationDuration</TableCell>
                    <TableCell className="font-mono text-xs text-gray-300">number</TableCell>
                    <TableCell className="font-mono text-xs text-gray-400">2</TableCell>
                    <TableCell className="text-gray-300">Duration of transition animations in seconds</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Tab Item Structure */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white border-b-2 border-white pb-2 inline-block">
              FeatureTabItem Structure
            </h2>
            <div className="rounded-md bg-black border-2 border-white p-4">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                <code>{`interface FeatureTabItem {
  icon?: React.ReactNode;           // Icon component (from lucide-react, etc.)
  title: string;                    // Display title for the tab
  isNew?: boolean;                  // Show "new" badge
  backgroundPositionX: number;      // X position for background image (0-100)
  backgroundPositionY: number;      // Y position for background image (0-100)
  backgroundSizeX: number;          // Background image scale percentage
}`}</code>
              </pre>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white border-b-2 border-white pb-2 inline-block">
              Key Features
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border-2 border-white rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white text-lg">Animated Transitions</h3>
                <p className="text-sm text-gray-300">
                  Smooth background position and size transitions with customizable duration and easing.
                </p>
              </div>
              <div className="p-4 border-2 border-white rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white text-lg">High Contrast Design</h3>
                <p className="text-sm text-gray-300">
                  Pure black and white styling with enhanced contrast for maximum accessibility and visual impact.
                </p>
              </div>
              <div className="p-4 border-2 border-white rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white text-lg">Responsive Design</h3>
                <p className="text-sm text-gray-300">
                  Adapts from horizontal layout on desktop to vertical stacking on mobile devices.
                </p>
              </div>
              <div className="p-4 border-2 border-white rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white text-lg">Interactive Feedback</h3>
                <p className="text-sm text-gray-300">
                  Color inversion and scaling effects provide clear visual feedback for user interactions.
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white border-b-2 border-white pb-2 inline-block">
              Usage Examples
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-white mb-2">Basic Implementation</h3>
                <div className="rounded-md bg-black border-2 border-white p-4">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    <code>{`import { FeatureTabs } from "@/components/feature-tabs"
import { Zap, Users, TrendingUp } from 'lucide-react'

const myTabs = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast Performance",
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  // ... more tabs
];

<FeatureTabs
  tabs={myTabs}
  backgroundImage="https://img.freepik.com/premium-vector/dashboard-design-business-development-technology-web-template-dashboard-vector-design_29008-372.jpg"
  header="Your Custom Header"
  subheader="Your custom description"
/>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-white mb-2">Advanced Customization</h3>
                <div className="rounded-md bg-black border-2 border-white p-4">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                    <code>{`<FeatureTabs
  tabs={tabs}
  backgroundImage="https://img.freepik.com/premium-vector/dashboard-design-business-development-technology-web-template-dashboard-vector-design_29008-372.jpg"
  header="Advanced Features"
  subheader="Powerful tools for modern teams"
  defaultSelectedIndex={1}
  animationDuration={1.5}
  className="max-w-4xl"
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white border-b-2 border-white pb-2 inline-block">
              Implementation Notes
            </h2>
            <div className="p-4 border-2 border-white rounded-lg bg-gray-900">
              <h3 className="font-semibold mb-2 text-white">Black & White Design Features</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>
                  • <strong>High Contrast:</strong> Pure black and white color scheme for maximum visibility
                </li>
                <li>
                  • <strong>Grayscale Filter:</strong> Background images automatically converted to grayscale
                </li>
                <li>
                  • <strong>Interactive Inversion:</strong> Selected tabs use inverted colors for clear feedback
                </li>
                <li>
                  • <strong>Enhanced Borders:</strong> Bold white borders provide strong visual separation
                </li>
                <li>
                  • <strong>Scale Effects:</strong> Selected tabs scale up slightly for additional emphasis
                </li>
              </ul>
            </div>
            <div className="p-4 border-2 border-white rounded-lg bg-gray-900">
              <h3 className="font-semibold mb-2 text-white">Performance Considerations</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>
                  • <strong>CSS Transitions:</strong> Smooth animations using CSS transitions for optimal performance
                </li>
                <li>
                  • <strong>Custom Components:</strong> All UI components built from scratch without external
                  dependencies
                </li>
                <li>
                  • <strong>Optimized Images:</strong> Background images should be optimized for web performance
                </li>
                <li>
                  • <strong>Accessibility:</strong> High contrast design improves accessibility for all users
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
