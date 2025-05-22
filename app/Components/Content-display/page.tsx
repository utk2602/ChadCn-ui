"use client"

import { useState } from "react"
import { ArrowLeft, Code, Zap, Users, TrendingUp, Shield, Sparkles, Database } from "lucide-react"
import { FeatureTabs } from "@/CHADCN-UI/Content-display"

const componentCode = `import { FeatureTabs } from "@/CHADCN-UI/Content-display"
import { Zap, Users, TrendingUp, Shield } from "lucide-react"

const tabs = [
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
];

export default function MyComponent() {
  return (
    <FeatureTabs
      tabs={tabs}
      backgroundImage="/api/placeholder/800/450"
      header="Elevate your workflow"
      subheader="Transform your productivity with our comprehensive suite of tools"
      defaultSelectedIndex={0}
      animationDuration={1.5}
      highlightColor="#3b82f6"
      newBadgeColor="#10b981"
      iconColor="#3b82f6"
    />
  )
}`;

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
];

const advancedTabs = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "AI-Powered Features",
    isNew: true,
    backgroundPositionX: 25,
    backgroundPositionY: 25,
    backgroundSizeX: 180,
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Real-time Data Sync",
    backgroundPositionX: 75,
    backgroundPositionY: 25,
    backgroundSizeX: 160,
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Advanced Security",
    backgroundPositionX: 25,
    backgroundPositionY: 75,
    backgroundSizeX: 140,
  },
];

export default function FeatureTabsPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex-1 container max-w-7xl py-10">
        <div className="space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                FeatureTabs
              </h1>
              <p className="text-xl text-gray-300">
                An interactive feature showcase component with animated background transitions and customizable styling.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6 bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">Preview</h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-950 p-6 overflow-hidden">
              <FeatureTabs
                tabs={sampleTabs}
                backgroundImage="/api/placeholder/800/450"
                header="Elevate your workflow"
                subheader="Transform your productivity with our comprehensive suite of tools"
                defaultSelectedIndex={0}
                animationDuration={1.5}
                highlightColor="#3b82f6"
                newBadgeColor="#10b981"
                iconColor="#3b82f6"
              />
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <p><strong className="text-white">Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Click different tabs to see animated background transitions</li>
                <li>Animated border highlights on selected tabs</li>
                <li>Customizable colors for highlights, badges, and icons</li>
                <li>Responsive design that adapts to different screen sizes</li>
                <li>Support for "new" badges on featured items</li>
              </ul>
            </div>

            {showCode && (
              <div className="rounded-md bg-gray-950 border border-gray-700 p-4 mt-4">
                <h3 className="text-lg font-medium mb-2 text-white">Component Code</h3>
                <div className="max-h-96 overflow-auto">
                  <pre className="text-sm text-green-400 whitespace-pre-wrap">
                    <code>{componentCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Additional Examples */}
          <div className="space-y-6 bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Additional Examples</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-3">Custom Colors & Compact Layout</h3>
                <div className="rounded-lg border border-gray-700 bg-gray-950 p-4 overflow-hidden">
                  <FeatureTabs
                    tabs={advancedTabs}
                    backgroundImage="/api/placeholder/600/300"
                    header="Advanced Features"
                    subheader="Discover powerful capabilities designed for modern teams"
                    defaultSelectedIndex={1}
                    animationDuration={1}
                    highlightColor="#f59e0b"
                    newBadgeColor="#ef4444"
                    iconColor="#f59e0b"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-3">Without Background Image</h3>
                <div className="rounded-lg border border-gray-700 bg-gray-950 p-4 overflow-hidden">
                  <FeatureTabs
                    tabs={sampleTabs}
                    header="Simple Feature Showcase"
                    subheader="Clean and minimal design without background imagery"
                    defaultSelectedIndex={2}
                    animationDuration={2}
                    highlightColor="#8b5cf6"
                    newBadgeColor="#06b6d4"
                    iconColor="#8b5cf6"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Props & Configuration</h2>
            <div className="rounded-md border border-gray-700 overflow-hidden bg-gray-900">
              <table className="w-full text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-200">Property</th>
                    <th className="text-left p-3 font-medium text-gray-200">Type</th>
                    <th className="text-left p-3 font-medium text-gray-200">Default</th>
                    <th className="text-left p-3 font-medium text-gray-200">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">tabs</td>
                    <td className="p-3 font-mono text-xs text-purple-400">FeatureTabItem[]</td>
                    <td className="p-3 font-mono text-xs text-gray-500">—</td>
                    <td className="p-3 text-gray-300">Array of tab objects with icon, title, and background positions</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">backgroundImage</td>
                    <td className="p-3 font-mono text-xs text-purple-400">string</td>
                    <td className="p-3 font-mono text-xs text-gray-500">undefined</td>
                    <td className="p-3 text-gray-300">URL of the background image for the preview area</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">header</td>
                    <td className="p-3 font-mono text-xs text-purple-400">string</td>
                    <td className="p-3 font-mono text-xs text-green-400">"Elevate your SEO efforts."</td>
                    <td className="p-3 text-gray-300">Main heading text</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">subheader</td>
                    <td className="p-3 font-mono text-xs text-purple-400">string</td>
                    <td className="p-3 font-mono text-xs text-green-400">"For small startups to large..."</td>
                    <td className="p-3 text-gray-300">Subtitle text</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">defaultSelectedIndex</td>
                    <td className="p-3 font-mono text-xs text-purple-400">number</td>
                    <td className="p-3 font-mono text-xs text-green-400">0</td>
                    <td className="p-3 text-gray-300">Index of the initially selected tab</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">animationDuration</td>
                    <td className="p-3 font-mono text-xs text-purple-400">number</td>
                    <td className="p-3 font-mono text-xs text-green-400">2</td>
                    <td className="p-3 text-gray-300">Duration of transition animations in seconds</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">highlightColor</td>
                    <td className="p-3 font-mono text-xs text-purple-400">string</td>
                    <td className="p-3 font-mono text-xs text-green-400">"#A369ff"</td>
                    <td className="p-3 text-gray-300">Color for selected tab border and icons</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">newBadgeColor</td>
                    <td className="p-3 font-mono text-xs text-purple-400">string</td>
                    <td className="p-3 font-mono text-xs text-green-400">"#8c44ff"</td>
                    <td className="p-3 text-gray-300">Background color for "new" badges</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-blue-400">iconColor</td>
                    <td className="p-3 font-mono text-xs text-purple-400">string</td>
                    <td className="p-3 font-mono text-xs text-green-400">"#A369ff"</td>
                    <td className="p-3 text-gray-300">Color for tab icons</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tab Item Structure */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">FeatureTabItem Structure</h2>
            <div className="rounded-md bg-gray-950 border border-gray-700 p-4">
              <pre className="text-sm text-green-400 whitespace-pre-wrap">
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
            <h2 className="text-2xl font-bold tracking-tight text-white">Key Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Animated Transitions</h3>
                <p className="text-sm text-gray-400">
                  Smooth background position and size transitions with customizable duration and easing.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Interactive Highlights</h3>
                <p className="text-sm text-gray-400">
                  Animated border highlights that travel around selected tabs using CSS masks.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Responsive Design</h3>
                <p className="text-sm text-gray-400">
                  Adapts from horizontal layout on desktop to vertical stacking on mobile devices.
                </p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-semibold mb-2 text-white">Customizable Styling</h3>
                <p className="text-sm text-gray-400">
                  Full control over colors, animations, and visual elements to match your brand.
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Usage Examples</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-200 mb-2">Basic Implementation</h3>
                <div className="rounded-md bg-gray-950 border border-gray-700 p-4">
                  <pre className="text-sm text-green-400 whitespace-pre-wrap">
                    <code>{`import { FeatureTabs } from "@/CHADCN-UI/Content-display"
import { Zap, Users, TrendingUp } from "lucide-react"

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
  backgroundImage="/path/to/image.jpg"
  header="Your Custom Header"
  subheader="Your custom description"
/>`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-200 mb-2">Advanced Customization</h3>
                <div className="rounded-md bg-gray-950 border border-gray-700 p-4">
                  <pre className="text-sm text-green-400 whitespace-pre-wrap">
                    <code>{`<FeatureTabs
  tabs={tabs}
  backgroundImage="/hero-image.jpg"
  header="Advanced Features"
  subheader="Powerful tools for modern teams"
  defaultSelectedIndex={1}
  animationDuration={1.5}
  highlightColor="#3b82f6"
  newBadgeColor="#10b981"
  iconColor="#3b82f6"
  className="max-w-4xl"
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Implementation Notes</h2>
            <div className="p-4 border border-blue-600 rounded-lg bg-blue-950/20">
              <h3 className="font-semibold mb-2 text-blue-300">Background Image Positioning</h3>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• <strong>backgroundPositionX/Y</strong>: Values from 0-100 representing percentage positions</li>
                <li>• <strong>backgroundSizeX</strong>: Scale percentage (100 = original size, 150 = 1.5x larger)</li>
                <li>• Position values control which part of the image is visible for each tab</li>
                <li>• Higher size values create zoom effects during transitions</li>
              </ul>
            </div>
            <div className="p-4 border border-amber-600 rounded-lg bg-amber-950/20">
              <h3 className="font-semibold mb-2 text-amber-300">Performance Considerations</h3>
              <ul className="text-sm text-amber-200 space-y-1">
                <li>• Uses Framer Motion for smooth animations with hardware acceleration</li>
                <li>• CSS masks are used for border animations (modern browser feature)</li>
                <li>• Background images should be optimized for web performance</li>
                <li>• Consider using WebP format for better compression</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}