"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function InstallationPage() {
  return (
    <div className="flex-1 container max-w-7xl py-10">
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          href="/docs"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Documentation
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">Installation</h1>
          <p className="text-xl text-muted-foreground">
            Follow these steps to install ChadCn UI in your project.
          </p>
        </div>

        {/* Section Wrapper */}
        <div className="space-y-6 bg-muted/50 rounded-xl p-6 md:p-8">
          {/* Step 1 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Install the package</h2>
            <p className="text-muted-foreground">Install ChadCn UI using your preferred package manager.</p>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>npm install chadcn-ui</code>
              </pre>
            </div>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>yarn add chadcn-ui</code>
              </pre>
            </div>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>pnpm add chadcn-ui</code>
              </pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Set up Tailwind CSS</h2>
            <p className="text-muted-foreground">Ensure Tailwind is properly configured in your project.</p>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>{`// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/chadcn-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}</code>
              </pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">3. Import styles</h2>
            <p className="text-muted-foreground">Add ChadCn UI's styles to your global stylesheet.</p>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>{`/* globals.css */
@import 'chadcn-ui/dist/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;`}</code>
              </pre>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Start using components</h2>
            <p className="text-muted-foreground">Import and use ChadCn UI components in your app.</p>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>{`import { AnimatedTestimonial, HeroCard, GradientButton } from 'chadcn-ui'

export default function App() {
  return (
    <div>
      <HeroCard
        title="Welcome to My App"
        description="Built with ChadCn UI components"
        action={<GradientButton>Get Started</GradientButton>}
      />
    </div>
  )
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that ChadCn UI is installed, explore the components and start building!
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/docs#components"
              className="bg-muted/50 rounded-xl border border-border p-6 hover:border-foreground transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Browse Components</h3>
              <p className="text-muted-foreground">Explore the components and see how to use them.</p>
            </Link>
            <Link
              href="/docs/usage"
              className="bg-muted/50 rounded-xl border border-border p-6 hover:border-foreground transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">Usage Examples</h3>
              <p className="text-muted-foreground">Get practical examples of how to implement the components.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
