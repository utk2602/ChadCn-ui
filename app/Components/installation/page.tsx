import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function InstallationPage() {
  return (
    <div className="flex-1 container max-w-6xl py-10 px-4">
      <div className="space-y-10">
        <div>
          <Link
            href="/docs"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Documentation
          </Link>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight gradient-text">Installation</h1>
            <p className="text-xl text-muted-foreground">Follow these steps to install ChadCn UI in your project.</p>
          </div>
        </div>

        <div className="space-y-8 bg-muted/50 rounded-xl p-6 md:p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">1. Install the package</h2>
            <p>Install ChadCn UI using your package manager of choice.</p>
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

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">2. Set up Tailwind CSS</h2>
            <p>Make sure you have Tailwind CSS installed and configured in your project.</p>
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

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">3. Import styles</h2>
            <p>Import the ChadCn UI styles in your global CSS file.</p>
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

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">4. Start using components</h2>
            <p>Import and use the components in your application.</p>
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

        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
          <p className="text-muted-foreground">
            Now that you have installed ChadCn UI, you can start exploring the components and building your application.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/docs#components"
              className="bg-background rounded-xl border p-6 hover:border-foreground transition-colors card-hover"
            >
              <h3 className="text-xl font-bold mb-2">Browse Components</h3>
              <p className="text-muted-foreground">Explore the available components and learn how to use them.</p>
            </Link>
            <Link
              href="/docs/usage"
              className="bg-background rounded-xl border p-6 hover:border-foreground transition-colors card-hover"
            >
              <h3 className="text-xl font-bold mb-2">Usage Examples</h3>
              <p className="text-muted-foreground">See examples of how to use ChadCn UI components in your projects.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
