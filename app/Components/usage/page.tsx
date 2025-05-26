"use client"
import { useState } from "react"
import { ArrowLeft, Copy, Check, Code, Sparkles } from "lucide-react"

interface CodeBlockProps {
  children: string;
  language?: string;
}

function CodeBlock({ children, language = "bash" }: CodeBlockProps) {
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

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

function TabButton({ 
  isActive, 
  onClick, 
  children, 
  icon 
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg'
          : 'text-white/60 hover:text-white/80 hover:bg-white/[0.05]'
      }`}
    >
      {icon}
      {children}
    </button>
  )
}

export default function UsagePage() {
  const [activeTab, setActiveTab] = useState('basic')

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-6xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Back Link */}
          <button className="inline-flex items-center text-sm text-white/50 hover:text-white/80 transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Documentation
          </button>

          {/* Header */}
          <div className="space-y-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
              Usage Examples
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              Learn how to use ChadCn UI components in your projects with practical examples and best practices.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <TabButton
              isActive={activeTab === 'basic'}
              onClick={() => setActiveTab('basic')}
              icon={<Code size={16} />}
            >
              Basic Usage
            </TabButton>
            <TabButton
              isActive={activeTab === 'advanced'}
              onClick={() => setActiveTab('advanced')}
              icon={<Sparkles size={16} />}
            >
              Advanced Usage
            </TabButton>
          </div>

          {/* Tab Content */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            
            {/* Basic Usage Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                    Basic Usage
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Here's how to use ChadCn UI components in your React application with simple examples.
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                        1
                      </div>
                      <h3 className="text-2xl font-bold text-white/90">Import Components</h3>
                    </div>
                    <p className="text-white/60 ml-11">Import the components you need from the library.</p>
                    <div className="ml-11">
                      <CodeBlock language="javascript">
                        {`<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">HeroCard</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">GradientButton</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'chadcn-ui'</span>`}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-2xl font-bold text-white/90">Use Components</h3>
                    </div>
                    <p className="text-white/60 ml-11">Use the components in your JSX with props and styling.</p>
                    <div className="ml-11">
                      <CodeBlock language="javascript">
                        {`<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">HomePage</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span>
      <span class="text-[#92c5f7]">title</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"Welcome to My Website"</span>
      <span class="text-[#92c5f7]">description</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"A beautiful website built with ChadCn UI."</span>
      <span class="text-[#92c5f7]">action</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span>
        <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">GradientButton</span><span class="text-[#d4d4d4]">&gt;</span><span class="text-[#d4d4d4]">Get Started</span><span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">GradientButton</span><span class="text-[#d4d4d4]">&gt;</span>
      <span class="text-[#d4d4d4]">}</span>
    <span class="text-[#d4d4d4]">/&gt;</span>
  <span class="text-[#d4d4d4]">)</span>
<span class="text-[#d4d4d4]">}</span>`}
                      </CodeBlock>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Usage Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                    Advanced Usage
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Learn how to customize and extend ChadCn UI components for more complex use cases.
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                        1
                      </div>
                      <h3 className="text-2xl font-bold text-white/90">Customizing Components</h3>
                    </div>
                    <p className="text-white/60 ml-11">You can customize components using props or by extending them with your own styling.</p>
                    <div className="ml-11">
                      <CodeBlock language="javascript">
                        {`<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">GradientButton</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'chadcn-ui'</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">CustomButton</span><span class="text-[#d4d4d4]">({</span> <span class="text-[#9cdcfe]">className</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#d4d4d4]">...</span><span class="text-[#9cdcfe]">props</span> <span class="text-[#d4d4d4]">})</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">GradientButton</span>
      <span class="text-[#92c5f7]">variant</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"primary"</span>
      <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#ce9178]">\`px-8 py-3 text-lg \${className}\`</span><span class="text-[#d4d4d4]">}</span>
      <span class="text-[#d4d4d4]">{...</span><span class="text-[#9cdcfe]">props</span><span class="text-[#d4d4d4]">}</span>
    <span class="text-[#d4d4d4]">/&gt;</span>
  <span class="text-[#d4d4d4]">)</span>
<span class="text-[#d4d4d4]">}</span>`}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
                        2
                      </div>
                      <h3 className="text-2xl font-bold text-white/90">Responsive Design</h3>
                    </div>
                    <p className="text-white/60 ml-11">Components are responsive by default and adapt to different screen sizes.</p>
                    <div className="ml-11">
                      <CodeBlock language="javascript">
                        {`<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">HeroCard</span>
  <span class="text-[#92c5f7]">title</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"Responsive Hero"</span>
  <span class="text-[#92c5f7]">description</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"Adapts to all screen sizes"</span>
  <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"px-4 md:px-8 lg:px-12"</span>
<span class="text-[#d4d4d4]">/&gt;</span>

<span class="text-[#608b4e]">// Grid layouts that adapt</span>
<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">div</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"</span><span class="text-[#d4d4d4]">&gt;</span>
  <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">GradientButton</span><span class="text-[#d4d4d4]">&gt;</span><span class="text-[#d4d4d4]">Button 1</span><span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">GradientButton</span><span class="text-[#d4d4d4]">&gt;</span>
  <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">GradientButton</span><span class="text-[#d4d4d4]">&gt;</span><span class="text-[#d4d4d4]">Button 2</span><span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#4ec9b0]">GradientButton</span><span class="text-[#d4d4d4]">&gt;</span>
<span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span>`}
                      </CodeBlock>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}