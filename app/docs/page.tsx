"use client"

export default function DocsPage() {
  return (
    <div className="flex-1 container max-w-7xl py-10">
      <div className="space-y-6">
        {/* Introduction */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight gradient-text">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Welcome to the ChadCn UI documentation. Learn how to use our custom components.
          </p>
        </div>

        {/* Installation Guide */}
        <div className="space-y-6 bg-muted/50 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
          <p className="text-muted-foreground">Follow these steps to install ChadCn UI in your project.</p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">1. Install the package</h3>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>npm install chadcn-ui</code>
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">2. Set up Tailwind CSS</h3>
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
            <h3 className="text-xl font-bold">3. Import styles</h3>
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
            <h3 className="text-xl font-bold">4. Usage</h3>
            <p>Import the components you need from the library and use them in your React application.</p>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>{`import { ComponentName } from 'chadcn-ui'

// Then use the component in your JSX
<ComponentName />`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
