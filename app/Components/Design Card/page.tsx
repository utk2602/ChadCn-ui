"use client"
import { useState } from "react"
import { ArrowLeft, Code, Copy, Check, Heart, Star, PhoneCall, Video, PlusCircle, Clock, Bug } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

// CodeBlock Component
function CodeBlock({ children, language = "javascript" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children.replace(/<[^>]*>/g, ""))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
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

// DesignerCard Component
type DesignerCardProps = {
  name: string
  title: string
  imageUrl: string
  rating: string
  Icon1: React.ElementType
  Icon2: React.ElementType
  Icon3: React.ElementType
  Icon4: React.ElementType
  Icon5: React.ElementType
}

const DesignerCard = ({ name, title, imageUrl, rating, Icon1, Icon2, Icon3, Icon4, Icon5 }: DesignerCardProps) => {
  const icon1 = <Icon1 className="w-4" />
  const icon2 = <Icon2 className="w-4" />
  const icon3 = <Icon3 className="w-4" />
  const icon4 = <Icon4 className="w-4" />
  const icon5 = <Icon5 className="w-4" />
  const [isClicked, setIsClicked] = useState(false)
  const [isActive, setIsActive] = useState(0)

  const icons = [
    {
      icon: icon1,
    },
    {
      icon: icon2,
    },
    {
      icon: icon3,
    },
    {
      icon: icon4,
    },
    {
      icon: icon5,
    },
  ]
  return (
    <div className="w-[390px] z-10 rounded-[2.2rem] relative group p-3 bg-[#050505] flex flex-col gap-3">
      <div className="p-2.5 border border-[#4A4A4A] rounded-[1.9rem] flex gap-4 bg-gradient-to-tl from-[#171717] to-[#2b2b2b]">
        <div className="w-[100px] h-[100px] rounded-3xl overflow-hidden flex-shrink-0 p-px bg-white ">
          <img src={imageUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover rounded-3xl" />
        </div>
        <div className=" w-full h-full pt-2 flex flex-col gap-2 pr-2">
          <div className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <h1 className="font-extrabold text-lg leading-6 text-white">{name}</h1>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="w-5 select-none">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    fill="#3B82F6"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="border border-[#4A4A4A] rounded-full w-7 h-7 flex items-center justify-center">
                <Heart
                  fill={isClicked ? "#f17dae" : "none"}
                  stroke={isClicked ? "#f17dae" : "#fff"}
                  onClick={() => setIsClicked((prev) => !prev)}
                  className="w-3.5 cursor-pointer"
                />
              </div>
            </div>

            <p className="font-light text-neutral-500 text-sm">{title}</p>
          </div>
          <div className="font-light flex items-center gap-1">
            <Star fill="#fde047" className="w-4 text-yellow-300" />
            <p className="text-white">{rating}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-2">
        {icons.map((ic, i) => (
          <div
            key={i}
            style={{
              boxShadow:
                isActive === i
                  ? "0 4px 3px 0 #FEC5DC inset, 0 -4px 3px 0 #C63777 inset"
                  : "0 4px 3px 0 #3c3c3c inset, 0 -4px 3px 0 #111214 inset",
            }}
            onClick={() => setIsActive(i)}
            className={cn(
              "w-[70px] aspect-[3.3/3] p-4 flex items-center justify-center rounded-[26px] cursor-pointer ",
              isActive === i ? "bg-[#FA99C0]" : "bg-gradient-to-t from-[#1a1a1a] to-[#292929]",
            )}
          >
            {React.cloneElement(ic.icon, {
              fill: isActive === i ? "#fff" : "#4D4D4D",
              stroke: isActive === i ? "#fff" : "#4D4D4D",
              className: cn("w-full h-full"),
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DesignerCardPage() {
  const [showCode, setShowCode] = useState(false)

  const componentCode = `<span class="text-[#ce9178]">'use client'</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">cn</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'@/lib/utils'</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Heart</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Star</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'lucide-react'</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#9cdcfe]">React</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">useState</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'react'</span>

<span class="text-[#569cd6]">type</span> <span class="text-[#4ec9b0]">DesignerCardProps</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#9cdcfe]">name</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>
  <span class="text-[#9cdcfe]">title</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>
  <span class="text-[#9cdcfe]">imageUrl</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>
  <span class="text-[#9cdcfe]">rating</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>
  <span class="text-[#9cdcfe]">Icon1</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span>
  <span class="text-[#9cdcfe]">Icon2</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span>
  <span class="text-[#9cdcfe]">Icon3</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span>
  <span class="text-[#9cdcfe]">Icon4</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span>
  <span class="text-[#9cdcfe]">Icon5</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span>
<span class="text-[#d4d4d4]">}</span>

<span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">DesignerCard</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">({</span>
    <span class="text-[#9cdcfe]">name</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">title</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">imageUrl</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">rating</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">Icon1</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">Icon2</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">Icon3</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">Icon4</span><span class="text-[#d4d4d4]">,</span>
    <span class="text-[#9cdcfe]">Icon5</span><span class="text-[#d4d4d4]">,</span>
<span class="text-[#d4d4d4]">}</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#4ec9b0]">DesignerCardProps</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#d4d4d4]">=></span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#608b4e]">// Component implementation...</span>
<span class="text-[#d4d4d4]">};</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#9cdcfe]">DesignerCard</span>`

  const usageCode = `<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">DesignerCard</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/components/DesignerCard"</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">PhoneCall</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Video</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">PlusCircle</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Clock</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Bug</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"lucide-react"</span>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">MyComponent</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span>
    <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">DesignerCard</span>
      <span class="text-[#92c5f7]">name</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"Sarah Johnson"</span>
      <span class="text-[#92c5f7]">title</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"Senior UI/UX Designer"</span>
      <span class="text-[#92c5f7]">imageUrl</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"/path/to/image.jpg"</span>
      <span class="text-[#92c5f7]">rating</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"4.8"</span>
      <span class="text-[#92c5f7]">Icon1</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#9cdcfe]">PhoneCall</span><span class="text-[#d4d4d4]">}</span>
      <span class="text-[#92c5f7]">Icon2</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#9cdcfe]">Video</span><span class="text-[#d4d4d4]">}</span>
      <span class="text-[#92c5f7]">Icon3</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#9cdcfe]">PlusCircle</span><span class="text-[#d4d4d4]">}</span>
      <span class="text-[#92c5f7]">Icon4</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#9cdcfe]">Clock</span><span class="text-[#d4d4d4]">}</span>
      <span class="text-[#92c5f7]">Icon5</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#9cdcfe]">Bug</span><span class="text-[#d4d4d4]">}</span>
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
            <Link
              href="/docs"
              className="inline-flex items-center text-sm text-white/60 hover:text-white/90 transition-colors mb-4"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </Link>
            <div className="space-y-4 text-center">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
                DesignerCard
              </h1>
              <p className="text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                A sleek, interactive designer profile card with neumorphic design, interactive heart button, star
                rating, and customizable action icons with smooth hover effects.
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

            <div className="py-8 flex justify-center">
              <DesignerCard
                name="Sarah Johnson"
                title="Senior UI/UX Designer"
                imageUrl="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                rating="4.8"
                Icon1={PhoneCall}
                Icon2={Video}
                Icon3={PlusCircle}
                Icon4={Clock}
                Icon5={Bug}
              />
            </div>

            {showCode && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4 text-white/90">Component Code</h3>
                <CodeBlock language="javascript">{componentCode}</CodeBlock>
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
                    <td className="p-4 font-mono text-xs text-cyan-300">name</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">string</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">The designer's full name</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">title</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">string</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">Job title or professional designation</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">imageUrl</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">string</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">URL for the profile image</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">rating</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">string</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">Rating value (e.g., "4.8")</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono text-xs text-cyan-300">Icon1-Icon5</td>
                    <td className="p-4 font-mono text-xs text-indigo-300">React.ElementType</td>
                    <td className="p-4 font-mono text-xs text-white/60">—</td>
                    <td className="p-4 text-white/70">Lucide React icon components for action buttons</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* DesignerCardProps Type */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              DesignerCardProps Type
            </h2>
            <CodeBlock language="typescript">
              {`<span class="text-[#569cd6]">type</span> <span class="text-[#4ec9b0]">DesignerCardProps</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#9cdcfe]">name</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>       <span class="text-[#608b4e]">// Designer's full name</span>
  <span class="text-[#9cdcfe]">title</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>      <span class="text-[#608b4e]">// Job title or professional designation</span>
  <span class="text-[#9cdcfe]">imageUrl</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>   <span class="text-[#608b4e]">// URL for the profile image</span>
  <span class="text-[#9cdcfe]">rating</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>     <span class="text-[#608b4e]">// Rating value (e.g., "4.8")</span>
  <span class="text-[#9cdcfe]">Icon1</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span> <span class="text-[#608b4e]">// First action icon</span>
  <span class="text-[#9cdcfe]">Icon2</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span> <span class="text-[#608b4e]">// Second action icon</span>
  <span class="text-[#9cdcfe]">Icon3</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span> <span class="text-[#608b4e]">// Third action icon</span>
  <span class="text-[#9cdcfe]">Icon4</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span> <span class="text-[#608b4e]">// Fourth action icon</span>
  <span class="text-[#9cdcfe]">Icon5</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">React.ElementType</span><span class="text-[#d4d4d4]">;</span> <span class="text-[#608b4e]">// Fifth action icon</span>
<span class="text-[#d4d4d4]">};</span>`}
            </CodeBlock>
          </div>

          {/* Features */}
          <div className="space-y-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-lg text-white/90">🎨 Neumorphic Design</h3>
                <p className="text-white/60 leading-relaxed">
                  Beautiful neumorphic styling with inset shadows and gradient backgrounds
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-lg text-white/90">💖 Interactive Heart</h3>
                <p className="text-white/60 leading-relaxed">
                  Clickable heart button with smooth color transitions and state management
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-lg text-white/90">⭐ Star Rating</h3>
                <p className="text-white/60 leading-relaxed">
                  Integrated star rating display with customizable rating values
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-lg text-white/90">🔧 Action Icons</h3>
                <p className="text-white/60 leading-relaxed">
                  Five customizable action buttons with active states and smooth hover effects
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Usage Examples
            </h2>

            <div className="space-y-6">
              <h3 className="text-xl font-medium text-white/90">Basic Usage</h3>
              <CodeBlock language="javascript">{usageCode}</CodeBlock>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-medium text-white/90">Icon Variants</h3>
              <CodeBlock language="javascript">
                {`<span class="text-[#608b4e]">// Communication Icons</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">PhoneCall</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Video</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Mail</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">MessageCircle</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Send</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"lucide-react"</span>

<span class="text-[#608b4e]">// Social Media Icons</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Github</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Twitter</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Linkedin</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Instagram</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Globe</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"lucide-react"</span>

<span class="text-[#608b4e]">// Action Icons</span>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Calendar</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">FileText</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Download</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Share</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">Bookmark</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"lucide-react"</span>`}
              </CodeBlock>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-medium text-white/90">Dependencies</h3>
              <CodeBlock language="bash">{`npm install lucide-react`}</CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
