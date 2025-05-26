"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Code, Copy, Check, Zap, Sparkles, Target, Clock, Cpu, Activity } from "lucide-react"

// Particle physics system
class Particle {
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 8 // High velocity
    this.vy = (Math.random() - 0.5) * 8
    this.radius = Math.random() * 2 + 1
    this.life = 1
    this.decay = Math.random() * 0.02 + 0.005
    this.id = Math.random()
  }

  x: number
  y: number
  vx: number
  vy: number
  radius: number
  life: number
  decay: number
  id: number

  update(width: number, height: number) {
    this.x += this.vx
    this.y += this.vy
    this.life -= this.decay

    // Boundary collisions with bounce
    if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      this.vx *= -0.8 // Energy loss on bounce
      this.x = Math.max(this.radius, Math.min(width - this.radius, this.x))
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
      this.vy *= -0.8
      this.y = Math.max(this.radius, Math.min(height - this.radius, this.y))
    }

    return this.life > 0
  }

  checkCollision(other: Particle) {
    const dx = this.x - other.x
    const dy = this.y - other.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const minDistance = this.radius + other.radius

    if (distance < minDistance) {
      // Simple elastic collision
      const angle = Math.atan2(dy, dx)
      const sin = Math.sin(angle)
      const cos = Math.cos(angle)

      // Rotate velocities
      const vx1 = this.vx * cos + this.vy * sin
      const vy1 = this.vy * cos - this.vx * sin
      const vx2 = other.vx * cos + other.vy * sin
      const vy2 = other.vy * cos - other.vx * sin

      // Swap velocities (elastic collision)
      this.vx = vx2 * cos - vy1 * sin
      this.vy = vy1 * cos + vx2 * sin
      other.vx = vx1 * cos - vy2 * sin
      other.vy = vy2 * cos + vx1 * sin

      // Separate particles
      const overlap = minDistance - distance
      const separationX = (dx / distance) * overlap * 0.5
      const separationY = (dy / distance) * overlap * 0.5

      this.x += separationX
      this.y += separationY
      other.x -= separationX
      other.y -= separationY
    }
  }
}

const ModernTextEffect = ({
  text,
  duration = 0.3,
}: {
  text: string
  duration?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })
  const [particles, setParticles] = useState<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const particleSpawnRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      })
    }
  }, [cursor])

  // Particle system animation loop
  useEffect(() => {
    if (!hovered) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (particleSpawnRef.current) {
        clearInterval(particleSpawnRef.current)
      }
      setParticles([])
      return
    }

    // Spawn particles continuously
    particleSpawnRef.current = setInterval(() => {
      if (particles.length < 50) {
        // Limit particle count
        setParticles((prev) => [...prev, new Particle(Math.random() * 600, Math.random() * 200)])
      }
    }, 100)

    // Animation loop
    const animate = () => {
      setParticles((prevParticles) => {
        const newParticles = prevParticles.filter((particle) => particle.update(600, 200))

        // Check collisions between all particles
        for (let i = 0; i < newParticles.length; i++) {
          for (let j = i + 1; j < newParticles.length; j++) {
            newParticles[i].checkCollision(newParticles[j])
          }
        }

        return newParticles
      })

      if (hovered) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (particleSpawnRef.current) {
        clearInterval(particleSpawnRef.current)
      }
    }
  }, [hovered])

  // Generate static particles for basic animation
  const staticParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 600,
    y: Math.random() * 200,
    delay: Math.random() * 2,
  }))

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 600 200"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none cursor-pointer"
      >
        <defs>
          {/* Enhanced glow filter with color */}
          <filter id="modernGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feFlood floodColor="#6366f1" floodOpacity="0.6" result="glowColor" />
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="coloredGlow" />
            <feMerge>
              <feMergeNode in="coloredGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sharp digital noise filter */}
          <filter id="digitalNoise">
            <feTurbulence baseFrequency="0.9" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
          </filter>

          {/* Enhanced particle glow filter */}
          <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feFlood floodColor="#06b6d4" floodOpacity="0.8" result="glowColor" />
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="coloredGlow" />
            <feMerge>
              <feMergeNode in="coloredGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Reveal mask with cursor following */}
          <radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            cx={maskPosition.cx}
            cy={maskPosition.cy}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="70%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

          {/* Enhanced geometric pattern */}
          <pattern id="gridPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#6366f1" strokeWidth="0.2" opacity="0.3" />
          </pattern>

          <mask id="textRevealMask">
            <rect width="100%" height="100%" fill="url(#revealMask)" />
          </mask>
        </defs>

        {/* Background grid pattern */}
        <rect
          width="100%"
          height="100%"
          fill="url(#gridPattern)"
          opacity={hovered ? 0.6 : 0.2}
          style={{ transition: "opacity 0.3s ease" }}
        />

        {/* High-speed colliding particles */}
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.radius}
            fill="#06b6d4"
            opacity={particle.life * 0.8}
            filter="url(#particleGlow)"
          />
        ))}

        {/* Static animated particles (original) */}
        {staticParticles.map((particle) => (
          <circle
            key={particle.id}
            r="0.5"
            fill="#6366f1"
            style={{
              transform: hovered ? `translateY(-20px) scale(1.5)` : "scale(0)",
              transition: `all 2s ease-out ${particle.delay}s`,
              opacity: hovered ? 0.4 : 0,
            }}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={
                hovered
                  ? `${particle.x} ${particle.y}; ${particle.x} ${particle.y - 20}`
                  : `${particle.x} ${particle.y}`
              }
              dur="2s"
              begin={`${particle.delay}s`}
              repeatCount={hovered ? "indefinite" : "0"}
            />
            <animate
              attributeName="opacity"
              values={hovered ? "0;0.4;0" : "0"}
              dur="2s"
              begin={`${particle.delay}s`}
              repeatCount={hovered ? "indefinite" : "0"}
            />
          </circle>
        ))}

        {/* Main text - background (always visible, subtle) */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-none stroke-white font-mono text-8xl font-bold tracking-wider"
          strokeWidth="0.2"
          opacity="0.3"
        >
          {text}
        </text>

        {/* Animated stroke text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-none stroke-indigo-400 font-mono text-8xl font-bold tracking-wider"
          strokeWidth="0.4"
          strokeDasharray={hovered ? "1000 0" : "0 1000"}
          opacity={hovered ? 0.7 : 0}
          style={{ transition: "all 1.2s ease-in-out" }}
          filter="url(#digitalNoise)"
        />

        {/* Revealed text with mask */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-mono text-8xl font-bold tracking-wider"
          mask="url(#textRevealMask)"
          filter="url(#modernGlow)"
        >
          {text}
        </text>
      </svg>

      {/* Additional overlay effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: hovered ? 0.1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent transform -skew-x-12 animate-pulse" />
      </div>
    </div>
  )
}

function CodeBlock({ children, language = "tsx" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
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

export default function ModernTextEffectPage() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen w-full bg-[#030303]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 flex-1 container max-w-4xl py-16 mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center text-sm text-white/60 hover:text-white mb-4 cursor-pointer transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Documentation
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-cyan-300">
              Modern Text Effect
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              Enhanced futuristic text hover effect with high-speed colliding particles, physics simulation, and dynamic
              particle interactions.
            </p>
          </div>

          {/* Preview */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Interactive Preview
              </h2>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-white/[0.2] bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors backdrop-blur-sm"
              >
                <Code className="h-4 w-4" />
                {showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            {/* Effect Demo */}
            <div className="flex items-center justify-center p-8 rounded-xl border border-white/[0.1] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
              <ModernTextEffect text="HOVER ME" duration={0.2} />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white/90">Interactive Features</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <Zap className="flex-shrink-0 w-5 h-5 text-indigo-400 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    Hover to spawn high-speed particles that collide with each other
                  </span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <Target className="flex-shrink-0 w-5 h-5 text-cyan-400 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    Particles bounce off boundaries and lose energy over time
                  </span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <Activity className="flex-shrink-0 w-5 h-5 text-purple-400 mt-0.5" />
                  <span className="text-white/70 text-sm">Real-time physics simulation with elastic collisions</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <Sparkles className="flex-shrink-0 w-5 h-5 text-pink-400 mt-0.5" />
                  <span className="text-white/70 text-sm">Mouse movement controls the reveal mask position</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <Cpu className="flex-shrink-0 w-5 h-5 text-emerald-400 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    Dynamic particle system limited to 50 particles for performance
                  </span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  <Clock className="flex-shrink-0 w-5 h-5 text-orange-400 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    Particles have individual life cycles and fade out naturally
                  </span>
                </div>
              </div>
            </div>

            {showCode && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white/90">Component Code</h3>
                <CodeBlock language="tsx">
                  {`<span class="text-[#c586c0]">import</span> <span class="text-[#d4d4d4]">{</span> <span class="text-[#9cdcfe]">useState</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">useRef</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">useEffect</span> <span class="text-[#d4d4d4]">}</span> <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">"react"</span>

<span class="text-[#608b4e]">// Particle physics system</span>
<span class="text-[#c586c0]">class</span> <span class="text-[#4ec9b0]">Particle</span> <span class="text-[#d4d4d4]">{</span>
  <span class="text-[#dcdcaa]">constructor</span><span class="text-[#d4d4d4]">(</span><span class="text-[#9cdcfe]">x</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#4ec9b0]">number</span><span class="text-[#d4d4d4]">,</span> <span class="text-[#9cdcfe]">y</span><span class="text-[#d4d4d4]">:</span> <span class="text-[#4ec9b0]">number</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#d4d4d4]">{</span>
    <span class="text-[#569cd6]">this</span><span class="text-[#d4d4d4]">.</span><span class="text-[#9cdcfe]">x</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#9cdcfe]">x</span><span class="text-[#d4d4d4]">;</span>
    <span class="text-[#569cd6]">this</span><span class="text-[#d4d4d4]">.</span><span class="text-[#9cdcfe]">y</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#9cdcfe]">y</span><span class="text-[#d4d4d4]">;</span>
    <span class="text-[#569cd6]">this</span><span class="text-[#d4d4d4]">.</span><span class="text-[#9cdcfe]">vx</span> <span class="text-[#d4d4d4]">=</span> <span class="text-[#d4d4d4]">(</span><span class="text-[#dcdcaa]">Math</span><span class="text-[#d4d4d4]">.</span><span class="text-[#dcdcaa]">random</span><span class="text-[#d4d4d4]">()</span> <span class="text-[#d4d4d4]">-</span> <span class="text-[#b5cea8]">0.5</span><span class="text-[#d4d4d4]">)</span> <span class="text-[#d4d4d4]">*</span> <span class="text-[#b5cea8]">8</span><span class="text-[#d4d4d4]">;</span>
    <span class="text-[#608b4e]">// ... physics implementation</span>
  <span class="text-[#d4d4d4]">}</span>
<span class="text-[#d4d4d4]">}</span>`}
                </CodeBlock>
              </div>
            )}
          </div>

          {/* Physics Features */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Physics Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
                    <Zap className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">High-Speed Particles</h3>
                </div>
                <p className="text-sm text-white/60">
                  Particles spawn with random velocities up to 8 units per frame, creating fast-moving interactions.
                </p>
              </div>
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                    <Activity className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Elastic Collisions</h3>
                </div>
                <p className="text-sm text-white/60">
                  Full physics simulation with elastic collisions between particles, including velocity exchange and
                  separation.
                </p>
              </div>
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Boundary Bouncing</h3>
                </div>
                <p className="text-sm text-white/60">
                  Particles bounce off screen boundaries with energy loss (0.8 coefficient) for realistic physics.
                </p>
              </div>
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30">
                    <Clock className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Life Cycle System</h3>
                </div>
                <p className="text-sm text-white/60">
                  Each particle has a life value that decreases over time, causing natural fade-out and removal.
                </p>
              </div>
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                    <Cpu className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Performance Optimization</h3>
                </div>
                <p className="text-sm text-white/60">
                  Particle count limited to 50 with efficient collision detection and automatic cleanup.
                </p>
              </div>
              <div className="p-6 border border-white/[0.1] rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90">Continuous Spawning</h3>
                </div>
                <p className="text-sm text-white/60">
                  New particles spawn every 100ms while hovered, maintaining dynamic activity.
                </p>
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Physics Configuration
            </h2>
            <div className="rounded-xl border border-white/[0.1] overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-indigo-500/[0.1] to-cyan-500/[0.1] border-b border-white/[0.1]">
                  <tr>
                    <th className="text-left p-4 font-semibold text-white/90">Parameter</th>
                    <th className="text-left p-4 font-semibold text-white/90">Value</th>
                    <th className="text-left p-4 font-semibold text-white/90">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">Max Velocity</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">±4 units/frame</td>
                    <td className="p-4 text-white/70">Maximum initial velocity in each direction</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">Bounce Damping</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">0.8</td>
                    <td className="p-4 text-white/70">Energy retention after boundary collision</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">Spawn Rate</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">100ms</td>
                    <td className="p-4 text-white/70">Interval between new particle spawns</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">Max Particles</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">50</td>
                    <td className="p-4 text-white/70">Maximum number of active particles</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-300">Life Decay</td>
                    <td className="p-4 font-mono text-xs text-cyan-300">0.005-0.025</td>
                    <td className="p-4 text-white/70">Random decay rate per frame</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="space-y-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Implementation Notes
            </h2>
            <div className="space-y-6">
              <div className="p-6 border border-amber-500/30 rounded-xl bg-gradient-to-br from-amber-500/[0.05] to-orange-500/[0.05] backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-amber-300 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Physics System
                </h3>
                <ul className="text-sm text-amber-200/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Custom Particle class with position, velocity, and life properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>O(n²) collision detection - optimized for particle count limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Elastic collision formula with velocity exchange</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Particle separation to prevent overlap after collision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>RequestAnimationFrame for smooth 60fps animation</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border border-blue-500/30 rounded-xl bg-gradient-to-br from-blue-500/[0.05] to-cyan-500/[0.05] backdrop-blur-sm">
                <h3 className="font-semibold mb-3 text-blue-300 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Performance Considerations
                </h3>
                <ul className="text-sm text-blue-200/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Animation loop only runs when hovered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Automatic cleanup of expired particles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Efficient state updates using React's functional updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>SVG rendering optimized with particle glow filter</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
