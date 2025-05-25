"use client"

import { useState } from "react"
import { ArrowLeft, Code, Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// CodeBlock Component with VS Code styling
function CodeBlock({ children, language = "tsx" }: { children: string; language?: string }) {
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
      <div className="rounded-lg bg-[#1e1e1e] border border-[#3c3c3c] shadow-2xl overflow-hidden font-mono">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#3c3c3c]">
          <span className="text-xs text-[#cccccc] font-medium">{language}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#cccccc] hover:text-white hover:bg-[#3c3c3c] rounded-md transition-all duration-200"
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
        <div className="p-4 text-sm overflow-x-auto">
          <code className="text-[#d4d4d4] leading-relaxed" dangerouslySetInnerHTML={{ __html: children }} />
        </div>
      </div>
    </div>
  )
}

// AnimatedTestimonialsDemo Component
type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
}

function AnimatedTestimonialsDemo({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(testimonials[0])

  const handleprev = () => {
    const currentIndex = testimonials.indexOf(active)
    const length = testimonials.length
    const prevIndex = (currentIndex - 1 + length) % length
    setActive(testimonials[prevIndex])
  }

  const handlenext = () => {
    const currentIndex = testimonials.indexOf(active)
    const length = testimonials.length
    const nextIndex = (currentIndex + 1) % length
    setActive(testimonials[nextIndex])
  }

  const isActive = (index: number) => {
    return testimonials[index] === active
  }

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
      <div className="relative h-80 w-full">
        <AnimatePresence>
          {testimonials.map((testimonial, index) => (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotateY: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : randomRotateY(),
                zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                y: isActive(index) ? [0, -80, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: randomRotateY(),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 origin-bottom"
              key={index}
            >
              <img
                src={testimonial.src || "/placeholder.svg"}
                alt={testimonial.name}
                draggable={false}
                className="rounded-3xl h-full w-full object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-white">{active.name}</h3>
            <p className="text-sm text-white/60">{active.designation}</p>
            <motion.p className="text-lg text-white/80 mt-8">
              {active.quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>
        <div className="flex gap-4 pt-5">
          <button
            className="flex items-center justify-center h-10 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
            onClick={handleprev}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            className="flex items-center justify-center h-10 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
            onClick={handlenext}
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AnimatedTestimonialPage() {
  const [showCode, setShowCode] = useState(false)

  const testimonials = [
    {
      quote:
        "Spectrum UI is a game-changer! Its components are so well-designed and customizable that it made our app look polished and professional in no time.",
      name: "Ananya Gupta",
      designation: "Frontend Engineer, NovaTech",
      src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      quote:
        "I love the simplicity and minimalism of Spectrum UI. The components are intuitive and fit seamlessly into our existing projects.",
      name: "Sophia Allen",
      designation: "UI/UX Designer, Creatify",
      src: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      quote:
        "As a junior developer, Spectrum UI has been a lifesaver. The documentation is straightforward, and the components work flawlessly with Tailwind CSS.",
      name: "Ethan Rodriguez",
      designation: "Software Engineer, CodeWorks",
      src: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      quote:
        "The integration with Shadcn made it super easy to customize the components. Spectrum UI is now a must-have in our tech stack.",
      name: "Priya Sharma",
      designation: "Full Stack Developer, Innovate Labs",
      src: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]

  const componentCode = `<span class="text-[#569cd6]">"use client"</span><span class="text-[#d4d4d4]">;</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">Button</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/components/ui/button"</span><span class="text-[#d4d4d4]">;</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">motion</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">AnimatePresence</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"framer-motion"</span><span class="text-[#d4d4d4]">;</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">ArrowLeft</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">ArrowRight</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"lucide-react"</span><span class="text-[#d4d4d4]">;</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#9cdcfe]">Image</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"next/image"</span><span class="text-[#d4d4d4]">;</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#9cdcfe]">react</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">useEffect</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">useState</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"react"</span><span class="text-[#d4d4d4]">;</span><br/><br/>

<span class="text-[#569cd6]">type</span> <span class="text-[#4fc1ff]">Testimonial</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;<span class="text-[#9cdcfe]">quote</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;<span class="text-[#9cdcfe]">name</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;<span class="text-[#9cdcfe]">designation</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;<span class="text-[#9cdcfe]">src</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span><br/>
<span class="text-[#d4d4d4]">};</span><br/><br/>

<span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">AnimatedTestimonialsDemo</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">()</span> <span class="text-[#c586c0]">=&gt;</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#d4d4d4]">[</span><span class="text-[#9cdcfe]">active</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">setActive</span><span class="text-[#d4d4d4]">]</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#dcdcaa]">useState</span><span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">[</span><span class="text-[#b5cea8]">0</span><span class="text-[#d4d4d4]">]);</span><br/>
&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">handleprev</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">()</span> <span class="text-[#c586c0]">=&gt;</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">currentIndex</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">indexOf</span><span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">active</span><span class="text-[#d4d4d4]">);</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">length</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">.</span><span class="text-[#9cdcfe]">length</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">prevIndex</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">currentIndex</span> <span class="text-[#d4d4d4]">-</span> <span class="text-[#b5cea8]">1</span> <span class="text-[#d4d4d4]">+</span> <span class="text-[#9cdcfe]">length</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#d4d4d4]">%</span> <span class="text-[#9cdcfe]">length</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#dcdcaa]">setActive</span><span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">[</span><span class="text-[#9cdcfe]">prevIndex</span><span class="text-[#d4d4d4]">]);</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">};</span><br/>
&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">handlenext</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">()</span> <span class="text-[#c586c0]">=&gt;</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">currentIndex</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">indexOf</span><span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">active</span><span class="text-[#d4d4d4]">);</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">length</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">.</span><span class="text-[#9cdcfe]">length</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">nextIndex</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">currentIndex</span> <span class="text-[#d4d4d4]">+</span> <span class="text-[#b5cea8]">1</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#d4d4d4]">%</span> <span class="text-[#9cdcfe]">length</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#dcdcaa]">setActive</span><span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">[</span><span class="text-[#9cdcfe]">nextIndex</span><span class="text-[#d4d4d4]">]);</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">};</span><br/>
&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">isActive</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">index</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">number</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#c586c0]">=&gt;</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">[</span><span class="text-[#9cdcfe]">index</span><span class="text-[#d4d4d4]">]</span> <span class="text-[#d4d4d4]">===</span> <span class="text-[#9cdcfe]">active</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">};</span><br/><br/>

&nbsp;&nbsp;<span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">randomRotateY</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">()</span> <span class="text-[#c586c0]">=&gt;</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">Math</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">floor</span><span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">Math</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">random</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">*</span> <span class="text-[#b5cea8]">21</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#d4d4d4]">-</span> <span class="text-[#b5cea8]">10</span><span class="text-[#d4d4d4]">;</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">};</span><br/><br/>

&nbsp;&nbsp;<span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">(</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;</span><span class="text-[#569cd6]">div</span> <span class="text-[#92c5f7]">className</span><span class="text-[#d4d4d4]">=</span><span class="text-[#ce9178]">"grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#608b4e]">// Component JSX...</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#d4d4d4]">&lt;/</span><span class="text-[#569cd6]">div</span><span class="text-[#d4d4d4]">&gt;</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">);</span><br/>
<span class="text-[#d4d4d4]">};</span><br/><br/>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#9cdcfe]">AnimatedTestimonialsDemo</span><span class="text-[#d4d4d4]">;</span>`

  const usageCode = `<span class="text-[#569cd6]">"use client"</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">AnimatedTestimonialsDemo</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"@/components/AnimatedTestimonialsDemo"</span><br/><br/>

<span class="text-[#c586c0]">const</span> <span class="text-[#4fc1ff]">testimonials</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">[</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">quote</span><span class="text-[#d4d4d4]">:</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#ce9178]">"Spectrum UI is a game-changer! Its components are so well-designed and customizable that it made our app look polished and professional in no time."</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">name</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"Ananya Gupta"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">designation</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"Frontend Engineer, NovaTech"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-[#9cdcfe]">src</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#ce9178]">"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"</span><span class="text-[#d4d4d4]">,</span><br/>
&nbsp;&nbsp;<span class="text-[#d4d4d4]">},</span><br/>
&nbsp;&nbsp;<span class="text-[#608b4e]">// ... more testimonials</span><br/>
<span class="text-[#d4d4d4]">];</span><br/><br/>

<span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">default</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">MyComponent</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;<span class="text-[#c586c0]">return</span> <span class="text-[#d4d4d4]">&lt;</span><span class="text-[#4ec9b0]">AnimatedTestimonialsDemo</span> <span class="text-[#92c5f7]">testimonials</span><span class="text-[#d4d4d4]">=</span><span class="text-[#d4d4d4]">{</span><span class="text-[#9cdcfe]">testimonials</span><span class="text-[#d4d4d4]">}</span> <span class="text-[#d4d4d4]">/&gt;</span><br/>
<span class="text-[#d4d4d4]">}</span>`

  const typeDefinitionCode = `<span class="text-[#569cd6]">type</span> <span class="text-[#4fc1ff]">Testimonial</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">{</span><br/>
&nbsp;&nbsp;<span class="text-[#9cdcfe]">quote</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>      <span class="text-[#608b4e]">// The testimonial text</span><br/>
&nbsp;&nbsp;<span class="text-[#9cdcfe]">name</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>       <span class="text-[#608b4e]">// Person's name</span><br/>
&nbsp;&nbsp;<span class="text-[#9cdcfe]">designation</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span> <span class="text-[#608b4e]">// Job title and company</span><br/>
&nbsp;&nbsp;<span class="text-[#9cdcfe]">src</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#569cd6]">string</span><span class="text-[#d4d4d4]">;</span>        <span class="text-[#608b4e]">// Profile image URL</span><br/>
<span class="text-[#d4d4d4]">};</span>`

  const dependenciesCode = `<span class="text-[#608b4e]"># Install required dependencies</span><br/>
<span class="text-[#569cd6]">npm</span> <span class="text-[#9cdcfe]">install</span> <span class="text-[#ce9178]">framer-motion</span><br/>
<span class="text-[#569cd6]">npm</span> <span class="text-[#9cdcfe]">install</span> <span class="text-[#ce9178]">lucide-react</span><br/>
<span class="text-[#569cd6]">npm</span> <span class="text-[#9cdcfe]">install</span> <span class="text-[#ce9178]">next</span><br/><br/>

<span class="text-[#608b4e]"># Required imports:</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">motion</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">AnimatePresence</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"framer-motion"</span><span class="text-[#d4d4d4]">;</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">ArrowLeft</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">ArrowRight</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"lucide-react"</span><span class="text-[#d4d4d4]">;</span><br/>
<span class="text-[#c586c0]">import</span> <span class="text-[#9cdcfe]">Image</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"next/image"</span><span class="text-[#d4d4d4]">;</span>`

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-6xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <button className="inline-flex items-center text-sm text-white/60 hover:text-white/90 transition-colors mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </button>
            <div className="space-y-4 text-center">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
                AnimatedTestimonials
              </h1>
              <p className="text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                A sophisticated animated testimonial carousel with 3D effects, smooth transitions, and interactive
                controls powered by Framer Motion.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Interactive Preview
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-white/[0.05] border border-white/[0.1] text-white/80 hover:bg-white/[0.1] hover:text-white transition-all duration-200"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            <div className="py-8">
              <AnimatedTestimonialsDemo testimonials={testimonials} />
            </div>

            <div className="bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] rounded-xl p-6 border border-white/[0.08]">
              <p className="text-white/80 font-medium mb-3">✨ Interactive Features:</p>
              <ul className="text-white/60 space-y-2 text-sm">
                <li>• 3D image stacking with random rotation effects</li>
                <li>• Smooth word-by-word text animation with blur effects</li>
                <li>• Responsive navigation controls with gradient styling</li>
                <li>• Seamless transitions powered by Framer Motion</li>
              </ul>
            </div>

            {showCode && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4 text-white/90">Component Implementation</h3>
                <CodeBlock language="tsx">{componentCode}</CodeBlock>
              </div>
            )}
          </div>

          {/* Props Table */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              API Reference
            </h2>
            <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] border-b border-white/[0.08]">
                  <tr>
                    <th className="text-left p-4 font-semibold text-white/90">Prop</th>
                    <th className="text-left p-4 font-semibold text-white/90">Type</th>
                    <th className="text-left p-4 font-semibold text-white/90">Default</th>
                    <th className="text-left p-4 font-semibold text-white/90">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">testimonials</td>
                    <td className="p-4 font-mono text-xs text-white/70">Testimonial[]</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">—</td>
                    <td className="p-4 text-white/70">
                      Array of testimonial objects with quote, name, designation, and src
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonial Type */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Testimonial Type
            </h2>
            <CodeBlock language="tsx">{typeDefinitionCode}</CodeBlock>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-indigo-500/[0.05] to-transparent">
                <h3 className="font-semibold mb-3 text-lg text-white/90">🎭 3D Animations</h3>
                <p className="text-white/60 leading-relaxed">
                  Smooth 3D rotations and scaling effects with random rotateY values for natural movement
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-cyan-500/[0.05] to-transparent">
                <h3 className="font-semibold mb-3 text-lg text-white/90">✨ Text Blur Effect</h3>
                <p className="text-white/60 leading-relaxed">
                  Quote text animates in word by word with blur-to-focus effect and staggered delays
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-purple-500/[0.05] to-transparent">
                <h3 className="font-semibold mb-3 text-lg text-white/90">🖼️ Image Stack</h3>
                <p className="text-white/60 leading-relaxed">
                  Beautiful stacked image layout with depth, perspective, and z-index management
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.1] p-6 bg-gradient-to-br from-pink-500/[0.05] to-transparent">
                <h3 className="font-semibold mb-3 text-lg text-white/90">🎮 Interactive Controls</h3>
                <p className="text-white/60 leading-relaxed">
                  Previous/next navigation with smooth transitions and circular array navigation
                </p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Usage Examples
            </h2>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-white/90">Basic Usage</h3>
                </div>
                <CodeBlock language="tsx">{usageCode}</CodeBlock>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-white/90">Dependencies</h3>
                </div>
                <CodeBlock language="bash">{dependenciesCode}</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
