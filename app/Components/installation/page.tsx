"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check, Package, Settings, Palette, Play } from "lucide-react"

function CodeBlock({ children, language = "bash" }: { children: string; language?: string }) {
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

export default function InstallationPage() {
  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-4xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Back Link */}
          <Link
            href="/docs"
            className="inline-flex items-center text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Documentation
          </Link>

          {/* Header */}
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
              Installation
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              Follow these steps to install ChadCn UI in your project and start building beautiful interfaces.
            </p>
          </div>

          {/* Installation Steps */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg">
                    <Package size={20} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white/90">Install the package</h2>
                    <p className="text-white/60">Install ChadCn UI using your preferred package manager.</p>
                  </div>
                </div>
                
                <div className="space-y-4 ml-16">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white/80">Using npm:</h3>
                    <CodeBlock language="bash">
                      {`<span class="text-[#569cd6]">npm</span> <span class="text-[#9cdcfe]">install</span> <span class="text-[#ce9178]">chadcn-ui</span>`}
                    </CodeBlock>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white/80">Using yarn:</h3>
                    <CodeBlock language="bash">
                      {`<span class="text-[#569cd6]">yarn</span> <span class="text-[#9cdcfe]">add</span> <span class="text-[#ce9178]">chadcn-ui</span>`}
                    </CodeBlock>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white/80">Using pnpm:</h3>
                    <CodeBlock language="bash">
                      {`<span class="text-[#569cd6]">pnpm</span> <span class="text-[#9cdcfe]">add</span> <span class="text-[#ce9178]">chadcn-ui</span>`}
                    </CodeBlock>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white/90">Set up Tailwind CSS</h2>
                    <p className="text-white/60">Ensure Tailwind is properly configured in your project.</p>
                  </div>
                </div>
                
                <div className="ml-16">
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
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                    <Palette size={20} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white/90">Import styles</h2>
                    <p className="text-white/60">Add ChadCn UI's styles to your global stylesheet.</p>
                  </div>
                </div>
                
                <div className="ml-16">
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
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                    <Play size={20} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white/90">Start using components</h2>
                    <p className="text-white/60">Import and use ChadCn UI components in your app.</p>
                  </div>
                </div>
                
                <div className="ml-16">
                  <CodeBlock language="javascript">
                    {`<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">AnimatedTestimonial</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">HeroCard</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">GradientButton</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'chadcn-ui'</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">App</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span>
      <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span>
        <span class="text-[#92c5f7]">title</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"Welcome to My App"</span>
        <span class="text-[#92c5f7]">description</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"Built with ChadCn UI components"</span>
        <span class="text-[#92c5f7]">action</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{&lt;</span><span class="text-[#4ec9b0]">GradientButton</span><span class="text-[#d4d4d4]">&gt;</span><span class="text-[#d4d4d4]">Get Started</span><span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">GradientButton</span><span class="text-[#d4d4d4]">&gt;}</span>
      <span class="text-[#d4d4d4]">/&gt;</span>
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
                  <h4 className="text-lg font-semibold text-white mb-2">Installation Complete!</h4>
                  <p className="text-white/70">
                    ChadCn UI is now ready to use in your project. You can start importing and using components right away.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 text-center">
              Next Steps
            </h2>
            <p className="text-white/60 text-center text-lg max-w-2xl mx-auto">
              Now that ChadCn UI is installed, explore the components and start building amazing interfaces!
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <Link
                href="/docs#components"
                className="group bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-xl border border-white/[0.08] p-8 hover:border-indigo-500/[0.3] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_0_rgba(99,102,241,0.1)]"
              >
                <h3 className="text-2xl font-bold mb-3 text-white/90 group-hover:text-white transition-colors">
                  Browse Components
                </h3>
                <p className="text-white/60 group-hover:text-white/70 transition-colors">
                  Explore all available components and see how to use them in your projects.
                </p>
              </Link>
              <Link
                href="/docs/usage"
                className="group bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-xl border border-white/[0.08] p-8 hover:border-cyan-500/[0.3] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_0_rgba(6,182,212,0.1)]"
              >
                <h3 className="text-2xl font-bold mb-3 text-white/90 group-hover:text-white transition-colors">
                  Usage Examples
                </h3>
                <p className="text-white/60 group-hover:text-white/70 transition-colors">
                  Get practical examples of how to implement and customize the components.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}