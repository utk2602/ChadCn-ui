"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

function CodeBlock({ children, language = "bash" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
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

export default function DocsPage() {
  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-4xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Introduction */}
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
              Documentation
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              Welcome to the ChadCn UI documentation. Learn how to use our custom components and get started in minutes.
            </p>
          </div>

          {/* Installation Guide */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Quick Start
              </h2>
              <p className="text-white/50 leading-relaxed text-lg">
                Get up and running with ChadCn UI in just a few simple steps.
              </p>
            </div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-white/90">Install the package</h3>
                </div>
                <p className="text-white/60 ml-11">
                  Install ChadCn UI via npm or yarn to get started with our component library.
                </p>
                <div className="ml-11">
                  <CodeBlock language="bash">
                    {`<span class="text-[#569cd6]">npm</span> <span class="text-[#9cdcfe]">install</span> <span class="text-[#ce9178]">chadcn-ui</span>`}
                  </CodeBlock>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-white/90">Configure Tailwind CSS</h3>
                </div>
                <p className="text-white/60 ml-11">
                  Add our package to your Tailwind CSS configuration to ensure all styles are included in your build.
                </p>
                <div className="ml-11">
                  <CodeBlock language="javascript">
                    {`<span class="text-[#608b4e]">// tailwind.config.js</span>
<span class="text-[#c586c0]">module</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">exports</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#9cdcfe]">content</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">[</span>
    <span class="text-[#ce9178]">'./pages/**/*.{js,ts,jsx,tsx}'</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#ce9178]">'./components/**/*.{js,ts,jsx,tsx}'</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#ce9178]">'./node_modules/chadcn-ui/**/*.{js,ts,jsx,tsx}'</span><span class="text-[#d4d4d4]">,</span>
  <span class="text-[#d4d4d4]">],</span>
  <span class="text-[#9cdcfe]">theme</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#9cdcfe]">extend</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">{},</span>
  <span class="text-[#d4d4d4]">},</span>
  <span class="text-[#9cdcfe]">plugins</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#d4d4d4]">[],</span>
<span class="text-[#d4d4d4]">}</span>`}
                  </CodeBlock>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-white/90">Import global styles</h3>
                </div>
                <p className="text-white/60 ml-11">
                  Import the ChadCn UI styles in your main CSS file to access all component styles.
                </p>
                <div className="ml-11">
                  <CodeBlock language="css">
                    {`<span class="text-[#608b4e]">/* globals.css */</span>
<span class="text-[#c586c0]">@import</span> <span class="text-[#ce9178]">'chadcn-ui/dist/styles.css'</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#c586c0]">@tailwind</span> <span class="text-[#9cdcfe]">base</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#c586c0]">@tailwind</span> <span class="text-[#9cdcfe]">components</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#c586c0]">@tailwind</span> <span class="text-[#9cdcfe]">utilities</span><span class="text-[#d4d4d4]">;</span>`}
                  </CodeBlock>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold text-white/90">Start using components</h3>
                </div>
                <p className="text-white/60 ml-11">
                  Import any component from our library and start building amazing user interfaces.
                </p>
                <div className="ml-11">
                  <CodeBlock language="javascript">
                    {`<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Button</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Card</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Modal</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'chadcn-ui'</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">App</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span>
      <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Card</span><span class="text-[#d4d4d4]">&gt;</span>
        <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">Button</span> <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"primary"</span><span class="text-[#d4d4d4]">&gt;</span>
          <span class="text-[#d4d4d4]">Get Started</span>
        <span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Button</span><span class="text-[#d4d4d4]">&gt;</span>
      <span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">Card</span><span class="text-[#d4d4d4]">&gt;</span>
    <span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span>
  <span class="text-[#d4d4d4]">)</span>
<span class="text-[#d4d4d4]">}</span>`}
                  </CodeBlock>
                </div>
              </div>
            </div>

            {/* Success message */}
            <div className="mt-12 p-6 bg-gradient-to-r from-emerald-500/[0.1] to-cyan-500/[0.1] border border-emerald-500/[0.2] rounded-xl">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">You're all set!</h4>
                  <p className="text-white/70">
                    ChadCn UI is now ready to use in your project. Check out our component library and start building amazing interfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}